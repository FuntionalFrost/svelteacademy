<!-- src/routes/playground/+page.svelte -->
<script lang="ts">
	import ClassStateVisualizer from '$lib/components/ClassStateVisualizer.svelte';
	import InteractiveRuneDemo from '$lib/components/InteractiveRuneDemo.svelte';
	import RuneVisualizer from '$lib/components/RuneVisualizer.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import SuperSvelteBanner from '$lib/components/SuperSvelteBanner.svelte';
	import { Cpu, ExternalLink, Layers, Sparkles, Terminal } from '@lucide/svelte';
</script>

<SEO
	title="Interactive Svelte 5 Sandbox & Signal Inspector — SvelteAcademy"
	description="Experiment with live Svelte 5 runes ($state, $derived, $effect), observe reactivity dependency tracking, and inspect class state."
/>

<div class="container mx-auto max-w-5xl px-4 py-12">
	<!-- Hero Section -->
	<section class="space-y-4 text-center">
		<div
			class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary"
		>
			<Terminal class="size-3.5" />
			<span>Interactive Runes Sandbox</span>
		</div>

		<h1 class="text-4xl font-black tracking-tight text-foreground sm:text-6xl">
			Svelte 5 <span
				class="bg-linear-to-r from-primary via-emerald-500 to-cyan-500 bg-clip-text text-transparent"
				>Signal Sandbox</span
			>
		</h1>

		<p class="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
			Mutate signals in real time to observe how Svelte 5 recalculates <code class="text-primary"
				>$derived</code
			>
			values and schedules <code class="text-primary">$effect</code> observers without Virtual DOM re-renders.
		</p>

		<div class="pt-2">
			<a
				href="https://svelte.dev/playground"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 font-mono text-xs font-semibold text-foreground shadow-xs transition hover:border-primary/50 hover:bg-muted/40 hover:text-primary"
			>
				<span>Open Official Svelte 5 Playground</span>
				<ExternalLink class="size-3.5" />
			</a>
		</div>
	</section>

	<!-- Interactive Demo 1: Basic Counter & Derived Parity Check -->
	<section class="mt-12 space-y-3">
		<div class="flex items-center gap-2 font-mono text-xs font-bold text-primary uppercase">
			<Sparkles class="size-4" />
			<span>1. Basic Signal Mutation & Derivation</span>
		</div>
		<InteractiveRuneDemo />
	</section>

	<!-- Interactive Demo 2: Deep Rune Execution Log & Untrack() -->
	<section class="mt-12 space-y-3">
		<div class="flex items-center gap-2 font-mono text-xs font-bold text-cyan-400 uppercase">
			<Cpu class="size-4" />
			<span>2. Effect Execution & Dependency Tracking</span>
		</div>
		<RuneVisualizer />
	</section>

	<!-- Interactive Demo 3: Shared Class State & Context Store -->
	<section class="mt-12 space-y-3">
		<div class="flex items-center gap-2 font-mono text-xs font-bold text-purple-400 uppercase">
			<Layers class="size-4" />
			<span>3. Encapsulated Class State Inspector</span>
		</div>
		<ClassStateVisualizer />
	</section>

	<!-- High-Converting Bottom Banner -->
	<SuperSvelteBanner />
</div>
