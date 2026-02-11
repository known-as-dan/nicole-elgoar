<script lang="ts">
	import type { Money } from '$lib/types/index.js';
	import { formatPrice } from '$lib/utils/currency.js';

	let { price, compareAtPrice }: { price: Money | undefined; compareAtPrice: Money | null | undefined } =
		$props();

	let isOnSale = $derived(
		compareAtPrice != null && parseFloat(compareAtPrice.amount) > parseFloat(price?.amount ?? '0')
	);
</script>

{#if price}
	<div class="flex items-center gap-1.5 text-sm">
		<span
			class={isOnSale ? 'font-semibold text-[var(--theme-accent)]' : 'font-semibold'}
			style="color: {isOnSale ? 'var(--theme-accent)' : 'var(--theme-text, var(--color-text))'}"
		>
			{formatPrice(price.amount, price.currencyCode)}
		</span>
		{#if isOnSale && compareAtPrice}
			<span class="text-xs line-through opacity-50">
				{formatPrice(compareAtPrice.amount, compareAtPrice.currencyCode)}
			</span>
		{/if}
	</div>
{/if}
