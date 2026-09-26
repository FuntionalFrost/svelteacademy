<!-- src/lib/components/CommandPalette.svelte -->
<script lang="ts">
	import { goto } from '$app/navigation';
	import { cheatsheetItems } from '$lib/content/cheatsheet';
	import { getAllLessons } from '$lib/content/curriculum';
	import { getAllGuides } from '$lib/content/guides';
	import {
		BookOpen,
		CodeXml,
		Command,
		ExternalLink,
		GraduationCap,
		Rocket,
		Search,
		Terminal,
		X
	} from '@lucide/svelte';
	import { Badge, Kbd, useShortcuts } from 'yaxa-svelte';

	interface PaletteItem {
		id: string;
		title: string;
		description: string;
		category: string;
		type: 'lesson' | 'guide' | 'cheatsheet' | 'page' | 'external';
		href: string;
	}

	let isOpen = $state(false);
	let searchQuery = $state('');
	let inputEl = $state<HTMLInputElement | null>(null);

	const corePages: PaletteItem[] = [
		{
			id: 'page-learn',
			title: 'Svelte 5 & SvelteKit Curriculum',
			description: '35 structured lessons covering basic and advanced Svelte & SvelteKit',
			category: 'Learn',
			type: 'page',
			href: '/learn'
		},
		{
			id: 'page-cheatsheet',
			title: 'Svelte 5 Runes Cheatsheet',
			description: 'Instant searchable reference for all Svelte 5 runes and utilities',
			category: 'Cheatsheet',
			type: 'page',
			href: '/cheatsheet'
		},
		{
			id: 'page-playground',
			title: 'Signal Sandbox & Playground',
			description: 'Interactive live demos for $state, $derived, $effect, and class stores',
			category: 'Playground',
			type: 'page',
			href: '/playground'
		},
		{
			id: 'page-guides',
			title: 'Developer Guides & Tutorials',
			description: 'Architecture blueprints and rune patterns for production applications',
			category: 'Guides',
			type: 'page',
			href: '/guides'
		},
		{
			id: 'page-supersvelte',
			title: 'SuperSvelte SaaS Boilerplate',
			description: 'Batteries-included Edge TypeScript stack with Auth, Neon, and Hono RPC',
			category: 'Boilerplate',
			type: 'external',
			href: 'https://supersvelte.netlify.app'
		},
		{
			id: 'page-yaxa',
			title: 'Yaxa UI Component Library',
			description: 'Svelte 5 & Tailwind CSS v4 component suite (Nuxt UI v4 equivalent)',
			category: 'Ecosystem',
			type: 'external',
			href: 'https://yaxa.vercel.app'
		}
	];

	const allItems: PaletteItem[] = [
		...getAllLessons().map((lesson) => ({
			id: `lesson-${lesson.trackId}-${lesson.slug}`,
			title: `${lesson.order}. ${lesson.title}`,
			description: lesson.description,
			category: lesson.trackTitle,
			type: 'lesson' as const,
			href: `/learn/${lesson.trackId}/${lesson.slug}`
		})),
		...cheatsheetItems.map((item) => ({
			id: `rune-${item.id}`,
			title: item.name,
			description: item.summary,
			category: item.category,
			type: 'cheatsheet' as const,
			href: `/cheatsheet#${item.id}`
		})),
		...corePages,
		...getAllGuides().map((guide) => ({
			id: `guide-${guide.slug}`,
			title: guide.title,
			description: guide.description,
			category: guide.category,
			type: 'guide' as const,
			href: `/guides/${guide.slug}`
		}))
	];

	// Keyboard listener via Svelte 5 rune composable
	$effect(() => {
		return useShortcuts({
			meta_k: () => (isOpen = !isOpen),
			escape: () => (isOpen = false)
		});
	});

	// Auto-focus input when palette opens
	$effect(() => {
		if (isOpen) {
			requestAnimationFrame(() => {
				inputEl?.focus();
			});
		}
	});

	const filteredItems = $derived(
		searchQuery.trim() === ''
			? allItems
			: allItems.filter(
					(item) =>
						item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
						item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
						item.description.toLowerCase().includes(searchQuery.toLowerCase())
				)
	);

	function navigateTo(item: PaletteItem) {
		isOpen = false;
		searchQuery = '';
		if (item.type === 'external') {
			window.open(item.href, '_blank', 'noopener,noreferrer');
		} else {
			goto(item.href);
		}
	}
