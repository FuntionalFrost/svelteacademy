// src/routes/sitemap.xml/+server.ts
import { getAllGuides } from '$lib/content/guides';
import { siteConfig } from '$lib/site';
import { createSitemapHandler } from 'yaxa-svelte';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = createSitemapHandler({
	config: siteConfig,
	staticRoutes: [
		{ loc: '/', priority: 1.0, changefreq: 'weekly' },
		{ loc: '/guides', priority: 0.9, changefreq: 'weekly' },
		{ loc: '/cheatsheet', priority: 0.9, changefreq: 'weekly' },
		{ loc: '/playground', priority: 0.8, changefreq: 'weekly' }
	],
	dynamicRoutes: () => {
		return getAllGuides().map((guide) => ({
			loc: `/guides/${guide.slug}`,
			lastmod: guide.date ? new Date(guide.date).toISOString().split('T')[0] : undefined,
			priority: 0.8,
			changefreq: 'monthly'
		}));
	}
});
