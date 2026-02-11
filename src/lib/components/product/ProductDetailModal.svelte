<script lang="ts">
	import { fly } from 'svelte/transition';
	import type { Product, ProductVariant } from '$lib/types/index.js';
	import { getCart } from '$lib/stores/cart.svelte.js';
	import { getAccessibility } from '$lib/stores/accessibility.svelte.js';
	import { formatPrice } from '$lib/utils/currency.js';
	import { trapFocus, announce } from '$lib/utils/a11y.js';
	import Button from '$lib/components/ui/Button.svelte';
	import QuantitySelector from '$lib/components/ui/QuantitySelector.svelte';
	import * as m from '$lib/paraglide/messages';

	let { product, onclose }: { product: Product; onclose: () => void } = $props();

	const cart = getCart();
	const accessibility = getAccessibility();

	let selectedVariant = $state<ProductVariant | undefined>(undefined);
	let quantity = $state(1);
	let showingBack = $state(false);
	let dialogEl: HTMLDivElement | undefined = $state();

	// Initialize selectedVariant from product
	$effect(() => {
		selectedVariant = product.variants[0];
	});

	let frontImage = $derived(product.images[0]);
	let backImage = $derived(product.images[1] ?? product.images[0]);
	let displayedImage = $derived(showingBack ? backImage : frontImage);

	$effect(() => {
		if (dialogEl) {
			return trapFocus(dialogEl);
		}
	});

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			onclose();
		}
	}

	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			onclose();
		}
	}

	function addToCart() {
		if (!selectedVariant || !selectedVariant.availableForSale) return;

		cart.addLineWithPrice(
			{
				id: selectedVariant.id,
				title: selectedVariant.title,
				product: { title: product.title, handle: product.handle },
				image: selectedVariant.image,
				selectedOptions: selectedVariant.selectedOptions
			},
			selectedVariant.price.amount,
			selectedVariant.price.currencyCode,
			quantity
		);

		announce(`Added ${quantity} ${product.title} to cart`);
		cart.open = true;
		onclose();
	}

	// Group variants by option name
	let sizeOptions = $derived(
		[...new Set(product.variants.map((v) => v.selectedOptions.find((o) => o.name === 'Size')?.value).filter(Boolean))] as string[]
	);
	let colorOptions = $derived(
		[...new Set(product.variants.map((v) => v.selectedOptions.find((o) => o.name === 'Color')?.value).filter(Boolean))] as string[]
	);

	let selectedSize = $state('');
	let selectedColor = $state('');

	// Initialize size/color from first variant
	$effect(() => {
		const first = product.variants[0];
		if (first) {
			selectedSize = first.selectedOptions.find((o) => o.name === 'Size')?.value ?? '';
			selectedColor = first.selectedOptions.find((o) => o.name === 'Color')?.value ?? '';
		}
	});

	// Update selectedVariant when options change
	$effect(() => {
		const match = product.variants.find(
			(v) =>
				v.selectedOptions.every(
					(o) =>
						(o.name === 'Size' && o.value === selectedSize) ||
						(o.name === 'Color' && o.value === selectedColor)
				)
		);
		if (match) {
			selectedVariant = match;
		}
	});
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- svelte-ignore a11y_no_static_element_interactions a11y_click_events_have_key_events -->
<div
	class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
	onclick={handleBackdropClick}
	transition:fly={{ y: 0, duration: accessibility.reducedMotion ? 0 : 200, opacity: 0 }}
