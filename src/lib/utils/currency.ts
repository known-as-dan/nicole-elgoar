const formatterCache = new Map<string, Intl.NumberFormat>();

function getFormatter(currencyCode: string, locale: string): Intl.NumberFormat {
	const key = `${currencyCode}-${locale}`;
	let formatter = formatterCache.get(key);
	if (!formatter) {
		formatter = new Intl.NumberFormat(locale, {
			style: 'currency',
			currency: currencyCode
		});
		formatterCache.set(key, formatter);
	}
	return formatter;
}

export function formatPrice(amount: string, currencyCode: string, locale: string = 'en'): string {
	const number = parseFloat(amount);
	if (isNaN(number)) return amount;
	return getFormatter(currencyCode, locale).format(number);
}
