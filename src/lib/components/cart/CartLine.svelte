<script lang="ts">
	import type { CartLine } from '$lib/types/index.js';
	import { getCart } from '$lib/stores/cart.svelte.js';
	import { formatPrice } from '$lib/utils/currency.js';
	import { announce } from '$lib/utils/a11y.js';
	import QuantitySelector from '$lib/components/ui/QuantitySelector.svelte';
	import * as m from '$lib/paraglide/messages';

	let { line }: { line: CartLine } = $props();

	const cart = getCart();

	function updateQuantity(newQty: number) {
		cart.updateLine(line.id, newQty);
		announce(`Updated ${line.merchandise.product.title} quantity to ${newQty}`);
	}

	function removeLine() {
		cart.removeLine(line.id);
		announce(`Removed ${line.merchandise.product.title} from cart`);
	}

	let qty = $state(0);

	// Sync qty from line prop
	$effect(() => {
		qty = line.quantity;
	});

	// Push qty changes back to cart
	$effect(() => {
		if (qty > 0 && qty !== line.quantity) {
			updateQuantity(qty);
		}
	});
</script>

<div class="flex gap-4">
	<!-- Thumbnail -->
	{#if line.merchandise.image}
		<img
			src={line.merchandise.image.url}
			alt={line.merchandise.title}
			width={80}
			height={107}
			class="h-24 w-18 rounded-md object-cover"
		/>
	{/if}

	<div class="flex flex-1 flex-col gap-1">
		<div class="flex items-start justify-between gap-2">
			<div>
				<p class="text-sm font-medium">{line.merchandise.product.title}</p>
				<p class="text-xs opacity-60">{line.merchandise.title}</p>
			</div>
			<button
				class="rounded p-1 transition-colors hover:bg-current/5 focus-visible:ring-2 focus-visible:ring-offset-2"
				aria-label={m.cart_remove({ name: line.merchandise.product.title })}
				onclick={removeLine}
			>
				<svg class="h-4 w-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
		</div>

		<div class="mt-auto flex items-center justify-between">
			<QuantitySelector bind:value={qty} min={1} max={99} />
			<span class="text-sm font-semibold">
				{formatPrice(line.cost.totalAmount.amount, line.cost.totalAmount.currencyCode)}
			</span>
		</div>
	</div>
</div>
