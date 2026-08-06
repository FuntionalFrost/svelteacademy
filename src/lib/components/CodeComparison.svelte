<!-- src/lib/components/CodeComparison.svelte -->
<script lang="ts">
	import { Check, Copy, Sparkles } from '@lucide/svelte';
	import { createHighlighter } from 'shiki';

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

	let copied = $state(false);
	let svelteHtml = $state('');
	let competingHtml = $state('');
	let isReady = $state(false);

	// Singleton highlighter promise created ONCE when the module loads
	const highlighterPromise = createHighlighter({
		themes: ['github-dark'],
		langs: ['svelte', 'typescript', 'javascript', 'html', 'css']
	});

	$effect(() => {
		const cleanSvelte = svelteCode ? svelteCode.trim() : '';
		const cleanCompeting = competingCode ? competingCode.trim() : '';

		highlighterPromise.then((highlighter) => {
			if (cleanSvelte) {
				svelteHtml = highlighter.codeToHtml(cleanSvelte, {
					lang: 'svelte',
					theme: 'github-dark'
				});
			}
			if (cleanCompeting) {
				competingHtml = highlighter.codeToHtml(cleanCompeting, {
					lang: 'typescript',
					theme: 'github-dark'
				});
			}
			isReady = true;
		});
	});

	function copyCode() {
		navigator.clipboard.writeText(svelteCode.trim());
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}
</script>

<div
	class="relative my-8 overflow-hidden rounded-2xl border border-border bg-card shadow-xl transition-all hover:border-primary/40"
>
	<!-- Top Glowing Line Accent -->
	<div class="h-1 w-full bg-linear-to-r from-cyan-500 via-primary to-emerald-500"></div>

	<!-- Header Bar -->
	<div
		class="flex flex-col gap-3 border-b border-border bg-muted/40 p-5 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between"
	>
		<div>
			{#if title}
				<h3 class="text-base font-bold text-foreground">{title}</h3>
			{/if}
			{#if description}
				<p class="text-xs text-muted-foreground">{description}</p>
			{/if}
		</div>

		<button
			onclick={copyCode}
			class="inline-flex items-center gap-1.5 self-start rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold text-muted-foreground shadow-xs transition hover:border-primary/50 hover:text-foreground sm:self-auto"
		>
			{#if copied}
				<Check class="size-3.5 text-emerald-500" />
				<span class="text-emerald-500">Copied Svelte 5</span>
			{:else}
				<Copy class="size-3.5" />
				<span>Copy Svelte 5</span>
			{/if}
		</button>
	</div>

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
						class="inline-flex items-center gap-1.5 rounded-md border border-red-500/20 bg-red-500/10 px-2.5 py-0.5 font-mono text-xs font-bold text-red-500"
					>
						❌ {competingName}
					</span>
				</div>

				<div
					class="relative flex flex-1 flex-col overflow-hidden rounded-xl border border-red-500/20 bg-[#0d1117] shadow-xs"
				>
					{#if isReady && competingHtml}
						<div class="animate-in duration-150 fade-in">
							<!-- eslint-disable-next-line svelte/no-at-html-tags -->
							{@html competingHtml}
						</div>
					{:else}
						<!-- Dark Skeleton Placeholder (Prevents White Text Flicker) -->
						<div class="flex h-full flex-1 animate-pulse flex-col gap-2.5 bg-[#0d1117] p-4">
							<div class="h-3.5 w-3/4 rounded bg-slate-800/60"></div>
							<div class="h-3.5 w-1/2 rounded bg-slate-800/60"></div>
							<div class="h-3.5 w-5/6 rounded bg-slate-800/60"></div>
							<div class="h-3.5 w-2/3 rounded bg-slate-800/60"></div>
						</div>
					{/if}
				</div>
			</div>
		{/if}

		<!-- Svelte 5 Panel -->
		<div class="flex h-full flex-col gap-3 bg-primary/5 p-5 shadow-inner">
			<div class="flex items-center justify-between">
				<span
					class="inline-flex items-center gap-1.5 rounded-md border border-primary/30 bg-primary/10 px-2.5 py-0.5 font-mono text-xs font-bold text-primary"
				>
					<Sparkles class="size-3" />
					✨ Svelte 5 (Runes)
				</span>
			</div>

			<div
				class="relative flex flex-1 flex-col overflow-hidden rounded-xl border border-primary/30 bg-[#0d1117] shadow-md"
			>
				{#if isReady && svelteHtml}
					<div class="animate-in duration-150 fade-in">
						<!-- eslint-disable-next-line svelte/no-at-html-tags -->
						{@html svelteHtml}
					</div>
				{:else}
					<!-- Dark Skeleton Placeholder -->
					<div class="flex h-full flex-1 animate-pulse flex-col gap-2.5 bg-[#0d1117] p-4">
						<div class="h-3.5 w-3/4 rounded bg-slate-800/60"></div>
						<div class="h-3.5 w-1/2 rounded bg-slate-800/60"></div>
						<div class="h-3.5 w-5/6 rounded bg-slate-800/60"></div>
						<div class="h-3.5 w-2/3 rounded bg-slate-800/60"></div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	/* Force Shiki generated <pre> block to fill parent height with zero top/bottom margin leaks */
	:global(pre.shiki) {
		margin: 0 !important;
		padding: 1rem !important;
		height: 100% !important;
		flex: 1 1 0% !important;
		box-sizing: border-box !important;
		overflow-x: auto !important;
		background-color: transparent !important;
	}

	:global(pre.shiki code) {
		display: block !important;
		min-height: 100% !important;
	}
</style>
