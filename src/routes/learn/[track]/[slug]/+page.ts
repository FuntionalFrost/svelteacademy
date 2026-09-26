// src/routes/learn/[track]/[slug]/+page.ts
import { getAdjacentLessons, getLesson, getTrack } from '$lib/content/curriculum';
import { error } from '@sveltejs/kit';
import type { Component } from 'svelte';
import type { PageLoad } from './$types';

interface MarkdownModule {
	default: Component;
	metadata?: Record<string, unknown>;
}

const modules = import.meta.glob<MarkdownModule>('/src/lib/content/learn/*/*.md', {
	eager: true
});

export const load: PageLoad = async ({ params }) => {
	const { track, slug } = params;
	const lessonMeta = getLesson(track, slug);
	const trackMeta = getTrack(track);

	if (!lessonMeta || !trackMeta) {
		error(404, {
			message: `Lesson "${slug}" in track "${track}" was not found in curriculum.`
		});
	}

	const path = `/src/lib/content/learn/${track}/${slug}.md`;
	const mod = modules[path];

	if (!mod) {
		error(404, {
			message: `Lesson content for "${track}/${slug}" could not be loaded.`
		});
	}

	const { prevLesson, nextLesson } = getAdjacentLessons(track, slug);

	return {
		lesson: lessonMeta,
		track: trackMeta,
		content: mod.default,
		prevLesson,
		nextLesson
	};
};
