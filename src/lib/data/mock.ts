import type { CollectionWithProducts, Product, ProductImage } from '$lib/types/index.js';

const UNSPLASH = (photoId: string) =>
	`https://images.unsplash.com/${photoId}?w=600&h=800&fit=crop&crop=center&auto=format&q=80`;

/** Per-product Unsplash image pairs [front, back] */
const productImages: Record<string, [string, string]> = {
	// ── Warm Blanket: Sets ──
	'cloud-pyjama-set': [
		'photo-1766056278948-dbb10f6d82bf', // Woman in light pink silk pajama set
		'photo-1759229874681-39fb36b01e32' // Woman in light purple pajamas relaxing on sofa
	],
	'moonlight-matching-set': [
		'photo-1616627547584-bf28cee262db', // Silk sleepwear on bed
		'photo-1618244972963-dbee1a7edc95' // Folded pyjama set
	],
	'starry-night-set': [
		'photo-1614940403997-46c1137edcbf', // Printed cotton pyjamas
		'photo-1617331140180-e8262094733a' // Pyjama set detail
	],
	'velvet-dream-set': [
		'photo-1563013544-824ae1b704d3', // Velour loungewear
		'photo-1596783074918-c84cb06531ca' // Velvet fabric detail
	],

	// ── Warm Blanket: Tops ──
	'midnight-slip-top': [
		'photo-1673823429135-c7b0d40cfe56', // Person wearing a white lace-trimmed top
		'photo-1593651790470-2c20d46e45a8' // Delicate floral textile close-up
	],
	'lullaby-sleep-tee': [
		'photo-1622470953794-aa9c70b0fb9d', // Woman in soft tee
		'photo-1583846783214-2ee4a0b0c64d' // Relaxed tee on bed
	],
	'twilight-tank': [
		'photo-1564257631407-4deb1f99d992', // Ribbed tank top
		'photo-1618354691373-d851c5c3a990' // Tank top detail
	],
	'hush-wrap-top': [
		'photo-1551488831-00ddcb6c6bd3', // Wrap top on model
		'photo-1596389562498-f512248f9759' // Silk wrap detail
	],

	// ── Warm Blanket: Bottoms ──
	'sleepy-head-shorts': [
		'photo-1631344511899-9b2e1bf8d62b', // Woman in white tank top and shorts near window
		'photo-1695509038649-e10cd23051cb' // Woman sitting on white couch in sleepwear
	],
	'starlight-sleep-pants': [
		'photo-1594938298603-c8148c4dae35', // Soft sleep pants
		'photo-1582142306909-195724d33ffc' // Cotton pants detail
	],
	'dreamer-leggings': [
		'photo-1506629082955-511b1aa562c8', // Leggings on model
		'photo-1552902865-b72c031ac5ea' // Legging fabric detail
	],
	'luna-lounge-shorts': [
		'photo-1590159983013-d4ff5fc71c1d', // Lounge shorts
		'photo-1571455786673-9d9d6c194f90' // Shorts detail
	],

	// ── Warm Blanket: Robes & Wraps ──
	'dream-wrap-robe': [
		'photo-1759221778524-69d10f928aed', // Woman in bathrobe holding champagne glass on bed
		'photo-1609535895148-cf9f5c446290' // Smiling woman in white bathrobe holding mug
	],
	'cashmere-cocoon-cardigan': [
		'photo-1591047139829-d91aecb6caea', // Oversized cardigan
		'photo-1583744946564-b52ac1c389c8' // Knit cardigan detail
	],
	'morning-mist-kimono': [
		'photo-1614251056798-0a63eda2bb25', // Chiffon kimono
		'photo-1617331721458-bd3bd3f9c7f8' // Kimono pattern detail
	],
	'featherlight-duster': [
		'photo-1525507119028-ed4c629a60a3', // Long duster on model
		'photo-1614676471928-2ed0ad1061a4' // Gauzy fabric detail
	],

	// ── Warm Blanket: Accessories ──
	'cloud-nine-socks': [
		'photo-1632944970234-7203dcdd3438', // Knitted socks on wooden table
		'photo-1730449322472-2b63d1107357' // Blue and white socks with pom poms
	],
	'silk-eye-mask': [
		'photo-1612817288484-6f916006741a', // Silk eye mask
		'photo-1579187707643-35646d22b596' // Eye mask on bedside
	],
	'lavender-sleep-scrunchie': [
		'photo-1598532163257-ae3c6b2524b6', // Silk scrunchies
		'photo-1597076545399-91a3ff0e71b3' // Scrunchie set
	],
	'bedside-slippers': [
		'photo-1603487742131-4160ec999306', // Plush slippers
		'photo-1595341888016-a392ef81b7de' // Slippers by bed
	],

	// ── Lazy: Hoodies & Sweatshirts ──
	'all-day-hoodie': [
		'photo-1578470507807-3fc541d5f544', // Woman in hoodie holding the hood
		'photo-1590583256569-1071aaab934e' // Woman in gray hoodie jacket
	],
	'couch-crew-sweatshirt': [
		'photo-1758225709308-189d0b98787b', // Man in cream crewneck sweatshirt
		'photo-1722926628555-252c1c0258bf' // Man wearing glasses and grey sweatshirt
	],
	'zip-up-chill-jacket': [
		'photo-1556821840-3a63f95609a7', // Zip-up jacket
		'photo-1620799140408-edc6dcb6d633' // Jacket detail
	],
	'oversized-pullover': [
		'photo-1614495039893-f3dbb5824834', // Oversized fleece pullover
		'photo-1578587018452-892bacefd3f2' // Boxy pullover on model
	],

	// ── Lazy: Tees & Tanks ──
	'nap-champion-tee': [
		'photo-1532202193792-e95ef22f1bce', // Man in black crew-neck tee on white stair
		'photo-1594638863998-a2426d4fdf57' // Man in gray crew neck t-shirt outdoors
	],
	'weekend-tank': [
		'photo-1503342217505-b0a15ec3261c', // Relaxed tank top
		'photo-1521572163474-6864f9cf17ab' // Tank top detail
	],
	'do-nothing-crop-tee': [
		'photo-1583743814966-8936f5b7be1a', // Cropped tee
		'photo-1562157873-818bc0726f68' // Crop top detail
	],
	'snooze-logo-tee': [
		'photo-1576566588028-4147f3842f27', // Logo tee
		'photo-1529374255404-311a2a4f1fd9' // Tee detail
	],

	// ── Lazy: Bottoms ──
	'sunday-sweats': [
		'photo-1588117260148-b47818741c74', // Woman in gray t-shirt and gray pants on bench
		'photo-1650461970708-7bf32499516d' // Woman in white top and blue pants
	],
	'drift-off-shorts': [
		'photo-1719473466836-ff9f5ebe0e1b', // Three pairs of shorts on white background
		'photo-1729719762110-6ad6e60f4dbd' // Woman wearing blue and white shorts
	],
	'marathon-lounge-pants': [
		'photo-1594938298603-c8148c4dae35', // Lounge pants
		'photo-1552902865-b72c031ac5ea' // Jersey pants detail
	],
	'easy-wide-legs': [
		'photo-1599062195929-e30f5c674eda', // Wide-leg pants
		'photo-1551854838-212c50b4c184' // Wide-leg detail
	],

	// ── Lazy: Accessories ──
	'lazy-beanie': [
		'photo-1664289321767-8442abbd5e26', // Knitted hat on a table
		'photo-1521160222242-ea015a06eba7' // Woman standing near road wearing beanie
	],
	'snooze-crew-socks': [
		'photo-1586350977771-b3b0abd50c82', // Crew socks
		'photo-1556306535-0f09a537f0a3' // Socks detail
	],
	'blanket-scarf': [
		'photo-1601924994987-69e26d50dc64', // Oversized scarf
		'photo-1509281373149-e957c6296406' // Scarf detail
	],
	'lounge-slides': [
		'photo-1603487742131-4160ec999306', // Cushioned slides
		'photo-1595341888016-a392ef81b7de' // Slides detail
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
		`https://placehold.co/600x800/e8e8e4/3d3d3d?text=${encodeURIComponent(label)}`;
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
	description: 'Wrap yourself in comfort. Cozy pyjamas and sleepwear for the dreamiest nights.',
	image: {
		url: '/collections/warm-blanket.png',
		altText: 'Warm Blanket collection',
		width: 900,
		height: 600
	},
	sections: ['Sets', 'Tops', 'Bottoms', 'Robes & Wraps', 'Accessories'],
	products: [
		// ── Sets ──
		makeProduct(
			'wb-001', 'cloud-pyjama-set', 'Cloud Pyjama Set', 'Sets',
			'Ultra-soft brushed cotton pyjama set with a relaxed fit. Features a button-front top and elastic-waist bottoms.',
			'65.00', null, ['XS', 'S', 'M', 'L', 'XL'], ['Blush Pink', 'Soft Cream'], 18
		),
		makeProduct(
			'wb-006', 'moonlight-matching-set', 'Moonlight Matching Set', 'Sets',
			'Satin-trimmed jersey set with a long-sleeve henley and tapered pants. Effortlessly elegant for bedtime.',
			'78.00', null, ['XS', 'S', 'M', 'L'], ['Midnight Blue', 'Silver Grey'], 16
		),
		makeProduct(
			'wb-007', 'starry-night-set', 'Starry Night Set', 'Sets',
			'Printed cotton voile set with a camp-collar top and drawstring shorts. Light as a summer evening.',
			'58.00', '72.00', ['XS', 'S', 'M', 'L'], ['Night Sky', 'Cream Star'], 22
		),
		makeProduct(
			'wb-008', 'velvet-dream-set', 'Velvet Dream Set', 'Sets',
			'Stretch velour lounge set with a cropped pullover and wide-leg pants. Feels like a hug you can wear.',
			'92.00', null, ['S', 'M', 'L', 'XL'], ['Dusty Plum', 'Warm Taupe'], 14
		),

		// ── Tops ──
		makeProduct(
			'wb-004', 'midnight-slip-top', 'Midnight Slip Top', 'Tops',
			'Silky camisole with delicate lace trim. Pairs beautifully with the Sleepy Head Shorts.',
			'42.00', null, ['XS', 'S', 'M', 'L'], ['Blush Pink', 'Ivory'], 20
		),
		makeProduct(
			'wb-009', 'lullaby-sleep-tee', 'Lullaby Sleep Tee', 'Tops',
			'Relaxed-fit tee in bamboo-cotton blend. Breathable, thermoregulating, and impossibly soft against the skin.',
			'38.00', null, ['XS', 'S', 'M', 'L', 'XL'], ['Lavender', 'Soft White'], 24
		),
		makeProduct(
			'wb-010', 'twilight-tank', 'Twilight Tank', 'Tops',
			'Ribbed modal tank with a scalloped hem. Lightweight enough to sleep in, pretty enough to lounge in.',
			'32.00', null, ['XS', 'S', 'M', 'L'], ['Rose Mist', 'Pearl'], 28
		),
		makeProduct(
			'wb-011', 'hush-wrap-top', 'Hush Wrap Top', 'Tops',
			'Cross-front wrap top in washed silk. Adjustable tie closure for a custom, flattering fit.',
			'55.00', null, ['S', 'M', 'L'], ['Blush Pink', 'Soft Cream'], 15
		),

		// ── Bottoms ──
		makeProduct(
			'wb-003', 'sleepy-head-shorts', 'Sleepy Head Shorts', 'Bottoms',
			'Lightweight sleep shorts in the softest modal blend. Perfect for warm nights or layering under the robe.',
			'35.00', null, ['XS', 'S', 'M', 'L'], ['Rose Mist', 'Pearl'], 25
		),
		makeProduct(
			'wb-012', 'starlight-sleep-pants', 'Starlight Sleep Pants', 'Bottoms',
			'Full-length sleep pants in brushed cotton with a paper-bag waist. Roomy enough for the deepest sleep.',
			'48.00', null, ['XS', 'S', 'M', 'L', 'XL'], ['Dusty Rose', 'Warm Taupe'], 20
		),
		makeProduct(
			'wb-013', 'dreamer-leggings', 'Dreamer Leggings', 'Bottoms',
			'Second-skin leggings in buttery modal-spandex. From bed to yoga mat without changing.',
			'45.00', '55.00', ['XS', 'S', 'M', 'L'], ['Blush Pink', 'Charcoal'], 22
		),
		makeProduct(
			'wb-014', 'luna-lounge-shorts', 'Luna Lounge Shorts', 'Bottoms',
			'High-waisted French terry shorts with a scalloped hem. A step up from your basic sleep shorts.',
			'38.00', null, ['XS', 'S', 'M', 'L'], ['Lavender', 'Ivory'], 26
		),

		// ── Robes & Wraps ──
		makeProduct(
			'wb-002', 'dream-wrap-robe', 'Dream Wrap Robe', 'Robes & Wraps',
			'Plush fleece robe with an oversized shawl collar and deep pockets. Your new favourite thing to never take off.',
			'89.00', '110.00', ['S/M', 'L/XL'], ['Dusty Rose', 'Warm Taupe'], 12
		),
		makeProduct(
			'wb-015', 'cashmere-cocoon-cardigan', 'Cashmere Cocoon Cardigan', 'Robes & Wraps',
			'Oversized open-front cardigan in cashmere-wool blend. Wraps around you like a wearable blanket.',
			'135.00', null, ['S/M', 'L/XL'], ['Oatmeal', 'Dusty Rose'], 10
		),
		makeProduct(
			'wb-016', 'morning-mist-kimono', 'Morning Mist Kimono', 'Robes & Wraps',
			'Lightweight chiffon kimono with watercolour-print panels. The most beautiful thing your mornings have ever seen.',
			'72.00', null, ['One Size'], ['Rose Watercolour', 'Blue Mist'], 18
		),
		makeProduct(
			'wb-017', 'featherlight-duster', 'Featherlight Duster', 'Robes & Wraps',
			'Ankle-length duster in gauzy cotton. Dramatic and dreamy — perfect over any sleepwear.',
			'68.00', null, ['S/M', 'L/XL'], ['Soft White', 'Blush Pink'], 14
		),

		// ── Accessories ──
		makeProduct(
			'wb-005', 'cloud-nine-socks', 'Cloud Nine Socks', 'Accessories',
			'Fuzzy crew socks with non-slip grips. The finishing touch for total cosiness.',
			'18.00', null, ['One Size'], ['Blush Pink', 'Dusty Rose', 'Warm Taupe'], 40
		),
		makeProduct(
			'wb-018', 'silk-eye-mask', 'Silk Eye Mask', 'Accessories',
			'Pure mulberry silk eye mask with an adjustable elastic band. Total darkness, zero pressure.',
			'28.00', null, ['One Size'], ['Blush Pink', 'Midnight Blue'], 35
		),
		makeProduct(
			'wb-019', 'lavender-sleep-scrunchie', 'Lavender Sleep Scrunchie', 'Accessories',
			'Silk scrunchie set infused with dried lavender. Gentle on your hair, calming for your mind. Pack of three.',
			'22.00', null, ['One Size'], ['Blush Pink', 'Lavender', 'Ivory'], 45
		),
		makeProduct(
			'wb-020', 'bedside-slippers', 'Bedside Slippers', 'Accessories',
			'Memory-foam slippers with a plush shearling lining. Your feet deserve this kind of welcome every morning.',
			'42.00', null, ['S (5-6)', 'M (7-8)', 'L (9-10)'], ['Dusty Rose', 'Warm Taupe'], 20
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
	description: 'Do less, feel more. Hoodies, sweats, and everything your couch deserves.',
	image: {
		url: '/collections/lazy.png',
		altText: 'Lazy collection',
		width: 900,
		height: 600
	},
	sections: ['Hoodies & Sweatshirts', 'Tees & Tanks', 'Bottoms', 'Accessories'],
	products: [
		// ── Hoodies & Sweatshirts ──
		makeProduct(
			'lz-001', 'all-day-hoodie', 'All Day Hoodie', 'Hoodies & Sweatshirts',
			'Heavyweight French terry hoodie with a relaxed drop shoulder. Kangaroo pocket fits your phone, snacks, and ambitions.',
			'78.00', null, ['XS', 'S', 'M', 'L', 'XL'], ['Sky Blue', 'Fog Grey'], 15
		),
		makeProduct(
			'lz-004', 'couch-crew-sweatshirt', 'Couch Crew Sweatshirt', 'Hoodies & Sweatshirts',
			'Classic crewneck sweatshirt with raglan sleeves. Midweight fleece that layers or stands alone.',
			'72.00', null, ['S', 'M', 'L', 'XL'], ['Slate Blue', 'Heather Grey'], 18
		),
		makeProduct(
			'lz-007', 'zip-up-chill-jacket', 'Zip-Up Chill Jacket', 'Hoodies & Sweatshirts',
			'Full-zip French terry jacket with a stand collar and side pockets. The layer you grab on your way to anywhere.',
			'82.00', null, ['XS', 'S', 'M', 'L', 'XL'], ['Fog Grey', 'Washed Navy'], 16
		),
		makeProduct(
			'lz-008', 'oversized-pullover', 'Oversized Pullover', 'Hoodies & Sweatshirts',
			'Boxy-fit fleece pullover with dropped shoulders and ribbed cuffs. Intentionally two sizes too big.',
			'75.00', '90.00', ['S', 'M', 'L', 'XL'], ['Stone', 'Sky Blue'], 14
		),

		// ── Tees & Tanks ──
		makeProduct(
			'lz-003', 'nap-champion-tee', 'Nap Champion Tee', 'Tees & Tanks',
			'Oversized tee in garment-dyed cotton. Pre-shrunk so it stays this perfect forever.',
			'45.00', '55.00', ['XS', 'S', 'M', 'L', 'XL'], ['Washed Blue', 'Cloud White'], 30
		),
		makeProduct(
			'lz-009', 'weekend-tank', 'Weekend Tank', 'Tees & Tanks',
			'Relaxed-fit tank in slub cotton with raw-edge armholes. The official uniform of having no plans.',
			'32.00', null, ['XS', 'S', 'M', 'L'], ['Cloud White', 'Fog Grey'], 28
		),
		makeProduct(
			'lz-010', 'do-nothing-crop-tee', 'Do Nothing Crop Tee', 'Tees & Tanks',
			'Cropped boxy tee in heavyweight cotton. Pairs perfectly with any high-waisted bottom in the collection.',
			'38.00', null, ['XS', 'S', 'M', 'L'], ['Washed Blue', 'Stone'], 25
		),
		makeProduct(
			'lz-011', 'snooze-logo-tee', 'Snooze Logo Tee', 'Tees & Tanks',
			'Classic-fit tee with a small embroidered snooze motif. Soft ring-spun cotton that gets better with every wash.',
			'42.00', null, ['XS', 'S', 'M', 'L', 'XL'], ['Sky Blue', 'Heather Grey', 'Cloud White'], 32
		),

		// ── Bottoms ──
		makeProduct(
			'lz-002', 'sunday-sweats', 'Sunday Sweats', 'Bottoms',
			'Tapered joggers in brushed fleece with a smooth outer. Elastic waist, ribbed cuffs, zero plans required.',
			'68.00', null, ['XS', 'S', 'M', 'L', 'XL'], ['Sky Blue', 'Fog Grey', 'Stone'], 22
		),
		makeProduct(
			'lz-005', 'drift-off-shorts', 'Drift Off Shorts', 'Bottoms',
			'French terry drawstring shorts with a 7-inch inseam. From the couch to the corner store and back.',
			'48.00', null, ['XS', 'S', 'M', 'L', 'XL'], ['Sky Blue', 'Stone'], 28
		),
		makeProduct(
			'lz-012', 'marathon-lounge-pants', 'Marathon Lounge Pants', 'Bottoms',
			'Straight-leg lounge pants in brushed jersey. Elastic waist with an internal drawcord for the perfect fit.',
			'58.00', null, ['XS', 'S', 'M', 'L', 'XL'], ['Fog Grey', 'Washed Navy'], 20
		),
		makeProduct(
			'lz-013', 'easy-wide-legs', 'Easy Wide Legs', 'Bottoms',
			'Wide-leg pants in washed French terry with a palazzo silhouette. Maximum comfort, maximum drama.',
			'62.00', null, ['XS', 'S', 'M', 'L'], ['Stone', 'Cloud White'], 18
		),

		// ── Accessories ──
		makeProduct(
			'lz-006', 'lazy-beanie', 'Lazy Beanie', 'Accessories',
			'Chunky rib-knit beanie in soft acrylic. One size fits most heads and all moods.',
			'25.00', null, ['One Size'], ['Sky Blue', 'Fog Grey', 'Stone'], 35
		),
		makeProduct(
			'lz-014', 'snooze-crew-socks', 'Snooze Crew Socks', 'Accessories',
			'Cushioned crew socks in combed cotton with a ribbed cuff. Three-pack in coordinating colours.',
			'24.00', null, ['One Size'], ['Sky Blue', 'Fog Grey', 'Stone'], 40
		),
		makeProduct(
			'lz-015', 'blanket-scarf', 'Blanket Scarf', 'Accessories',
			'Oversized brushed-wool scarf that doubles as a lap blanket. Big enough to share, soft enough to keep.',
			'55.00', null, ['One Size'], ['Heather Grey', 'Washed Navy'], 22
		),
		makeProduct(
			'lz-016', 'lounge-slides', 'Lounge Slides', 'Accessories',
			'Cushioned slides with a terry-cloth footbed. From the shower to the sofa in one easy step.',
			'35.00', null, ['S (5-6)', 'M (7-8)', 'L (9-10)', 'XL (11-12)'], ['Fog Grey', 'Stone'], 24
		)
	]
};

export const allCollections: CollectionWithProducts[] = [warmBlanketCollection, lazyCollection];
