<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import ProgressBar from '#lib/components/ProgressBar.svelte';
	import SEO from '#lib/components/SEO.svelte';
	import SuperSvelteBanner from '#lib/components/SuperSvelteBanner.svelte';
	import TableOfContents from '#lib/components/TableOfContents.svelte';
	import { enhanceCodeBlocks } from '#lib/actions/copyCode.js';
	import { ArrowLeft, ArrowRight, Clock, GitPullRequest, Layers, Tag } from '@lucide/svelte';
	import { Badge, Kbd, useShortcuts } from 'yaxa-svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let Content = $derived(data.content);

	// Keyboard pagination via Svelte 5 rune composable
	$effect(() => {
		return useShortcuts({
			'[': () => {
				if (data.prevGuide) goto(resolve(`guides/${data.prevGuide.slug}`));
			},
			']': () => {
				if (data.nextGuide) goto(resolve(`guides/${data.nextGuide.slug}`));
			}
		});
	});
</script>

<!-- src/routes/guides/[slug]/+page.svelte -->

<SEO
	title="{data.guide.title} — Svelte 5 Guide"
	description={data.guide.description}
	type="article"
	publishDate={data.guide.date}
	tag={data.guide.category}
/>

<!-- Reading Progress Bar -->
<ProgressBar />

<div class="container mx-auto max-w-6xl px-4 py-12">
	<!-- Back Link -->
	<a
		href={resolve('guides')}
		class="mb-8 inline-flex items-center gap-1.5 font-mono text-sm font-semibold text-muted-foreground transition hover:text-primary"
	>
		<ArrowLeft class="size-4" />
		<span>Back to all guides</span>
	</a>

	<div class="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_240px]">
		<!-- Main Content Column -->
		<div>
			<header class="mb-10 border-b border-border pb-8">
				<div class="mb-4 flex flex-wrap items-center gap-2.5">
					<Badge size="md" variant="subtle" color="primary">
						<Tag class="size-3.5" />
						<span>{data.guide.category}</span>
					</Badge>

					<Badge
						size="md"
						variant="subtle"
						color={data.guide.level === 'advanced'
							? 'error'
							: data.guide.level === 'intermediate'
								? 'warning'
								: 'success'}
					>
						<Layers class="size-3.5" />
						<span>{data.guide.level}</span>
					</Badge>

					<span class="inline-flex items-center gap-1 font-mono text-sm text-muted-foreground">
						<Clock class="size-3.5" />
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
			<article class="prose max-w-none dark:prose-invert" use:enhanceCodeBlocks>
				<Content />
			</article>

			<!-- Community Contribution & Edit Link -->
			<div
				class="mt-8 flex items-center justify-between border-t border-border/60 pt-4 text-sm text-muted-foreground"
			>
				<span>Found an issue or want to improve this lesson?</span>
				<a
					href="https://github.com/FuntionalFrost/svelteacademy/blob/main/src/lib/content/guides/{data
						.guide.slug}.md"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-1.5 font-medium text-primary hover:underline"
				>
					<GitPullRequest class="size-4" />
					<span>Edit this page on GitHub</span>
				</a>
			</div>

			<!-- Previous / Next Guide Navigation -->
			{#if data.prevGuide || data.nextGuide}
				<nav
					class="mt-12 grid grid-cols-1 gap-4 border-t border-border pt-8 sm:grid-cols-2"
					aria-label="Guide Pagination"
				>
					{#if data.prevGuide}
						<a
							href={resolve(`guides/${data.prevGuide.slug}`)}
							class="group flex flex-col justify-between rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:bg-muted/30"
						>
							<div
								class="flex items-center justify-between font-mono text-sm font-semibold text-muted-foreground"
							>
								<div class="flex items-center gap-1.5">
									<ArrowLeft class="size-4 transition-transform group-hover:-translate-x-1" />
									<span>Previous Guide</span>
								</div>
								<Kbd size="xs">[</Kbd>
							</div>
							<span
								class="mt-2 text-base font-bold text-foreground transition-colors group-hover:text-primary"
							>
								{data.prevGuide.title}
							</span>
						</a>
					{:else}
						<div></div>
					{/if}

					{#if data.nextGuide}
						<a
							href={resolve(`guides/${data.nextGuide.slug}`)}
							class="group flex flex-col justify-between rounded-xl border border-border bg-card p-4 text-left transition-all hover:border-primary/50 hover:bg-muted/30 sm:text-right"
						>
							<div
								class="flex items-center justify-between font-mono text-sm font-semibold text-muted-foreground sm:flex-row-reverse"
							>
								<div class="flex items-center gap-1.5">
									<span>Next Guide</span>
									<ArrowRight class="size-4 transition-transform group-hover:translate-x-1" />
								</div>
								<Kbd size="xs">]</Kbd>
							</div>
							<span
								class="mt-2 text-base font-bold text-foreground transition-colors group-hover:text-primary"
							>
								{data.nextGuide.title}
							</span>
						</a>
					{/if}
				</nav>
			{/if}

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
