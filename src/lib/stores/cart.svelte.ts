import { getContext, setContext } from 'svelte';
import type { CartLine, CartLineMerchandise } from '$lib/types/index.js';

const CART_CTX = Symbol('cart');

export class CartState {
	lines = $state<CartLine[]>([]);
	open = $state(false);
	loading = $state(false);

	get itemCount(): number {
		return this.lines.reduce((sum, line) => sum + line.quantity, 0);
	}

	get totalAmount(): number {
		return this.lines.reduce(
			(sum, line) => sum + parseFloat(line.cost.totalAmount.amount),
			0
		);
	}

	get currencyCode(): string {
		return this.lines[0]?.cost.totalAmount.currencyCode ?? 'USD';
	}

	toggle(): void {
		this.open = !this.open;
	}

	close(): void {
		this.open = false;
	}

	addLine(merchandise: CartLineMerchandise, quantity: number = 1): void {
		const existing = this.lines.find((l) => l.merchandise.id === merchandise.id);

		if (existing) {
			existing.quantity += quantity;
			existing.cost.totalAmount.amount = (
				parseFloat(existing.cost.amountPerQuantity.amount) * existing.quantity
			).toFixed(2);
		} else {
			const amountPerQuantity = merchandise.selectedOptions.length > 0
				? '0.00'
				: '0.00';
			// We need the price passed in separately - derive from context
			this.lines.push({
				id: `line-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
				quantity,
				merchandise,
				cost: {
					totalAmount: { amount: '0.00', currencyCode: 'USD' },
					amountPerQuantity: { amount: '0.00', currencyCode: 'USD' }
				}
			});
		}

		this.#persist();
	}

	addLineWithPrice(merchandise: CartLineMerchandise, priceAmount: string, currencyCode: string, quantity: number = 1): void {
		const existing = this.lines.find((l) => l.merchandise.id === merchandise.id);

		if (existing) {
			existing.quantity += quantity;
			existing.cost.totalAmount.amount = (
				parseFloat(existing.cost.amountPerQuantity.amount) * existing.quantity
			).toFixed(2);
		} else {
			this.lines.push({
				id: `line-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
				quantity,
				merchandise,
				cost: {
					totalAmount: { amount: (parseFloat(priceAmount) * quantity).toFixed(2), currencyCode },
					amountPerQuantity: { amount: priceAmount, currencyCode }
				}
			});
		}

		this.#persist();
	}

	updateLine(lineId: string, quantity: number): void {
		const line = this.lines.find((l) => l.id === lineId);
		if (!line) return;

		if (quantity <= 0) {
			this.removeLine(lineId);
			return;
		}

		line.quantity = quantity;
		line.cost.totalAmount.amount = (
			parseFloat(line.cost.amountPerQuantity.amount) * quantity
		).toFixed(2);

		this.#persist();
	}

	removeLine(lineId: string): void {
		this.lines = this.lines.filter((l) => l.id !== lineId);
		this.#persist();
	}

	get checkoutUrl(): string {
		return '#checkout';
	}

	#persist(): void {
		if (typeof localStorage === 'undefined') return;
		localStorage.setItem('nicole-elgoar-cart', JSON.stringify(this.lines));
	}

	loadFromStorage(): void {
		if (typeof localStorage === 'undefined') return;
		try {
			const stored = localStorage.getItem('nicole-elgoar-cart');
			if (stored) {
				this.lines = JSON.parse(stored);
			}
		} catch {
			// Ignore parse errors
		}
	}
}

export function setCart(state?: CartState): CartState {
	const s = state ?? new CartState();
	setContext(CART_CTX, s);
	return s;
}

export function getCart(): CartState {
	return getContext<CartState>(CART_CTX);
}
