<!-- src/routes/playground/+page.svelte -->
<script lang="ts">
	import { resolve } from '$app/paths';
	import ClassStateVisualizer from '$lib/components/ClassStateVisualizer.svelte';
	import InteractiveRuneDemo from '$lib/components/InteractiveRuneDemo.svelte';
	import RuneVisualizer from '$lib/components/RuneVisualizer.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { ArrowRight, Cpu, Layers, Sparkles, Terminal } from '@lucide/svelte';

	type TabId = 'runes' | 'class' | 'demo';

	let activeTab = $state<TabId>('runes');

	const tabs = [
		{
			id: 'runes' as const,
			label: 'Signal Graph Visualizer',
			badge: '$state & $derived',
			description: 'Trace signal propagation across reactive dependency trees',
			icon: Sparkles
		},
		{
			id: 'class' as const,
			label: 'Class State & OOP',
			badge: 'Universal Reactivity',
			description: 'Explore fine-grained reactivity inside standalone TypeScript classes',
			icon: Cpu
		},
		{
			id: 'demo' as const,
			label: 'Interactive Rune Lab',
			badge: 'Runtime Sandbox',
			description: 'Hands-on state mutations with real-time effect logging',
			icon: Layers
		}
	];
</script>

<SEO
	title="Svelte 5 Interactive Playground & Signal Visualizer"
	description="Test state mutations in real-time, inspect reactive dependency trees, and explore Svelte 5 class-based state models."
/>

<div class="container mx-auto max-w-6xl px-4 py-12">
	<!-- Header -->
	<header class="mb-10 text-center sm:text-left">
		<div
			class="mb-3 inline-flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/10 px-3 py-1 font-mono text-xs font-semibold text-primary"
		>
			<Terminal class="size-3.5" />
			<span>Svelte 5 Runtime Sandbox</span>
		</div>
		<h1 class="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
			Interactive Playground
		</h1>
		<p class="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
			Visualize signal propagation, inspect universal class reactivity, and experiment with Svelte 5
			runtime mechanics.
		</p>
	</header>

	<!-- Tab Selector Navigation -->
	<div class="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
		{#each tabs as tab (tab.id)}
			<button
				onclick={() => (activeTab = tab.id)}
				class="flex flex-col items-start rounded-2xl border p-4 text-left transition-all {activeTab ===
				tab.id
					? 'border-primary bg-primary/10 shadow-md ring-1 ring-primary/30'
					: 'border-border bg-card hover:border-primary/40 hover:bg-muted/40'}"
			>
				<div class="mb-2 flex w-full items-center justify-between">
					<div class="flex items-center gap-2">
						<tab.icon
							class="size-4 {activeTab === tab.id ? 'text-primary' : 'text-muted-foreground'}"
						/>
						<span class="text-sm font-bold text-foreground">{tab.label}</span>
					</div>
					<span
						class="rounded-md border border-border bg-background px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
					>
						{tab.badge}
					</span>
				</div>
				<p class="text-xs leading-relaxed text-muted-foreground">
					{tab.description}
				</p>
			</button>
		{/each}
	</div>

	<!-- Active Component Sandbox Stage -->
	<div
		class="relative overflow-hidden rounded-3xl border border-border bg-card p-4 shadow-xl sm:p-8"
	>
		<!-- Accent Line -->
		<div
			class="absolute top-0 left-0 h-1 w-full bg-linear-to-r from-cyan-500 via-primary to-emerald-500"
		></div>

		{#if activeTab === 'runes'}
			<div class="space-y-4">
				<div class="border-b border-border/80 pb-4">
					<h2 class="text-lg font-bold text-foreground">Reactive Signal Dependency Tree</h2>
					<p class="text-xs text-muted-foreground">
						Click trigger buttons to mutate upstream <code class="font-mono text-primary"
							>$state</code
						>
						values and observe synchronous downstream updates in
						<code class="font-mono text-primary">$derived</code>
						and <code class="font-mono text-primary">$effect</code> nodes.
					</p>
				</div>
				<RuneVisualizer />
			</div>
		{:else if activeTab === 'class'}
			<div class="space-y-4">
				<div class="border-b border-border/80 pb-4">
					<h2 class="text-lg font-bold text-foreground">Class-Based State Architecture</h2>
					<p class="text-xs text-muted-foreground">
						Svelte 5 runes work natively inside JS/TS classes outside component files, replacing
						traditional store boilerplate with standard OOP encapsulation.
					</p>
				</div>
				<ClassStateVisualizer />
			</div>
		{:else if activeTab === 'demo'}
			<div class="space-y-4">
				<div class="border-b border-border/80 pb-4">
					<h2 class="text-lg font-bold text-foreground">Interactive Rune Lab</h2>
					<p class="text-xs text-muted-foreground">
						Mutate state variables directly to inspect console output and reactive lifecycle logs.
					</p>
				</div>
				<InteractiveRuneDemo />
			</div>
		{/if}
	</div>

	<!-- Bottom Quick Links -->
	<div
		class="mt-12 flex flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-muted/20 p-6 sm:flex-row"
	>
		<div>
			<h3 class="text-sm font-bold text-foreground">Need quick API syntax lookup?</h3>
			<p class="text-xs text-muted-foreground">
				Access code signatures for $state, $derived, $effect, and $props.
			</p>
		</div>
		<a
			href={resolve('/cheatsheet')}
			class="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground transition hover:bg-primary/90"
		>
			<span>Open Cheatsheet</span>
			<ArrowRight class="size-3.5" />
		</a>
	</div>
</div>
