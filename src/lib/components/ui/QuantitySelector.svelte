<script lang="ts">
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
	class="inline-flex items-center rounded-lg border border-current/20"
	role="spinbutton"
	aria-valuemin={min}
	aria-valuemax={max}
	aria-valuenow={value}
	aria-label="Quantity"
	tabindex="0"
	onkeydown={handleKeydown}
>
	<button
		type="button"
		class="px-3 py-1.5 text-sm transition-colors hover:bg-[var(--theme-text)]/5 disabled:opacity-30 rounded-s-lg"
		disabled={value <= min}
		onclick={decrement}
		aria-label="Decrease quantity"
		tabindex="-1"
	>
		&minus;
	</button>
	<span class="min-w-[2.5rem] text-center text-sm font-semibold">{value}</span>
	<button
		type="button"
		class="px-3 py-1.5 text-sm transition-colors hover:bg-[var(--theme-text)]/5 disabled:opacity-30 rounded-e-lg"
		disabled={value >= max}
		onclick={increment}
		aria-label="Increase quantity"
		tabindex="-1"
	>
		+
	</button>
</div>
