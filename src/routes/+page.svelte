<script lang="ts">
	import * as m from '$lib/paraglide/messages';
</script>

<svelte:head>
	<title>{m.brand_name()}</title>
</svelte:head>

<div class="flex min-h-[60vh] items-center justify-center">
	<div class="text-center">
		<h1>
			<img src="/ne_logo.png" alt={m.brand_name()} class="mx-auto h-48 sm:h-72 lg:h-96" />
		</h1>
		<p class="mt-4 text-lg text-[var(--color-muted)]">{m.collections_coming_soon()}</p>
	</div>
</div>
