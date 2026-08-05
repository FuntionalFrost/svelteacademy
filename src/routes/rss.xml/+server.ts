// src/routes/rss.xml/+server.ts
import type { RequestHandler } from './$types';

interface GuideModule {
	metadata: {
		title?: string;
		description?: string;
		category?: string;
	};
}

export const GET: RequestHandler = async () => {
	const modules = import.meta.glob<GuideModule>('/src/lib/content/guides/*.md', { eager: true });

	const guides = Object.entries(modules).map(([path, module]) => {
		const slug = path.split('/').pop()?.replace('.md', '');
		return {
			slug,
			meta: module.metadata
		};
	});

	const siteUrl = 'https://sveltey.dev';

	const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
	<title>Sveltey — Guides & Stack Comparisons</title>
	<link>${siteUrl}</link>
	<description>Deep dives into Svelte 5, SvelteKit, and zero-complexity web development.</description>
	${guides
		.map(
			(guide) => `
	<item>
		<title>${guide.meta.title || guide.slug}</title>
		<link>${siteUrl}/learn/${guide.slug}</link>
		<description>${guide.meta.description || ''}</description>
		<guid>${siteUrl}/learn/${guide.slug}</guid>
	</item>`
		)
		.join('')}
</channel>
</rss>`.trim();

	return new Response(rss, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};
