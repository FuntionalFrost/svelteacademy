// src/routes/guides/[slug]/+page.ts
import { getGuideBySlug, type GuideLink, type GuideMeta } from '$lib/content/guides';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export type GuideDetail = GuideMeta;
export type { GuideLink };

export const load: PageLoad = async ({ params }) => {
	const result = getGuideBySlug(params.slug);

	if (!result) {
		throw error(404, `Guide "${params.slug}" not found`);
	}

	return {
		content: result.content,
		guide: result.guide,
		prevGuide: result.prevGuide,
		nextGuide: result.nextGuide
	};
};
