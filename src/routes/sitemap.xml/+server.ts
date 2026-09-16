// src/routes/sitemap.xml/+server.ts
import { getAllGuides } from '$lib/content/guides';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const origin = url.origin;

	// Static core routes
	const staticRoutes = ['', '/guides', '/cheatsheet', '/playground'];

	// Discover dynamic guide slugs from canonical content provider
	const guides = getAllGuides();

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
  ${guides
		.map(
			(guide) => `
  <url>
    <loc>${origin}/guides/${guide.slug}</loc>
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
