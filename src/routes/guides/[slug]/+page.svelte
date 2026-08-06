<!-- src/routes/guides/[slug]/+page.svelte -->
<script lang="ts">
	import { resolve } from '$app/paths';
	import SEO from '$lib/components/SEO.svelte';
	import { ArrowLeft, Clock, Layers, Tag } from '@lucide/svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Scroll Progress Signal
	let scrollProgress = $state(0);

	$effect(() => {
		function handleScroll() {
			const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
			if (totalHeight > 0) {
				scrollProgress = (window.scrollY / totalHeight) * 100;
			}
		}

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});

	const levelStyles = {
		beginner: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-500',
		intermediate: 'border-amber-500/30 bg-amber-500/10 text-amber-500',
		advanced: 'border-purple-500/30 bg-purple-500/10 text-purple-500'
	};
</script>

<SEO title="{data.guide.title} — Svelte 5 Guide" description={data.guide.description} />

<!-- Scroll Progress Bar -->
<div class="fixed top-0 left-0 z-50 h-1 w-full bg-muted">
	<div
		class="h-full bg-linear-to-r from-cyan-500 via-primary to-emerald-500 transition-all duration-150 ease-out"
		style="width: {scrollProgress}%"
	></div>
</div>

<div class="container mx-auto max-w-4xl px-4 py-12">
	<!-- Back Link -->
	<a
		href={resolve('/guides')}
		class="mb-8 inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-muted-foreground transition hover:text-primary"
	>
		<ArrowLeft class="size-3.5" />
		<span>Back to all guides</span>
	</a>

	<!-- Article Header -->
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
				]}"
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

	<!-- Rendered Markdown Component -->
	<article class="prose max-w-none dark:prose-invert">
		<data.content />
	</article>

	<!-- Bottom Navigation (Prev / Next) -->
	<div class="mt-16 grid grid-cols-1 gap-4 border-t border-border pt-8 sm:grid-cols-2">
		{#if data.prevGuide}
			<a
				href={resolve('/guides/[slug]', { slug: data.prevGuide.slug })}
				class="group flex flex-col gap-1 rounded-xl border border-border bg-card p-4 transition hover:border-primary/40 hover:shadow-sm"
			>
				<span class="font-mono text-[10px] font-semibold text-muted-foreground uppercase"
					>Previous Guide</span
				>
				<span class="text-sm font-bold text-foreground transition group-hover:text-primary"
					>{data.prevGuide.title}</span
				>
			</a>
		{:else}
			<div></div>
		{/if}

		{#if data.nextGuide}
			<a
				href={resolve('/guides/[slug]', { slug: data.nextGuide.slug })}
				class="group flex flex-col gap-1 rounded-xl border border-border bg-card p-4 text-right transition hover:border-primary/40 hover:shadow-sm"
			>
				<span class="font-mono text-[10px] font-semibold text-muted-foreground uppercase"
					>Next Guide</span
				>
				<span class="text-sm font-bold text-foreground transition group-hover:text-primary"
					>{data.nextGuide.title}</span
				>
			</a>
		{/if}
	</div>
</div>
