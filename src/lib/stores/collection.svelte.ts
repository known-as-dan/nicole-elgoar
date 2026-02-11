import { getContext, setContext } from 'svelte';
import { getThemeTransition } from '$lib/theme/transition.js';

const COLLECTION_CTX = Symbol('collection');

export class CollectionState {
	handle = $state<string>('');
	transitioning = $state(false);
	previousHandle = $state<string>('');

	async transitionTo(newHandle: string, reducedMotion: boolean = false): Promise<void> {
		if (newHandle === this.handle) return;

		const transition = getThemeTransition(newHandle);
		const duration = reducedMotion ? 0 : transition.duration;

		// Store the old handle, swap to new immediately, and mark as transitioning
		this.previousHandle = this.handle;
		this.handle = newHandle;
		this.transitioning = true;

		// Let CSS crossfade run for the full duration
		await new Promise((r) => setTimeout(r, duration));

		this.transitioning = false;
	}
}

export function setActiveCollection(state?: CollectionState): CollectionState {
	const s = state ?? new CollectionState();
	setContext(COLLECTION_CTX, s);
	return s;
}

export function getActiveCollection(): CollectionState {
	return getContext<CollectionState>(COLLECTION_CTX);
}
