<!-- src/lib/components/learn/CurriculumSidebar.svelte -->
<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { CURRICULUM_TRACKS, getTrack, type TrackId } from '$lib/content/curriculum';
	import { learningStore } from '$lib/stores/learningStore.svelte';
	import { CheckCircle2, ChevronDown, Circle, Search } from '@lucide/svelte';
	import { useDebounce } from 'yaxa-svelte';

	let {
		currentTrackId,
		currentSlug
	}: {
		currentTrackId: TrackId;
		currentSlug: string;
	} = $props();

	let searchQuery = $state('');
	const debouncedQuery = useDebounce(() => searchQuery, 150);

	let activeTrack = $derived(getTrack(currentTrackId) ?? CURRICULUM_TRACKS[0]);
	let trackProgress = $derived(learningStore.getTrackProgress(currentTrackId));

	let filteredLessons = $derived(
		activeTrack.lessons.filter((lesson) => {
			const q = debouncedQuery.value.toLowerCase().trim();
			if (!q) return true;
			return (
				lesson.title.toLowerCase().includes(q) ||
				lesson.description.toLowerCase().includes(q) ||
				lesson.slug.toLowerCase().includes(q)
			);
		})
	);
</script>

<aside
	class="flex h-full w-full flex-col border-r border-border/80 bg-background/95 backdrop-blur-sm lg:w-80"
>
	<!-- Track Selector Header -->
	<div class="space-y-3 border-b border-border/80 p-4">
		<div class="space-y-1">
			<span class="font-mono text-[11px] font-bold tracking-wider text-primary uppercase">
				Curriculum Track
			</span>
			<div class="relative">
				<select
					value={currentTrackId}
					onchange={(e) => {
						const selected = (e.target as HTMLSelectElement).value as TrackId;
						const track = getTrack(selected);
						if (track && track.lessons[0]) {
							goto(resolve(`/learn/${selected}/${track.lessons[0].slug}`));
						}
					}}
					class="w-full appearance-none rounded-xl border border-border bg-card px-3.5 py-2.5 pr-8 text-sm font-bold text-foreground transition focus:border-primary focus:outline-hidden"
				>
					{#each CURRICULUM_TRACKS as track (track.id)}
						<option value={track.id}>{track.title} ({track.lessons.length} lessons)</option>
					{/each}
				</select>
				<ChevronDown
					class="pointer-events-none absolute top-3 right-3 size-4 text-muted-foreground"
				/>
			</div>
		</div>

		<!-- Track Progress Meter -->
		<div class="space-y-1.5 pt-1">
			<div class="flex items-center justify-between text-xs font-semibold">
				<span class="text-muted-foreground">Track Progress</span>
				<span class="font-mono text-primary"
					>{trackProgress.completed}/{trackProgress.total} ({trackProgress.percentage}%)</span
				>
			</div>
			<div class="h-1.5 w-full overflow-hidden rounded-full bg-muted">
				<div
					class="h-full bg-primary transition-all duration-300"
					style:width="{trackProgress.percentage}%"
				></div>
			</div>
		</div>

		<!-- Quick Filter Search Input -->
		<div class="relative pt-1">
			<Search class="pointer-events-none absolute top-3.5 left-3 size-3.5 text-muted-foreground" />
			<input
				type="search"
				bind:value={searchQuery}
				placeholder="Filter lessons..."
				class="w-full rounded-lg border border-border bg-muted/40 py-1.5 pr-3 pl-8 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-hidden"
			/>
		</div>
	</div>

	<!-- Lesson Item List -->
	<nav class="flex-1 space-y-1 overflow-y-auto p-3">
		{#each filteredLessons as lesson (lesson.slug)}
			{@const isActive = lesson.slug === currentSlug}
			{@const isDone = learningStore.isCompleted(lesson.trackId, lesson.slug)}
			{@const lessonHref = resolve(`/learn/${lesson.trackId}/${lesson.slug}`)}

			<a
				href={lessonHref}
				class="group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-all duration-150 {isActive
					? 'bg-primary/10 font-bold text-primary shadow-xs'
					: 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'}"
			>
				<div class="flex min-w-0 items-center gap-2.5">
					<!-- Completion Checkmark Icon -->
					{#if isDone}
						<CheckCircle2 class="size-4 shrink-0 fill-emerald-500/20 text-emerald-500" />
					{:else}
						<Circle
							class="size-4 shrink-0 text-muted-foreground/40 group-hover:text-muted-foreground"
						/>
					{/if}

					<div class="min-w-0 truncate">
						<div class="truncate {isActive ? 'text-primary' : 'text-foreground/90'}">
							{lesson.order}. {lesson.title}
						</div>
					</div>
				</div>

				<span class="ml-2 shrink-0 font-mono text-[10px] text-muted-foreground">
					{lesson.readTime.replace(' read', '')}
				</span>
			</a>
		{:else}
			<div class="p-4 text-center text-xs text-muted-foreground">
				No lessons matching "{searchQuery}"
			</div>
		{/each}
	</nav>
</aside>
