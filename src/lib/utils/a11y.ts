/**
 * Get all focusable elements within a container.
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
	const selector = [
		'a[href]',
		'button:not([disabled])',
		'input:not([disabled])',
		'select:not([disabled])',
		'textarea:not([disabled])',
		'[tabindex]:not([tabindex="-1"])'
	].join(', ');

	return Array.from(container.querySelectorAll<HTMLElement>(selector));
}

/**
 * Trap focus within a container element.
 * Returns a cleanup function.
 */
export function trapFocus(container: HTMLElement): () => void {
	const previouslyFocused = document.activeElement as HTMLElement | null;

	function handleKeydown(event: KeyboardEvent): void {
		if (event.key !== 'Tab') return;

		const focusable = getFocusableElements(container);
		if (focusable.length === 0) return;

		const first = focusable[0];
		const last = focusable[focusable.length - 1];

		if (event.shiftKey) {
			if (document.activeElement === first) {
				event.preventDefault();
				last.focus();
			}
		} else {
			if (document.activeElement === last) {
				event.preventDefault();
				first.focus();
			}
		}
	}

	container.addEventListener('keydown', handleKeydown);

	// Focus first focusable element
	const focusable = getFocusableElements(container);
	if (focusable.length > 0) {
		focusable[0].focus();
	}

	return () => {
		container.removeEventListener('keydown', handleKeydown);
		previouslyFocused?.focus();
	};
}

let liveRegionElement: HTMLElement | null = null;

/**
 * Announce a message to screen readers via a live region.
 */
export function announce(message: string): void {
	if (!liveRegionElement) {
		liveRegionElement = document.getElementById('live-region');
	}
	if (liveRegionElement) {
		liveRegionElement.textContent = message;
	}
}
