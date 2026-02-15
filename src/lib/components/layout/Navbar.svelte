<script lang="ts">
	import type { CollectionSummary } from '$lib/types/index.js';
	import NavTab from './NavTab.svelte';
	import CartBadge from '$lib/components/cart/CartBadge.svelte';
	import LanguageSwitcher from './LanguageSwitcher.svelte';
	import * as m from '$lib/paraglide/messages';

	let { collections }: { collections: CollectionSummary[] } = $props();
</script>

<header class="relative z-30">
	<!-- Logo above the nav box -->
	<div class="flex justify-center">
		<a href="/" class="inline-block rounded-lg transition-all duration-200 hover:opacity-80 hover:scale-[1.03] active:scale-[0.97] outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)] focus-visible:ring-offset-2">
			<img src="/nicole_logo.png" alt={m.brand_name()} class="h-20 sm:h-28 lg:h-36" />
		</a>
	</div>

	<!-- Nav bar box -->
	<div class="navbar-wrap relative">
		<div class="navbar-faded-bg" aria-hidden="true"></div>

		<nav
			aria-label={m.nav_main()}
			class="navbar-grid relative z-10 items-center px-3 py-1.5 sm:px-6"
		>
			<!-- Language switcher — start side -->
			<div class="flex items-center justify-start">
				<LanguageSwitcher />
			</div>

			<!-- Collection tabs — centered, horizontal scroll on small screens -->
			<div class="flex items-center justify-center gap-2 overflow-x-auto py-5 -my-5 px-5 -mx-5 sm:gap-4 scrollbar-hide">
				{#each collections as collection (collection.handle)}
					<NavTab {collection} />
				{/each}
			</div>

			<!-- Cart — end side -->
			<div class="flex items-center justify-end">
				<CartBadge />
			</div>
		</nav>
	</div>
</header>

<style>
	.navbar-grid {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		gap: 0.5rem;
	}

	.navbar-wrap {
		position: relative;
	}

	.navbar-faded-bg {
		position: absolute;
		inset: 0;
		z-index: 0;
		border-radius: 1rem;
		background: rgba(255, 255, 255, 0.06);
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		mask-image: linear-gradient(
			to right,
			transparent 0%,
			black 6%,
			black 94%,
			transparent 100%
		);
		-webkit-mask-image: linear-gradient(
			to right,
			transparent 0%,
			black 6%,
			black 94%,
			transparent 100%
		);
	}

	/* Hide scrollbar but keep scroll functionality */
	.scrollbar-hide {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}
</style>
