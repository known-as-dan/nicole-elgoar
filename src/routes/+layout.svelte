<script lang="ts">
	import { page } from '$app/state';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import PageShell from '$lib/components/layout/PageShell.svelte';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import SkipNav from '$lib/components/layout/SkipNav.svelte';
	import CartDrawer from '$lib/components/cart/CartDrawer.svelte';
	import LiveRegion from '$lib/components/ui/LiveRegion.svelte';
	import AccessibilityWidget from '$lib/components/a11y/AccessibilityWidget.svelte';
	import { setActiveCollection } from '$lib/stores/collection.svelte.js';
	import { setCart } from '$lib/stores/cart.svelte.js';
	import { setAccessibility } from '$lib/stores/accessibility.svelte.js';
	import { getLocale } from '$lib/paraglide/runtime';
	import { getTheme } from '$lib/theme/themes.js';


	const RTL_LOCALES = new Set(['he']);

	let { children, data } = $props();

	const collectionState = setActiveCollection();
	const cartState = setCart();
	const accessibility = setAccessibility();

	// Load cart from localStorage on mount
	$effect(() => {
		cartState.loadFromStorage();
	});

	// Sync <html> lang and dir with current locale (needed for static site)
	$effect(() => {
		const locale = getLocale();
		document.documentElement.lang = locale;
		document.documentElement.dir = RTL_LOCALES.has(locale) ? 'rtl' : 'ltr';
	});

	// Sync root background with active collection theme
	$effect(() => {
		const bg = collectionState.handle
			? getTheme(collectionState.handle).backgroundColor
			: '#FAFAF8';
		document.documentElement.style.setProperty('--color-bg', bg);
	});

	// Watch route params and update active collection
	$effect(() => {
		const handle = page.params?.handle;
		if (handle && handle !== collectionState.handle) {
			if (collectionState.handle === '') {
				// Initial load - set immediately without transition
				collectionState.handle = handle;
			} else {
				collectionState.transitionTo(handle, accessibility.reducedMotion);
			}
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<SkipNav />

<PageShell>
	<Navbar collections={data.collections} />

	<main id="main-content" tabindex="-1" class="flex-1 py-8">
		{@render children()}
	</main>

	<Footer />
</PageShell>

<CartDrawer />
<LiveRegion />
<AccessibilityWidget />
