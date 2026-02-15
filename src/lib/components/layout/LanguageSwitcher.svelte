<script lang="ts">
	import { locales, getLocale, setLocale } from '$lib/paraglide/runtime';
	import { fly } from 'svelte/transition';
	import { getAccessibility } from '$lib/stores/accessibility.svelte.js';
	import * as m from '$lib/paraglide/messages';

	const LOCALE_LABELS: Record<string, string> = {
		en: 'English',
		he: 'עברית',
		ru: 'Русский'
	};

	const accessibility = getAccessibility();

	let currentLocale = $derived(getLocale());
	let open = $state(false);

	function select(locale: string) {
		setLocale(locale);
		open = false;
	}

	function handleClickOutside(event: MouseEvent) {
		if (open && !(event.target as HTMLElement).closest('.lang-switcher')) {
			open = false;
		}
	}
</script>

<svelte:window onclick={handleClickOutside} />

<div class="lang-switcher relative">
	<button
		type="button"
		class={[
			'nav-action-btn inline-flex items-center rounded-md p-2 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2',
			open
				? 'bg-[var(--theme-text,var(--color-text))]/10 scale-110'
				: 'hover:bg-[var(--theme-text,var(--color-text))]/10 hover:scale-110'
		]}
		aria-label={m.language_label()}
		aria-expanded={open}
		aria-haspopup="true"
		onclick={() => (open = !open)}
	>
		<svg
			class="h-5 w-5"
			fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"
		>
			<circle cx="12" cy="12" r="10" />
			<path d="M2 12h20" />
			<path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
		</svg>
	</button>

	{#if open}
		<div
			class="absolute top-full z-50 mt-2 min-w-32 overflow-hidden rounded-lg shadow-lg lang-dropdown"
			style="background: var(--theme-card-bg, #1a1a1a); color: var(--theme-text, var(--color-text))"
			role="menu"
			aria-label={m.language_label()}
			transition:fly={{ y: -6, duration: accessibility.reducedMotion ? 0 : 150 }}
		>
			{#each locales as locale (locale)}
				<button
					type="button"
					role="menuitem"
					class={[
						'relative flex w-full items-center justify-center px-4 py-2.5 text-sm transition-all duration-150 hover:bg-[var(--theme-text,var(--color-text))]/5 active:scale-[0.97] outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--theme-accent)]',
						locale === currentLocale ? 'font-semibold' : 'opacity-70'
					]}
					onclick={() => select(locale)}
				>
					{LOCALE_LABELS[locale] ?? locale.toUpperCase()}
					{#if locale === currentLocale}
						<svg class="absolute end-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
						</svg>
					{/if}
				</button>
			{/each}
		</div>
	{/if}
</div>

<style>
	.lang-dropdown {
		inset-inline-start: 0;
	}
</style>
