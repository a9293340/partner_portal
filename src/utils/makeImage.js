export const makeImage = (src) =>
	new URL(`../img/${src}`, import.meta.url).href;
