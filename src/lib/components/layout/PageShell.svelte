<script lang="ts">
	import type { Snippet } from 'svelte';
	import CollectionBackground from '$lib/components/collection/CollectionBackground.svelte';
	import CollectionTransition from '$lib/components/collection/CollectionTransition.svelte';
	import { getActiveCollection } from '$lib/stores/collection.svelte.js';
	import { getTheme, themeToCustomProperties } from '$lib/theme/themes.js';

	let { children }: { children: Snippet } = $props();

	const collection = getActiveCollection();
	let theme = $derived(getTheme(collection.handle));
	let themeStyle = $derived(
		Object.entries(themeToCustomProperties(theme))
			.map(([k, v]) => `${k}:${v}`)
			.join(';')
	);
</script>

<CollectionBackground />
<CollectionTransition />

<div class="relative z-20 mx-auto w-full min-h-screen px-4 pt-2 pb-6 sm:px-6 lg:max-w-[66vw]" style={themeStyle}>
	{@render children()}
</div>
