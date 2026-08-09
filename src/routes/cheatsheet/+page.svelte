<!-- src/routes/cheatsheet/+page.svelte -->
<script lang="ts">
	import CodeComparison from '$lib/components/CodeComparison.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { CircleX, CodeXml, Funnel, Search, Sparkles } from '@lucide/svelte';
	import type { PageData } from './$types';
	import type { CheatsheetItem } from './+page';

	let { data }: { data: PageData } = $props();

	let searchQuery = $state('');
	let selectedCategory = $state<string>('All');

	const categories = ['All', 'Runes', 'Props & Binding', 'Effects & Utilities'];

	let filteredItems = $derived(
		data.items.filter((item: CheatsheetItem) => {
			const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
			const query = searchQuery.toLowerCase().trim();
			const matchesSearch =
				!query ||
				item.name.toLowerCase().includes(query) ||
				item.syntax.toLowerCase().includes(query) ||
				item.summary.toLowerCase().includes(query) ||
				item.notes.toLowerCase().includes(query);

			return matchesCategory && matchesSearch;
		})
	);

	function resetFilters() {
		searchQuery = '';
		selectedCategory = 'All';
	}
</script>

<SEO
	title="Svelte 5 Runes & API Cheatsheet — Quick Reference"
	description="Instant searchable reference guide for Svelte 5 runes ($state, $derived, $effect, $props, $bindable, $inspect) and utility functions."
/>

<div class="container mx-auto max-w-6xl px-4 py-12">
	<!-- Page Header -->
	<header class="mb-10 text-center sm:text-left">
		<div
			class="mb-3 inline-flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/10 px-3 py-1 font-mono text-xs font-semibold text-primary"
		>
			<Sparkles class="size-3.5" />
			<span>Svelte 5 API Quick Reference</span>
		</div>
		<h1 class="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
			Svelte 5 Runes Cheatsheet
		</h1>
		<p class="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
			Dense interactive reference for state primitives, component boundary interfaces, and
			side-effect runes.
		</p>
	</header>

	<!-- Search & Filter Controls -->
	<div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
		<div class="relative max-w-md flex-1">
			<Search class="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
			<input
				type="text"
				bind:value={searchQuery}
				placeholder="Filter runes by keyword (e.g. $state, prop, untrack)..."
				class="w-full rounded-xl border border-border bg-background py-2.5 pr-4 pl-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
			/>
			{#if searchQuery}
				<button
					onclick={() => (searchQuery = '')}
					class="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
					aria-label="Clear search"
				>
					<CircleX class="size-4" />
				</button>
			{/if}
		</div>

		<div class="flex flex-wrap items-center gap-1.5">
			<Funnel class="mr-1 hidden size-3.5 text-muted-foreground sm:block" />
			{#each categories as cat (cat)}
				<button
					onclick={() => (selectedCategory = cat)}
					class="rounded-lg px-3 py-1.5 font-mono text-xs font-semibold transition-all {selectedCategory ===
					cat
						? 'bg-primary text-primary-foreground shadow-xs'
						: 'border border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground'}"
				>
					{cat}
				</button>
			{/each}
		</div>
	</div>

	<!-- Item Counter -->
	<div class="mb-6 flex items-center justify-between font-mono text-xs text-muted-foreground">
		<span>Showing {filteredItems.length} of {data.items.length} items</span>
		{#if selectedCategory !== 'All' || searchQuery}
			<button onclick={resetFilters} class="font-semibold text-primary hover:underline">
				Reset filters
			</button>
		{/if}
	</div>

	<!-- Cheatsheet Cards Grid -->
	{#if filteredItems.length > 0}
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
			{#each filteredItems as item (item.id)}
				<div
					class="flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:border-primary/40"
				>
					<div class="p-6">
						<div class="mb-3 flex items-center justify-between">
							<span class="font-mono text-lg font-bold text-primary">{item.name}</span>
							<span
								class="rounded-md border border-border bg-muted/50 px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-wider text-muted-foreground uppercase"
							>
								{item.category}
							</span>
						</div>

						<p class="text-sm leading-relaxed font-medium text-foreground/90">
							{item.summary}
						</p>

						<!-- Inline Syntax Signature -->
						<div
							class="mt-4 mb-2 rounded-xl border border-border bg-muted/40 p-3 font-mono text-xs font-semibold text-primary"
						>
							<code>{item.syntax}</code>
						</div>

						<!-- Highlighted Code Example (with tight margin override) -->
						<div class="cheatsheet-snippet">
							<CodeComparison title="{item.name} Usage" svelteCode={item.example} />
						</div>
					</div>

					<div
						class="border-t border-border bg-muted/20 px-6 py-3 font-mono text-xs text-muted-foreground"
					>
						<span class="font-bold text-foreground/80">Pro Tip:</span>
						{item.notes}
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<!-- Empty Filter State -->
		<div class="rounded-2xl border border-dashed border-border p-12 text-center">
			<CodeXml class="mx-auto mb-3 size-10 text-muted-foreground/60" />
			<h3 class="text-base font-bold text-foreground">No cheatsheet entries found</h3>
			<p class="mt-1 text-sm text-muted-foreground">
				No matches found for "{searchQuery}".
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

<style>
	/* Compact margin override when CodeComparison is used inside cheatsheet cards */
	:global(.cheatsheet-snippet > div) {
		margin-top: 0.5rem !important;
		margin-bottom: 0.5rem !important;
	}
</style>
