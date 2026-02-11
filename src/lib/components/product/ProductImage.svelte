<script lang="ts">
	import type { ProductImage as ProductImageType } from '$lib/types/index.js';

	let { images, alt }: { images: ProductImageType[]; alt: string } = $props();

	let frontImage = $derived(images[0]);
	let backImage = $derived(images[1] ?? images[0]);
</script>

<div class="aspect-[3/4] overflow-hidden rounded-t-lg [perspective:1000px]">
	<div
		class="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)]"
	>
		<!-- Front face -->
		<div class="absolute inset-0 [backface-visibility:hidden]">
			{#if frontImage}
				<img
					src={frontImage.url}
					alt="{alt} - front view"
					width={frontImage.width}
					height={frontImage.height}
					loading="lazy"
					class="h-full w-full object-cover"
				/>
			{/if}
		</div>

		<!-- Back face -->
		<div class="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
			{#if backImage}
				<img
					src={backImage.url}
					alt="{alt} - back view"
					width={backImage.width}
					height={backImage.height}
					loading="lazy"
					class="h-full w-full object-cover"
				/>
			{/if}
		</div>
	</div>
</div>
