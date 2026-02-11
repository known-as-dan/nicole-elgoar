<script lang="ts">
	import { getAccessibility } from '$lib/stores/accessibility.svelte.js';
	import * as m from '$lib/paraglide/messages';

	const accessibility = getAccessibility();
</script>

<button
	type="button"
	class="rounded-md px-3 py-1.5 text-xs transition-colors hover:bg-[var(--theme-text)]/5 focus-visible:ring-2 focus-visible:ring-offset-2"
	aria-pressed={accessibility.reducedMotion}
	onclick={() => accessibility.toggleReducedMotion()}
>
	{accessibility.reducedMotion ? m.enable_animations() : m.reduce_motion()}
</button>
