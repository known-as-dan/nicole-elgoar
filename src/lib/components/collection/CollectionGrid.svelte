<script lang="ts">
	import type { Product } from '$lib/types/index.js';
	import ProductCard from '$lib/components/product/ProductCard.svelte';

	let { products, onselect }: { products: Product[]; onselect: (product: Product) => void } =
		$props();
</script>

<ul class="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4" role="list">
	{#each products as product, i (product.id)}
		<li class="page-item-enter" style="--i: {i}" role="listitem">
			<ProductCard {product} onclick={() => onselect(product)} />
		</li>
	{/each}
</ul>
