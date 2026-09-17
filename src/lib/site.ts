// src/lib/site.ts
import { defineSiteConfig } from 'yaxa-svelte';

export const siteConfig = defineSiteConfig({
	name: 'SvelteAcademy',
	title: 'SvelteAcademy | Master Svelte 5 and SvelteKit',
	description:
		'Interactive developer guides, primitives deep-dives, and architectural benchmarks for modern Svelte 5 development.',
	url: 'https://svelteacademy.netlify.app',
	logo: 'https://svelteacademy.netlify.app/favicon.svg',
	author: {
		name: 'SvelteAcademy Team',
		url: 'https://svelteacademy.netlify.app',
		github: 'https://github.com/FuntionalFrost/svelteacademy'
	},
	project: {
		license: 'MIT',
		type: 'open-source',
		repositoryUrl: 'https://github.com/FuntionalFrost/svelteacademy',
		isAccessibleForFree: true
	},
	sitemap: {
		changefreq: 'weekly',
		priority: 0.8,
		exclude: ['/api/*']
	}
});
