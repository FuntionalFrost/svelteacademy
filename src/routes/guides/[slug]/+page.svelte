<!-- src/routes/guides/[slug]/+page.svelte -->
<script lang="ts">
	import { resolve } from '$app/paths';
	import ProgressBar from '$lib/components/ProgressBar.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import SuperSvelteBanner from '$lib/components/SuperSvelteBanner.svelte';
	import TableOfContents from '$lib/components/TableOfContents.svelte';
	import { ArrowLeft, Clock, Layers, Tag } from '@lucide/svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let Content = $derived(data.content);

	const levelStyles: Record<string, string> = {
		beginner: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-500',
		intermediate: 'border-amber-500/30 bg-amber-500/10 text-amber-500',
		advanced: 'border-purple-500/30 bg-purple-500/10 text-purple-500'
	};
</script>

<SEO title="{data.guide.title} — Svelte 5 Guide" description={data.guide.description} />

<!-- Reading Progress Bar -->
<ProgressBar />

<div class="container mx-auto max-w-6xl px-4 py-12">
	<!-- Back Link -->
	<a
		href={resolve('/guides')}
		class="mb-8 inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-muted-foreground transition hover:text-primary"
	>
		<ArrowLeft class="size-3.5" />
		<span>Back to all guides</span>
	</a>

	<div class="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_240px]">
		<!-- Main Content Column -->
		<div>
			<header class="mb-10 border-b border-border pb-8">
				<div class="mb-4 flex flex-wrap items-center gap-2.5">
					<span
						class="inline-flex items-center gap-1 rounded-md border border-primary/20 bg-primary/10 px-2.5 py-0.5 font-mono text-xs font-semibold text-primary"
					>
						<Tag class="size-3" />
						{data.guide.category}
					</span>

					<span
						class="inline-flex items-center gap-1 rounded-md border px-2.5 py-0.5 font-mono text-xs font-bold tracking-wider uppercase {levelStyles[
							data.guide.level
						] ?? levelStyles.beginner}"
					>
						<Layers class="size-3" />
						{data.guide.level}
					</span>

					<span class="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground">
						<Clock class="size-3" />
						{data.guide.readTime}
					</span>
				</div>

				<h1 class="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
					{data.guide.title}
				</h1>

				<p class="mt-4 text-base text-muted-foreground sm:text-lg">
					{data.guide.description}
				</p>
			</header>

			<!-- Article Body -->
			<article class="prose max-w-none dark:prose-invert">
				<Content />
			</article>

			<!-- High-Converting Bottom Banner (Placed inside main column) -->
			<SuperSvelteBanner />
		</div>

		<!-- Sticky Table of Contents Sidebar -->
		<aside class="hidden lg:block">
			<div class="sticky top-24">
				<TableOfContents />
			</div>
		</aside>
	</div>
</div>
