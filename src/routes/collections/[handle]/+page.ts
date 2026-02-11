import { error } from '@sveltejs/kit';
import { getCollection } from '$lib/data/index.js';
import type { PageLoad } from './$types.js';

export const load: PageLoad = ({ params }) => {
	const collection = getCollection(params.handle);

	if (!collection) {
		error(404, { message: 'Collection not found' });
	}

	return { collection };
};
