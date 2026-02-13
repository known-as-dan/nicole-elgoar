import type { CollectionSummary, CollectionWithProducts } from '$lib/types/index.js';
import * as m from '$lib/paraglide/messages';
import { allCollections } from './mock.js';

const collectionDescriptions: Record<string, () => string> = {
	'warm-blanket': () => m.collection_desc_warm_blanket(),
	lazy: () => m.collection_desc_lazy()
};

const productDescriptions: Record<string, () => string> = {
	// Warm Blanket — Sets
	'cloud-pyjama-set': () => m.product_desc_cloud_pyjama_set(),
	'moonlight-matching-set': () => m.product_desc_moonlight_matching_set(),
	'starry-night-set': () => m.product_desc_starry_night_set(),
	'velvet-dream-set': () => m.product_desc_velvet_dream_set(),
	// Warm Blanket — Tops
	'midnight-slip-top': () => m.product_desc_midnight_slip_top(),
	'lullaby-sleep-tee': () => m.product_desc_lullaby_sleep_tee(),
	'twilight-tank': () => m.product_desc_twilight_tank(),
	'hush-wrap-top': () => m.product_desc_hush_wrap_top(),
	// Warm Blanket — Bottoms
	'sleepy-head-shorts': () => m.product_desc_sleepy_head_shorts(),
	'starlight-sleep-pants': () => m.product_desc_starlight_sleep_pants(),
	'dreamer-leggings': () => m.product_desc_dreamer_leggings(),
	'luna-lounge-shorts': () => m.product_desc_luna_lounge_shorts(),
	// Warm Blanket — Robes & Wraps
	'dream-wrap-robe': () => m.product_desc_dream_wrap_robe(),
	'cashmere-cocoon-cardigan': () => m.product_desc_cashmere_cocoon_cardigan(),
	'morning-mist-kimono': () => m.product_desc_morning_mist_kimono(),
	'featherlight-duster': () => m.product_desc_featherlight_duster(),
	// Warm Blanket — Accessories
	'cloud-nine-socks': () => m.product_desc_cloud_nine_socks(),
	'silk-eye-mask': () => m.product_desc_silk_eye_mask(),
	'lavender-sleep-scrunchie': () => m.product_desc_lavender_sleep_scrunchie(),
	'bedside-slippers': () => m.product_desc_bedside_slippers(),
	// Lazy — Hoodies & Sweatshirts
	'all-day-hoodie': () => m.product_desc_all_day_hoodie(),
	'couch-crew-sweatshirt': () => m.product_desc_couch_crew_sweatshirt(),
	'zip-up-chill-jacket': () => m.product_desc_zip_up_chill_jacket(),
	'oversized-pullover': () => m.product_desc_oversized_pullover(),
	// Lazy — Tees & Tanks
	'nap-champion-tee': () => m.product_desc_nap_champion_tee(),
	'weekend-tank': () => m.product_desc_weekend_tank(),
	'do-nothing-crop-tee': () => m.product_desc_do_nothing_crop_tee(),
	'snooze-logo-tee': () => m.product_desc_snooze_logo_tee(),
	// Lazy — Bottoms
	'sunday-sweats': () => m.product_desc_sunday_sweats(),
	'drift-off-shorts': () => m.product_desc_drift_off_shorts(),
	'marathon-lounge-pants': () => m.product_desc_marathon_lounge_pants(),
	'easy-wide-legs': () => m.product_desc_easy_wide_legs(),
	// Lazy — Accessories
	'lazy-beanie': () => m.product_desc_lazy_beanie(),
	'snooze-crew-socks': () => m.product_desc_snooze_crew_socks(),
	'blanket-scarf': () => m.product_desc_blanket_scarf(),
	'lounge-slides': () => m.product_desc_lounge_slides()
};

function localizeCollection(collection: CollectionWithProducts): CollectionWithProducts {
	const desc = collectionDescriptions[collection.handle]?.() ?? collection.description;
	return {
		...collection,
		description: desc,
		products: collection.products.map((p) => {
			const productDesc = productDescriptions[p.handle]?.() ?? p.description;
			return { ...p, description: productDesc, descriptionHtml: `<p>${productDesc}</p>` };
		})
	};
}

export function getAllCollections(): CollectionSummary[] {
	return allCollections.map(({ products: _, ...summary }) => {
		const desc = collectionDescriptions[summary.handle]?.() ?? summary.description;
		return { ...summary, description: desc };
	});
}

export function getCollection(handle: string): CollectionWithProducts | null {
	const collection = allCollections.find((c) => c.handle === handle);
	if (!collection) return null;
	return localizeCollection(collection);
}
