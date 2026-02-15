import type { CollectionWithProducts, Product, ProductImage } from '$lib/types/index.js';

const UNSPLASH = (photoId: string) =>
	`https://images.unsplash.com/${photoId}?w=600&h=800&fit=crop&crop=center&auto=format&q=80`;

/** Per-product Unsplash image pairs [front, back] */
const productImages: Record<string, [string, string]> = {
	// ── Warm Blanket: Sets ──
	'cloud-pyjama-set': [
		'photo-1769029253830-26488e15bfdb', // Dark intimate portrait, black sleepwear
		'photo-1769029257460-e10e0e1c6d55' // Woman in bed, dark moody atmosphere
	],
	'moonlight-matching-set': [
		'photo-1770294759013-a5784266a817', // Black silk loungewear, luxury dark interior
		'photo-1630512874316-88dcd1925237' // Dark lifestyle fashion photography
	],
	'starry-night-set': [
		'photo-1602585198422-d795fa9bfd6f', // Pajama set, muted tones
		'photo-1602298081095-fe890aae6edd' // Dark moody bedroom, solitary mood
	],
	'velvet-dream-set': [
		'photo-1698620625356-de23c09dfa20', // Woman in dark dress against wall
		'photo-1644356059384-998c0df9cde7' // Woman in dark velvet on leather couch
	],

	// ── Warm Blanket: Tops ──
	'midnight-slip-top': [
		'photo-1770254082172-a8acfc2bd158', // Dark intimate fashion, chair
		'photo-1738861905385-ccc38a8d34ac' // B&W moody portrait on couch
	],
	'lullaby-sleep-tee': [
		'photo-1763630052854-6e9991eeee21', // Woman in black top, dark hair
		'photo-1605815171279-3d3a595af3de' // Dark moody light portrait
	],
	'twilight-tank': [
		'photo-1738247999648-c251148e4dea', // Woman in dark room, crossed arms
		'photo-1736462832668-551150b5e5b2' // Woman in black, crossed arms
	],
	'hush-wrap-top': [
		'photo-1551374332-2c48196ae690', // Fashion photowalk, editorial
		'photo-1676591202064-9fa1e23122f2' // Dark moody fashion portrait
	],

	// ── Warm Blanket: Bottoms ──
	'sleepy-head-shorts': [
		'photo-1719473442915-016f3ebda79a', // Dark shorts flat lay
		'photo-1727821031014-30e131f65122' // Woman in dark jacket and shorts
	],
	'starlight-sleep-pants': [
		'photo-1608979223338-bb4c889fbd52', // Person in black pants, standing
		'photo-1696332222627-45d99fc2d84e' // Person standing near window, moody
	],
	'dreamer-leggings': [
		'photo-1610973656366-8220bcb962de', // Woman in black jacket and dark pants
		'photo-1680350024349-293ae872d5b4' // Dark fashion editorial, steps
	],
	'luna-lounge-shorts': [
		'photo-1763890498950-f846218125ce', // Legs in moody light
		'photo-1537805530001-047815a47122' // Relaxed sitting pose, dark tones
	],

	// ── Warm Blanket: Layers ──
	'dream-wrap-robe': [
		'photo-1672956599928-559f0da00731', // Dark moody portrait in flowing dress
		'photo-1678923832966-51063377804a' // Woman in dark coat against wall
	],
	'cashmere-cocoon-cardigan': [
		'photo-1676591202069-35d34b10ff88', // Dark fashion portrait, layered
		'photo-1754639347079-d8d8aa8c99f6' // Woman in dark attire, editorial
	],
	'morning-mist-kimono': [
		'photo-1606229995428-851476a55b2c', // Woman in kimono, moody tones
		'photo-1606229995482-8b86184e6db7' // Kimono near dark wooden door
	],
	'featherlight-duster': [
		'photo-1763766276494-47ef4a546723', // Woman in long coat leaning on column
		'photo-1740205870343-4e0004a68b11' // Woman in long black coat walking
	],

	// ── Warm Blanket: Essentials ──
	'cloud-nine-socks': [
		'photo-1598818432520-f57c636e9301', // Dark denim and black socks
		'photo-1662308074084-8e2d73c353e6' // Dark socks close-up
	],
	'silk-eye-mask': [
		'photo-1724841590607-dff163255ed5', // Woman with dark blindfold
		'photo-1746820254815-491ccd4abc9b' // Portrait with dramatic shadow
	],
	'lavender-sleep-scrunchie': [
		'photo-1598532163257-ae3c6b2524b6', // Silk scrunchies, muted tones
		'photo-1597076545399-91a3ff0e71b3' // Scrunchie set detail
	],
	'bedside-slippers': [
		'photo-1650307535558-fa2b39ed16eb', // Dark slippers on feet
		'photo-1578592308690-945b7cbb40a0' // Black-and-gray slide sandals
	],

	// ── Lazy: Hoods & Crews ──
	'all-day-hoodie': [
		'photo-1752674316405-549b77559eb3', // Hooded figure at crosswalk, moody bokeh
		'photo-1544450804-9e5f64cb18de' // Man in grey hoodie, dark background
	],
	'couch-crew-sweatshirt': [
		'photo-1661110546801-cfe548af5705', // Person in dark sweater
		'photo-1722926628555-252c1c0258bf' // Man in gray crew neck, glasses
	],
	'zip-up-chill-jacket': [
		'photo-1588011025378-15f4778d2558', // Dark fashion portrait
		'photo-1648976308757-9e55e3e66f4c' // Dark urban fashion editorial
	],
	'oversized-pullover': [
		'photo-1697920941403-710063a21376', // Woman in dark oversized jacket
		'photo-1636967651001-ea3d6f16d8c4' // Dark lifestyle fashion photography
	],

	// ── Lazy: Tees & Tanks ──
	'nap-champion-tee': [
		'photo-1618743842687-76d2c38b1b17', // Man in black crew neck tee, sunglasses
		'photo-1714249090984-cbc595b0f3b8' // Man against black wall, hat
	],
	'weekend-tank': [
		'photo-1625027663037-96e4560e97fa', // Woman in dark leather vest, sunglasses
		'photo-1613002143253-8587d9ad2004' // Dark portrait editorial
	],
	'do-nothing-crop-tee': [
		'photo-1736894630069-fdf8f75d86ad', // Woman in dark outfit, leaning on wall
		'photo-1769636929761-266ec4aecca3' // Young woman in black t-shirt
	],
	'snooze-logo-tee': [
		'photo-1631479501467-a46d06c900fc', // Man in front of wall, minimal
		'photo-1584803884604-e054965517f7' // Man in dark sweater, editorial
	],

	// ── Lazy: Bottoms ──
	'sunday-sweats': [
		'photo-1605345343795-dcbf1501ef56', // Man in dark jacket, black pants
		'photo-1620938289449-98879e017b06' // Man in dark sweater on sidewalk
	],
	'drift-off-shorts': [
		'photo-1564925211110-1e22668653b3', // Dark street fashion, storefront
		'photo-1597253702951-6b83f54bcb37' // Urban street style, dark tones
	],
	'marathon-lounge-pants': [
		'photo-1644483878398-b57d19f84ff8', // Man in black shirt and pants
		'photo-1666932521223-fd36c5821dcd' // Person in dark suit
	],
	'easy-wide-legs': [
		'photo-1587425206783-d51b608ea87e', // Black shoes on dark railing
		'photo-1655755933366-4fa97ec5e307' // Dark legs with shoes, moody
	],

	// ── Lazy: Essentials ──
	'lazy-beanie': [
		'photo-1664189026726-2b91b97420d3', // Dark knitted hat on table
		'photo-1521160222242-ea015a06eba7' // Woman in beanie, moody street
	],
	'snooze-crew-socks': [
		'photo-1580625284004-0933fa644a11', // Socks and shoes at skatepark
		'photo-1640348307421-83b15b62a73d' // Striped socks, dark setting
	],
	'blanket-scarf': [
		'photo-1609803384069-19f3e5a70e75', // Scarf on black background
		'photo-1644483518975-1a74bff3ab94' // Dark fabric texture close-up
	],
	'lounge-slides': [
		'photo-1662308076137-55d1e7aa6a2f', // Dark shoes, minimal
		'photo-1600563997333-23ccceb36bc6' // Dark footwear, urban
	]
};

