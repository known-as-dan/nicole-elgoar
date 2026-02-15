<script lang="ts">
	import type { Product } from '$lib/types/index.js';
	import ProductImage from './ProductImage.svelte';
	import ProductPrice from './ProductPrice.svelte';
	import ProductInventory from './ProductInventory.svelte';

	let { product, onclick }: { product: Product; onclick: () => void } = $props();

	let firstVariant = $derived(product.variants[0]);
	let totalInventory = $derived(
		product.variants.reduce((sum, v) => sum + v.quantityAvailable, 0)
	);
</script>

<article
	class="group cursor-pointer rounded-lg transition-shadow duration-300 hover:shadow-lg focus-within:shadow-lg relative hover:z-10"
	aria-label={product.title}
>
	<button
		class="w-full text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)] focus-visible:ring-offset-2 rounded-lg"
		onclick={onclick}
	>
		<ProductImage images={product.images} alt={product.title} />

		<div class="p-2 sm:p-3" style="background: var(--theme-card-bg, #1a1a1a)">
			<h3
				class="text-sm font-medium truncate"
				style="color: var(--theme-text, var(--color-text))"
			>
				{product.title}
			</h3>

			<div class="mt-1 flex items-center justify-between gap-2">
				<ProductPrice
					price={firstVariant?.price}
					compareAtPrice={firstVariant?.compareAtPrice}
				/>
				<ProductInventory quantity={totalInventory} />
			</div>
		</div>
	</button>
</article>
