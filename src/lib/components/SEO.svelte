<!-- src/lib/components/SEO.svelte -->
<script lang="ts">
	import { page } from '$app/state';
	import {
		defineSiteConfig,
		generateArticleSchema,
		generateBreadcrumbSchema,
		generateWebSiteSchema
	} from 'yaxa-svelte';

	interface Props {
		title?: string;
		description?: string;
		type?: 'website' | 'article';
		image?: string;
		publishDate?: string;
	}

	let {
		title = 'SvelteAcademy | Master Svelte 5 and SvelteKit',
		description = 'Interactive developer guides, primitives deep-dives, and architectural benchmarks for modern Svelte 5 development.',
		type = 'website',
		image = '/og-image.svg',
		publishDate
	}: Props = $props();

	const siteUrl = 'https://svelteacademy.netlify.app';
	// Strips URL parameters (?utm_source, etc.) for a clean canonical tag
	let canonicalUrl = $derived(`${siteUrl}${page.url.pathname}`);

	let fullTitle = $derived(title.includes('SvelteAcademy') ? title : `${title} — SvelteAcademy`);

	let ogImageUrl = $derived(
		image.startsWith('http') ? image : `${siteUrl}${image.startsWith('/') ? image : '/' + image}`
	);

	const siteConfig = defineSiteConfig({
		name: 'SvelteAcademy',
		title: 'SvelteAcademy | Master Svelte 5 and SvelteKit',
		description:
			'Interactive developer guides, primitives deep-dives, and architectural benchmarks for modern Svelte 5 development.',
		url: siteUrl,
		logo: `${siteUrl}/favicon.svg`,
		author: {
			name: 'SvelteAcademy Team',
			url: siteUrl,
			github: 'https://github.com/FuntionalFrost/svelteacademy'
		},
		project: {
			license: 'MIT',
			type: 'open-source',
			repositoryUrl: 'https://github.com/FuntionalFrost/svelteacademy',
			isAccessibleForFree: true
		}
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
	{#if websiteSchema}
		{@html `<script type="application/ld+json">${JSON.stringify(websiteSchema)}</` + `script>`}
	{/if}
</svelte:head>
