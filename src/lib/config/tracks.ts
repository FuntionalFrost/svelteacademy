// src/lib/config/tracks.ts

export interface Track {
	id: string;
	title: string;
	badge: string;
	description: string;
	level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
	slugs: string[];
}

export const TRACKS: Track[] = [
	{
		id: 'foundations',
		title: '1. Foundations & Mental Model',
		badge: 'Level 1',
		level: 'Beginner',
		description:
			'Master the core web fundamentals. Learn why Svelte is an HTML superset and how compiler reactivity eliminates DOM boilerplate.',
		slugs: [
			'svelte-5-for-absolute-beginners',
			'svelte-5-vs-vanilla-javascript',
			'svelte-is-a-superset-of-html'
		]
	},
	{
		id: 'core-primitives',
		title: '2. Svelte 5 Core Primitives',
		badge: 'Level 2',
		level: 'Intermediate',
		description:
			'Deep dive into modern Svelte 5 primitives: fine-grained $state signals, $derived calculations, component $props, $bindable, and {#snippet} render tags.',
		slugs: [
			'svelte-5-runes-deep-dive',
			'svelte-5-props-and-bindable',
			'svelte-5-snippets-and-render',
			'svelte-5-event-handlers-and-custom-events'
		]
	},
	{
		id: 'advanced-architecture',
		title: '3. Advanced Architecture & Tooling',
		badge: 'Level 3',
		level: 'Advanced',
		description:
			'Scale your applications with universal .svelte.ts state singletons, custom DOM actions, fine-grained timing runes ($derived.by, $effect.pre), and $inspect debugging.',
		slugs: [
			'shared-state-with-svelte-ts',
			'svelte-5-derived-by-and-effect-pre',
			'svelte-5-reusable-dom-actions',
			'svelte-5-transitions-and-animations',
			'svelte-5-inspect-and-debugging'
		]
	},
	{
		id: 'fullstack-ecosystem',
		title: '4. Full-Stack SvelteKit & Benchmarks',
		badge: 'Level 4',
		level: 'All Levels',
		description:
			'Build full-stack SSR apps using SvelteKit form actions, streaming promises, and evaluate architectural benchmarks against React 19, SolidJS, Vue 3, and HTMX.',
		slugs: [
			'sveltekit-form-actions-and-runes',
			'sveltekit-streaming-and-promises',
			'react-19-vs-svelte-5',
			'svelte-5-vs-solid-vue-react',
			'sveltekit-tailwind-vs-htmx-alpine'
		]
	}
];
