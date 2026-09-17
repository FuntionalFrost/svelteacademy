<!-- src/lib/components/SEO.svelte -->
<script lang="ts">
	import { page } from '$app/state';
	import { siteConfig } from '$lib/site';
	import {
		generateArticleSchema,
		generateBreadcrumbSchema,
		generateSoftwareSourceCodeSchema,
		generateWebSiteSchema
	} from 'yaxa-svelte';

	interface Props {
		title?: string;
		description?: string;
		type?: 'website' | 'article';
		image?: string;
		publishDate?: string;
		tag?: string;
	}

	let {
		title = 'SvelteAcademy | Master Svelte 5 and SvelteKit',
		description = 'Interactive developer guides, primitives deep-dives, and architectural benchmarks for modern Svelte 5 development.',
		type = 'website',
		image,
		publishDate,
		tag
	}: Props = $props();

	const siteUrl = siteConfig.url || 'https://svelteacademy.netlify.app';
	// Strips URL parameters (?utm_source, etc.) for a clean canonical tag
	let canonicalUrl = $derived(`${siteUrl}${page.url.pathname}`);

	let fullTitle = $derived(title.includes('SvelteAcademy') ? title : `${title} — SvelteAcademy`);

	let ogImageUrl = $derived.by(() => {
		if (image) {
			return image.startsWith('http')
				? image
				: `${siteUrl}${image.startsWith('/') ? image : '/' + image}`;
		}
		if (type === 'article') {
			return `${siteUrl}/api/og?title=${encodeURIComponent(title)}&tag=${encodeURIComponent(tag || 'Guide')}&badge=Svelte%205`;
		}
		return `${siteUrl}/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&badge=Svelte%205`;
	});

	let articleSchema = $derived(
		type === 'article'
			? generateArticleSchema(siteConfig, {
					title: fullTitle,
					description,
					url: canonicalUrl,
					datePublished: publishDate || '2026-01-01T00:00:00Z',
					image: ogImageUrl,
					authorName: 'SvelteAcademy Team'
				})
			: null
	);

	let breadcrumbSchema = $derived(
		type === 'article'
			? generateBreadcrumbSchema(siteConfig, [
					{ name: 'Home', url: siteUrl },
					{ name: 'Guides', url: `${siteUrl}/guides` },
					{ name: title, url: canonicalUrl }
				])
			: null
	);

	let sourceCodeSchema = $derived(
		type === 'article' ? generateSoftwareSourceCodeSchema(siteConfig) : null
	);

	let websiteSchema = $derived(type === 'website' ? generateWebSiteSchema(siteConfig) : null);
</script>

<svelte:head>
	<!-- Primary Search Meta -->
	<title>{fullTitle}</title>
	<meta name="title" content={fullTitle} />
	<meta name="description" content={description} />
	<link rel="canonical" href={canonicalUrl} />

	<!-- Open Graph / Facebook / LinkedIn -->
	<meta property="og:type" content={type} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={ogImageUrl} />
	<meta property="og:site_name" content="SvelteAcademy" />

	<!-- Twitter Cards -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content={canonicalUrl} />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImageUrl} />

	{#if publishDate}
		<meta property="article:published_time" content={publishDate} />
	{/if}

	<!-- Schema.org JSON-LD Structured Data -->
	<!-- eslint-disable svelte/no-at-html-tags -->
	{#if articleSchema}
		{@html `<script type="application/ld+json">${JSON.stringify(articleSchema)}</` + `script>`}
	{/if}
	{#if breadcrumbSchema}
		{@html `<script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</` + `script>`}
	{/if}
	{#if sourceCodeSchema}
		{@html `<script type="application/ld+json">${JSON.stringify(sourceCodeSchema)}</` + `script>`}
	{/if}
	{#if websiteSchema}
		{@html `<script type="application/ld+json">${JSON.stringify(websiteSchema)}</` + `script>`}
	{/if}
</svelte:head>
