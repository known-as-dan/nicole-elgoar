export interface ProductImage {
	url: string;
	altText: string;
	width: number;
	height: number;
}

export interface Money {
	amount: string;
	currencyCode: string;
}

export interface SelectedOption {
	name: string;
	value: string;
}

export interface ProductVariant {
	id: string;
	title: string;
	price: Money;
	compareAtPrice: Money | null;
	availableForSale: boolean;
	quantityAvailable: number;
	image: ProductImage;
	selectedOptions: SelectedOption[];
}

export interface PriceRange {
	minVariantPrice: Money;
	maxVariantPrice: Money;
}

export interface Product {
	id: string;
	handle: string;
	title: string;
	productType: string;
	description: string;
	descriptionHtml: string;
	images: ProductImage[];
	variants: ProductVariant[];
	priceRange: PriceRange;
}
