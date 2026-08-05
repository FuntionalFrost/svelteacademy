<!-- src/lib/components/SEO.svelte -->
<script lang="ts">
	import { page } from '$app/state';

	let {
		title = 'SvelteAcademy — Modern Web Development Without Complexity',
		description = 'Deep dives into Svelte 5 Runes, SvelteKit architecture, and zero-complexity full-stack web development.',
		category = 'Development',
		type = 'website'
	} = $props<{
		title?: string;
		description?: string;
		category?: string;
		type?: string;
	}>();

	const siteName = 'SvelteAcademy';
	// Svelte 5: page is now a reactive state object (no $ prefix)
	const url = $derived(`https://svelteacademy.netlify.app${page.url.pathname}`);
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{title === siteName ? title : `${title} | ${siteName}`}</title>
	<meta name="description" content={description} />
	<meta
		name="keywords"
		content="Svelte 5, SvelteKit, Runes, React 19, HTMX, Web Development, TypeScript"
	/>
	<link rel="canonical" href={url} />

	<!-- Open Graph / Facebook / Discord -->
	<meta property="og:type" content={type} />
	<meta property="og:url" content={url} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:site_name" content={siteName} />

	<!-- Twitter Cards -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content={url} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:label1" content="Category" />
	<meta name="twitter:data1" content={category} />
</svelte:head>