</script>

<!-- Visible Trigger Button in Header -->
<button
	onclick={() => (isOpen = true)}
	class="inline-flex shrink-0 items-center gap-2 rounded-xl border border-border bg-card/60 px-3.5 py-1.5 text-sm whitespace-nowrap text-muted-foreground shadow-xs transition hover:border-primary/40 hover:text-foreground"
	aria-label="Search Academy"
>
	<Search class="size-4 shrink-0" />
	<span class="hidden whitespace-nowrap sm:inline-block">Search runes, guides...</span>
	<span class="hidden sm:inline-block">
		<Kbd size="xs">⌘K</Kbd>
	</span>
</button>

<!-- Command Palette Modal Overlay -->
{#if isOpen}
	<!-- Accessible Backdrop -->
	<div
		role="presentation"
		onclick={() => (isOpen = false)}
		class="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-opacity"
	></div>

	<!-- Modal Box -->
	<div
		class="fixed top-1/4 left-1/2 z-50 w-full max-w-xl -translate-x-1/2 animate-in p-4 duration-200 zoom-in-95 fade-in"
	>
		<div class="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
			<!-- Input Header -->
			<div class="flex items-center border-b border-border px-4 py-3">
				<Search class="mr-3 size-4 text-muted-foreground" />
				<input
					bind:this={inputEl}
					type="text"
					bind:value={searchQuery}
					placeholder="Search runes ($state, $derived), guides, topics..."
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
				{#if filteredItems.length === 0}
					<div class="py-8 text-center text-sm text-muted-foreground">
						No results found matching "{searchQuery}"
					</div>
				{:else}
					{#each filteredItems as item (item.id)}
						<button
							onclick={() => navigateTo(item)}
							class="flex w-full items-start gap-3 rounded-xl p-3 text-left transition hover:bg-accent/60"
						>
							{#if item.type === 'cheatsheet'}
								<CodeXml class="mt-0.5 size-4 shrink-0 text-amber-500" />
							{:else if item.type === 'lesson'}
								<GraduationCap class="mt-0.5 size-4 shrink-0 text-emerald-400" />
							{:else if item.type === 'page'}
								<Terminal class="mt-0.5 size-4 shrink-0 text-cyan-400" />
							{:else if item.type === 'external'}
								<Rocket class="mt-0.5 size-4 shrink-0 text-emerald-400" />
							{:else}
								<BookOpen class="mt-0.5 size-4 shrink-0 text-primary" />
							{/if}

							<div class="min-w-0 flex-1">
								<div class="flex items-center gap-2">
									<span class="font-mono text-sm font-bold text-foreground">{item.title}</span>
									<Badge
										size="xs"
										variant="subtle"
										color={item.type === 'cheatsheet'
											? 'warning'
											: item.type === 'external'
												? 'success'
												: 'primary'}
									>
										{item.category}
									</Badge>
									{#if item.type === 'external'}
										<ExternalLink class="size-3.5 text-muted-foreground opacity-70" />
									{/if}
								</div>
								<p class="mt-0.5 line-clamp-1 text-sm text-muted-foreground">
									{item.description}
								</p>
							</div>
						</button>
					{/each}
				{/if}
			</div>

			<div
				class="flex items-center justify-between border-t border-border bg-muted/30 px-4 py-2 text-sm text-muted-foreground"
			>
				<span class="inline-flex items-center gap-1.5">
					Press <Kbd size="xs">ESC</Kbd> to close
				</span>
				<span class="flex items-center gap-1">
					<Command class="size-4" /> Navigation
				</span>
			</div>
		</div>
	</div>
{/if}
