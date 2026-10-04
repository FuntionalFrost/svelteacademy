<script lang="ts">
	import { resolve } from '$app/paths';
	import CelebrationModal from '#lib/components/learn/CelebrationModal.svelte';
	import CurriculumSidebar from '#lib/components/learn/CurriculumSidebar.svelte';
	import InteractiveLessonDemo from '#lib/components/learn/InteractiveLessonDemo.svelte';
	import LessonNavigation from '#lib/components/learn/LessonNavigation.svelte';
	import SEO from '#lib/components/SEO.svelte';
	import { enhanceCodeBlocks } from '#lib/actions/copyCode.js';
	import { learningStore } from '#lib/stores/learningStore.svelte.js';
	import { CheckCircle2, Clock, GraduationCap, PanelLeft } from '@lucide/svelte';
	import { Badge, Breadcrumb, Slideover } from 'yaxa-svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let mobileSidebarOpen = $state(false);
	let celebrationModalOpen = $state(false);

	let isCurrentLessonDone = $derived(
		learningStore.isCompleted(data.lesson.trackId, data.lesson.slug)
	);

	let breadcrumbItems = $derived([
		{ label: 'Curriculum', href: resolve('learn') },
		{
			label: data.track.title,
			href: resolve(`learn/${data.track.id}/${data.track.lessons[0].slug}`)
		},
		{ label: data.lesson.title }
	]);

	function handleLessonComplete() {
		if (learningStore.isTrackCompleted(data.lesson.trackId)) {
			celebrationModalOpen = true;
		}
	}
</script>

<!-- src/routes/learn/[track]/[slug]/+page.svelte -->

<SEO
	title="{data.lesson.title} — {data.track.title} | SvelteAcademy"
	description={data.lesson.description}
/>

<!-- Celebration Modal on Track Completion -->
<CelebrationModal bind:isOpen={celebrationModalOpen} track={data.track} />

<!-- Mobile Curriculum Slideover Drawer -->
<Slideover bind:open={mobileSidebarOpen} side="left" class="max-w-xs p-0">
	{#snippet header()}
		<div class="flex items-center gap-2 border-b border-border px-4 py-3 font-bold text-foreground">
			<GraduationCap class="size-4 text-primary" />
			<span>Curriculum Tracks</span>
		</div>
	{/snippet}
	<div class="h-full overflow-y-auto">
		<CurriculumSidebar currentTrackId={data.lesson.trackId} currentSlug={data.lesson.slug} />
	</div>
</Slideover>

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

	<!-- Main Lesson Content Area -->
	<main class="flex-1 overflow-y-auto px-4 py-8 sm:px-8 lg:px-12">
		<div class="mx-auto max-w-4xl space-y-8">
			<!-- Mobile Track Menu Toggle & Breadcrumbs -->

			<div class="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4">
				<Breadcrumb items={breadcrumbItems} class="text-xs" />

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
			<section>
				<InteractiveLessonDemo lesson={data.lesson} />
			</section>

			<!-- Markdown Rendered Content with Enhanced Typography -->
			<article
				class="prose max-w-none prose-slate dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-a:underline hover:prose-a:opacity-80 prose-pre:rounded-2xl prose-pre:border prose-pre:border-border/80 prose-pre:shadow-lg"
				use:enhanceCodeBlocks
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
