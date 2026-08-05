// src/routes/posts/[id]/+page.server.ts
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	const post = await locals.db.getPost(params.id);
	return { post }; // Typed automatically!
};
