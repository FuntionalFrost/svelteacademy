// src/routes/guides/+page.ts
interface GuideModule {
	metadata: {
		title?: string;
		description?: string;
		category?: string;
		readTime?: string;
	};
}

export const load = async () => {
	// Pass generic interface to glob for full type safety without 'any'
	const modules = import.meta.glob<GuideModule>('/src/lib/content/guides/*.md', { eager: true });

	const guides = Object.entries(modules).map(([path, module]) => {
		const slug = path.split('/').pop()?.replace('.md', '');
		return {
			slug,
			meta: module.metadata
		};
	});

	return { guides };
};
