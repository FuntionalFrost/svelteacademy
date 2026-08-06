<!-- src/lib/components/CodeComparison.svelte -->
<script lang="ts">
	import { Check, Copy, Sparkles } from '@lucide/svelte';
	import { codeToHtml } from 'shiki';

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

	// Helper function for SSR + Client syntax highlighting
	async function highlight(code: string, lang: string) {
		const clean = code ? code.trim() : '';
		if (!clean) return '';
		return await codeToHtml(clean, {
			lang,
			theme: 'github-dark'
		});
	}

	// Promises derived from props - SvelteKit SSR resolves these on the server before sending HTML
	let svelteHtmlPromise = $derived(highlight(svelteCode, 'svelte'));
	let competingHtmlPromise = $derived(highlight(competingCode, 'typescript'));

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
					{#await competingHtmlPromise}
						<pre class="h-full flex-1 bg-[#0d1117] p-4 font-mono text-xs text-slate-200"><code
								>{competingCode.trim()}</code
							></pre>
					{:then html}
						<!-- eslint-disable-next-line svelte/no-at-html-tags -->
						{@html html}
					{/await}
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
				{#await svelteHtmlPromise}
					<pre class="h-full flex-1 bg-[#0d1117] p-4 font-mono text-xs text-slate-200"><code
							>{svelteCode.trim()}</code
						></pre>
				{:then html}
					<!-- eslint-disable-next-line svelte/no-at-html-tags -->
					{@html html}
				{/await}
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
