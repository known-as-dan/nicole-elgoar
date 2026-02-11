import type { Product, ProductImage } from './product.js';

export interface CollectionSummary {
	id: string;
	handle: string;
	title: string;
	description: string;
	image: ProductImage | null;
}

export interface CollectionWithProducts extends CollectionSummary {
	products: Product[];
}
