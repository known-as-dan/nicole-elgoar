<script lang="ts">
	import type { Snippet } from 'svelte';
	import CollectionBackground from '$lib/components/collection/CollectionBackground.svelte';
	import CollectionTransition from '$lib/components/collection/CollectionTransition.svelte';

	let { children }: { children: Snippet } = $props();
</script>

<CollectionBackground />
<CollectionTransition />

<div class="relative z-20 mx-auto w-full max-w-[66vw] min-h-screen px-4 py-6">
	{@render children()}
</div>
