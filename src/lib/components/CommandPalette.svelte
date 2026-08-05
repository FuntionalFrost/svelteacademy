<!-- src/lib/components/CommandPalette.svelte -->
<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { BookOpen, Command, Search, X } from '@lucide/svelte';

	interface GuideItem {
		slug: string;
		title: string;
		description: string;
		category: string;
	}

	interface GuideModule {
		metadata?: {
			title?: string;
			description?: string;
			category?: string;
		};
	}

	let isOpen = $state(false);
	let searchQuery = $state('');
	let guides = $state<GuideItem[]>([]);

	// Keyboard listener for Cmd+K / Ctrl+K / Escape
	$effect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
				e.preventDefault();
				isOpen = !isOpen;
			}
			if (e.key === 'Escape') {
				isOpen = false;
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	});

	// Load guides when modal opens
	$effect(() => {
		if (isOpen && guides.length === 0) {
			const modules = import.meta.glob<GuideModule>('/src/lib/content/guides/*.md', {
				eager: true
			});
			guides = Object.entries(modules).map(([path, mod]) => ({
				slug: path.split('/').pop()?.replace('.md', '') || '',
				title: mod.metadata?.title || 'Untitled',
				description: mod.metadata?.description || '',
				category: mod.metadata?.category || 'Guide'
			}));
		}
	});

	const filteredGuides = $derived(
		searchQuery.trim() === ''
			? guides
			: guides.filter(
					(g) =>
						g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
						g.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
						g.description.toLowerCase().includes(searchQuery.toLowerCase())
				)
	);

	function navigateTo(slug: string) {
		isOpen = false;
		searchQuery = '';
		goto(resolve(`/learn/${slug}`));
	}
</script>

{#if isOpen}
	<!-- Backdrop -->
	<div
		tabindex="-1"
		role="button"
		onclick={() => (isOpen = false)}
		onkeydown={(e) => e.key === 'Escape' && (isOpen = false)}
		class="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-opacity"
	></div>

	<!-- Modal -->
	<div class="fixed top-1/4 left-1/2 z-50 w-full max-w-xl -translate-x-1/2 p-4">
		<div class="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
			<!-- Input Header -->
			<div class="flex items-center border-b border-border px-4 py-3">
				<Search class="mr-3 size-4 text-muted-foreground" />
				<input
					type="text"
					bind:value={searchQuery}
					placeholder="Search guides, concepts, framework comparisons..."
					class="w-full bg-transparent text-sm text-foreground outline-hidden placeholder:text-muted-foreground"
				/>
				<button
					onclick={() => (isOpen = false)}
					class="rounded-lg p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
				>
					<X class="size-4" />
				</button>
			</div>

			<!-- Search Results -->
			<div class="max-h-80 overflow-y-auto p-2">
				{#if filteredGuides.length === 0}
					<div class="py-8 text-center text-xs text-muted-foreground">
						No guides found matching "{searchQuery}"
					</div>
				{:else}
					{#each filteredGuides as guide (guide.slug)}
						<button
							onclick={() => navigateTo(guide.slug)}
							class="flex w-full items-start gap-3 rounded-xl p-3 text-left transition hover:bg-accent/60"
						>
							<BookOpen class="mt-0.5 size-4 shrink-0 text-primary" />
							<div>
								<div class="flex items-center gap-2">
									<span class="text-xs font-bold text-foreground">{guide.title}</span>
									<span
										class="rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary"
									>
										{guide.category}
									</span>
								</div>
								<p class="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
									{guide.description}
								</p>
							</div>
						</button>
					{/each}
				{/if}
			</div>

			<div
				class="flex items-center justify-between border-t border-border bg-muted/30 px-4 py-2 text-[10px] text-muted-foreground"
			>
				<span
					>Press <kbd class="rounded border border-border bg-background px-1 font-mono">ESC</kbd> to close</span
				>
				<span class="flex items-center gap-1">
					<Command class="size-3" /> Navigation
				</span>
			</div>
		</div>
	</div>
{/if}
