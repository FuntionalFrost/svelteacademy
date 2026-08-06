// src/routes/guides/[slug]/+page.ts
import { error } from '@sveltejs/kit';
import type { Component } from 'svelte';
import type { PageLoad } from './$types';

export interface GuideDetail {
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
	default: Component; // Replaced 'any' with Svelte's Component type
	metadata?: Omit<GuideDetail, 'slug'>;
}

export const load: PageLoad = async ({ params }) => {
	try {
		// Dynamically import the specific markdown file
		const post = (await import(`../../../lib/content/guides/${params.slug}.md`)) as MarkdownModule;

		// Load all guides for Prev/Next navigation
		const modules = import.meta.glob<MarkdownModule>('/src/lib/content/guides/*.md', {
			eager: true
		});

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
			content: post.default,
			guide: {
				title: post.metadata?.title ?? 'Untitled Guide',
				description: post.metadata?.description ?? '',
				category: post.metadata?.category ?? 'General',
				level: post.metadata?.level ?? 'beginner',
				readTime: post.metadata?.readTime ?? '5 min read'
			},
			prevGuide,
			nextGuide
		};
	} catch {
		// Removed the unused 'err' variable
		throw error(404, `Guide "${params.slug}" not found`);
	}
};
