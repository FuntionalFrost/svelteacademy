// src/routes/sitemap.xml/+server.ts
import type { RequestHandler } from './$types';

interface GuideModule {
	metadata?: {
		title?: string;
	};
}

export const GET: RequestHandler = async ({ url }) => {
	const origin = url.origin;

	// Static core routes
	const staticRoutes = ['', '/guides', '/cheatsheet', '/playground'];

	// Discover dynamic guide slugs from src/lib/content/guides/
	const guideFiles = import.meta.glob<GuideModule>('/src/lib/content/guides/*.md', { eager: true });
	const guideSlugs = Object.keys(guideFiles)
		.filter((filepath) => !filepath.includes('/_'))
		.map((filepath) => filepath.split('/').pop()?.replace('.md', '') || '');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticRoutes
		.map(
			(route) => `
  <url>
    <loc>${origin}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>`
		)
		.join('')}
  ${guideSlugs
		.map(
			(slug) => `
  <url>
    <loc>${origin}/guides/${slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
		)
		.join('')}
</urlset>`.trim();

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'public, max-age=0, s-maxage=3600'
		}
	});
};
