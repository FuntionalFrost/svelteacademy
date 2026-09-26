// src/routes/sitemap.xml/+server.ts
import { getAllLessons } from '$lib/content/curriculum';
import { getAllGuides } from '$lib/content/guides';
import { siteConfig } from '$lib/site';
import { createSitemapHandler } from 'yaxa-svelte';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = createSitemapHandler({
	config: siteConfig,
	staticRoutes: [
		{ loc: '/', priority: 1.0, changefreq: 'weekly' },
		{ loc: '/learn', priority: 1.0, changefreq: 'weekly' },
		{ loc: '/guides', priority: 0.9, changefreq: 'weekly' },
		{ loc: '/cheatsheet', priority: 0.9, changefreq: 'weekly' },
		{ loc: '/playground', priority: 0.8, changefreq: 'weekly' }
	],
	dynamicRoutes: () => {
		const guideRoutes = getAllGuides().map((guide) => ({
			loc: `/guides/${guide.slug}`,
			lastmod: guide.date ? new Date(guide.date).toISOString().split('T')[0] : undefined,
			priority: 0.8,
			changefreq: 'monthly' as const
		}));

		const lessonRoutes = getAllLessons().map((lesson) => ({
			loc: `/learn/${lesson.trackId}/${lesson.slug}`,
			priority: 0.9,
			changefreq: 'monthly' as const
		}));

		return [...guideRoutes, ...lessonRoutes];
	}
});
