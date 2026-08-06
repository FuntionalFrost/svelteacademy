<!-- src/routes/guides/+page.svelte -->
<script lang="ts">
	import { resolve } from '$app/paths';
	import SEO from '$lib/components/SEO.svelte';
	import { ArrowRight, BookOpen, CircleX, Search, Tag } from '@lucide/svelte';

	export interface Guide {
		slug: string;
		title: string;
		description: string;
		category: string;
		level: 'beginner' | 'intermediate' | 'advanced';
		readTime: string;
	}

	interface CustomPageData {
		guides: Record<string, unknown>[];
		categories: string[];
	}

	let { data }: { data: CustomPageData } = $props();

	// Defensive unwrapper with strict typing (no 'any')
	function normalizeGuide(item: Record<string, unknown>): Guide {
		const meta = (item?.meta || item?.metadata || {}) as Record<string, unknown>;
		const slug = String(item?.slug || '');
		const fallbackTitle = slug
			? slug.replace(/[-_]/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())
			: 'Untitled Guide';

		const rawLevel = String(item?.level || meta?.level || 'beginner').toLowerCase();
		const validLevel: Guide['level'] =
			rawLevel === 'intermediate'
				? 'intermediate'
				: rawLevel === 'advanced'
					? 'advanced'
					: 'beginner';

		return {
			slug,
			title: String(item?.title || meta?.title || fallbackTitle),
			description: String(item?.description || meta?.description || 'Explore Svelte 5 patterns.'),
			category: String(item?.category || meta?.category || 'General'),
			level: validLevel,
			readTime: String(item?.readTime || meta?.readTime || '5 min read')
		};
	}

	let guides = $derived((data?.guides ?? []).map(normalizeGuide));
	let categories = $derived(data?.categories ?? ['All']);

	// Reactive state signals for filters
	let searchQuery = $state('');
	let selectedCategory = $state('All');
	let selectedLevel = $state('All');

	const levels = ['All', 'beginner', 'intermediate', 'advanced'];

	const levelStyles: Record<string, string> = {
		beginner: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-500',
		intermediate: 'border-amber-500/30 bg-amber-500/10 text-amber-500',
		advanced: 'border-purple-500/30 bg-purple-500/10 text-purple-500'
	};

	// Safe derived signal filtering
	let filteredGuides = $derived(
		guides.filter((guide) => {
			const matchesCategory =
				selectedCategory === 'All' ||
				guide.category.toLowerCase() === selectedCategory.toLowerCase();

			const matchesLevel =
				selectedLevel === 'All' || guide.level.toLowerCase() === selectedLevel.toLowerCase();

			const query = searchQuery.toLowerCase().trim();
			const matchesSearch =
				!query ||
				guide.title.toLowerCase().includes(query) ||
				guide.description.toLowerCase().includes(query) ||
				guide.category.toLowerCase().includes(query);

			return matchesCategory && matchesLevel && matchesSearch;
		})
	);

	function resetFilters() {
		searchQuery = '';
		selectedCategory = 'All';
		selectedLevel = 'All';
	}
</script>

<SEO
	title="Svelte 5 Developer Guides & Tutorials"
	description="Explore interactive deep dives into Svelte 5 runes, state synchronization, SSR patterns, and performance optimizations."
/>

