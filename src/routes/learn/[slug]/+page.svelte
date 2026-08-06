<!-- src/routes/learn/[slug]/+page.svelte -->
<script lang="ts">
	import { resolve } from '$app/paths';
	import ProgressBar from '$lib/components/ProgressBar.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import SuperSvelteBanner from '$lib/components/SuperSvelteBanner.svelte';
	import TableOfContents from '$lib/components/TableOfContents.svelte';
	import { ArrowLeft, Clock, Tag } from '@lucide/svelte';

	let { data } = $props();

	const Content = $derived(data.content);
</script>

<SEO title={data.meta.title} description={data.meta.description} type="article" />

<ProgressBar />

<div class="min-h-screen bg-background py-12 text-foreground">
	<div class="container mx-auto max-w-6xl px-4">
		<!-- Back Link -->
		<a
			href={resolve('/learn')}
			class="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground transition hover:text-primary"
		>
			<ArrowLeft class="size-3.5" />
			<span>Back to Guides</span>
		</a>

		<div class="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_240px]">
			<article
				class="prose max-w-none prose-slate dark:prose-invert prose-headings:scroll-mt-24 prose-a:text-primary"
			>
				<header class="not-prose border-b border-border pb-8">
					<div class="flex items-center gap-3 text-xs text-muted-foreground">
						<span class="inline-flex items-center gap-1 font-semibold text-primary">
							<Tag class="size-3" />
							{data.meta.category || 'Guide'}
						</span>
						<span>•</span>
						<span class="inline-flex items-center gap-1">
							<Clock class="size-3" />
							{data.meta.readTime || '5 min read'}
						</span>
					</div>

					<h1 class="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
						{data.meta.title}
					</h1>

					<p class="mt-3 text-sm text-muted-foreground">
						{data.meta.description}
					</p>
				</header>

				<div class="mt-8">
					<Content />
				</div>

				<!-- Commercial Conversion Banner -->
				<div class="not-prose pt-8">
					<SuperSvelteBanner />
				</div>
			</article>

			<!-- Sidebar Table of Contents -->
			<aside class="hidden lg:block">
				<div class="sticky top-24 rounded-xl border border-border bg-card/50 p-4 backdrop-blur-xs">
					<TableOfContents />
				</div>
			</aside>
		</div>
	</div>
</div>
