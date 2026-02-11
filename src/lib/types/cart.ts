import type { Money, ProductImage, ProductVariant } from './product.js';

export interface CartLineMerchandise {
	id: string;
	title: string;
	product: {
		title: string;
		handle: string;
	};
	image: ProductImage;
	selectedOptions: ProductVariant['selectedOptions'];
}

export interface CartLine {
	id: string;
	quantity: number;
	merchandise: CartLineMerchandise;
	cost: {
		totalAmount: Money;
		amountPerQuantity: Money;
	};
}

export interface Cart {
	id: string;
	checkoutUrl: string;
	lines: CartLine[];
	cost: {
		subtotalAmount: Money;
		totalAmount: Money;
	};
	totalQuantity: number;
}
