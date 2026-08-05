<!-- src/lib/components/CodeComparison.svelte -->
<script lang="ts">
	import { Check, Copy, Sparkles } from '@lucide/svelte';

	let {
		title,
		description,
		svelteCode,
		competingCode,
		competingName = 'React 19'
	} = $props<{
		title: string;
		description: string;
		svelteCode: string;
		competingCode: string;
		competingName?: string;
	}>();

	let copied = $state(false);
	let competingHtml = $state('');
	let svelteHtml = $state('');

	// Dynamically import Shiki on demand to code-split it out of the main bundle
	$effect(() => {
		import('shiki').then(({ codeToHtml }) => {
			codeToHtml(competingCode, {
				lang: 'typescript',
				themes: { light: 'github-light', dark: 'tokyo-night' }
			}).then((html) => (competingHtml = html));

			codeToHtml(svelteCode, {
				lang: 'svelte',
				themes: { light: 'github-light', dark: 'tokyo-night' }
			}).then((html) => (svelteHtml = html));
		});
	});

	function copyCode() {
		navigator.clipboard.writeText(svelteCode);
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
			<h3 class="text-base font-bold text-foreground">{title}</h3>
			<p class="text-xs text-muted-foreground">{description}</p>
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

	<!-- Side-by-Side Comparison Grid -->
	<div class="grid grid-cols-1 divide-y divide-border md:grid-cols-2 md:divide-x md:divide-y-0">
		<!-- Competitor Panel -->
		<div class="flex flex-col gap-3 bg-red-500/5 p-5 dark:bg-red-950/10">
			<div class="flex items-center justify-between">
				<span
					class="inline-flex items-center gap-1.5 rounded-md border border-red-500/20 bg-red-500/10 px-2.5 py-0.5 font-mono text-xs font-bold text-red-500"
				>
					❌ {competingName}
				</span>
			</div>

			<div
				class="relative overflow-hidden rounded-xl border border-red-500/20 bg-background/80 shadow-xs"
			>
				{#if competingHtml}
					{@html competingHtml}
				{:else}
					<pre class="p-4 font-mono text-xs text-muted-foreground"><code>{competingCode}</code
						></pre>
				{/if}
			</div>
		</div>

		<!-- Svelte 5 Panel -->
		<div class="flex flex-col gap-3 bg-primary/5 p-5 shadow-inner">
			<div class="flex items-center justify-between">
				<span
					class="inline-flex items-center gap-1.5 rounded-md border border-primary/30 bg-primary/10 px-2.5 py-0.5 font-mono text-xs font-bold text-primary"
				>
					<Sparkles class="size-3" />
					✨ Svelte 5 (Runes)
				</span>
			</div>

			<div
				class="relative overflow-hidden rounded-xl border border-primary/30 bg-background/90 shadow-md"
			>
				{#if svelteHtml}
					{@html svelteHtml}
				{:else}
					<pre class="p-4 font-mono text-xs text-foreground"><code>{svelteCode}</code></pre>
				{/if}
			</div>
		</div>
	</div>
</div>
