<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		'aria-label': ariaLabel,
		onclick,
		children,
		class: className = ''
	}: {
		'aria-label': string;
		onclick?: () => void;
		children: Snippet;
		class?: string;
	} = $props();
</script>

<button
	type="button"
	aria-label={ariaLabel}
	{onclick}
	class="inline-flex items-center justify-center rounded-md p-2 transition-colors hover:bg-[var(--theme-text,var(--color-text))]/10 focus-visible:ring-2 focus-visible:ring-offset-2 {className}"
>
	{@render children()}
</button>
