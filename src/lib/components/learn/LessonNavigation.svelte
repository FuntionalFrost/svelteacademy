<!-- src/lib/components/learn/LessonNavigation.svelte -->
<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import type { LessonMeta } from '$lib/content/curriculum';
	import { learningStore } from '$lib/stores/learningStore.svelte';
	import { ArrowLeft, ArrowRight, CheckCircle2, Circle } from '@lucide/svelte';
	import { Button, Kbd, useShortcuts } from 'yaxa-svelte';

	let {
		lesson,
		prevLesson,
		nextLesson,
		onComplete
	}: {
		lesson: LessonMeta;
		prevLesson: LessonMeta | null;
		nextLesson: LessonMeta | null;
		onComplete?: () => void;
	} = $props();

	let isCompleted = $derived(learningStore.isCompleted(lesson.trackId, lesson.slug));

	function toggleCompletion() {
		const wasCompleted = learningStore.toggleCompleted(lesson.trackId, lesson.slug);
		if (wasCompleted && onComplete) {
			onComplete();
		}
	}

	function goToPrev() {
		if (prevLesson) {
			goto(resolve(`/learn/${prevLesson.trackId}/${prevLesson.slug}`));
		}
	}

	function goToNext() {
		if (nextLesson) {
			goto(resolve(`/learn/${nextLesson.trackId}/${nextLesson.slug}`));
		}
	}

	// Keyboard shortcut binding
	$effect(() => {
		return useShortcuts({
			j: goToPrev,
			'[': goToPrev,
			k: goToNext,
			']': goToNext,
			c: toggleCompletion
		});
	});
</script>

<div
	class="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/80 pt-6 sm:flex-row"
>
	<!-- Previous Lesson Button -->
	<div class="w-full sm:w-auto">
		{#if prevLesson}
			<a
				href={resolve(`/learn/${prevLesson.trackId}/${prevLesson.slug}`)}
				class="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition hover:border-primary/50 hover:bg-muted/40 sm:w-auto"
			>
				<ArrowLeft class="size-4" />
				<div class="text-left">
					<div class="text-[10px] tracking-wider text-muted-foreground uppercase">Previous</div>
					<div class="text-xs font-bold">{prevLesson.title}</div>
				</div>
				<Kbd class="ml-2 hidden text-[10px] sm:inline-block">J</Kbd>
			</a>
		{:else}
			<div></div>
		{/if}
	</div>

	<!-- Mark Complete Toggle -->
	<Button
		variant={isCompleted ? 'solid' : 'outline'}
		class="w-full gap-2 sm:w-auto"
		onclick={toggleCompletion}
	>
		{#if isCompleted}
			<CheckCircle2 class="size-4 text-emerald-300" />
			<span>Completed</span>
		{:else}
			<Circle class="size-4 text-muted-foreground" />
			<span>Mark as Complete</span>
		{/if}
		<Kbd class="text-[10px]">C</Kbd>
	</Button>

	<!-- Next Lesson Button -->
	<div class="w-full sm:w-auto">
		{#if nextLesson}
			<a
				href={resolve(`/learn/${nextLesson.trackId}/${nextLesson.slug}`)}
				class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground shadow-xs transition hover:brightness-110 sm:w-auto"
			>
				<div class="text-right">
					<div class="text-[10px] tracking-wider uppercase opacity-80">Next</div>
					<div class="text-xs font-bold">{nextLesson.title}</div>
				</div>
				<ArrowRight class="size-4" />
				<Kbd
					class="ml-2 hidden bg-primary-foreground/20 text-[10px] text-primary-foreground sm:inline-block"
					>K</Kbd
				>
			</a>
		{:else}
			<a
				href={resolve('/learn')}
				class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-bold text-slate-950 shadow-xs transition hover:brightness-110 sm:w-auto"
			>
				<span>Curriculum Complete 🎉</span>
			</a>
		{/if}
	</div>
</div>
