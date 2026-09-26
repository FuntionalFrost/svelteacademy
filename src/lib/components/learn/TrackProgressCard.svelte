<!-- src/lib/components/learn/TrackProgressCard.svelte -->
<script lang="ts">
	import { resolve } from '$app/paths';
	import type { TrackMeta } from '$lib/content/curriculum';
	import { learningStore } from '$lib/stores/learningStore.svelte';
	import { ArrowRight } from '@lucide/svelte';
	import { Badge } from 'yaxa-svelte';

	let { track }: { track: TrackMeta } = $props();

	let progress = $derived(learningStore.getTrackProgress(track.id));
	let isCompleted = $derived(learningStore.isTrackCompleted(track.id));

	const firstLessonSlug = $derived(track.lessons[0]?.slug ?? 'introduction');
	const trackHref = $derived(resolve(`/learn/${track.id}/${firstLessonSlug}`));
</script>

<div
	class="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card p-6 shadow-xs transition-all duration-300 hover:border-primary/50 hover:shadow-md"
>
	<!-- Ambient top gradient -->
	<div
		class="absolute top-0 right-0 left-0 h-1 bg-linear-to-r {track.accentColor} opacity-80 transition group-hover:opacity-100"
	></div>

	<div class="space-y-4">
		<!-- Header with Badge & Level -->
		<div class="flex items-center justify-between">
			<span class="font-mono text-xs font-bold tracking-wider text-primary uppercase">
				{track.badge}
			</span>
			<Badge
				variant={track.level === 'beginner'
					? 'subtle'
					: track.level === 'intermediate'
						? 'outline'
						: 'solid'}
				size="sm"
			>
				{track.level}
			</Badge>
		</div>

		<!-- Title & Description -->
		<div>
			<h3
				class="text-xl font-bold tracking-tight text-foreground transition group-hover:text-primary"
			>
				{track.title}
			</h3>
			<p class="mt-2 text-sm leading-relaxed text-muted-foreground">
				{track.description}
			</p>
		</div>

		<!-- Progress Bar & Count -->
		<div class="space-y-1.5 pt-2">
			<div class="flex items-center justify-between text-xs font-semibold">
				<span class="text-muted-foreground">
					{progress.completed} of {progress.total} lessons completed
				</span>
				<span class="font-mono text-primary">{progress.percentage}%</span>
			</div>
			<div class="h-2 w-full overflow-hidden rounded-full bg-muted">
				<div
					class="h-full bg-primary transition-all duration-500 ease-out"
					style:width="{progress.percentage}%"
				></div>
			</div>
		</div>
	</div>

	<!-- Action Footer -->
	<div class="mt-6 flex items-center justify-between border-t border-border/60 pt-4">
		<span class="font-mono text-xs text-muted-foreground">
			{track.lessons.length} Modules
		</span>

		<a
			href={trackHref}
			class="inline-flex items-center gap-1.5 rounded-xl bg-primary/10 px-4 py-2 text-sm font-bold text-primary transition hover:bg-primary hover:text-primary-foreground"
		>
			<span>{progress.completed === 0 ? 'Start Track' : isCompleted ? 'Review' : 'Continue'}</span>
			<ArrowRight class="size-4 transition-transform group-hover:translate-x-0.5" />
		</a>
	</div>
</div>
