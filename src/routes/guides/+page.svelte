<!-- src/routes/guides/+page.svelte -->
<script lang="ts">
	import { resolve } from '$app/paths';
	import SEO from '$lib/components/SEO.svelte';
	import {
		ArrowRight,
		BookOpen,
		CircleX,
		Clock,
		Cpu,
		Flame,
		Layers,
		Search,
		Sparkles,
		Tag
	} from '@lucide/svelte';
	import { Badge, Kbd, useDebounce, useShortcuts } from 'yaxa-svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Reactive state signals for filters
	let searchQuery = $state('');
	let selectedCategory = $state('All');
	let selectedLevel = $state('All');
	let searchInputEl = $state<HTMLInputElement | null>(null);

	const levels = ['All', 'beginner', 'intermediate', 'advanced'];

	// Debounced search query for silky-smooth filtering
	const debouncedSearch = useDebounce(() => searchQuery, 150);

	// Quick hotkey: press '/' to focus search input
	$effect(() => {
		return useShortcuts({
			'/': () => searchInputEl?.focus()
		});
	});

	// Safe derived signal filtering
	let filteredGuides = $derived(
		(data.guides ?? []).filter((guide) => {
			const matchesCategory =
				selectedCategory === 'All' ||
				guide.category.toLowerCase() === selectedCategory.toLowerCase();

			const matchesLevel =
				selectedLevel === 'All' || guide.level.toLowerCase() === selectedLevel.toLowerCase();

			const query = debouncedSearch.value.toLowerCase().trim();
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

	function getCategoryCount(cat: string): number {
		if (cat === 'All') return data.guides.length;
		return data.guides.filter((g) => g.category.toLowerCase() === cat.toLowerCase()).length;
	}

	// Featured masterclass guide (first guide or designated spotlight)
	let featuredGuide = $derived(
		data.guides.find((g) => g.slug.includes('runes-deep-dive') || g.slug.includes('complete')) ||
			data.guides[0]
	);
</script>

<SEO
	title="Svelte 5 Developer Guides & Tutorials"
	description="Explore interactive deep dives into Svelte 5 runes, state synchronization, SSR patterns, and performance optimizations."
/>

<div class="container mx-auto max-w-6xl px-4 py-12">
	<!-- Page Header with Ambient Accent -->
	<header class="mb-10 text-center sm:text-left">
		<div
			class="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 font-mono text-sm font-semibold text-primary"
		>
			<Sparkles class="size-4" />
			<span>Architecture Masterclass Curriculum</span>
		</div>
		<h1 class="text-3xl font-black tracking-tight text-foreground sm:text-5xl">
			Developer <span
				class="bg-linear-to-r from-primary via-emerald-400 to-cyan-400 bg-clip-text text-transparent"
				>Guides & Tutorials</span
			>
		</h1>
		<p class="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
			Practical architecture blueprints, rune-based reactivity patterns, and performance benchmarks
			for production Svelte 5 & SvelteKit applications.
		</p>
	</header>

	<!-- Enhanced Curriculum Overview Metric Cards -->
	<div class="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
		<div
			class="relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-xs transition-all hover:border-primary/40 hover:shadow-sm"
		>
			<div
				class="absolute top-0 right-0 -mt-4 -mr-4 size-24 rounded-full bg-primary/5 blur-xl"
			></div>
			<div class="flex items-center justify-between">
				<span class="font-mono text-xs font-bold tracking-wider text-muted-foreground uppercase">
					Total Lessons
				</span>
				<div class="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
					<BookOpen class="size-4" />
				</div>
			</div>
			<div class="mt-3 font-mono text-3xl font-black text-foreground">{data.guides.length}</div>
			<p class="mt-1 text-xs text-muted-foreground">In-depth architecture tutorials</p>
		</div>

		<div
			class="relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-xs transition-all hover:border-cyan-500/40 hover:shadow-sm"
		>
			<div
				class="absolute top-0 right-0 -mt-4 -mr-4 size-24 rounded-full bg-cyan-500/5 blur-xl"
			></div>
			<div class="flex items-center justify-between">
				<span class="font-mono text-xs font-bold tracking-wider text-muted-foreground uppercase">
					Curriculum Tracks
				</span>
				<div
					class="flex size-8 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-500"
				>
					<Layers class="size-4" />
				</div>
			</div>
			<div class="mt-3 font-mono text-3xl font-black text-foreground">
				{data.categories.length - 1} Tracks
			</div>
			<p class="mt-1 text-xs text-muted-foreground">Reactivity, SSR, APIs & tooling</p>
		</div>

		<div
			class="relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-xs transition-all hover:border-emerald-500/40 hover:shadow-sm"
		>
			<div
				class="absolute top-0 right-0 -mt-4 -mr-4 size-24 rounded-full bg-emerald-500/5 blur-xl"
			></div>
			<div class="flex items-center justify-between">
				<span class="font-mono text-xs font-bold tracking-wider text-muted-foreground uppercase">
					Runtime Target
				</span>
				<div
					class="flex size-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500"
				>
					<Cpu class="size-4" />
				</div>
			</div>
			<div class="mt-3 font-mono text-3xl font-black text-foreground">Svelte 5</div>
			<p class="mt-1 text-xs text-muted-foreground">Signal runes & SvelteKit 2</p>
		</div>
	</div>

	<!-- Spotlight Featured Guide Banner (when no active search/filters) -->
	{#if selectedCategory === 'All' && selectedLevel === 'All' && !searchQuery && featuredGuide}
		<div
			class="group relative mb-10 overflow-hidden rounded-2xl border border-primary/30 bg-linear-to-br from-primary/10 via-card to-card p-6 shadow-md transition-all hover:border-primary/60 hover:shadow-lg sm:p-8"
		>
			<div class="h-1 w-full bg-linear-to-r from-primary via-emerald-400 to-cyan-400"></div>

			<div class="mt-4 flex flex-col justify-between gap-6 md:flex-row md:items-center">
				<div class="space-y-3">
					<div class="flex flex-wrap items-center gap-2">
						<span
							class="inline-flex items-center gap-1.5 rounded-md border border-primary/40 bg-primary/20 px-2.5 py-0.5 font-mono text-xs font-bold text-primary uppercase"
						>
							<Flame class="size-3" />
							Featured Lesson
						</span>
						<Badge size="xs" variant="subtle" color="primary">{featuredGuide.category}</Badge>
						<span class="font-mono text-xs text-muted-foreground">{featuredGuide.readTime}</span>
					</div>

					<h2
						class="text-xl font-black tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-2xl"
					>
						{featuredGuide.title}
					</h2>

					<p class="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
						{featuredGuide.description}
					</p>
				</div>

				<a
					href={resolve(`/guides/${featuredGuide.slug}`)}
					class="inline-flex shrink-0 items-center gap-2 rounded-xl bg-primary px-5 py-3 font-mono text-sm font-bold text-primary-foreground shadow-sm transition hover:brightness-110 active:scale-95"
				>
					<span>Start Masterclass</span>
					<ArrowRight class="size-4 transition-transform group-hover:translate-x-1" />
				</a>
			</div>
		</div>
	{/if}

	<!-- Search & Filter Controls -->
	<div class="mb-8 flex flex-col gap-4">
		<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
			<!-- Search Input -->
			<div class="relative max-w-md flex-1">
				<Search class="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
				<input
					bind:this={searchInputEl}
					type="text"
					bind:value={searchQuery}
					placeholder="Search guides by keyword (press '/' to focus)..."
					class="w-full rounded-xl border border-border bg-background py-2.5 pr-10 pl-10 text-base text-foreground shadow-xs placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
				/>
				{#if searchQuery}
					<button
						onclick={() => (searchQuery = '')}
						class="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
						aria-label="Clear search query"
					>
						<CircleX class="size-4" />
					</button>
				{:else}
					<span
						class="pointer-events-none absolute top-1/2 right-3 hidden -translate-y-1/2 sm:inline-block"
					>
						<Kbd size="xs">/</Kbd>
					</span>
				{/if}
			</div>

			<!-- Difficulty Level Pills with Color Indicators -->
			<div class="flex flex-wrap items-center gap-1.5">
				<span class="mr-1 font-mono text-xs font-semibold text-muted-foreground uppercase"
					>Level:</span
				>
				{#each levels as level (level)}
					{@const isSelected = selectedLevel === level}
					<button
						onclick={() => (selectedLevel = level)}
						class="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-mono text-xs font-semibold capitalize transition-all {isSelected
							? 'bg-primary text-primary-foreground shadow-xs'
							: 'border border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground'}"
					>
						{#if level === 'beginner'}
							<span
								class="size-1.5 rounded-full {isSelected
									? 'bg-primary-foreground'
									: 'bg-emerald-500'}"
							></span>
						{:else if level === 'intermediate'}
							<span
								class="size-1.5 rounded-full {isSelected
									? 'bg-primary-foreground'
									: 'bg-amber-500'}"
							></span>
						{:else if level === 'advanced'}
							<span
								class="size-1.5 rounded-full {isSelected ? 'bg-primary-foreground' : 'bg-rose-500'}"
							></span>
						{/if}
						<span>{level}</span>
					</button>
				{/each}
			</div>
		</div>

		<!-- Category Filter Pills with Item Count Badges -->
		<div class="flex flex-wrap items-center gap-2 border-t border-border pt-4">
			<span class="mr-1 font-mono text-xs font-semibold text-muted-foreground uppercase"
				>Category:</span
			>
			{#each data.categories as category (category)}
				{@const count = getCategoryCount(category)}
				{@const isSelected = selectedCategory === category}
				<button
					onclick={() => (selectedCategory = category)}
					class="flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-xs font-semibold transition-all {isSelected
						? 'bg-foreground text-background shadow-xs'
						: 'border border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground'}"
				>
					<span>{category}</span>
					<span
						class="py-0.2 rounded-full px-1.5 text-[10px] {isSelected
							? 'bg-background/20 text-background'
							: 'bg-muted text-muted-foreground'}"
					>
						{count}
					</span>
				</button>
			{/each}
		</div>
	</div>

	<!-- Results Count Bar -->
	<div class="mb-6 flex items-center justify-between font-mono text-xs text-muted-foreground">
		<span>Showing {filteredGuides.length} of {data.guides.length} guides</span>
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
				{@const isAdv = guide.level === 'advanced'}
				{@const isInt = guide.level === 'intermediate'}
				<a
					href={resolve(`/guides/${guide.slug}`)}
					class="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
				>
					<!-- Top border accent on hover -->
					<div
						class="absolute top-0 right-0 left-0 h-0.5 bg-linear-to-r from-primary via-emerald-400 to-cyan-400 opacity-0 transition-opacity group-hover:opacity-100"
					></div>

					<div>
						<div class="mb-3 flex items-center justify-between gap-2">
							<Badge size="xs" variant="subtle" color="primary">
								<Tag class="size-3" />
								<span>{guide.category}</span>
							</Badge>

							<span
								class="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 font-mono text-[11px] font-semibold capitalize {isAdv
									? 'border border-rose-500/20 bg-rose-500/10 text-rose-400'
									: isInt
										? 'border border-amber-500/20 bg-amber-500/10 text-amber-400'
										: 'border border-emerald-500/20 bg-emerald-500/10 text-emerald-400'}"
							>
								<span
									class="size-1.5 rounded-full {isAdv
										? 'bg-rose-500'
										: isInt
											? 'bg-amber-500'
											: 'bg-emerald-500'}"
								></span>
								{guide.level}
							</span>
						</div>

						<h2
							class="text-base font-bold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-lg"
						>
							{guide.title}
						</h2>

						<p class="mt-2.5 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
							{guide.description}
						</p>
					</div>

					<div
						class="mt-6 flex items-center justify-between border-t border-border/60 pt-4 text-xs"
					>
						<div class="flex items-center gap-1 font-mono text-muted-foreground">
							<Clock class="size-3.5" />
							<span>{guide.readTime}</span>
						</div>
						<div class="flex items-center gap-1 font-mono font-semibold text-primary">
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
				No lessons matched your current filter criteria.
			</p>
			<button
				onclick={resetFilters}
				class="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
			>
				Reset Filters
			</button>
		</div>
	{/if}
</div>
