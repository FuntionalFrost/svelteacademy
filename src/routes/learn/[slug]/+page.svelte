<!-- src/routes/learn/[slug]/+page.svelte -->
<script lang="ts">
	import { resolve } from '$app/paths';
	import SEO from '$lib/components/SEO.svelte';
	import { ArrowLeft, Zap } from '@lucide/svelte';

	let { data } = $props();

	const Content = $derived(data.content);
</script>

<SEO
	title={data.meta.title}
	description={data.meta.description}
	category={data.meta.category}
	type="article"
/>

<div class="min-h-screen bg-background py-12 text-foreground">
	<div class="container mx-auto max-w-3xl px-4">
		<!-- Back Button using resolve -->
		<a
			href={resolve('/learn')}
			class="mb-8 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
		>
			<ArrowLeft class="size-3.5" />
			<span>Back to all guides</span>
		</a>

		<!-- Article Metadata Header -->
		<header class="mb-10 space-y-3">
			<div class="inline-block rounded-md bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
				{data.meta.category || 'Framework Comparison'}
			</div>
			<h1 class="text-3xl font-black tracking-tight sm:text-4xl">{data.meta.title}</h1>
			<p class="text-base text-muted-foreground">{data.meta.description}</p>
		</header>

		<!-- Markdown Content Body -->
		<article
			class="prose max-w-none prose-zinc dark:prose-invert prose-headings:font-bold prose-a:text-primary"
		>
			<Content />
		</article>

		<!-- Bottom Conversion Banner -->
		<div class="mt-16 rounded-2xl border border-primary/20 bg-primary/5 p-6">
			<div class="flex items-center gap-2 text-xs font-bold text-primary">
				<Zap class="size-4" />
				<span>Ready to build this?</span>
			</div>
			<p class="mt-2 text-xs leading-relaxed text-muted-foreground">
				Skip weeks of infrastructure configuration. **Super Svelte** provides the complete
				production reference boilerplate with Auth, Postgres, Caching, and Storage pre-configured.
			</p>
			<a
				href="https://supersvelte.netlify.app"
				target="_blank"
				class="mt-4 inline-block rounded-lg bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-xs hover:bg-primary/90"
			>
				Get Super Svelte Kit →
			</a>
		</div>
	</div>
</div>
