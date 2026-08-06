<!-- src/routes/tracks/+page.svelte -->
<script lang="ts">
	import TrackCard from '$lib/components/TrackCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Curriculum Tracks | SvelteAcademy</title>
	<meta
		name="description"
		content="Structured step-by-step learning paths for mastering Svelte 5 and SvelteKit."
	/>
</svelte:head>

<section class="container max-w-5xl px-4 py-10">
	<div class="mb-10 text-center">
		<h1 class="mb-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
			Curriculum Learning Tracks
		</h1>
		<p class="mx-auto max-w-2xl text-base text-muted-foreground">
			Follow our structured, level-by-level guides to transition from web basics to full-stack
			Svelte 5 mastery.
		</p>
	</div>

	<div class="grid gap-6 md:grid-cols-2">
		{#each data.tracks as track (track.id)}
			<TrackCard {track} guidesMeta={data.guidesMeta} />
		{/each}
	</div>
</section>
