<script lang="ts">
	import { fly } from 'svelte/transition';
	import { getCart } from '$lib/stores/cart.svelte.js';
	import { getAccessibility } from '$lib/stores/accessibility.svelte.js';
	import { trapFocus } from '$lib/utils/a11y.js';
	import CartLineComponent from './CartLine.svelte';
	import CartSummary from './CartSummary.svelte';
	import CartEmpty from './CartEmpty.svelte';
	import * as m from '$lib/paraglide/messages';

	const cart = getCart();
	const accessibility = getAccessibility();

	let drawerEl: HTMLDivElement | undefined = $state();

	$effect(() => {
		if (cart.open && drawerEl) {
			return trapFocus(drawerEl);
		}
	});

	function handleKeydown(event: KeyboardEvent) {
		if (cart.open && event.key === 'Escape') {
			cart.close();
		}
	}

	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			cart.close();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if cart.open}
	<!-- Backdrop -->
	<!-- svelte-ignore a11y_no_static_element_interactions a11y_click_events_have_key_events -->
	<div
		class="fixed inset-0 z-50 bg-black/50"
		onclick={handleBackdropClick}
		transition:fly={{ duration: accessibility.reducedMotion ? 0 : 200, opacity: 0, x: 0 }}
	>
		<!-- Drawer panel -->
		<!-- svelte-ignore a11y_no_noninteractive_element_to_interactive_role -->
		<div
			bind:this={drawerEl}
			role="dialog"
			aria-modal="true"
			aria-label={m.cart_title()}
			class="fixed inset-y-0 end-0 z-50 flex w-full max-w-md flex-col shadow-2xl"
			style="background: var(--theme-card-bg, #fff); color: var(--theme-text, var(--color-text))"
			transition:fly={{ x: 400, duration: accessibility.reducedMotion ? 0 : 300 }}
		>
			<!-- Header -->
			<div class="flex items-center justify-between border-b border-current/10 px-6 py-4">
				<h2 class="text-lg font-semibold" style="font-family: var(--font-heading)">
					{m.cart_title()}
				</h2>
				<button
					class="rounded-md p-2 transition-colors hover:bg-current/5 focus-visible:ring-2 focus-visible:ring-offset-2"
					aria-label={m.cart_close()}
					onclick={() => cart.close()}
				>
					<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>

			<!-- Lines -->
			{#if cart.lines.length === 0}
				<CartEmpty />
			{:else}
				<div class="flex-1 overflow-y-auto px-6 py-4">
					<ul class="space-y-4">
						{#each cart.lines as line (line.id)}
							<li>
								<CartLineComponent {line} />
							</li>
						{/each}
					</ul>
				</div>

				<CartSummary />
			{/if}
		</div>
	</div>
{/if}
