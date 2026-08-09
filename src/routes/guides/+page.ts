// src/routes/guides/+page.ts
import type { PageLoad } from './$types';

export interface Guide {
	slug: string;
	title: string;
	description: string;
	category: string;
	level: 'beginner' | 'intermediate' | 'advanced';
	readTime: string;
}

interface GuideModule {
	metadata?: Record<string, unknown>;
	meta?: Record<string, unknown>;
	title?: string;
	description?: string;
	category?: string;
	level?: string;
	readTime?: string;
}

export const load: PageLoad = async () => {
	const modules = import.meta.glob<GuideModule>('/src/lib/content/guides/*.md', { eager: true });

	const guides: Guide[] = Object.entries(modules)
		.filter(([path]) => !path.includes('/_'))
		.map(([path, mod]) => {
			const slug = path.split('/').pop()?.replace('.md', '') || '';
			const meta = mod.metadata || mod.meta || mod || {};

			const fallbackTitle = slug
				.replace(/[-_]/g, ' ')
				.replace(/\b\w/g, (char: string) => char.toUpperCase());

			const rawLevel = String(meta.level || mod.level || 'beginner').toLowerCase();
			const validLevel: Guide['level'] =
				rawLevel === 'intermediate'
					? 'intermediate'
					: rawLevel === 'advanced'
						? 'advanced'
						: 'beginner';

			return {
				slug,
				title: meta.title || mod.title ? String(meta.title || mod.title) : fallbackTitle,
				description:
					meta.description || mod.description
						? String(meta.description || mod.description)
						: 'Explore practical patterns and code examples for Svelte 5.',
				category: meta.category || mod.category ? String(meta.category || mod.category) : 'General',
				level: validLevel,
				readTime:
					meta.readTime || mod.readTime ? String(meta.readTime || mod.readTime) : '5 min read'
			};
		});

	const categories = ['All', ...new Set(guides.map((g) => g.category).filter(Boolean))];

	return {
		guides,
		categories
	};
};
