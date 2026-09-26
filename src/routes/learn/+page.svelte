<!-- src/routes/learn/+page.svelte -->
<script lang="ts">
	import { resolve } from '$app/paths';
	import TrackProgressCard from '$lib/components/learn/TrackProgressCard.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import SuperSvelteBanner from '$lib/components/SuperSvelteBanner.svelte';
	import { CURRICULUM_TRACKS, getAllLessons } from '$lib/content/curriculum';
	import { learningStore } from '$lib/stores/learningStore.svelte';
	import { ArrowRight, GraduationCap, RotateCcw, Trophy } from '@lucide/svelte';
	import { Button } from 'yaxa-svelte';

	let overall = $derived(learningStore.overallProgress);

	// Find the next incomplete lesson to quickly resume
	let nextUnfinishedLesson = $derived.by(() => {
		const all = getAllLessons();
		return all.find((l) => !learningStore.isCompleted(l.trackId, l.slug)) ?? all[0];
	});
</script>

<SEO
	title="Svelte 5 & SvelteKit Interactive Curriculum — SvelteAcademy"
	description="Master Svelte 5 runes, fine-grained reactivity, and SvelteKit 2 full-stack application development across 35 practical lessons."
/>

<div class="container mx-auto max-w-6xl space-y-12 px-4 py-12">
	<!-- Hero Section -->
	<header class="space-y-4 text-center">
		<div
			class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary"
		>
			<GraduationCap class="size-4" />
			<span>Interactive Masterclass Curriculum</span>
		</div>

		<h1 class="text-4xl font-black tracking-tight text-foreground sm:text-6xl">
			Learn <span
				class="bg-linear-to-r from-primary via-emerald-500 to-cyan-500 bg-clip-text text-transparent"
				>Svelte 5 & SvelteKit</span
			>
		</h1>

		<p class="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
			A demonstrative 35-lesson journey from basic reactive signals to enterprise full-stack
			architecture.
		</p>
	</header>

	<!-- Progress Overview Panel -->
	<div
		class="relative overflow-hidden rounded-3xl border border-border/80 bg-card p-6 shadow-sm sm:p-8"
	>
		<div class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
			<div class="space-y-2">
				<div class="flex items-center gap-2">
					<Trophy class="size-5 text-primary" />
					<h2 class="text-xl font-bold tracking-tight text-foreground">Curriculum Progress</h2>
				</div>
				<p class="text-sm text-muted-foreground">
					{overall.completed} of {overall.total} lessons completed ({overall.percentage}%)
				</p>
			</div>

			<div class="flex flex-wrap items-center gap-3">
				{#if nextUnfinishedLesson}
					<a
						href={resolve(`/learn/${nextUnfinishedLesson.trackId}/${nextUnfinishedLesson.slug}`)}
						class="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-xs transition hover:brightness-110"
					>
						<span>{overall.completed === 0 ? 'Start Learning' : 'Resume Curriculum'}</span>
						<ArrowRight class="size-4" />
					</a>
				{/if}

				{#if overall.completed > 0}
					<Button
						variant="ghost"
						size="sm"
						onclick={() => learningStore.resetProgress()}
						class="text-muted-foreground hover:text-destructive"
					>
						<RotateCcw class="mr-1.5 size-3.5" />
						Reset
					</Button>
				{/if}
			</div>
		</div>

		<!-- Progress Bar -->
		<div class="mt-6 h-2.5 w-full overflow-hidden rounded-full bg-muted">
			<div
				class="h-full bg-linear-to-r from-primary via-emerald-400 to-cyan-400 transition-all duration-500 ease-out"
				style:width="{overall.percentage}%"
			></div>
		</div>
	</div>

	<!-- 4 Curriculum Tracks Grid -->
	<section class="space-y-6">
		<div class="flex items-center justify-between">
			<h2 class="text-2xl font-bold tracking-tight text-foreground">Curriculum Tracks</h2>
			<span class="font-mono text-xs text-muted-foreground">4 Tracks · 35 Lessons</span>
		</div>

		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
			{#each CURRICULUM_TRACKS as track (track.id)}
				<TrackProgressCard {track} />
			{/each}
		</div>
	</section>

	<!-- SuperSvelte Banner -->
	<SuperSvelteBanner />
</div>
