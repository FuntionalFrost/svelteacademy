<!-- src/routes/+page.svelte -->
<script lang="ts">
	import CodeComparison from '$lib/components/CodeComparison.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import SuperSvelteBanner from '$lib/components/SuperSvelteBanner.svelte';
	import { Sparkles } from '@lucide/svelte';

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
	title="Code Without Complexity"
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

	<!-- High-Converting Glowing SuperSvelte Banner -->
	<SuperSvelteBanner />
</div>
