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

	let isPulsing = $state(false);
	let isFadingOut = $state(false);
	let prevActive = false;

	$effect.pre(() => {
		if (prevActive && !isActive) {
			isFadingOut = true;
			setTimeout(() => {
				isFadingOut = false;
			}, 400);
		}
		prevActive = isActive;
	});

	function handleClick() {
		isPulsing = true;
		setTimeout(() => {
			isPulsing = false;
		}, 500);
		onclick?.();
	}
</script>

<a
	bind:this={el}
	{href}
	onclick={handleClick}
	aria-current={isActive ? 'page' : undefined}
	class={[
		'nav-tab group relative inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1.5 sm:px-4 sm:py-2 outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)] focus-visible:ring-offset-2',
		isActive ? 'font-semibold' : ''
	]}
	style="--tab-glow: {theme.accentColor}; color: {theme.textColor}"
>
	<!-- Glow -->
	<div
		class={[
			'nav-tab-glow pointer-events-none absolute -inset-0.5 rounded-full',
			isActive && !isPulsing ? 'nav-tab-glow-active' : '',
			isPulsing ? 'nav-tab-glow-pulse' : '',
			isFadingOut ? 'nav-tab-glow-fadeout' : ''
		]}
		aria-hidden="true"
	></div>

	{#if collection.image}
		<img src={collection.image.url} alt={collection.title} class="relative z-10 h-9 w-auto brightness-0 invert sm:h-14" />
	{:else}
		<span class="relative z-10 opacity-50" style="color: {theme.accentColor}" aria-hidden="true">
			{@html theme.decoration.left}
		</span>
		<span class="relative z-10 text-sm">{collection.title}</span>
		<span class="relative z-10 opacity-50" style="color: {theme.accentColor}" aria-hidden="true">
			{@html theme.decoration.right}
		</span>
	{/if}
</a>
