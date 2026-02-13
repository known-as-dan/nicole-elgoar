<script lang="ts">
	import type { CollectionSummary } from '$lib/types/index.js';

	let { collection }: { collection: CollectionSummary } = $props();
</script>

<div class="mb-8 page-header-enter">
	<h1>
		<span
			class="text-3xl font-semibold tracking-tight sm:text-4xl"
			style="font-family: var(--font-heading); color: var(--theme-text, var(--color-text))"
		>
			{collection.title}
		</span>
	</h1>
	{#if collection.description}
		<p class="mt-2 text-base opacity-70" style="color: var(--theme-text, var(--color-text))">
			{collection.description}
		</p>
	{/if}
</div>
