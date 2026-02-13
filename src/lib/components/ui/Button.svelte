<script lang="ts">
	import type { Snippet } from 'svelte';
	import Spinner from './Spinner.svelte';

	let {
		variant = 'primary',
		size = 'md',
		loading = false,
		children,
		class: className,
		...rest
	}: {
		variant?: 'primary' | 'secondary' | 'ghost';
		size?: 'sm' | 'md' | 'lg';
		loading?: boolean;
		children: Snippet;
		class?: string;
		[key: string]: any;
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
	class={[
		'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)] focus-visible:ring-offset-2',
		variantClasses[variant],
		sizeClasses[size],
		className
	]}
	aria-busy={loading}
	{...rest}
>
	{#if loading}
		<Spinner />
	{/if}
	{@render children()}
</button>