function getProductImages(handle: string, title: string): [ProductImage, ProductImage] {
	const pair = productImages[handle];
	if (pair) {
		return [
			{ url: UNSPLASH(pair[0]), altText: `${title} - front view`, width: 600, height: 800 },
			{ url: UNSPLASH(pair[1]), altText: `${title} - back view`, width: 600, height: 800 }
		];
	}
	// Fallback to placeholder
	const placeholder = (label: string) =>
		`https://placehold.co/600x800/111111/f0f0f0?text=${encodeURIComponent(label)}`;
	return [
		{ url: placeholder(`${title} Front`), altText: `${title} - front view`, width: 600, height: 800 },
		{ url: placeholder(`${title} Back`), altText: `${title} - back view`, width: 600, height: 800 }
	];
}

function makeProduct(
	id: string,
	handle: string,
	title: string,
	productType: string,
	description: string,
	priceAmount: string,
	compareAtPriceAmount: string | null,
	sizes: string[],
	colors: string[],
	inventoryBase: number
): Product {
	const images = getProductImages(handle, title);

	const variants = sizes.flatMap((size, si) =>
		colors.map((color, ci) => ({
			id: `${id}-${size.toLowerCase()}-${color.toLowerCase().replace(/\s/g, '-')}`,
			title: `${size} / ${color}`,
			price: { amount: priceAmount, currencyCode: 'USD' },
			compareAtPrice: compareAtPriceAmount
				? { amount: compareAtPriceAmount, currencyCode: 'USD' }
				: null,
			availableForSale: inventoryBase - si * 3 - ci > 0,
			quantityAvailable: Math.max(0, inventoryBase - si * 3 - ci),
			image: images[0],
			selectedOptions: [
				{ name: 'Size', value: size },
				{ name: 'Color', value: color }
			]
		}))
	);

	return {
		id,
		handle,
		title,
		productType,
		description,
		descriptionHtml: `<p>${description}</p>`,
		images,
		variants,
		priceRange: {
			minVariantPrice: { amount: priceAmount, currencyCode: 'USD' },
			maxVariantPrice: { amount: priceAmount, currencyCode: 'USD' }
		}
	};
}

