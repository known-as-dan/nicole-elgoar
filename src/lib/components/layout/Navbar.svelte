<script lang="ts">
	import { page } from '$app/state';
	import type { CollectionSummary } from '$lib/types/index.js';
	import NavTab from './NavTab.svelte';
	import CartBadge from '$lib/components/cart/CartBadge.svelte';
	import LanguageSwitcher from './LanguageSwitcher.svelte';
	import * as m from '$lib/paraglide/messages';

	let { collections }: { collections: CollectionSummary[] } = $props();

	let mobileOpen = $state(false);
	let tabsContainer: HTMLDivElement | undefined = $state();
	let tabEls: (HTMLAnchorElement | undefined)[] = $state([]);
	let indicatorEl: HTMLDivElement | undefined = $state();

	function updateIndicator() {
		if (!tabsContainer || !indicatorEl) return;
		const activeHandle = page.params?.handle;
		const activeIndex = collections.findIndex((c) => c.handle === activeHandle);
		const activeEl = tabEls[activeIndex];
		if (!activeEl) {
			indicatorEl.style.opacity = '0';
			return;
		}
		const containerRect = tabsContainer.getBoundingClientRect();
		const tabRect = activeEl.getBoundingClientRect();
		indicatorEl.style.opacity = '1';
		indicatorEl.style.left = `${tabRect.left - containerRect.left}px`;
		indicatorEl.style.top = `${tabRect.top - containerRect.top}px`;
		indicatorEl.style.width = `${tabRect.width}px`;
		indicatorEl.style.height = `${tabRect.height}px`;
	}

	$effect(() => {
		void page.params?.handle;
		void tabEls.length;
		requestAnimationFrame(updateIndicator);
	});
</script>

<svelte:window onresize={updateIndicator} />

<header class="relative z-30 mb-4">
	<nav aria-label={m.nav_main()} class="flex items-center justify-between gap-4 py-4">
		<a href="/">
			<img src="/ne_logo.png" alt={m.brand_name()} class="h-36" />
		</a>

		<!-- Desktop tabs -->
		<div class="relative hidden items-center gap-1 sm:flex" bind:this={tabsContainer}>
			<!-- Sliding glow + pill indicator -->
			<div
				bind:this={indicatorEl}
				class="pointer-events-none absolute opacity-0 transition-all duration-300 ease-out"
				aria-hidden="true"
			>
				<div class="nav-glow absolute inset-0 rounded-full bg-[var(--theme-accent)]/20 blur-md"></div>
				<div class="absolute inset-0 rounded-full bg-[var(--theme-accent)]/12"></div>
			</div>

			{#each collections as collection, i (collection.handle)}
				<NavTab {collection} bind:el={tabEls[i]} />
			{/each}
		</div>

		<div class="flex items-center gap-2">
			<LanguageSwitcher />
			<CartBadge />

			<!-- Mobile menu button -->
			<button
				class="rounded-md p-2 sm:hidden focus-visible:ring-2 focus-visible:ring-offset-2"
				aria-label={mobileOpen ? m.nav_close_menu() : m.nav_open_menu()}
				aria-expanded={mobileOpen}
				onclick={() => (mobileOpen = !mobileOpen)}
			>
				<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					{#if mobileOpen}
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					{:else}
						<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
					{/if}
				</svg>
			</button>
		</div>
	</nav>

	<!-- Mobile nav -->
	{#if mobileOpen}
		<div class="flex flex-col gap-1 pb-4 sm:hidden">
			{#each collections as collection (collection.handle)}
				<NavTab {collection} onclick={() => (mobileOpen = false)} />
			{/each}
		</div>
	{/if}
</header>
