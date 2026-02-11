<script lang="ts">
	import { getActiveCollection } from '$lib/stores/collection.svelte.js';
	import { getAccessibility } from '$lib/stores/accessibility.svelte.js';
	import { getTheme } from '$lib/theme/themes.js';
	import { themeToCustomProperties } from '$lib/theme/utils.js';

	const collection = getActiveCollection();
	const accessibility = getAccessibility();

	let theme = $derived(getTheme(collection.handle));
	let previousTheme = $derived(getTheme(collection.previousHandle || collection.handle));

	let customProps = $derived(themeToCustomProperties(theme));
	let styleStr = $derived(
		Object.entries(customProps)
			.map(([k, v]) => `${k}:${v}`)
			.join(';')
	);

	let duration = $derived(accessibility.reducedMotion ? 0 : 1200);

	// Track the fading-out layer. When a transition starts, we capture the
	// old gradient and fade it out over `duration` ms.
	let fadingGradient = $state('');
	let fadingOpacity = $state(0);

	$effect(() => {
		if (collection.transitioning) {
			// Show the old gradient on top, then fade it out
			fadingGradient = previousTheme.backgroundGradient;
			fadingOpacity = 1;

			// Trigger reflow so the browser sees opacity:1 before we set it to 0
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					fadingOpacity = 0;
				});
			});
		}
	});
</script>

<!-- New / active background (always rendered underneath) -->
<div
	class="fixed inset-0 z-0"
	style="{styleStr};background:{theme.backgroundGradient}"
	aria-hidden="true"
></div>

<!-- Old background fading out on top -->
{#if fadingGradient}
	<div
		class="fixed inset-0 z-0 pointer-events-none"
		style="background:{fadingGradient};opacity:{fadingOpacity};transition:opacity {duration}ms ease-in-out"
		aria-hidden="true"
		ontransitionend={() => { fadingGradient = ''; }}
	></div>
{/if}
