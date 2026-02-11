import type { CollectionSummary, CollectionWithProducts } from '$lib/types/index.js';
import { allCollections } from './mock.js';

export function getAllCollections(): CollectionSummary[] {
	return allCollections.map(({ products: _, ...summary }) => summary);
}

export function getCollection(handle: string): CollectionWithProducts | null {
	return allCollections.find((c) => c.handle === handle) ?? null;
}
