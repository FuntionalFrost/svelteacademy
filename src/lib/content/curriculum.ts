// src/lib/content/curriculum.ts
export type TrackId = 'basic-svelte' | 'advanced-svelte' | 'basic-sveltekit' | 'advanced-sveltekit';
export type LessonLevel = 'beginner' | 'intermediate' | 'advanced';

export interface LessonMeta {
	slug: string;
	title: string;
	trackId: TrackId;
	trackTitle: string;
	description: string;
	level: LessonLevel;
	readTime: string;
	order: number;
	playgroundSnippet?: string;
}

export interface TrackMeta {
	id: TrackId;
	title: string;
	shortTitle: string;
	badge: string;
	description: string;
	level: LessonLevel;
	accentColor: string;
	iconName: string;
	lessons: LessonMeta[];
}

export const CURRICULUM_TRACKS: TrackMeta[] = [
	{
		id: 'basic-svelte',
		title: 'Basic Svelte',
		shortTitle: 'Basic Svelte',
		badge: 'Track 1',
		description:
			'Master core Svelte 5 runes, reactivity mental models, props, logic blocks, and event handling.',
		level: 'beginner',
		accentColor: 'from-orange-500 to-amber-500',
		iconName: 'Flame',
		lessons: [
			{
				slug: 'introduction',
				title: 'Introduction',
				trackId: 'basic-svelte',
				trackTitle: 'Basic Svelte',
				description:
					'Anatomy of a Svelte component, superset of HTML, and the fine-grained reactivity mental model.',
				level: 'beginner',
				readTime: '4 min read',
				order: 1
			},
			{
				slug: 'reactivity',
				title: 'Reactivity',
				trackId: 'basic-svelte',
				trackTitle: 'Basic Svelte',
				description:
					'Deep dive into $state(), $derived(), $derived.by(), and $effect() with fine-grained reactivity.',
				level: 'beginner',
				readTime: '6 min read',
				order: 2
			},
			{
				slug: 'props',
				title: 'Props',
				trackId: 'basic-svelte',
				trackTitle: 'Basic Svelte',
				description:
					'Passing data into components with $props(), destructuring, default fallbacks, and rest attributes.',
				level: 'beginner',
				readTime: '5 min read',
				order: 3
			},
			{
				slug: 'logic',
				title: 'Logic',
				trackId: 'basic-svelte',
				trackTitle: 'Basic Svelte',
				description:
					'Conditional rendering with {#if}, list iteration with keyed {#each}, {#key}, and async {#await}.',
				level: 'beginner',
				readTime: '6 min read',
				order: 4
			},
			{
				slug: 'events',
				title: 'Events',
				trackId: 'basic-svelte',
				trackTitle: 'Basic Svelte',
				description:
					'Modern event handling with standard attributes (onclick, onkeydown) and custom event callbacks.',
				level: 'beginner',
				readTime: '5 min read',
				order: 5
			},
			{
				slug: 'bindings',
				title: 'Bindings',
				trackId: 'basic-svelte',
				trackTitle: 'Basic Svelte',
				description:
					'Two-way data binding with bind:value, bind:checked, bind:group, and component $bindable().',
				level: 'beginner',
				readTime: '5 min read',
				order: 6
			},
			{
				slug: 'classes-and-style',
				title: 'Classes and Style',
				trackId: 'basic-svelte',
				trackTitle: 'Basic Svelte',
				description:
					'Dynamic classes with class:active, object shorthand, inline style directives, and scoped CSS.',
				level: 'beginner',
				readTime: '4 min read',
				order: 7
			},
			{
				slug: 'attachments',
				title: 'Attachments',
				trackId: 'basic-svelte',
				trackTitle: 'Basic Svelte',
				description:
					'Encapsulating reusable DOM behaviors with actions (use:action) and Svelte 5 attachments.',
				level: 'intermediate',
				readTime: '6 min read',
				order: 8
			},
			{
				slug: 'transitions',
				title: 'Transitions',
				trackId: 'basic-svelte',
				trackTitle: 'Basic Svelte',
				description:
					'Declarative animations with transition:fade, transition:fly, transition:slide, and easings.',
				level: 'beginner',
				readTime: '5 min read',
				order: 9
			}
		]
	},
	{
		id: 'advanced-svelte',
		title: 'Advanced Svelte',
		shortTitle: 'Advanced Svelte',
		badge: 'Track 2',
		description:
			'Elevate your Svelte architecture with snippets, physics motion, advanced bindings, and context trees.',
		level: 'intermediate',
		accentColor: 'from-purple-500 to-indigo-500',
		iconName: 'Cpu',
		lessons: [
			{
				slug: 'advanced-reactivity',
				title: 'Advanced Reactivity',
				trackId: 'advanced-svelte',
				trackTitle: 'Advanced Svelte',
				description:
					'$state.raw(), $state.snapshot(), untrack(), $effect.pre(), and encapsulated class state.',
				level: 'advanced',
				readTime: '7 min read',
				order: 1
			},
			{
				slug: 'reusing-content',
				title: 'Reusing Content',
				trackId: 'advanced-svelte',
				trackTitle: 'Advanced Svelte',
				description:
					'First-class template snippets with {#snippet ...} and {@render ...} replacing legacy slots.',
				level: 'intermediate',
				readTime: '5 min read',
				order: 2
			},
			{
				slug: 'motion',
				title: 'Motion',
				trackId: 'advanced-svelte',
				trackTitle: 'Advanced Svelte',
				description:
					'Physics-based animation with Tween and Spring from svelte/motion for natural fluid motion.',
				level: 'intermediate',
				readTime: '6 min read',
				order: 3
			},
			{
				slug: 'advanced-bindings',
				title: 'Advanced Bindings',
				trackId: 'advanced-svelte',
				trackTitle: 'Advanced Svelte',
				description:
					'Element dimension bindings (clientWidth, offsetHeight), media players, and contenteditable.',
				level: 'intermediate',
				readTime: '5 min read',
				order: 4
			},
			{
				slug: 'advanced-transitions',
				title: 'Advanced Transitions',
				trackId: 'advanced-svelte',
				trackTitle: 'Advanced Svelte',
				description:
					'Deferred transitions with crossfade, custom transition algorithms, and animate:flip list animations.',
				level: 'advanced',
				readTime: '7 min read',
				order: 5
			},
			{
				slug: 'context-api',
				title: 'Context API',
				trackId: 'advanced-svelte',
				trackTitle: 'Advanced Svelte',
				description:
					'Prop-drilling elimination with setContext(), getContext(), and type-safe symbol keys.',
				level: 'intermediate',
				readTime: '5 min read',
				order: 6
			},
			{
				slug: 'special-elements',
				title: 'Special Elements',
				trackId: 'advanced-svelte',
				trackTitle: 'Advanced Svelte',
				description:
					'<svelte:window>, <svelte:document>, <svelte:body>, <svelte:head>, and <svelte:boundary>.',
				level: 'intermediate',
				readTime: '6 min read',
				order: 7
			},
			{
				slug: 'script-module',
				title: '<script module>',
				trackId: 'advanced-svelte',
				trackTitle: 'Advanced Svelte',
				description:
					'Module-level scripts, singleton stores across instances, and shared static exports.',
				level: 'intermediate',
				readTime: '4 min read',
				order: 8
			},
			{
				slug: 'next-steps',
				title: 'Next Steps',
				trackId: 'advanced-svelte',
				trackTitle: 'Advanced Svelte',
				description:
					'Packaging libraries with @sveltejs/package, testing with Vitest, and production ecosystem.',
				level: 'intermediate',
				readTime: '5 min read',
				order: 9
			}
		]
	},
	{
		id: 'basic-sveltekit',
		title: 'Basic SvelteKit',
		shortTitle: 'Basic SvelteKit',
		badge: 'Track 3',
		description:
			'Build robust full-stack applications with file-based routing, server loading, form actions, and API routes.',
		level: 'beginner',
		accentColor: 'from-emerald-500 to-teal-500',
		iconName: 'Layers',
		lessons: [
			{
				slug: 'introduction',
				title: 'Introduction',
				trackId: 'basic-sveltekit',
				trackTitle: 'Basic SvelteKit',
				description:
					'Full-stack philosophy, server vs client execution environments, and project architecture.',
				level: 'beginner',
				readTime: '4 min read',
				order: 1
			},
			{
				slug: 'routing',
				title: 'Routing',
				trackId: 'basic-sveltekit',
				trackTitle: 'Basic SvelteKit',
				description:
					'File-based routing with +page.svelte, +layout.svelte, +error.svelte, and dynamic segments [slug].',
				level: 'beginner',
				readTime: '5 min read',
				order: 2
			},
			{
				slug: 'loading-data',
				title: 'Loading Data',
				trackId: 'basic-sveltekit',
				trackTitle: 'Basic SvelteKit',
				description:
					'Universal load in +page.ts vs server load in +page.server.ts, PageData typing, and parent data.',
				level: 'intermediate',
				readTime: '7 min read',
				order: 3
			},
			{
				slug: 'headers-and-cookies',
				title: 'Headers and Cookies',
				trackId: 'basic-sveltekit',
				trackTitle: 'Basic SvelteKit',
				description:
					'Setting HTTP response headers, reading and mutating secure session cookies with cookies.set().',
				level: 'intermediate',
				readTime: '5 min read',
				order: 4
			},
			{
				slug: 'shared-modules',
				title: 'Shared Modules',
				trackId: 'basic-sveltekit',
				trackTitle: 'Basic SvelteKit',
				description:
					'$lib alias, server-only code security boundaries ($lib/server), and static asset hosting.',
				level: 'beginner',
				readTime: '4 min read',
				order: 5
			},
			{
				slug: 'forms',
				title: 'Forms',
				trackId: 'basic-sveltekit',
				trackTitle: 'Basic SvelteKit',
				description:
					'Server actions in +page.server.ts, progressive enhancement with use:enhance, and validation.',
				level: 'intermediate',
				readTime: '7 min read',
				order: 6
			},
			{
				slug: 'api-routes',
				title: 'API Routes',
				trackId: 'basic-sveltekit',
				trackTitle: 'Basic SvelteKit',
				description:
					'Writing custom HTTP endpoints in +server.ts (GET, POST, PATCH, DELETE) with json() helper.',
				level: 'intermediate',
				readTime: '5 min read',
				order: 7
			},
			{
				slug: 'app-state',
				title: '$app/state',
				trackId: 'basic-sveltekit',
				trackTitle: 'Basic SvelteKit',
				description:
					'Reactive navigation signals (page, navigating, updated) replacing legacy SvelteKit stores.',
				level: 'beginner',
				readTime: '4 min read',
				order: 8
			},
			{
				slug: 'errors-and-redirects',
				title: 'Errors and Redirects',
				trackId: 'basic-sveltekit',
				trackTitle: 'Basic SvelteKit',
				description:
					'Throwing error() and redirect() helpers, custom error pages, and nested error boundaries.',
				level: 'beginner',
				readTime: '5 min read',
				order: 9
			}
		]
	},
	{
		id: 'advanced-sveltekit',
		title: 'Advanced SvelteKit',
		shortTitle: 'Advanced SvelteKit',
		badge: 'Track 4',
		description:
			'Enterprise full-stack patterns: server hooks, streaming promises, route matchers, and env security.',
		level: 'advanced',
		accentColor: 'from-cyan-500 to-blue-500',
		iconName: 'Sparkles',
		lessons: [
			{
				slug: 'hooks',
				title: 'Hooks',
				trackId: 'advanced-sveltekit',
				trackTitle: 'Advanced SvelteKit',
				description:
					'Server hooks (handle, handleFetch, handleError), middleware chains with sequence(), and auth.',
				level: 'advanced',
				readTime: '7 min read',
				order: 1
			},
			{
				slug: 'page-options',
				title: 'Page Options',
				trackId: 'advanced-sveltekit',
				trackTitle: 'Advanced SvelteKit',
				description:
					'Configuring prerender, ssr, csr, and trailingSlash at route-level or root layouts.',
				level: 'intermediate',
				readTime: '5 min read',
				order: 2
			},
			{
				slug: 'link-options',
				title: 'Link Options',
				trackId: 'advanced-sveltekit',
				trackTitle: 'Advanced SvelteKit',
				description:
					'Optimizing navigation with data-sveltekit-preload-data, preload-code, reload, and noscroll.',
				level: 'intermediate',
				readTime: '5 min read',
				order: 3
			},
			{
				slug: 'advanced-options',
				title: 'Advanced Options',
				trackId: 'advanced-sveltekit',
				trackTitle: 'Advanced SvelteKit',
				description:
					'Progressive Web Apps with $service-worker, form state preservation with snapshot, and CSP.',
				level: 'advanced',
				readTime: '6 min read',
				order: 4
			},
			{
				slug: 'advanced-routing',
				title: 'Advanced Routing',
				trackId: 'advanced-sveltekit',
				trackTitle: 'Advanced SvelteKit',
				description:
					'Route parameter matchers [id=integer], route groups (app), rest params, and optional params.',
				level: 'advanced',
				readTime: '6 min read',
				order: 5
			},
			{
				slug: 'advanced-loading',
				title: 'Advanced Loading',
				trackId: 'advanced-sveltekit',
				trackTitle: 'Advanced SvelteKit',
				description:
					'Streaming non-critical promises with {#await}, cache invalidation with depends() and invalidate().',
				level: 'advanced',
				readTime: '7 min read',
				order: 6
			},
			{
				slug: 'environment-variables',
				title: 'Environment Variables',
				trackId: 'advanced-sveltekit',
				trackTitle: 'Advanced SvelteKit',
				description:
					'Static vs dynamic, public vs private ($env/static/private, $env/dynamic/public) security.',
				level: 'intermediate',
				readTime: '5 min read',
				order: 7
			},
			{
				slug: 'conclusion',
				title: 'Conclusion',
				trackId: 'advanced-sveltekit',
				trackTitle: 'Advanced SvelteKit',
				description:
					'Production deployment with adapters (static, node, cloudflare, vercel) and graduation checklist.',
				level: 'intermediate',
				readTime: '5 min read',
				order: 8
			}
		]
	}
];

export function getAllTracks(): TrackMeta[] {
	return CURRICULUM_TRACKS;
}

export function getTrack(trackId: string): TrackMeta | undefined {
	return CURRICULUM_TRACKS.find((t) => t.id === trackId);
}

export function getAllLessons(): LessonMeta[] {
	return CURRICULUM_TRACKS.flatMap((track) => track.lessons);
}

export function getLesson(trackId: string, slug: string): LessonMeta | undefined {
	const track = getTrack(trackId);
	return track?.lessons.find((l) => l.slug === slug);
}

export function getAdjacentLessons(
	trackId: string,
	slug: string
): {
	prevLesson: LessonMeta | null;
	nextLesson: LessonMeta | null;
} {
	const allLessons = getAllLessons();
	const currentIndex = allLessons.findIndex((l) => l.trackId === trackId && l.slug === slug);

	if (currentIndex === -1) {
		return { prevLesson: null, nextLesson: null };
	}

	return {
		prevLesson: currentIndex > 0 ? allLessons[currentIndex - 1] : null,
		nextLesson: currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null
	};
}