// ─────────────────────────────────────────────
// Warm Blanket Collection
// ─────────────────────────────────────────────

export const warmBlanketCollection: CollectionWithProducts = {
	id: 'collection-warm-blanket',
	handle: 'warm-blanket',
	title: 'Warm Blanket',
	description: 'After-dark essentials. Sleepwear that doesn\'t compromise on edge.',
	image: {
		url: '/collections/warm-blanket.png',
		altText: 'Warm Blanket collection',
		width: 900,
		height: 600
	},
	sections: ['Sets', 'Tops', 'Bottoms', 'Layers', 'Essentials'],
	products: [
		// ── Sets ──
		makeProduct(
			'wb-001', 'cloud-pyjama-set', 'Cloud Pyjama Set', 'Sets',
			'Brushed cotton set, relaxed cut. Button-front top, elastic-waist bottoms. Soft but not soft.',
			'65.00', null, ['XS', 'S', 'M', 'L', 'XL'], ['Washed Black', 'Bone'], 18
		),
		makeProduct(
			'wb-006', 'moonlight-matching-set', 'Moonlight Matching Set', 'Sets',
			'Satin-trimmed jersey set. Long-sleeve henley, tapered pants. Low-key elegance.',
			'78.00', null, ['XS', 'S', 'M', 'L'], ['Midnight', 'Gunmetal'], 16
		),
		makeProduct(
			'wb-007', 'starry-night-set', 'Starry Night Set', 'Sets',
			'Printed cotton voile. Camp-collar top, drawstring shorts. Light as a late-night breeze.',
			'58.00', '72.00', ['XS', 'S', 'M', 'L'], ['Night Sky', 'Ash'], 22
		),
		makeProduct(
			'wb-008', 'velvet-dream-set', 'Velvet Dream Set', 'Sets',
			'Stretch velour — cropped pullover, wide-leg pants. Heavy drape, minimal effort.',
			'92.00', null, ['S', 'M', 'L', 'XL'], ['Dark Plum', 'Charcoal'], 14
		),

		// ── Tops ──
		makeProduct(
			'wb-004', 'midnight-slip-top', 'Midnight Slip Top', 'Tops',
			'Silk cami with lace detailing. Clean lines, quiet luxury.',
			'42.00', null, ['XS', 'S', 'M', 'L'], ['Washed Black', 'Bone'], 20
		),
		makeProduct(
			'wb-009', 'lullaby-sleep-tee', 'Lullaby Sleep Tee', 'Tops',
			'Bamboo-cotton blend. Breathable, thermoregulating. Hits different against bare skin.',
			'38.00', null, ['XS', 'S', 'M', 'L', 'XL'], ['Slate', 'Off White'], 24
		),
		makeProduct(
			'wb-010', 'twilight-tank', 'Twilight Tank', 'Tops',
			'Ribbed modal tank, scalloped hem. Minimal construction, maximum range.',
			'32.00', null, ['XS', 'S', 'M', 'L'], ['Smoke', 'Bone'], 28
		),
		makeProduct(
			'wb-011', 'hush-wrap-top', 'Hush Wrap Top', 'Tops',
			'Washed silk wrap top. Adjustable tie closure. Fits how you want it to.',
			'55.00', null, ['S', 'M', 'L'], ['Washed Black', 'Bone'], 15
		),

		// ── Bottoms ──
		makeProduct(
			'wb-003', 'sleepy-head-shorts', 'Sleepy Head Shorts', 'Bottoms',
			'Modal-blend sleep shorts. Lightweight, breathable. Layer them or wear them solo.',
			'35.00', null, ['XS', 'S', 'M', 'L'], ['Smoke', 'Bone'], 25
		),
		makeProduct(
			'wb-012', 'starlight-sleep-pants', 'Starlight Sleep Pants', 'Bottoms',
			'Full-length brushed cotton. Paper-bag waist, relaxed through the leg. Built for deep rest.',
			'48.00', null, ['XS', 'S', 'M', 'L', 'XL'], ['Washed Black', 'Charcoal'], 20
		),
		makeProduct(
			'wb-013', 'dreamer-leggings', 'Dreamer Leggings', 'Bottoms',
			'Modal-spandex second skin. Bed to mat without a wardrobe change.',
			'45.00', '55.00', ['XS', 'S', 'M', 'L'], ['Black', 'Charcoal'], 22
		),
		makeProduct(
			'wb-014', 'luna-lounge-shorts', 'Luna Lounge Shorts', 'Bottoms',
			'High-waisted French terry, scalloped hem. A cut above the basics.',
			'38.00', null, ['XS', 'S', 'M', 'L'], ['Slate', 'Bone'], 26
		),

		// ── Layers ──
		makeProduct(
			'wb-002', 'dream-wrap-robe', 'Dream Wrap Robe', 'Layers',
			'Heavy fleece robe, oversized shawl collar, deep pockets. Throw it on and don\'t look back.',
			'89.00', '110.00', ['S/M', 'L/XL'], ['Washed Black', 'Charcoal'], 12
		),
		makeProduct(
			'wb-015', 'cashmere-cocoon-cardigan', 'Cashmere Cocoon Cardigan', 'Layers',
			'Oversized cashmere-wool blend, open front. Wraps like a blanket, wears like a statement.',
			'135.00', null, ['S/M', 'L/XL'], ['Oatmeal', 'Washed Black'], 10
		),
		makeProduct(
			'wb-016', 'morning-mist-kimono', 'Morning Mist Kimono', 'Layers',
			'Lightweight chiffon kimono. Watercolour panels. The kind of piece that starts conversations.',
			'72.00', null, ['One Size'], ['Ink Wash', 'Storm Grey'], 18
		),
		makeProduct(
			'wb-017', 'featherlight-duster', 'Featherlight Duster', 'Layers',
			'Ankle-length gauzy cotton. Dramatic silhouette, zero weight. Layers over everything.',
			'68.00', null, ['S/M', 'L/XL'], ['Off White', 'Washed Black'], 14
		),

		// ── Essentials ──
		makeProduct(
			'wb-005', 'cloud-nine-socks', 'Cloud Nine Socks', 'Essentials',
			'Crew socks with non-slip grip. Heavyweight knit, built for all-night comfort.',
			'18.00', null, ['One Size'], ['Washed Black', 'Smoke', 'Charcoal'], 40
		),
		makeProduct(
			'wb-018', 'silk-eye-mask', 'Silk Eye Mask', 'Essentials',
			'Mulberry silk, adjustable band. Total blackout, zero pressure points.',
			'28.00', null, ['One Size'], ['Black', 'Midnight'], 35
		),
		makeProduct(
			'wb-019', 'lavender-sleep-scrunchie', 'Lavender Sleep Scrunchie', 'Essentials',
			'Silk scrunchies with dried lavender. Gentle hold, calming scent. Pack of three.',
			'22.00', null, ['One Size'], ['Black', 'Slate', 'Bone'], 45
		),
		makeProduct(
			'wb-020', 'bedside-slippers', 'Bedside Slippers', 'Essentials',
			'Memory-foam base, shearling-lined. The first thing your feet deserve every morning.',
			'42.00', null, ['S (5-6)', 'M (7-8)', 'L (9-10)'], ['Washed Black', 'Charcoal'], 20
		)
	]
};

