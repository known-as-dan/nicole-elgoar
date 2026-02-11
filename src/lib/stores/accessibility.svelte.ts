import { getContext, setContext } from 'svelte';
import { MediaQuery } from 'svelte/reactivity';

const A11Y_CTX = Symbol('accessibility');

export class AccessibilityState {
	#prefersReducedMotion = new MediaQuery('(prefers-reduced-motion: reduce)');
	userOverride = $state<boolean | null>(null);

	get reducedMotion(): boolean {
		return this.userOverride ?? this.#prefersReducedMotion.current;
	}

	get transitionDuration(): number {
		return this.reducedMotion ? 0 : 600;
	}

	toggleReducedMotion(): void {
		if (this.userOverride === null) {
			this.userOverride = !this.#prefersReducedMotion.current;
		} else {
			this.userOverride = !this.userOverride;
		}
	}

	resetOverride(): void {
		this.userOverride = null;
	}
}

export function setAccessibility(state?: AccessibilityState): AccessibilityState {
	const s = state ?? new AccessibilityState();
	setContext(A11Y_CTX, s);
	return s;
}

export function getAccessibility(): AccessibilityState {
	return getContext<AccessibilityState>(A11Y_CTX);
}
