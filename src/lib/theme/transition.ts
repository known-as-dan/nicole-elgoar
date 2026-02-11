import { getTheme, type CollectionTheme } from './themes.js';

export interface ThemeTransition {
	duration: number;
}

export function getThemeTransition(handle: string): ThemeTransition {
	const theme = getTheme(handle);
	return theme.transition;
}

export function getTransitionDuration(theme: CollectionTheme, reducedMotion: boolean): number {
	return reducedMotion ? 0 : theme.transition.duration;
}
