<!-- src/routes/guides/+page.svelte -->
<script lang="ts">
	import { resolve } from '$app/paths';
	import SEO from '$lib/components/SEO.svelte';
	import { ArrowRight, BookOpen, Search, Tag, XCircle } from '@lucide/svelte';

	export interface Guide {
		slug: string;
		title: string;
		description: string;
		category: string;
		readTime: string;
	}

	interface CustomPageData {
		guides: Guide[];
		categories: string[];
	}

	// Explicitly type props to bypass stale SvelteKit generated $types
	let { data }: { data: CustomPageData } = $props();

	// Safely fallback lists to ensure clean array types
	let guides = $derived(data?.guides ?? []);
	let categories = $derived(data?.categories ?? ['All']);

	// Reactive state signals for filters
	let searchQuery = $state('');
	let selectedCategory = $state('All');

	// Instant derived signal filtering
	let filteredGuides = $derived(
		guides.filter((guide) => {
			const matchesCategory = selectedCategory === 'All' || guide.category === selectedCategory;
			const query = searchQuery.toLowerCase().trim();
			const matchesSearch =
				!query ||
				guide.title.toLowerCase().includes(query) ||
				guide.description.toLowerCase().includes(query);

			return matchesCategory && matchesSearch;
		})
	);

	function resetFilters() {
		searchQuery = '';
		selectedCategory = 'All';
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
	<div class="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
					<XCircle class="size-4" />
				</button>
			{/if}
		</div>

		<!-- Category Filter Pills -->
		<div class="flex flex-wrap items-center gap-2">
			{#each categories as category (category)}
				<button
					onclick={() => (selectedCategory = category)}
					class="rounded-lg px-3 py-1.5 font-mono text-xs font-semibold transition-all {selectedCategory ===
					category
						? 'bg-primary text-primary-foreground shadow-xs'
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
		{#if selectedCategory !== 'All' || searchQuery}
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
						<div class="mb-3 flex items-center justify-between">
							<span
								class="inline-flex items-center gap-1 rounded-md border border-primary/20 bg-primary/10 px-2.5 py-0.5 font-mono text-xs font-semibold text-primary"
							>
								<Tag class="size-3" />
								{guide.category}
							</span>
							<span class="font-mono text-xs text-muted-foreground">
								{guide.readTime}
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

					<div class="mt-6 flex items-center gap-1.5 font-mono text-xs font-semibold text-primary">
						<span>Read guide</span>
						<ArrowRight class="size-3.5 transition-transform group-hover:translate-x-1" />
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
				No matches for "{searchQuery}" under category "{selectedCategory}".
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
