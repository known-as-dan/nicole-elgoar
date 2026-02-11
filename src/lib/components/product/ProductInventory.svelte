<script lang="ts">
	import * as m from '$lib/paraglide/messages';

	let { quantity }: { quantity: number } = $props();

	let label = $derived(
		quantity <= 0
			? m.product_sold_out()
			: quantity <= 5
				? m.product_only_left({ count: quantity })
				: m.product_items_left({ count: quantity })
	);

	let urgency = $derived(quantity <= 0 ? 'sold-out' : quantity <= 5 ? 'low' : 'normal');
</script>

{#if quantity <= 0}
	<span class="rounded-full bg-[var(--color-muted)]/20 px-2 py-0.5 text-xs font-medium opacity-60">
		{label}
	</span>
{:else}
	<span
		class={[
			'text-xs',
			urgency === 'low' ? 'font-semibold text-[var(--theme-accent)]' : 'opacity-50'
		]}
	>
		{label}
	</span>
{/if}