// ─────────────────────────────────────────────
// Lazy Collection
// ─────────────────────────────────────────────

export const lazyCollection: CollectionWithProducts = {
	id: 'collection-lazy',
	handle: 'lazy',
	title: 'Lazy',
	description: 'Off-duty uniform. Heavyweight layers built for doing nothing — and looking good at it.',
	image: {
		url: '/collections/lazy.png',
		altText: 'Lazy collection',
		width: 900,
		height: 600
	},
	sections: ['Hoods & Crews', 'Tees & Tanks', 'Bottoms', 'Essentials'],
	products: [
		// ── Hoods & Crews ──
		makeProduct(
			'lz-001', 'all-day-hoodie', 'All Day Hoodie', 'Hoods & Crews',
			'Heavyweight French terry, dropped shoulders. Kangaroo pocket holds everything you need.',
			'78.00', null, ['XS', 'S', 'M', 'L', 'XL'], ['Concrete', 'Washed Black'], 15
		),
		makeProduct(
			'lz-004', 'couch-crew-sweatshirt', 'Couch Crew Sweatshirt', 'Hoods & Crews',
			'Classic crewneck, raglan sleeves. Midweight fleece — layers or stands alone.',
			'72.00', null, ['S', 'M', 'L', 'XL'], ['Steel Blue', 'Heather Grey'], 18
		),
		makeProduct(
			'lz-007', 'zip-up-chill-jacket', 'Zip-Up Chill Jacket', 'Hoods & Crews',
			'Full-zip French terry, stand collar, side pockets. The grab-and-go layer.',
			'82.00', null, ['XS', 'S', 'M', 'L', 'XL'], ['Concrete', 'Washed Navy'], 16
		),
		makeProduct(
			'lz-008', 'oversized-pullover', 'Oversized Pullover', 'Hoods & Crews',
			'Boxy fleece, dropped shoulders, ribbed cuffs. Intentionally two sizes up.',
			'75.00', '90.00', ['S', 'M', 'L', 'XL'], ['Stone', 'Concrete'], 14
		),

		// ── Tees & Tanks ──
		makeProduct(
			'lz-003', 'nap-champion-tee', 'Nap Champion Tee', 'Tees & Tanks',
			'Oversized garment-dyed tee. Pre-shrunk cotton that holds its shape.',
			'45.00', '55.00', ['XS', 'S', 'M', 'L', 'XL'], ['Washed Blue', 'Off White'], 30
		),
		makeProduct(
			'lz-009', 'weekend-tank', 'Weekend Tank', 'Tees & Tanks',
			'Slub cotton, raw-edge armholes. The official uniform of zero obligations.',
			'32.00', null, ['XS', 'S', 'M', 'L'], ['Off White', 'Concrete'], 28
		),
		makeProduct(
			'lz-010', 'do-nothing-crop-tee', 'Do Nothing Crop Tee', 'Tees & Tanks',
			'Cropped boxy heavyweight cotton. Pairs with every high-waisted bottom in the drop.',
			'38.00', null, ['XS', 'S', 'M', 'L'], ['Washed Blue', 'Stone'], 25
		),
		makeProduct(
			'lz-011', 'snooze-logo-tee', 'Snooze Logo Tee', 'Tees & Tanks',
			'Classic fit, embroidered logo detail. Ring-spun cotton that breaks in, not down.',
			'42.00', null, ['XS', 'S', 'M', 'L', 'XL'], ['Concrete', 'Heather Grey', 'Off White'], 32
		),

		// ── Bottoms ──
		makeProduct(
			'lz-002', 'sunday-sweats', 'Sunday Sweats', 'Bottoms',
			'Tapered joggers, brushed fleece inside, smooth outside. Elastic waist, ribbed cuffs. No plans necessary.',
			'68.00', null, ['XS', 'S', 'M', 'L', 'XL'], ['Concrete', 'Washed Black', 'Stone'], 22
		),
		makeProduct(
			'lz-005', 'drift-off-shorts', 'Drift Off Shorts', 'Bottoms',
			'French terry shorts, 7-inch inseam, drawstring waist. Street to couch and back.',
			'48.00', null, ['XS', 'S', 'M', 'L', 'XL'], ['Concrete', 'Stone'], 28
		),
		makeProduct(
			'lz-012', 'marathon-lounge-pants', 'Marathon Lounge Pants', 'Bottoms',
			'Straight-leg brushed jersey. Internal drawcord, elastic waist. Built for the long haul.',
			'58.00', null, ['XS', 'S', 'M', 'L', 'XL'], ['Concrete', 'Washed Navy'], 20
		),
		makeProduct(
			'lz-013', 'easy-wide-legs', 'Easy Wide Legs', 'Bottoms',
			'Washed French terry, palazzo cut. Maximum drape, maximum comfort.',
			'62.00', null, ['XS', 'S', 'M', 'L'], ['Stone', 'Off White'], 18
		),

		// ── Essentials ──
		makeProduct(
			'lz-006', 'lazy-beanie', 'Lazy Beanie', 'Essentials',
			'Chunky rib-knit acrylic. One size, every mood.',
			'25.00', null, ['One Size'], ['Concrete', 'Washed Black', 'Stone'], 35
		),
		makeProduct(
			'lz-014', 'snooze-crew-socks', 'Snooze Crew Socks', 'Essentials',
			'Cushioned crew socks, combed cotton, ribbed cuff. Three-pack in tonal colourways.',
			'24.00', null, ['One Size'], ['Concrete', 'Washed Black', 'Stone'], 40
		),
		makeProduct(
			'lz-015', 'blanket-scarf', 'Blanket Scarf', 'Essentials',
			'Oversized brushed wool. Doubles as a throw. Big enough to share, too good to.',
			'55.00', null, ['One Size'], ['Heather Grey', 'Washed Navy'], 22
		),
		makeProduct(
			'lz-016', 'lounge-slides', 'Lounge Slides', 'Essentials',
			'Cushioned terry-cloth footbed. Shower to sofa in one step.',
			'35.00', null, ['S (5-6)', 'M (7-8)', 'L (9-10)', 'XL (11-12)'], ['Concrete', 'Stone'], 24
		)
	]
};

export const allCollections: CollectionWithProducts[] = [warmBlanketCollection, lazyCollection];
