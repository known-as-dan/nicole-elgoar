import type { CollectionTheme } from './themes.js';

export function themeToCustomProperties(theme: CollectionTheme): Record<string, string> {
	return {
		'--theme-bg-gradient': theme.backgroundGradient,
		'--theme-bg': theme.backgroundColor,
		'--theme-text': theme.textColor,
		'--theme-accent': theme.accentColor,
		'--theme-card-bg': theme.cardBackground
	};
}

export function applyThemeToElement(element: HTMLElement, theme: CollectionTheme): void {
	const properties = themeToCustomProperties(theme);
	for (const [key, value] of Object.entries(properties)) {
		element.style.setProperty(key, value);
	}
}
