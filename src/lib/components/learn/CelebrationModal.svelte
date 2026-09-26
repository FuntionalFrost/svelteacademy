<!-- src/lib/components/learn/CelebrationModal.svelte -->
<script lang="ts">
	import { resolve } from '$app/paths';
	import type { TrackMeta } from '$lib/content/curriculum';
	import { ArrowRight, CheckCircle2, Trophy, X } from '@lucide/svelte';
	import { Button } from 'yaxa-svelte';

	let {
		isOpen = $bindable(false),
		track
	}: {
		isOpen: boolean;
		track?: TrackMeta;
	} = $props();

	function closeModal() {
		isOpen = false;
	}
</script>

{#if isOpen}
	<div
		class="fixed inset-0 z-50 flex animate-in items-center justify-center bg-background/80 p-4 backdrop-blur-md fade-in"
	>
		<div
			class="relative w-full max-w-md animate-in overflow-hidden rounded-3xl border border-primary/40 bg-card p-6 shadow-2xl zoom-in-95"
		>
			<!-- Top Accent Glow -->
			<div
				class="pointer-events-none absolute -top-12 -left-12 size-36 rounded-full bg-primary/20 blur-2xl"
			></div>

			<!-- Close Button -->
			<button
				onclick={closeModal}
				class="absolute top-4 right-4 rounded-xl p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
				aria-label="Close"
			>
				<X class="size-4" />
			</button>

			<div class="space-y-4 text-center">
				<div
					class="mx-auto flex size-16 items-center justify-center rounded-2xl bg-linear-to-tr from-primary to-cyan-400 text-slate-950 shadow-lg shadow-primary/30"
				>
					<Trophy class="size-8" />
				</div>

				<div class="space-y-1">
					<span class="font-mono text-xs font-bold tracking-wider text-primary uppercase">
						Milestone Achieved
					</span>
					<h3 class="text-2xl font-black tracking-tight text-foreground">
						{track ? `${track.title} Mastered!` : 'Curriculum Complete!'}
					</h3>
					<p class="text-xs text-muted-foreground">
						{track
							? `You've completed all lessons in ${track.title}.`
							: 'You have conquered all 35 lessons of Svelte 5 and SvelteKit!'}
					</p>
				</div>

				<div class="rounded-xl border border-border bg-muted/40 p-3 text-left">
					<div class="flex items-center gap-2 font-mono text-xs font-bold text-foreground">
						<CheckCircle2 class="size-4 text-emerald-400" />
						<span>Full Mastery Status Unlocked</span>
					</div>
					<p class="mt-1 text-[11px] text-muted-foreground">
						Your progress is securely persisted in your browser. Continue to next tracks or review
						at any time.
					</p>
				</div>

				<div class="flex gap-2 pt-2">
					<Button class="flex-1" onclick={closeModal}>Keep Learning</Button>
					<a
						href={resolve('/learn')}
						class="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-border bg-card px-4 py-2 text-sm font-bold text-foreground transition hover:border-primary/50"
						onclick={closeModal}
					>
						<span>Dashboard</span>
						<ArrowRight class="size-4" />
					</a>
				</div>
			</div>
		</div>
	</div>
{/if}
