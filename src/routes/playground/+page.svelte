<!-- src/routes/+page.svelte (Hero CTAs update) -->
<script lang="ts">
	import { resolve } from '$app/paths';
	import CodeComparison from '$lib/components/CodeComparison.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { ArrowRight, BookOpen, CodeXml, Sparkles, Zap } from '@lucide/svelte';

	const reactExample = `// React 19: Stateful Counter with Effect
import { useState, useEffect } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Count updated:', count);
  }, [count]);

  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </button>
  );
}`;

	const svelteExample = `<!-- Svelte 5: Fine-Grained Reactivity -->
<script lang="ts">
  let count = $state(0);

  $effect(() => {
    console.log('Count updated:', count);
  });
</${'script'}>

<button onclick={() => count++}>
  Count: {count}
</button>`;
</script>

<SEO
	title="Code Without Complexity — SvelteAcademy"
	description="Learn how Svelte 5 Runes and SvelteKit eliminate artificial framework bloat..."
/>

<div class="container mx-auto max-w-5xl px-4 py-16">
	<!-- Hero Section -->
	<section class="space-y-6 text-center">
		<div
			class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary"
		>
			<Sparkles class="size-3.5" />
			<span>Web development brought down to earth</span>
		</div>

		<h1 class="text-4xl font-black tracking-tight sm:text-6xl">
			Code without the <span
				class="bg-linear-to-r from-primary via-emerald-500 to-cyan-500 bg-clip-text text-transparent"
				>complexity.</span
			>
		</h1>

		<p class="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
			Eliminate artificial framework bloat and complex dependency arrays with Svelte 5.
			<span class="mt-1 block font-medium text-foreground/90"
				>Focus on shipping your ideas, not fighting hooks.</span
			>
		</p>

		<!-- Hero CTA Action Buttons -->
		<div class="flex flex-wrap items-center justify-center gap-3 pt-2">
			<a
				href={resolve('/guides')}
				class="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-xs font-bold text-primary-foreground shadow-xs transition hover:bg-primary/90"
			>
				<BookOpen class="size-4" />
				<span>Explore Guides</span>
				<ArrowRight class="size-3.5" />
			</a>

			<a
				href={resolve('/cheatsheet')}
				class="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-xs font-bold text-foreground shadow-xs transition hover:border-primary/40 hover:bg-muted/40"
			>
				<CodeXml class="size-4 text-primary" />
				<span>Runes Cheatsheet</span>
			</a>
		</div>
	</section>

	<!-- Interactive Benchmark Section -->
	<section id="comparisons" class="mt-16">
		<CodeComparison
			title="State & Effects: React 19 Hooks vs Svelte 5 Runes"
			description="Notice how Svelte 5 replaces useState hooks, updater callbacks, and dependency arrays with direct, natural JavaScript mutation."
			competingName="React 19"
			competingCode={reactExample}
			svelteCode={svelteExample}
		/>
	</section>

	<!-- Super Svelte Banner / Layer 2 Funnel -->
	<section
		class="mt-16 rounded-2xl border border-primary/20 bg-linear-to-r from-primary/10 via-emerald-500/5 to-cyan-500/10 p-8 shadow-xs"
	>
		<div class="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
			<div class="space-y-2">
				<div class="inline-flex items-center gap-1.5 text-xs font-bold text-primary">
					<Zap class="size-4" />
					<span>From Learning to Launch</span>
				</div>
				<h2 class="text-2xl font-bold tracking-tight">Ready to ship a production business?</h2>
				<p class="max-w-xl text-xs leading-relaxed text-muted-foreground">
					Skip 80 hours of wiring up Auth, Neon Postgres, Drizzle ORM, Upstash Redis caching,
					UploadThing storage, and Hono OpenAPI RPC. <strong class="text-foreground"
						>Super Svelte</strong
					> is the official production starter kit.
				</p>
			</div>

			<a
				href="https://supersvelte.netlify.app"
				target="_blank"
				rel="noreferrer"
				class="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-xs font-bold text-primary-foreground shadow-xs transition hover:bg-primary/90"
			>
				<span>Explore Super Svelte</span>
				<ArrowRight class="size-4" />
			</a>
		</div>
	</section>
</div>
