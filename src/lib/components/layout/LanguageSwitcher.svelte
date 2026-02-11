<script lang="ts">
	import { locales, getLocale, setLocale } from '$lib/paraglide/runtime';
	import * as m from '$lib/paraglide/messages';

	const LOCALE_LABELS: Record<string, string> = {
		en: 'EN',
		he: 'HE',
		ru: 'RU'
	};

	let currentLocale = $derived(getLocale());
</script>

<div class="flex items-center gap-0.5" role="group" aria-label={m.language_label()}>
	{#each locales as locale}
		<button
			type="button"
			aria-current={locale === currentLocale ? 'true' : undefined}
			class={[
				'rounded px-2 py-1 text-xs font-semibold transition-colors',
				locale === currentLocale
					? 'bg-[var(--theme-text,var(--color-text))]/10'
					: 'opacity-50 hover:opacity-100'
			]}
			onclick={() => setLocale(locale)}
		>
			{LOCALE_LABELS[locale] ?? locale.toUpperCase()}
		</button>
	{/each}
</div>
