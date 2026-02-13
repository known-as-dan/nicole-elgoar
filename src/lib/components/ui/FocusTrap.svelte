<script lang="ts">
	import type { Snippet } from 'svelte';
	import { trapFocus } from '$lib/utils/a11y.js';

	let { children }: { children: Snippet } = $props();

	let containerEl: HTMLDivElement | undefined = $state();

	$effect(() => {
		if (containerEl) {
			const { destroy } = trapFocus(containerEl);
			return destroy;
		}
	});
</script>

<div bind:this={containerEl}>
	{@render children()}
</div>
