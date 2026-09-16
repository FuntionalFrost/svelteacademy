// src/routes/guides/+page.ts
import { getAllGuides, getAllGuideCategories, type GuideMeta } from '$lib/content/guides';
import type { PageLoad } from './$types';

export type Guide = GuideMeta;

export const load: PageLoad = async () => {
	const guides = getAllGuides();
	const categories = getAllGuideCategories();

	return {
		guides,
		categories
	};
};
