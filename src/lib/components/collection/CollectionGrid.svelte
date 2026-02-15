<script lang="ts">
	import type { Product } from '$lib/types/index.js';
	import ProductCard from '$lib/components/product/ProductCard.svelte';
	import * as m from '$lib/paraglide/messages';

	let {
		products,
		sections,
		onselect
	}: {
		products: Product[];
		sections?: string[];
		onselect: (product: Product) => void;
	} = $props();

	const sectionLabels: Record<string, () => string> = {
		'Sets': () => m.section_sets(),
		'Tops': () => m.section_tops(),
		'Bottoms': () => m.section_bottoms(),
		'Layers': () => m.section_robes_wraps(),
		'Essentials': () => m.section_accessories(),
		'Hoods & Crews': () => m.section_hoodies_sweatshirts(),
		'Tees & Tanks': () => m.section_tees_tanks()
	};

	let groupedProducts = $derived.by(() => {
		if (!sections || sections.length === 0) {
			return [{ name: null, items: products }];
		}
		return sections
			.map((section) => ({
				name: section,
				items: products.filter((p) => p.productType === section)
			}))
			.filter((g) => g.items.length > 0);
	});

	function getSectionLabel(name: string): string {
		return sectionLabels[name]?.() ?? name;
	}
</script>

{#each groupedProducts as group, gi (group.name ?? 'all')}
	{#if group.name}
		<section class="mb-20" aria-labelledby="section-{gi}">
			<div class="mb-10 flex items-center gap-5">
				<div class="h-[2px] flex-1" style="background: linear-gradient(to right, transparent, var(--theme-accent, #ccc)); opacity: 0.4"></div>
				<div class="relative px-6 py-2">
					<div class="section-noise pointer-events-none absolute inset-0 rounded-sm" aria-hidden="true"></div>
					<h2
						id="section-{gi}"
						class="font-heading relative text-sm sm:text-base font-bold uppercase tracking-[0.3em] text-center whitespace-nowrap"
						style="color: var(--theme-text, var(--color-text))"
					>
						{getSectionLabel(group.name)}
					</h2>
				</div>
				<div class="h-[2px] flex-1" style="background: linear-gradient(to left, transparent, var(--theme-accent, #ccc)); opacity: 0.4"></div>
			</div>
			<ul class="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-4" role="list">
				{#each group.items as product, i (product.id)}
					<li class="page-item-enter" style="--i: {i}" role="listitem">
						<ProductCard {product} onclick={() => onselect(product)} />
					</li>
				{/each}
			</ul>
		</section>
	{:else}
		<ul class="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-4" role="list">
			{#each group.items as product, i (product.id)}
				<li class="page-item-enter" style="--i: {i}" role="listitem">
					<ProductCard {product} onclick={() => onselect(product)} />
				</li>
			{/each}
		</ul>
	{/if}
{/each}