<div class="container mx-auto max-w-6xl px-4 py-12">
	<!-- Page Header -->
	<header class="mb-10 text-center sm:text-left">
		<h1 class="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
			Developer Guides
		</h1>
		<p class="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
			Practical architecture blueprints and rune-based patterns for building high-performance Svelte
			5 applications.
		</p>
	</header>

	<!-- Search & Filter Controls -->
	<div class="mb-8 flex flex-col gap-4">
		<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
			<!-- Search Input -->
			<div class="relative max-w-md flex-1">
				<Search class="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
				<input
					type="text"
					bind:value={searchQuery}
					placeholder="Search guides by keyword..."
					class="w-full rounded-xl border border-border bg-background py-2.5 pr-4 pl-10 text-sm text-foreground shadow-xs placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
				/>
				{#if searchQuery}
					<button
						onclick={() => (searchQuery = '')}
						class="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
					>
						<CircleX class="size-4" />
					</button>
				{/if}
			</div>

			<!-- Difficulty Level Pills -->
			<div class="flex flex-wrap items-center gap-1.5">
				<span class="mr-1 font-mono text-xs font-semibold text-muted-foreground">Level:</span>
				{#each levels as level (level)}
					<button
						onclick={() => (selectedLevel = level)}
						class="rounded-lg px-2.5 py-1 font-mono text-xs font-semibold capitalize transition-all {selectedLevel ===
						level
							? 'bg-primary text-primary-foreground shadow-xs'
							: 'border border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground'}"
					>
						{level}
					</button>
				{/each}
			</div>
		</div>

		<!-- Category Filter Pills -->
		<div class="flex flex-wrap items-center gap-2 border-t border-border pt-4">
			<span class="mr-1 font-mono text-xs font-semibold text-muted-foreground">Category:</span>
			{#each categories as category (category)}
				<button
					onclick={() => (selectedCategory = category)}
					class="rounded-lg px-3 py-1 font-mono text-xs font-semibold transition-all {selectedCategory ===
					category
						? 'bg-foreground text-background shadow-xs'
						: 'border border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground'}"
				>
					{category}
				</button>
			{/each}
		</div>
	</div>

	<!-- Results Count Badge -->
	<div class="mb-6 flex items-center justify-between font-mono text-xs text-muted-foreground">
		<span>Showing {filteredGuides.length} of {guides.length} guides</span>
		{#if selectedCategory !== 'All' || selectedLevel !== 'All' || searchQuery}
			<button onclick={resetFilters} class="font-semibold text-primary hover:underline">
				Clear active filters
			</button>
		{/if}
	</div>

	<!-- Guides Grid -->
	{#if filteredGuides.length > 0}
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each filteredGuides as guide (guide.slug)}
				<a
					href={resolve('/guides/[slug]', { slug: guide.slug })}
					class="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-md"
				>
					<div>
						<div class="mb-3 flex items-center justify-between gap-2">
							<span
								class="inline-flex items-center gap-1 rounded-md border border-primary/20 bg-primary/10 px-2.5 py-0.5 font-mono text-xs font-semibold text-primary"
							>
								<Tag class="size-3" />
								{guide.category}
							</span>

							<span
								class="inline-flex items-center gap-1 rounded-md border px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider uppercase {levelStyles[
									guide.level
								] ?? levelStyles.beginner}"
							>
								{guide.level}
							</span>
						</div>

						<h2
							class="text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary"
						>
							{guide.title}
						</h2>

						<p class="mt-2 line-clamp-3 text-sm text-muted-foreground">
							{guide.description}
						</p>
					</div>

					<div class="mt-6 flex items-center justify-between">
						<span class="font-mono text-xs text-muted-foreground">{guide.readTime}</span>
						<div class="flex items-center gap-1.5 font-mono text-xs font-semibold text-primary">
							<span>Read guide</span>
							<ArrowRight class="size-3.5 transition-transform group-hover:translate-x-1" />
						</div>
					</div>
				</a>
			{/each}
		</div>
	{:else}
		<!-- Empty Search State -->
		<div class="rounded-2xl border border-dashed border-border p-12 text-center">
			<BookOpen class="mx-auto mb-3 size-10 text-muted-foreground/60" />
			<h3 class="text-base font-bold text-foreground">No guides found</h3>
			<p class="mt-1 text-sm text-muted-foreground">
				Try clearing your search query or selecting a different level/category filter.
			</p>
			<button
				onclick={resetFilters}
				class="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition hover:bg-primary/90"
			>
				Reset Filters
			</button>
		</div>
	{/if}
</div>
