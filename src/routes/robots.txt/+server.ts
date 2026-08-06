// src/routes/robots.txt/+server.ts
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const content = `User-agent: *
Allow: /

Sitemap: ${url.origin}/sitemap.xml`.trim();

	return new Response(content, {
		headers: {
			'Content-Type': 'text/plain',
			'Cache-Control': 'public, max-age=0, s-maxage=3600'
		}
	});
};
