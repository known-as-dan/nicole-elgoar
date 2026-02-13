<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		class: className,
		...rest
	}: {
		children: Snippet;
		class?: string;
		[key: string]: any;
	} = $props();
</script>

<button
	type="button"
	class="inline-flex items-center justify-center rounded-md p-2 transition-all duration-200 hover:bg-[var(--theme-text,var(--color-text))]/10 active:scale-[0.93] disabled:opacity-40 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-offset-2 {className}"
	{...rest}
>
	{@render children()}
</button>
