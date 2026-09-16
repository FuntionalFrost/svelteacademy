// src/routes/rss.xml/+server.ts
import { getAllGuides } from '$lib/content/guides';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const origin = url.origin;
	const guides = getAllGuides().map((guide) => ({
		slug: guide.slug,
		title: guide.title,
		description: guide.description,
		category: guide.category,
		date: guide.date ? new Date(guide.date).toUTCString() : new Date().toUTCString()
	}));

	const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
    <title>SvelteAcademy Guides</title>
    <description>Master Svelte 5 Runes, SvelteKit architecture, and reactive web development.</description>
    <link>${origin}/guides</link>
    <atom:link href="${origin}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    ${guides
			.map(
				(guide) => `
    <item>
        <title><![CDATA[${guide.title}]]></title>
        <description><![CDATA[${guide.description}]]></description>
        <link>${origin}/guides/${guide.slug}</link>
        <guid isPermaLink="true">${origin}/guides/${guide.slug}</guid>
        <pubDate>${guide.date}</pubDate>
        <category><![CDATA[${guide.category}]]></category>
    </item>`
			)
			.join('')}
</channel>
</rss>`.trim();

	return new Response(rss, {
		headers: {
			'Content-Type': 'application/rss+xml; charset=utf-8',
			'Cache-Control': 'public, max-age=0, s-maxage=3600'
		}
	});
};
