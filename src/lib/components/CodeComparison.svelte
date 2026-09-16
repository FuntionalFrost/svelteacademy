<!-- src/lib/components/CodeComparison.svelte -->
<script lang="ts">
	import { Sparkles } from '@lucide/svelte';
	import { CodeBlock } from 'yaxa-svelte';

	interface Props {
		title?: string;
		description?: string;
		svelteCode: string;
		competingCode?: string;
		competingName?: string;
	}

	let {
		title = '',
		description = '',
		svelteCode,
		competingCode = '',
		competingName = 'React 19'
	}: Props = $props();
</script>

<div
	class="relative my-8 overflow-hidden rounded-2xl border border-border bg-card shadow-xl transition-all hover:border-primary/40"
>
	<!-- Top Glowing Line Accent -->
	<div class="h-1 w-full bg-linear-to-r from-cyan-500 via-primary to-emerald-500"></div>

	<!-- Header Bar -->
	{#if title || description}
		<div class="border-b border-border bg-muted/40 p-5 backdrop-blur-md">
			{#if title}
				<h3 class="text-base font-bold text-foreground sm:text-lg">{title}</h3>
			{/if}
			{#if description}
				<p class="mt-1 text-sm text-muted-foreground">{description}</p>
			{/if}
		</div>
	{/if}

	<!-- Comparison or Single Snippet Grid -->
	<div
		class="grid grid-cols-1 divide-y divide-border {competingCode
			? 'md:grid-cols-2 md:divide-x md:divide-y-0'
			: ''}"
	>
		{#if competingCode}
			<!-- Competitor Panel -->
			<div class="flex h-full flex-col gap-3 bg-red-500/5 p-5 dark:bg-red-950/10">
				<div class="flex items-center justify-between">
					<span
						class="inline-flex items-center gap-1.5 rounded-md border border-red-500/20 bg-red-500/10 px-2.5 py-0.5 font-mono text-sm font-bold text-red-500"
					>
						❌ {competingName}
					</span>
				</div>

				<CodeBlock
					code={competingCode.trim()}
					language="typescript"
					filename="{competingName} Implementation"
					class="m-0! flex-1 border-red-500/20! bg-[#0d1117]!"
				/>
			</div>
		{/if}

		<!-- Svelte 5 Panel -->
		<div class="flex h-full flex-col gap-3 bg-primary/5 p-5 shadow-inner">
			<div class="flex items-center justify-between">
				<span
					class="inline-flex items-center gap-1.5 rounded-md border border-primary/30 bg-primary/10 px-2.5 py-0.5 font-mono text-sm font-bold text-primary"
				>
					<Sparkles class="size-3.5" />
					✨ Svelte 5 (Runes)
				</span>
			</div>

			<CodeBlock
				code={svelteCode.trim()}
				language="svelte"
				filename="Svelte 5 Runes"
				class="m-0! flex-1 border-primary/30! bg-[#0d1117]!"
			/>
		</div>
	</div>
</div>
