<!-- src/lib/components/TrackCard.svelte -->
<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Track } from '$lib/config/tracks';

	interface GuideMeta {
		slug: string;
		title: string;
		readTime: string;
	}

	let { track, guidesMeta }: { track: Track; guidesMeta: GuideMeta[] } = $props();

	// Filter and order guides matching this track's slug order
	let trackGuides = $derived(
		track.slugs
			.map((slug) => guidesMeta.find((g) => g.slug === slug))
			.filter((g): g is GuideMeta => g !== undefined)
	);
</script>

<div
	class="rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/40"
>
	<div class="mb-3 flex items-center justify-between gap-4">
		<span
			class="inline-flex items-center rounded-md bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary"
		>
			{track.badge} • {track.level}
		</span>
		<span class="font-mono text-xs text-muted-foreground">
			{trackGuides.length} Guides
		</span>
	</div>

	<h3 class="mb-2 text-xl font-bold tracking-tight text-card-foreground">
		{track.title}
	</h3>

	<p class="mb-6 text-sm leading-relaxed text-muted-foreground">
		{track.description}
	</p>

	<!-- Ordered Guide Steps -->
	<ol class="space-y-2 border-t border-border/60 pt-4">
		{#each trackGuides as guide, index (guide.slug)}
			<li>
				<a
					href={resolve('/learn/[slug]', { slug: guide.slug })}
					class="group flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
				>
					<div class="flex items-center gap-3 truncate">
						<span
							class="flex size-5 shrink-0 items-center justify-center rounded-full bg-muted font-mono text-[11px] font-semibold text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground"
						>
							{index + 1}
						</span>
						<span class="truncate font-medium">{guide.title}</span>
					</div>
					<span class="ml-4 shrink-0 font-mono text-xs text-muted-foreground">
						{guide.readTime}
					</span>
				</a>
			</li>
		{/each}
	</ol>
</div>
