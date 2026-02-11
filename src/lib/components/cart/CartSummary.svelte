<script lang="ts">
	import { getCart } from '$lib/stores/cart.svelte.js';
	import { formatPrice } from '$lib/utils/currency.js';
	import Button from '$lib/components/ui/Button.svelte';
	import * as m from '$lib/paraglide/messages';

	const cart = getCart();
</script>

<div class="border-t border-current/10 px-6 py-4">
	<div class="flex items-center justify-between mb-4">
		<span class="text-sm font-medium">{m.cart_subtotal()}</span>
		<span class="text-lg font-semibold">
			{formatPrice(cart.totalAmount.toFixed(2), cart.currencyCode)}
		</span>
	</div>

	<Button variant="primary" size="lg" onclick={() => window.open(cart.checkoutUrl, '_self')}>
		{m.cart_checkout()}
	</Button>

	<p class="mt-2 text-center text-xs opacity-50">
		{m.cart_shipping_note()}
	</p>
</div>
