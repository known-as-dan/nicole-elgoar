<script>
	import { fly } from 'svelte/transition';
	import { getCart } from '$lib/stores/cart.svelte.js';
	import { getAccessibility } from '$lib/stores/accessibility.svelte.js';
	import { formatPrice } from '$lib/utils/currency.js';
	import { trapFocus, announce } from '$lib/utils/a11y.js';
	import Button from '$lib/components/ui/Button.svelte';
	import QuantitySelector from '$lib/components/ui/QuantitySelector.svelte';
	import * as m from '$lib/paraglide/messages';

	let { product, onclose } = $props();

	const cart = getCart();
	const accessibility = getAccessibility();

	let quantity = $state(1);
	let showingBack = $state(false);
	let initialVariant = $derived(product.variants[0]);

	let frontImage = $derived(product.images[0]);
	let backImage = $derived(product.images[1] ? product.images[1] : product.images[0]);
	let displayedImage = $derived(showingBack ? backImage : frontImage);

	function getOptionValue(variant, name) {
		if (!variant) return '';
		const option = variant.selectedOptions.find((entry) => entry.name === name);
		return option ? option.value : '';
	}

	function findMatchingVariant(variants, size, color) {
		for (const variant of variants) {
			let isMatch = true;
			for (const option of variant.selectedOptions) {
				if (option.name === 'Size' && option.value !== size) {
					isMatch = false;
					break;
				}
				if (option.name === 'Color' && option.value !== color) {
					isMatch = false;
					break;
				}
			}
			if (isMatch) {
				return variant;
			}
		}
		return undefined;
	}

	function handleKeydown(event) {
		if (event.key === 'Escape') {
			onclose();
		}
	}

	function addToCart() {
		if (!selectedVariant || !selectedVariant.availableForSale) return;

		cart.addLine(
			{
				id: selectedVariant.id,
				title: selectedVariant.title,
				product: { title: product.title, handle: product.handle },
				image: selectedVariant.image,
				selectedOptions: selectedVariant.selectedOptions,
				price: selectedVariant.price,
				compareAtPrice: selectedVariant.compareAtPrice
			},
			quantity
		);

		announce(`Added ${quantity} ${product.title} to cart`);
		cart.open = true;
		onclose();
	}

	// Group variants by option name
	let sizeOptions = $derived(
		[
			...new Set(
				product.variants
					.map((v) => {
						const option = v.selectedOptions.find((o) => o.name === 'Size');
						return option ? option.value : undefined;
					})
					.filter((value) => value !== undefined)
			)
		]
	);
	let colorOptions = $derived(
		[
			...new Set(
				product.variants
					.map((v) => {
						const option = v.selectedOptions.find((o) => o.name === 'Color');
						return option ? option.value : undefined;
					})
					.filter((value) => value !== undefined)
			)
		]
	);

	let selectedSize = $state(null);
	let selectedColor = $state(null);
	let defaultSize = $derived(getOptionValue(initialVariant, 'Size'));
	let defaultColor = $derived(getOptionValue(initialVariant, 'Color'));
	let effectiveSize = $derived(selectedSize != null ? selectedSize : defaultSize);
	let effectiveColor = $derived(selectedColor != null ? selectedColor : defaultColor);
	let selectedVariant = $derived(
		findMatchingVariant(product.variants, effectiveSize, effectiveColor) || initialVariant
	);
	let maxQuantity = $derived(
		selectedVariant && selectedVariant.quantityAvailable != null ? selectedVariant.quantityAvailable : 99
	);
	let isAvailable = $derived(!!(selectedVariant && selectedVariant.availableForSale));
</script>

<svelte:window onkeydown={handleKeydown} />

<div
	class="fixed inset-0 z-50 flex items-center justify-center p-4"
	transition:fly={{ y: 0, duration: accessibility.reducedMotion ? 0 : 200, opacity: 0 }}
>
	<button
		type="button"
		class="absolute inset-0 bg-black/50"
		aria-label={m.close()}
		onclick={onclose}
	></button>
	<div
		use:trapFocus
		role="dialog"
		aria-modal="true"
		aria-label={product.title}
		class="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl shadow-2xl"
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
							{#each sizeOptions as size (size)}
								<label
									class={`cursor-pointer rounded-md border px-3 py-1.5 text-sm transition-colors ${
										selectedSize === size
											? 'border-[var(--theme-accent)] bg-[var(--theme-accent)]/10 font-semibold'
											: 'border-current/20 hover:border-current/40'
									}`}
								>
									<input
										type="radio"
										name="size"
										value={size}
										checked={effectiveSize === size}
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
							{#each colorOptions as color (color)}
								<label
									class={`cursor-pointer rounded-md border px-3 py-1.5 text-sm transition-colors ${
										selectedColor === color
											? 'border-[var(--theme-accent)] bg-[var(--theme-accent)]/10 font-semibold'
											: 'border-current/20 hover:border-current/40'
									}`}
								>
									<input
										type="radio"
										name="color"
										value={color}
										checked={effectiveColor === color}
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
					<QuantitySelector bind:value={quantity} min={1} max={maxQuantity} />
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
					disabled={!isAvailable}
					onclick={addToCart}
				>
					{isAvailable ? m.product_add_to_cart() : m.product_sold_out()}
				</Button>
			</div>
		</div>
	</div>
</div>
