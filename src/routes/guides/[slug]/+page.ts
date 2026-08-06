// src/routes/guides/[slug]/+page.ts
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	try {
		const post = await import(`../../../lib/content/guides/${params.slug}.md`);

		return {
			content: post.default,
			meta: post.metadata
		};
	} catch {
		error(404, `Guide not found: ${params.slug}`);
	}
};
