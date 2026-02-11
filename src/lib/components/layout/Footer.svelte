<script lang="ts">
	import * as m from '$lib/paraglide/messages';
</script>

<footer class="mt-auto border-t border-[var(--theme-text,var(--color-text))]/10 py-8 text-center text-sm text-[var(--theme-text,var(--color-muted))]">
	<img src="/ne_logo.png" alt={m.brand_name()} class="mx-auto h-16" />
	<p class="mt-1 opacity-60">&copy; {new Date().getFullYear()} {m.copyright()}</p>
</footer>
