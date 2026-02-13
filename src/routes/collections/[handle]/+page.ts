import { error } from '@sveltejs/kit';
import { getCollection } from '$lib/data/index.js';
import * as m from '$lib/paraglide/messages';
import type { PageLoad } from './$types.js';

export const load: PageLoad = ({ params }) => {
	const collection = getCollection(params.handle);

	if (!collection) {
		error(404, { message: m.error_collection_not_found() });
	}

	return { collection };
};
