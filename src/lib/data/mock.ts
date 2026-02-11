import type { CollectionWithProducts, Product } from '$lib/types/index.js';

const PLACEHOLDER_IMG = (w: number, h: number, label: string) =>
	`https://placehold.co/${w}x${h}/e8e8e4/3d3d3d?text=${encodeURIComponent(label)}`;

function makeProduct(
	id: string,
	handle: string,
	title: string,
	description: string,
	priceAmount: string,
	compareAtPriceAmount: string | null,
	sizes: string[],
	colors: string[],
	inventoryBase: number
): Product {
	const images = [
		{
			url: PLACEHOLDER_IMG(600, 800, `${title} Front`),
			altText: `${title} - front view`,
			width: 600,
			height: 800
		},
		{
			url: PLACEHOLDER_IMG(600, 800, `${title} Back`),
			altText: `${title} - back view`,
			width: 600,
			height: 800
		}
	];

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
	products: [
		makeProduct(
			'wb-001',
			'cloud-pyjama-set',
			'Cloud Pyjama Set',
			'Ultra-soft brushed cotton pyjama set with a relaxed fit. Features a button-front top and elastic-waist bottoms.',
			'65.00',
			null,
			['XS', 'S', 'M', 'L', 'XL'],
			['Blush Pink', 'Soft Cream'],
			18
		),
		makeProduct(
			'wb-002',
			'dream-wrap-robe',
			'Dream Wrap Robe',
			'Plush fleece robe with an oversized shawl collar and deep pockets. Your new favourite thing to never take off.',
			'89.00',
			'110.00',
			['S/M', 'L/XL'],
			['Dusty Rose', 'Warm Taupe'],
			12
		),
		makeProduct(
			'wb-003',
			'sleepy-head-shorts',
			'Sleepy Head Shorts',
			'Lightweight sleep shorts in the softest modal blend. Perfect for warm nights or layering under the robe.',
			'35.00',
			null,
			['XS', 'S', 'M', 'L'],
			['Rose Mist', 'Pearl'],
			25
		),
		makeProduct(
			'wb-004',
			'midnight-slip-top',
			'Midnight Slip Top',
			'Silky camisole with delicate lace trim. Pairs beautifully with the Sleepy Head Shorts.',
			'42.00',
			null,
			['XS', 'S', 'M', 'L'],
			['Blush Pink', 'Ivory'],
			20
		),
		makeProduct(
			'wb-005',
			'cloud-nine-socks',
			'Cloud Nine Socks',
			'Fuzzy crew socks with non-slip grips. The finishing touch for total cosiness.',
			'18.00',
			null,
			['One Size'],
			['Blush Pink', 'Dusty Rose', 'Warm Taupe'],
			40
		)
	]
};

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
	products: [
		makeProduct(
			'lz-001',
			'all-day-hoodie',
			'All Day Hoodie',
			'Heavyweight French terry hoodie with a relaxed drop shoulder. Kangaroo pocket fits your phone, snacks, and ambitions.',
			'78.00',
			null,
			['XS', 'S', 'M', 'L', 'XL'],
			['Sky Blue', 'Fog Grey'],
			15
		),
		makeProduct(
			'lz-002',
			'sunday-sweats',
			'Sunday Sweats',
			'Tapered joggers in brushed fleece with a smooth outer. Elastic waist, ribbed cuffs, zero plans required.',
			'68.00',
			null,
			['XS', 'S', 'M', 'L', 'XL'],
			['Sky Blue', 'Fog Grey', 'Stone'],
			22
		),
		makeProduct(
			'lz-003',
			'nap-champion-tee',
			'Nap Champion Tee',
			'Oversized tee in garment-dyed cotton. Pre-shrunk so it stays this perfect forever.',
			'45.00',
			'55.00',
			['XS', 'S', 'M', 'L', 'XL'],
			['Washed Blue', 'Cloud White'],
			30
		),
		makeProduct(
			'lz-004',
			'couch-crew-sweatshirt',
			'Couch Crew Sweatshirt',
			'Classic crewneck sweatshirt with raglan sleeves. Midweight fleece that layers or stands alone.',
			'72.00',
			null,
			['S', 'M', 'L', 'XL'],
			['Slate Blue', 'Heather Grey'],
			18
		),
		makeProduct(
			'lz-005',
			'drift-off-shorts',
			'Drift Off Shorts',
			'French terry drawstring shorts with a 7-inch inseam. From the couch to the corner store and back.',
			'48.00',
			null,
			['XS', 'S', 'M', 'L', 'XL'],
			['Sky Blue', 'Stone'],
			28
		),
		makeProduct(
			'lz-006',
			'lazy-beanie',
			'Lazy Beanie',
			'Chunky rib-knit beanie in soft acrylic. One size fits most heads and all moods.',
			'25.00',
			null,
			['One Size'],
			['Sky Blue', 'Fog Grey', 'Stone'],
			35
		)
	]
};

export const allCollections: CollectionWithProducts[] = [warmBlanketCollection, lazyCollection];
