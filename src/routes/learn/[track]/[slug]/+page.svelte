<!-- src/routes/learn/[track]/[slug]/+page.svelte -->
<script lang="ts">
	import { resolve } from '$app/paths';
	import CelebrationModal from '$lib/components/learn/CelebrationModal.svelte';
	import CurriculumSidebar from '$lib/components/learn/CurriculumSidebar.svelte';
	import InteractiveLessonDemo from '$lib/components/learn/InteractiveLessonDemo.svelte';
	import LessonNavigation from '$lib/components/learn/LessonNavigation.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { learningStore } from '$lib/stores/learningStore.svelte';
	import { CheckCircle2, ChevronRight, Clock, GraduationCap, PanelLeft, X } from '@lucide/svelte';
	import { Badge } from 'yaxa-svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let mobileSidebarOpen = $state(false);
	let celebrationModalOpen = $state(false);

	let isCurrentLessonDone = $derived(
		learningStore.isCompleted(data.lesson.trackId, data.lesson.slug)
	);

	function handleLessonComplete() {
		if (learningStore.isTrackCompleted(data.lesson.trackId)) {
			celebrationModalOpen = true;
		}
	}
</script>

<SEO
	title="{data.lesson.title} — {data.track.title} | SvelteAcademy"
	description={data.lesson.description}
/>

<!-- Celebration Modal on Track Completion -->
<CelebrationModal bind:isOpen={celebrationModalOpen} track={data.track} />

<div class="relative flex min-h-[calc(100vh-4rem)] flex-col lg:flex-row">
	<!-- Ambient Background Glow for Active Track -->
	<div
		class="pointer-events-none absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
	></div>

	<!-- Desktop Sticky Sidebar -->
	<div class="hidden shrink-0 lg:block lg:w-80">
		<div class="sticky top-16 h-[calc(100vh-4rem)]">
			<CurriculumSidebar currentTrackId={data.lesson.trackId} currentSlug={data.lesson.slug} />
		</div>
	</div>

	<!-- Mobile Sidebar Drawer Overlay -->
	{#if mobileSidebarOpen}
		<div
			class="fixed inset-0 z-50 flex bg-background/80 backdrop-blur-md lg:hidden"
			role="dialog"
			aria-modal="true"
		>
			<div class="relative flex w-5/6 max-w-sm flex-col bg-background shadow-2xl">
				<div class="flex items-center justify-between border-b border-border p-4">
					<div class="flex items-center gap-2 font-bold text-foreground">
						<GraduationCap class="size-4 text-primary" />
						<span>Curriculum Tracks</span>
					</div>
					<button
						type="button"
						class="rounded-lg p-1 text-muted-foreground hover:bg-muted"
						onclick={() => (mobileSidebarOpen = false)}
						aria-label="Close Menu"
					>
						<X class="size-5" />
					</button>
				</div>
				<div class="flex-1 overflow-y-auto">
					<CurriculumSidebar currentTrackId={data.lesson.trackId} currentSlug={data.lesson.slug} />
				</div>
			</div>
			<div
				class="flex-1 cursor-pointer"
				onclick={() => (mobileSidebarOpen = false)}
				role="button"
				tabindex="0"
				onkeydown={(e) => e.key === 'Escape' && (mobileSidebarOpen = false)}
				aria-label="Close backdrop"
			></div>
		</div>
	{/if}

	<!-- Main Lesson Content Area -->
	<main class="flex-1 overflow-y-auto px-4 py-8 sm:px-8 lg:px-12">
		<div class="mx-auto max-w-4xl space-y-8">
			<!-- Mobile Track Menu Toggle & Breadcrumbs -->
			<div class="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4">
				<nav class="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
					<a href={resolve('/learn')} class="transition hover:text-foreground">Curriculum</a>
					<ChevronRight class="size-3.5 opacity-60" />
					<a
						href={resolve(`/learn/${data.track.id}/${data.track.lessons[0].slug}`)}
						class="font-semibold text-primary transition hover:underline"
					>
						{data.track.title}
					</a>
					<ChevronRight class="size-3.5 opacity-60" />
					<span class="font-bold text-foreground">{data.lesson.title}</span>
				</nav>

				<button
					type="button"
					class="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground shadow-xs transition hover:border-primary/40 lg:hidden"
					onclick={() => (mobileSidebarOpen = true)}
				>
					<PanelLeft class="size-3.5 text-primary" />
					<span>Curriculum Tree</span>
				</button>
			</div>

			<!-- Lesson Header Hero Banner -->
			<header
				class="relative space-y-4 overflow-hidden rounded-3xl border border-border/80 bg-linear-to-br from-card via-card to-background p-6 shadow-sm sm:p-8"
			>
				<div class="flex flex-wrap items-center gap-2.5">
					<span
						class="inline-flex items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs font-bold text-primary shadow-xs"
					>
						Lesson {data.lesson.order} of {data.track.lessons.length}
					</span>

					<Badge
						variant={data.lesson.level === 'beginner'
							? 'subtle'
							: data.lesson.level === 'intermediate'
								? 'outline'
								: 'solid'}
						size="sm"
					>
						{data.lesson.level}
					</Badge>

					<span class="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground">
						<Clock class="size-3.5" />
						{data.lesson.readTime}
					</span>

					{#if isCurrentLessonDone}
						<span
							class="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 font-mono text-xs font-bold text-emerald-500"
						>
							<CheckCircle2 class="size-3.5" />
							Mastered
						</span>
					{/if}
				</div>

				<h1 class="text-3xl font-black tracking-tight text-foreground sm:text-5xl">
					{data.lesson.title}
				</h1>

				<p class="text-base leading-relaxed text-muted-foreground sm:text-lg">
					{data.lesson.description}
				</p>
			</header>

			<!-- Interactive Micro-Simulator Widget -->
			<section
				class="rounded-3xl border border-border/80 bg-card/70 p-1 shadow-sm backdrop-blur-md"
			>
				<InteractiveLessonDemo lesson={data.lesson} />
			</section>

			<!-- Markdown Rendered Content with Enhanced Typography -->
			<article
				class="prose max-w-none prose-slate dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-a:underline hover:prose-a:opacity-80 prose-pre:rounded-2xl prose-pre:border prose-pre:border-border/80 prose-pre:shadow-lg"
			>
				<data.content />
			</article>

			<!-- Bottom Lesson Navigation & Completion Toggle -->
			<LessonNavigation
				lesson={data.lesson}
				prevLesson={data.prevLesson}
				nextLesson={data.nextLesson}
				onComplete={handleLessonComplete}
			/>
		</div>
	</main>
</div>
