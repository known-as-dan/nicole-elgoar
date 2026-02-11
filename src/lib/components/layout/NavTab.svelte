<script lang="ts">
	import { page } from '$app/state';
	import type { CollectionSummary } from '$lib/types/index.js';
	import { getTheme } from '$lib/theme/themes.js';

	let {
		collection,
		onclick,
		el = $bindable<HTMLAnchorElement | undefined>(undefined)
	}: {
		collection: CollectionSummary;
		onclick?: () => void;
		el?: HTMLAnchorElement;
	} = $props();

	let theme = $derived(getTheme(collection.handle));
	let isActive = $derived(page.params?.handle === collection.handle);
	let href = $derived(`/collections/${collection.handle}`);
</script>

<a
	bind:this={el}
	{href}
	{onclick}
	aria-current={isActive ? 'page' : undefined}
	class={[
		'relative inline-flex items-center gap-1.5 rounded-full px-4 py-2 transition-colors duration-200',
		isActive ? 'font-semibold' : 'hover:bg-[var(--theme-accent)]/8'
	]}
	style="color: {theme.textColor}"
>
	{#if collection.image}
		<img
			src={collection.image.url}
			alt={collection.title}
			class="h-5 w-auto"
		/>
	{:else}
		<span class="text-[var(--theme-accent)] opacity-50" aria-hidden="true">
			{@html theme.decoration.left}
		</span>
		<span class="text-sm">{collection.title}</span>
		<span class="text-[var(--theme-accent)] opacity-50" aria-hidden="true">
			{@html theme.decoration.right}
		</span>
	{/if}
</a>
