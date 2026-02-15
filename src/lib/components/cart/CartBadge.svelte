<script lang="ts">
	import { getCart } from '$lib/stores/cart.svelte.js';
	import * as m from '$lib/paraglide/messages';

	const cart = getCart();
</script>

<button
	type="button"
	class={[
		'nav-action-btn relative inline-flex items-center rounded-md p-2 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2',
		cart.open
			? 'bg-[var(--theme-text,var(--color-text))]/10 scale-110'
			: 'hover:bg-[var(--theme-text,var(--color-text))]/10 hover:scale-110'
	]}
	aria-label={m.cart_badge({ count: cart.itemCount })}
	onclick={() => cart.toggle()}
>
	<svg
		class="h-7 w-7"
		fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"
	>
		<path d="M14 6a2 2 0 1 0 -4 0c0 1.667 .67 3 2 4h-.008l7.971 4.428a2 2 0 0 1 1.029 1.749v.823a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-.823a2 2 0 0 1 1.029 -1.749l7.971 -4.428" />
	</svg>

	{#if cart.itemCount > 0}
		{#key cart.itemCount}
			<span
				class="badge-pop absolute -end-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--theme-accent,#c43a52)] px-1 text-[10px] font-bold text-white"
			>
				{cart.itemCount}
			</span>
		{/key}
	{/if}
</button>
