<script lang="ts">
	import { getCart } from '$lib/stores/cart.svelte.js';
	import * as m from '$lib/paraglide/messages';

	const cart = getCart();
</script>

<button
	type="button"
	class="relative inline-flex items-center rounded-md p-2 transition-colors hover:bg-[var(--theme-text,var(--color-text))]/10 focus-visible:ring-2 focus-visible:ring-offset-2"
	aria-label={m.cart_badge({ count: cart.itemCount })}
	onclick={() => cart.toggle()}
>
	<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
		/>
	</svg>

	{#if cart.itemCount > 0}
		<span
			class="absolute -end-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--theme-accent,#1A1A1A)] px-1 text-[10px] font-bold text-white"
		>
			{cart.itemCount}
		</span>
	{/if}
</button>
