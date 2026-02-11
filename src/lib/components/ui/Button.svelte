<script lang="ts">
	import type { Snippet } from 'svelte';
	import Spinner from './Spinner.svelte';

	let {
		variant = 'primary',
		size = 'md',
		disabled = false,
		loading = false,
		onclick,
		children,
		type = 'button'
	}: {
		variant?: 'primary' | 'secondary' | 'ghost';
		size?: 'sm' | 'md' | 'lg';
		disabled?: boolean;
		loading?: boolean;
		onclick?: () => void;
		children: Snippet;
		type?: 'button' | 'submit' | 'reset';
	} = $props();

	const variantClasses = {
		primary:
			'bg-[var(--theme-accent,#1A1A1A)] text-white hover:opacity-90 disabled:opacity-40',
		secondary:
			'border border-[var(--theme-text,var(--color-text))]/20 hover:bg-[var(--theme-text)]/5 disabled:opacity-40',
		ghost:
			'hover:bg-[var(--theme-text,var(--color-text))]/5 disabled:opacity-40'
	};

	const sizeClasses = {
		sm: 'px-3 py-1.5 text-xs',
		md: 'px-4 py-2 text-sm',
		lg: 'w-full px-5 py-3 text-base'
	};
</script>

<button
	{type}
	{disabled}
	{onclick}
	class={[
		'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)] focus-visible:ring-offset-2',
		variantClasses[variant],
		sizeClasses[size]
	]}
	aria-busy={loading}
>
	{#if loading}
		<Spinner />
	{/if}
	{@render children()}
</button>
