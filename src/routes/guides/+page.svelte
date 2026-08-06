<!-- src/routes/guides/+page.svelte -->
<script lang="ts">
	import { resolve } from '$app/paths';
	import { ArrowRight, BookOpen, Clock, Filter, Search, X } from '@lucide/svelte';

	let { data } = $props();

	let searchQuery = $state('');
	let selectedCategory = $state('All');

	// Extract unique categories dynamically from loaded Markdown metadata
	const categories = $derived([
		'All',
		...Array.from(new Set(data.guides.map((g) => g.meta.category).filter(Boolean) as string[]))
	]);

	// Reactive filter logic powered by Svelte 5 $derived rune
	const filteredGuides = $derived(
		data.guides.filter((guide) => {
			const matchesCategory =
				selectedCategory === 'All' || guide.meta.category === selectedCategory;

			const query = searchQuery.toLowerCase().trim();
			const matchesSearch =
				!query ||
				guide.meta.title?.toLowerCase().includes(query) ||
				guide.meta.description?.toLowerCase().includes(query) ||
				guide.slug?.toLowerCase().includes(query) ||
				guide.meta.category?.toLowerCase().includes(query);

			return matchesCategory && matchesSearch;
		})
	);

	function resetFilters() {
		searchQuery = '';
		selectedCategory = 'All';
	}
</script>

<div class="min-h-screen bg-background py-16 text-foreground">
	<div class="container mx-auto max-w-4xl px-4">
		<!-- Header -->
		<div class="space-y-4">
			<div
				class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
			>
				<BookOpen class="size-3.5" />
				<span>Sveltey Curriculum</span>
			</div>
			<h1 class="text-3xl font-black tracking-tight sm:text-4xl">Guides & Stack Comparisons</h1>
			<p class="text-sm text-muted-foreground">
				Deep dives into Svelte 5, SvelteKit, and zero-complexity full-stack development.
			</p>
		</div>

		<!-- Search & Filter Bar -->
		<div class="mt-8 space-y-4">
			<!-- Search Input -->
			<div class="relative">
				<Search class="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
				<input
					type="text"
					bind:value={searchQuery}
					placeholder="Search guides, concepts, or frameworks (e.g. React, HTMX, Runes)..."
					class="w-full rounded-xl border border-border bg-card py-3 pr-10 pl-10 text-xs font-medium text-foreground transition placeholder:text-muted-foreground/60 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-hidden"
				/>
				{#if searchQuery}
					<button
						onclick={() => (searchQuery = '')}
						class="absolute top-1/2 right-3.5 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
						aria-label="Clear search"
					>
						<X class="size-4" />
					</button>
				{/if}
			</div>

			<!-- Category Filter Pills -->
			<div class="flex flex-wrap items-center gap-2 pt-1">
				<span
					class="mr-1 inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground"
				>
					<Filter class="size-3" />
					Category:
				</span>
				{#each categories as category (category)}
					<button
						onclick={() => (selectedCategory = category)}
						class="rounded-lg px-3 py-1.5 text-xs font-medium transition {selectedCategory ===
						category
							? 'bg-primary text-primary-foreground shadow-xs'
							: 'border border-border bg-card text-muted-foreground hover:bg-accent hover:text-foreground'}"
					>
						{category}
					</button>
				{/each}
			</div>
		</div>

		<!-- Guide Grid -->
		<div class="mt-8 grid gap-4">
			{#each filteredGuides as guide (guide.slug)}
				<a
					href={resolve(`/guides/${guide.slug}`)}
					class="group flex flex-col justify-between gap-4 rounded-2xl border border-border bg-card p-6 transition hover:border-primary/50 sm:flex-row sm:items-center"
				>
					<div class="space-y-1">
						<div class="flex items-center gap-2 text-xs text-muted-foreground">
							<Clock class="size-3.5" />
							<span>{guide.meta.readTime || '5 min read'}</span>
							<span>•</span>
							<span class="font-medium text-primary">{guide.meta.category || 'Comparison'}</span>
						</div>
						<h2 class="text-lg font-bold text-foreground group-hover:text-primary">
							{guide.meta.title || guide.slug}
						</h2>
						<p class="text-xs text-muted-foreground">
							{guide.meta.description || 'No description provided.'}
						</p>
					</div>

					<div class="inline-flex items-center gap-1 text-xs font-semibold text-primary">
						<span>Read Guide</span>
						<ArrowRight class="size-3.5 transition group-hover:translate-x-1" />
					</div>
				</a>
			{:else}
				<!-- Empty State -->
				<div class="rounded-2xl border border-dashed border-border p-12 text-center">
					<p class="text-sm font-semibold text-foreground">No matching guides found</p>
					<p class="mt-1 text-xs text-muted-foreground">
						Try adjusting your search query or switching category filters.
					</p>
					<button
						onclick={resetFilters}
						class="mt-4 rounded-lg bg-primary/10 px-4 py-2 text-xs font-bold text-primary transition hover:bg-primary/20"
					>
						Clear all filters
					</button>
				</div>
			{/each}
		</div>
	</div>
</div>
