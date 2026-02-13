<script lang="ts">
	import * as m from '$lib/paraglide/messages';

	let {
		value = $bindable(1),
		min = 0,
		max = 99
	}: {
		value: number;
		min?: number;
		max?: number;
	} = $props();

	function increment() {
		if (value < max) value++;
	}

	function decrement() {
		if (value > min) value--;
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'ArrowUp') {
			event.preventDefault();
			increment();
		} else if (event.key === 'ArrowDown') {
			event.preventDefault();
			decrement();
		}
	}
</script>

<div
	class="inline-flex items-center rounded-lg border border-current/20 outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)] focus-visible:ring-offset-2"
	role="spinbutton"
	aria-valuemin={min}
	aria-valuemax={max}
	aria-valuenow={value}
	aria-label={m.product_quantity()}
	tabindex="0"
	onkeydown={handleKeydown}
>
	<button
		type="button"
		class="px-4 py-2.5 text-base transition-all duration-150 hover:bg-[var(--theme-text)]/5 active:scale-[0.90] disabled:opacity-30 rounded-s-lg"
		disabled={value <= min}
		onclick={decrement}
		aria-label={m.quantity_decrease()}
		tabindex="-1"
	>
		&minus;
	</button>
	<span class="min-w-[2.5rem] text-center text-sm font-semibold">{value}</span>
	<button
		type="button"
		class="px-4 py-2.5 text-base transition-all duration-150 hover:bg-[var(--theme-text)]/5 active:scale-[0.90] disabled:opacity-30 rounded-e-lg"
		disabled={value >= max}
		onclick={increment}
		aria-label={m.quantity_increase()}
		tabindex="-1"
	>
		+
	</button>
</div>
