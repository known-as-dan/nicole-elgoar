export interface CollectionTheme {
	handle: string;
	backgroundGradient: string;
	backgroundPattern?: string;
	backgroundColor: string;
	textColor: string;
	accentColor: string;
	cardBackground: string;
	decoration: {
		left: string;
		right: string;
	};
	transition: {
		duration: number;
	};
}

const themes: Record<string, CollectionTheme> = {
	'warm-blanket': {
		handle: 'warm-blanket',
		backgroundGradient: 'linear-gradient(135deg, #F9E4E4 0%, #F5D0C5 30%, #E8B4B8 70%, #D4919A 100%)',
		backgroundColor: '#F5D0C5',
		textColor: '#3D1F25',
		accentColor: '#C76B7E',
		cardBackground: '#FFF5F3',
		decoration: {
			left: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.5 0 2.93-.33 4.21-.93C13.06 19.1 11 16.28 11 13c0-3.87 2.63-7.12 6.19-8.07A9.96 9.96 0 0012 2z" fill="currentColor" opacity="0.3"/></svg>`,
			right: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.5 0 2.93-.33 4.21-.93C13.06 19.1 11 16.28 11 13c0-3.87 2.63-7.12 6.19-8.07A9.96 9.96 0 0012 2z" fill="currentColor" opacity="0.3" transform="scale(-1,1) translate(-24,0)"/></svg>`
		},
		transition: {
			duration: 1200
		}
	},
	lazy: {
		handle: 'lazy',
		backgroundGradient: 'linear-gradient(135deg, #E0EAFC 0%, #CFDEF3 30%, #B8CCE7 70%, #94ADD4 100%)',
		backgroundColor: '#CFDEF3',
		textColor: '#1B2A4A',
		accentColor: '#5B7FB5',
		cardBackground: '#F3F7FD',
		decoration: {
			left: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 12C4 7.58 7.58 4 12 4c.87 0 1.71.14 2.5.4C11.08 5.9 9 9.18 9 13s2.08 7.1 5.5 8.6c-.79.26-1.63.4-2.5.4-4.42 0-8-3.58-8-8z" fill="currentColor" opacity="0.3"/></svg>`,
			right: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 12C4 7.58 7.58 4 12 4c.87 0 1.71.14 2.5.4C11.08 5.9 9 9.18 9 13s2.08 7.1 5.5 8.6c-.79.26-1.63.4-2.5.4-4.42 0-8-3.58-8-8z" fill="currentColor" opacity="0.3" transform="scale(-1,1) translate(-24,0)"/></svg>`
		},
		transition: {
			duration: 1200
		}
	}
};

export function getTheme(handle: string): CollectionTheme {
	return themes[handle] ?? themes['warm-blanket'];
}

export function getThemeDecoration(handle: string): CollectionTheme['decoration'] {
	return getTheme(handle).decoration;
}

export function getAllThemes(): CollectionTheme[] {
	return Object.values(themes);
}

export function themeToCustomProperties(theme: CollectionTheme): Record<string, string> {
	return {
		'--theme-bg-gradient': theme.backgroundGradient,
		'--theme-bg': theme.backgroundColor,
		'--theme-text': theme.textColor,
		'--theme-accent': theme.accentColor,
		'--theme-card-bg': theme.cardBackground
	};
}
