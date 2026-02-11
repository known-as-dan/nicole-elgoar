<script lang="ts">
	import CollectionHeader from '$lib/components/collection/CollectionHeader.svelte';
	import CollectionGrid from '$lib/components/collection/CollectionGrid.svelte';
	import ProductDetailModal from '$lib/components/product/ProductDetailModal.svelte';
	import type { Product } from '$lib/types/index.js';

	let { data } = $props();

	let selectedProduct = $state<Product | null>(null);

	function openProduct(product: Product) {
		selectedProduct = product;
	}

	function closeProduct() {
		selectedProduct = null;
	}
</script>

<svelte:head>
	<title>{data.collection.title} | Nicole Elgoar</title>
	<meta name="description" content={data.collection.description} />
</svelte:head>

{#key data.collection.handle}
	<CollectionHeader collection={data.collection} />
	<CollectionGrid products={data.collection.products} onselect={openProduct} />
{/key}

{#if selectedProduct}
	<ProductDetailModal product={selectedProduct} onclose={closeProduct} />
{/if}
