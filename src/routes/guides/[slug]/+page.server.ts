// src/routes/guides/[slug]/+page.server.ts
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export interface GuideDetail {
	slug: string;
	title: string;
	description: string;
	category: string;
	level: 'beginner' | 'intermediate' | 'advanced';
	readTime: string;
	content: string;
}

interface GuideModule {
	default: unknown;
	metadata?: Omit<GuideDetail, 'slug' | 'content'>;
}

export const load: PageServerLoad = async ({ params }) => {
	const modules = import.meta.glob<GuideModule>('/src/lib/content/guides/*.md', { eager: true });

	const matchedPath = Object.keys(modules).find((path) => path.endsWith(`/${params.slug}.md`));

	if (!matchedPath) {
		throw error(404, `Guide "${params.slug}" not found`);
	}

	const module = modules[matchedPath];

	// Get all guides for Prev/Next navigation
	const allGuides = Object.entries(modules)
		.filter(([path]) => !path.includes('/_'))
		.map(([path, mod]) => ({
			slug: path.split('/').pop()?.replace('.md', '') || '',
			title: mod.metadata?.title ?? 'Untitled',
			level: mod.metadata?.level ?? 'beginner'
		}));

	const currentIndex = allGuides.findIndex((g) => g.slug === params.slug);
	const prevGuide = currentIndex > 0 ? allGuides[currentIndex - 1] : null;
	const nextGuide = currentIndex < allGuides.length - 1 ? allGuides[currentIndex + 1] : null;

	return {
		guide: {
			slug: params.slug,
			title: module.metadata?.title ?? 'Untitled Guide',
			description: module.metadata?.description ?? '',
			category: module.metadata?.category ?? 'General',
			level: module.metadata?.level ?? 'beginner',
			readTime: module.metadata?.readTime ?? '5 min read'
		},
		prevGuide,
		nextGuide
	};
};
