<script lang="ts">
	let message = $state('');

	export function announce(text: string): void {
		message = '';
		// Use a microtask to ensure screen readers pick up the change
		queueMicrotask(() => {
			message = text;
		});
	}
</script>

<div
	id="live-region"
	role="status"
	aria-live="polite"
	aria-atomic="true"
	class="sr-only"
>
	{message}
</div>
