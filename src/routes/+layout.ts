import { getAllCollections } from '$lib/data/index.js';

export const prerender = true;

export function load() {
	return {
		collections: getAllCollections()
	};
}