>
	<div
		bind:this={dialogEl}
		role="dialog"
		aria-modal="true"
		aria-label={product.title}
		class="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl shadow-2xl"
		style="background: var(--theme-card-bg, #fff); color: var(--theme-text, var(--color-text))"
		transition:fly={{ y: 20, duration: accessibility.reducedMotion ? 0 : 300 }}
	>
		<!-- Close button -->
		<button
			class="absolute end-3 top-3 z-10 rounded-full p-2 transition-colors hover:bg-black/10 focus-visible:ring-2 focus-visible:ring-offset-2"
			aria-label={m.close()}
			onclick={onclose}
		>
			<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
			</svg>
		</button>

		<div class="grid gap-6 p-6 sm:grid-cols-2">
			<!-- Image -->
			<button
				class="aspect-[3/4] w-full overflow-hidden rounded-lg focus-visible:ring-2 focus-visible:ring-offset-2"
				onclick={() => (showingBack = !showingBack)}
				aria-label={m.product_toggle_view()}
			>
				{#if displayedImage}
					<img
						src={displayedImage.url}
						alt="{product.title} - {showingBack ? 'back' : 'front'} view"
						width={displayedImage.width}
						height={displayedImage.height}
						class="h-full w-full object-cover"
					/>
				{/if}
			</button>

			<!-- Details -->
			<div class="flex flex-col gap-4">
				<h2 class="text-2xl font-semibold" style="font-family: var(--font-heading)">
					{product.title}
				</h2>

				<p class="text-sm opacity-70">{product.description}</p>

				<!-- Price -->
				{#if selectedVariant}
					<div class="flex items-baseline gap-2">
						<span class="text-xl font-semibold">
							{formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode)}
						</span>
						{#if selectedVariant.compareAtPrice}
							<span class="text-sm line-through opacity-50">
								{formatPrice(selectedVariant.compareAtPrice.amount, selectedVariant.compareAtPrice.currencyCode)}
							</span>
						{/if}
					</div>
				{/if}

				<!-- Size selector -->
				{#if sizeOptions.length > 1}
					<fieldset>
						<legend class="mb-1 text-xs font-semibold uppercase tracking-wider opacity-60">{m.product_size()}</legend>
						<div class="flex flex-wrap gap-2">
							{#each sizeOptions as size}
								<label
									class={[
										'cursor-pointer rounded-md border px-3 py-1.5 text-sm transition-colors',
										selectedSize === size
											? 'border-[var(--theme-accent)] bg-[var(--theme-accent)]/10 font-semibold'
											: 'border-current/20 hover:border-current/40'
									]}
								>
									<input
										type="radio"
										name="size"
										value={size}
										checked={selectedSize === size}
										onchange={() => (selectedSize = size)}
										class="sr-only"
									/>
									{size}
								</label>
							{/each}
						</div>
					</fieldset>
				{/if}

				<!-- Color selector -->
				{#if colorOptions.length > 1}
					<fieldset>
						<legend class="mb-1 text-xs font-semibold uppercase tracking-wider opacity-60">{m.product_color()}</legend>
						<div class="flex flex-wrap gap-2">
							{#each colorOptions as color}
								<label
									class={[
										'cursor-pointer rounded-md border px-3 py-1.5 text-sm transition-colors',
										selectedColor === color
											? 'border-[var(--theme-accent)] bg-[var(--theme-accent)]/10 font-semibold'
											: 'border-current/20 hover:border-current/40'
									]}
								>
									<input
										type="radio"
										name="color"
										value={color}
										checked={selectedColor === color}
										onchange={() => (selectedColor = color)}
										class="sr-only"
									/>
									{color}
								</label>
							{/each}
						</div>
					</fieldset>
				{/if}

				<!-- Quantity -->
				<div>
					<span class="mb-1 block text-xs font-semibold uppercase tracking-wider opacity-60">{m.product_quantity()}</span>
					<QuantitySelector bind:value={quantity} min={1} max={selectedVariant?.quantityAvailable ?? 99} />
				</div>

				<!-- Inventory -->
				{#if selectedVariant}
					<p class="text-xs opacity-50">
						{m.product_in_stock({ count: selectedVariant.quantityAvailable })}
					</p>
				{/if}

				<!-- Add to cart -->
				<Button
					variant="primary"
					size="lg"
					disabled={!selectedVariant?.availableForSale}
					onclick={addToCart}
				>
					{selectedVariant?.availableForSale ? m.product_add_to_cart() : m.product_sold_out()}
				</Button>
			</div>
		</div>
	</div>
</div>
