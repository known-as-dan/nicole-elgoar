import { redirect } from '@sveltejs/kit';
import { getAllCollections } from '$lib/data/index.js';

export function load() {
	const collections = getAllCollections();
	if (collections.length > 0) {
		redirect(307, `/collections/${collections[0].handle}`);
	}
	return {};
}
