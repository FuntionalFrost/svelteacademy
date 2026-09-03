<!-- src/routes/guides/[slug]/+page.svelte -->
<script lang="ts">
	import { resolve } from '$app/paths';
	import ProgressBar from '$lib/components/ProgressBar.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import SuperSvelteBanner from '$lib/components/SuperSvelteBanner.svelte';
	import TableOfContents from '$lib/components/TableOfContents.svelte';
	import { ArrowLeft, ArrowRight, Clock, GitPullRequest, Layers, Tag } from '@lucide/svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let Content = $derived(data.content);

	const levelStyles: Record<string, string> = {
		beginner: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-500',
		intermediate: 'border-amber-500/30 bg-amber-500/10 text-amber-500',
		advanced: 'border-purple-500/30 bg-purple-500/10 text-purple-500'
	};

	// Attach floating copy buttons to all Shiki code blocks inside article
	$effect(() => {
		const preElements = document.querySelectorAll('article pre');
		const cleanups: (() => void)[] = [];

		preElements.forEach((pre) => {
			if (pre.querySelector('.code-copy-btn')) return;

			pre.classList.add('relative', 'group/code');

			const btn = document.createElement('button');
			btn.type = 'button';
			btn.className =
				'code-copy-btn absolute top-3 right-3 opacity-0 group-hover/code:opacity-100 transition-all rounded-md border border-white/10 bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 px-2 py-1 text-[11px] font-mono font-medium shadow-sm flex items-center gap-1 cursor-pointer';
			btn.innerHTML = '<span>Copy</span>';
			btn.setAttribute('aria-label', 'Copy code to clipboard');

			let timeoutId: number;
			const onClick = async () => {
				const code = pre.querySelector('code')?.innerText || (pre as HTMLElement).innerText;
				await navigator.clipboard.writeText(code.trim());
				btn.innerHTML = '<span class="text-emerald-400 font-semibold">Copied!</span>';
				clearTimeout(timeoutId);
				timeoutId = window.setTimeout(() => {
					btn.innerHTML = '<span>Copy</span>';
				}, 2000);
			};

			btn.addEventListener('click', onClick);
			pre.appendChild(btn);

			cleanups.push(() => {
				btn.removeEventListener('click', onClick);
				clearTimeout(timeoutId);
				btn.remove();
			});
		});

		return () => {
			cleanups.forEach((c) => c());
		};
	});
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

			<!-- Community Contribution & Edit Link -->
			<div
				class="mt-8 flex items-center justify-between border-t border-border/60 pt-4 text-xs text-muted-foreground"
			>
				<span>Found an issue or want to improve this lesson?</span>
				<a
					href="https://github.com/FuntionalFrost/sveltey/blob/main/src/lib/content/guides/{data
						.guide.slug}.md"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-1.5 font-medium text-primary hover:underline"
				>
					<GitPullRequest class="size-3.5" />
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
							href={resolve(`/guides/${data.prevGuide.slug}`)}
							class="group flex flex-col justify-between rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:bg-muted/30"
						>
							<div
								class="flex items-center gap-1.5 font-mono text-[11px] font-semibold text-muted-foreground"
							>
								<ArrowLeft class="size-3.5 transition-transform group-hover:-translate-x-1" />
								<span>Previous Guide</span>
							</div>
							<span
								class="mt-2 text-sm font-bold text-foreground transition-colors group-hover:text-primary"
							>
								{data.prevGuide.title}
							</span>
						</a>
					{:else}
						<div></div>
					{/if}

					{#if data.nextGuide}
						<a
							href={resolve(`/guides/${data.nextGuide.slug}`)}
							class="group flex flex-col justify-between rounded-xl border border-border bg-card p-4 text-left transition-all hover:border-primary/50 hover:bg-muted/30 sm:text-right"
						>
							<div
								class="flex items-center gap-1.5 font-mono text-[11px] font-semibold text-muted-foreground sm:justify-end"
							>
								<span>Next Guide</span>
								<ArrowRight class="size-3.5 transition-transform group-hover:translate-x-1" />
							</div>
							<span
								class="mt-2 text-sm font-bold text-foreground transition-colors group-hover:text-primary"
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
