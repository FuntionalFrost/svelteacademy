// src/lib/content/guides.ts
import type { Component } from 'svelte';

export type GuideLevel = 'beginner' | 'intermediate' | 'advanced';

export interface GuideMeta {
	slug: string;
	title: string;
	description: string;
	category: string;
	level: GuideLevel;
	readTime: string;
	date?: string;
}

export interface GuideLink {
	slug: string;
	title: string;
	level: GuideLevel;
}

export interface GuideDetailResult {
	content: Component;
	guide: GuideMeta;
	prevGuide: GuideLink | null;
	nextGuide: GuideLink | null;
}

interface MarkdownModule {
	default: Component;
	metadata?: Partial<GuideMeta>;
	meta?: Partial<GuideMeta>;
	title?: string;
	description?: string;
	category?: string;
	level?: string;
	readTime?: string;
	date?: string;
}

const modules = import.meta.glob<MarkdownModule>('/src/lib/content/guides/*.md', {
	eager: true
});

function parseLevel(raw?: string): GuideLevel {
	const level = String(raw || 'beginner').toLowerCase();
	if (level === 'intermediate' || level === 'advanced') {
		return level;
	}
	return 'beginner';
}

export const levelBadgeStyles: Record<GuideLevel, string> = {
	beginner: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-500',
	intermediate: 'border-amber-500/30 bg-amber-500/10 text-amber-500',
	advanced: 'border-purple-500/30 bg-purple-500/10 text-purple-500'
};

export function getAllGuides(): GuideMeta[] {
	return Object.entries(modules)
		.filter(([path]) => !path.includes('/_'))
		.map(([path, mod]) => {
			const slug = path.split('/').pop()?.replace('.md', '') || '';
			const meta = mod.metadata || mod.meta || mod || {};

			const fallbackTitle = slug
				.replace(/[-_]/g, ' ')
				.replace(/\b\w/g, (char: string) => char.toUpperCase());

			return {
				slug,
				title: meta.title || mod.title ? String(meta.title || mod.title) : fallbackTitle,
				description:
					meta.description || mod.description
						? String(meta.description || mod.description)
						: 'Explore practical patterns and code examples for Svelte 5.',
				category: meta.category || mod.category ? String(meta.category || mod.category) : 'General',
				level: parseLevel(meta.level || mod.level),
				readTime:
					meta.readTime || mod.readTime ? String(meta.readTime || mod.readTime) : '5 min read',
				date: meta.date || mod.date ? String(meta.date || mod.date) : undefined
			};
		});
}

export function getAllGuideCategories(): string[] {
	const guides = getAllGuides();
	return ['All', ...new Set(guides.map((g) => g.category).filter(Boolean))];
}

export function getGuideBySlug(slug: string): GuideDetailResult | null {
	const matchedEntry = Object.entries(modules).find(([path]) => path.endsWith(`/${slug}.md`));

	if (!matchedEntry) {
		return null;
	}

	const [, targetModule] = matchedEntry;
	const allGuides = getAllGuides();
	const currentIndex = allGuides.findIndex((g) => g.slug === slug);

	const prevGuide: GuideLink | null =
		currentIndex > 0
			? {
					slug: allGuides[currentIndex - 1].slug,
					title: allGuides[currentIndex - 1].title,
					level: allGuides[currentIndex - 1].level
				}
			: null;

	const nextGuide: GuideLink | null =
		currentIndex < allGuides.length - 1 && currentIndex >= 0
			? {
					slug: allGuides[currentIndex + 1].slug,
					title: allGuides[currentIndex + 1].title,
					level: allGuides[currentIndex + 1].level
				}
			: null;

	const meta = targetModule.metadata || targetModule.meta || targetModule || {};
	const fallbackTitle = slug
		.replace(/[-_]/g, ' ')
		.replace(/\b\w/g, (char: string) => char.toUpperCase());

	return {
		content: targetModule.default,
		guide: {
			slug,
			title:
				meta.title || targetModule.title ? String(meta.title || targetModule.title) : fallbackTitle,
			description:
				meta.description || targetModule.description
					? String(meta.description || targetModule.description)
					: '',
			category:
				meta.category || targetModule.category
					? String(meta.category || targetModule.category)
					: 'General',
			level: parseLevel(meta.level || targetModule.level),
			readTime:
				meta.readTime || targetModule.readTime
					? String(meta.readTime || targetModule.readTime)
					: '5 min read',
			date: meta.date || targetModule.date ? String(meta.date || targetModule.date) : undefined
		},
		prevGuide,
		nextGuide
	};
}
