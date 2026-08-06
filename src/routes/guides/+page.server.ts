// src/routes/guides/+page.server.ts
import type { PageServerLoad } from './$types';

export interface Guide {
	slug: string;
	title: string;
	description: string;
	category: string;
	readTime: string;
}

interface GuideModule {
	metadata?: {
		title?: string;
		description?: string;
		category?: string;
		readTime?: string;
	};
}

export const load: PageServerLoad = async () => {
	const modules = import.meta.glob<GuideModule>('/src/lib/content/guides/*.md', { eager: true });

	const guides: Guide[] = Object.entries(modules)
		.filter(([path]) => !path.includes('/_'))
		.map(([path, module]) => ({
			slug: path.split('/').pop()?.replace('.md', '') || '',
			title: module.metadata?.title ?? 'Untitled Guide',
			description: module.metadata?.description ?? '',
			category: module.metadata?.category ?? 'General',
			readTime: module.metadata?.readTime ?? '5 min read'
		}));

	const categories = ['All', ...new Set(guides.map((g) => g.category).filter(Boolean))];

	return {
		guides,
		categories
	};
};
