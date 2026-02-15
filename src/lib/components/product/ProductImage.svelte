<script lang="ts">
	import type { ProductImage as ProductImageType } from '$lib/types/index.js';
	import * as m from '$lib/paraglide/messages';

	let { images, alt }: { images: ProductImageType[]; alt: string } = $props();

	let frontImage = $derived(images[0]);
	let backImage = $derived(images[1] ?? images[0]);
</script>

<div class="relative aspect-[3/4] overflow-hidden rounded-t-lg">
	{#if frontImage}
		<img
			src={frontImage.url}
			alt={m.product_image_front({ name: alt })}
			width={frontImage.width}
			height={frontImage.height}
			loading="lazy"
			class="absolute inset-0 h-full w-full object-contain transition-opacity duration-0 group-hover:opacity-0 group-focus-within:opacity-0"
		/>
	{/if}
	{#if backImage}
		<img
			src={backImage.url}
			alt={m.product_image_back({ name: alt })}
			width={backImage.width}
			height={backImage.height}
			loading="lazy"
			class="absolute inset-0 h-full w-full object-contain opacity-0 transition-opacity duration-0 group-hover:opacity-100 group-focus-within:opacity-100"
		/>
	{/if}
</div>
