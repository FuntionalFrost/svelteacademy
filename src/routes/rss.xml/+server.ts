// src/routes/sitemap.xml/+server.ts
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const modules = import.meta.glob('/src/lib/content/guides/*.md', { eager: true });
	const guideSlugs = Object.keys(modules).map((path) => path.split('/').pop()?.replace('.md', ''));

	const siteUrl = 'https://svelteacademy.netlify.app';

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	<url>
		<loc>${siteUrl}/</loc>
		<changefreq>weekly</changefreq>
		<priority>1.0</priority>
	</url>
	<url>
		<loc>${siteUrl}/learn</loc>
		<changefreq>daily</changefreq>
		<priority>0.8</priority>
	</url>
	${guideSlugs
		.map(
			(slug) => `
	<url>
		<loc>${siteUrl}/learn/${slug}</loc>
		<changefreq>monthly</changefreq>
		<priority>0.7</priority>
	</url>`
		)
		.join('')}
</urlset>`.trim();

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};
