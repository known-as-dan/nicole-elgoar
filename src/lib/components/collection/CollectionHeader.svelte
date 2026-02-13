<script lang="ts">
	import type { CollectionSummary } from '$lib/types/index.js';

	let { collection }: { collection: CollectionSummary } = $props();
</script>

<div class="mb-8 page-header-enter">
	{#if collection.description}
		<p class="mt-2 text-base text-center opacity-70" style="color: var(--theme-text, var(--color-text))">
			{collection.description}
		</p>
	{/if}
</div>
