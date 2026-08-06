// src/routes/tracks/+page.server.ts
import { TRACKS } from '$lib/config/tracks';
import type { PageServerLoad } from './$types';

interface GuideModule {
	metadata?: {
		title?: string;
		readTime?: string;
	};
}

export const load: PageServerLoad = async () => {
	// Pass GuideModule type to import.meta.glob to type frontmatter automatically
	const guideFiles = import.meta.glob<GuideModule>('/src/lib/content/guides/*.md', { eager: true });

	const guidesMeta = Object.entries(guideFiles)
		.filter(([filepath]) => !filepath.includes('/_'))
		.map(([filepath, file]) => {
			const slug = filepath.split('/').pop()?.replace('.md', '') || '';
			return {
				slug,
				title: file.metadata?.title || slug,
				readTime: file.metadata?.readTime || '5 min read'
			};
		});

	return {
		tracks: TRACKS,
		guidesMeta
	};
};
