// src/routes/guides/[slug]/+page.ts
import { error } from '@sveltejs/kit';
import type { Component } from 'svelte';
import type { PageLoad } from './$types';

export interface GuideDetail {
	slug: string;
	title: string;
	description: string;
	category: string;
	level: 'beginner' | 'intermediate' | 'advanced';
	readTime: string;
}

export interface GuideLink {
	slug: string;
	title: string;
	level: 'beginner' | 'intermediate' | 'advanced';
}

interface MarkdownModule {
	default: Component;
	metadata?: Partial<GuideDetail>;
}

export const load: PageLoad = async ({ params }) => {
	// 1. Fetch all markdown modules eager loaded via Vite
	const modules = import.meta.glob<MarkdownModule>('/src/lib/content/guides/*.md', {
		eager: true
	});

	// 2. Locate the specific guide matching params.slug
	const matchedEntry = Object.entries(modules).find(([path]) =>
		path.endsWith(`/${params.slug}.md`)
	);

	if (!matchedEntry) {
		throw error(404, `Guide "${params.slug}" not found`);
	}

	const [, targetModule] = matchedEntry;

	// 3. Extract all valid guides for Prev/Next navigation
	const allGuides = Object.entries(modules)
		.filter(([path]) => !path.includes('/_'))
		.map(([path, mod]) => {
			const slug = path.split('/').pop()?.replace('.md', '') || '';
			const rawLevel = String(mod.metadata?.level || 'beginner').toLowerCase();
			const validLevel: GuideLink['level'] =
				rawLevel === 'intermediate'
					? 'intermediate'
					: rawLevel === 'advanced'
						? 'advanced'
						: 'beginner';

			return {
				slug,
				title: mod.metadata?.title ?? 'Untitled Guide',
				level: validLevel
			};
		});

	const currentIndex = allGuides.findIndex((g) => g.slug === params.slug);
	const prevGuide = currentIndex > 0 ? allGuides[currentIndex - 1] : null;
	const nextGuide = currentIndex < allGuides.length - 1 ? allGuides[currentIndex + 1] : null;

	const rawLevel = String(targetModule.metadata?.level || 'beginner').toLowerCase();
	const validLevel: GuideDetail['level'] =
		rawLevel === 'intermediate'
			? 'intermediate'
			: rawLevel === 'advanced'
				? 'advanced'
				: 'beginner';

	return {
		content: targetModule.default, // MDsveX component ready for <svelte:component> or direct rendering
		guide: {
			slug: params.slug,
			title: targetModule.metadata?.title ?? 'Untitled Guide',
			description: targetModule.metadata?.description ?? '',
			category: targetModule.metadata?.category ?? 'General',
			level: validLevel,
			readTime: targetModule.metadata?.readTime ?? '5 min read'
		},
		prevGuide,
		nextGuide
	};
};
