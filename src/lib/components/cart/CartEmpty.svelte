<script lang="ts">
	import { getCart } from '$lib/stores/cart.svelte.js';
	import * as m from '$lib/paraglide/messages';

	const cart = getCart();
</script>

<div class="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-12">
	<svg class="h-16 w-16 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
		<path d="M14 6a2 2 0 1 0 -4 0c0 1.667 .67 3 2 4h-.008l7.971 4.428a2 2 0 0 1 1.029 1.749v.823a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-.823a2 2 0 0 1 1.029 -1.749l7.971 -4.428" />
	</svg>

	<p class="text-center text-sm opacity-60">{m.cart_empty()}</p>

	<a
		href="/"
		class="rounded text-sm font-semibold text-[var(--theme-accent)] underline underline-offset-2 transition-opacity duration-150 hover:opacity-80 active:opacity-60 outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)] focus-visible:ring-offset-2"
		onclick={() => cart.close()}
	>
		{m.cart_continue_shopping()}
	</a>
</div>
