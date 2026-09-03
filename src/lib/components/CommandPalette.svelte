<!-- src/lib/components/CommandPalette.svelte -->
<script lang="ts">
	import { goto } from '$app/navigation';
	import {
		BookOpen,
		CodeXml,
		Command,
		ExternalLink,
		Rocket,
		Search,
		Terminal,
		X
	} from '@lucide/svelte';

	interface PaletteItem {
		id: string;
		title: string;
		description: string;
		category: string;
		type: 'guide' | 'cheatsheet' | 'page' | 'external';
		href: string;
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
	let allItems = $state<PaletteItem[]>([]);
	let inputEl = $state<HTMLInputElement | null>(null);

	const corePages: PaletteItem[] = [
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
		}
	];

	const cheatsheetItems: PaletteItem[] = [
		{
			id: 'rune-state',
			title: '$state',
			description: 'Deeply reactive state proxy for variables, objects, and arrays',
			category: 'Rune',
			type: 'cheatsheet',
			href: '/cheatsheet#state'
		},
		{
			id: 'rune-state-raw',
			title: '$state.raw',
			description: 'Shallow reactive state optimized for immutable datasets and canvas',
			category: 'Rune',
			type: 'cheatsheet',
			href: '/cheatsheet#state-raw'
		},
		{
			id: 'rune-derived',
			title: '$derived',
			description: 'Pure computed signal that recalculates when read dependencies change',
			category: 'Rune',
			type: 'cheatsheet',
			href: '/cheatsheet#derived'
		},
		{
			id: 'rune-derived-by',
			title: '$derived.by',
			description: 'Complex multi-line derived signal calculated via closure function',
			category: 'Rune',
			type: 'cheatsheet',
			href: '/cheatsheet#derived-by'
		},
		{
			id: 'rune-props',
			title: '$props',
			description: 'Declares component input props with TypeScript types and defaults',
			category: 'Rune',
			type: 'cheatsheet',
			href: '/cheatsheet#props'
		},
		{
			id: 'rune-bindable',
			title: '$bindable',
			description: 'Enables two-way state binding across parent and child components',
			category: 'Rune',
			type: 'cheatsheet',
			href: '/cheatsheet#bindable'
		},
		{
			id: 'rune-effect',
			title: '$effect',
			description: 'Runs reactive side effects with dependency tracking post-DOM render',
			category: 'Rune',
			type: 'cheatsheet',
			href: '/cheatsheet#effect'
		},
		{
			id: 'rune-effect-pre',
			title: '$effect.pre',
			description: 'Runs reactive side effects prior to DOM layout and paint updates',
			category: 'Rune',
			type: 'cheatsheet',
			href: '/cheatsheet#effect-pre'
		},
		{
			id: 'rune-inspect',
			title: '$inspect',
			description: 'Development console logger for tracing reactive signal changes',
			category: 'Rune',
			type: 'cheatsheet',
			href: '/cheatsheet#inspect'
		},
		{
			id: 'rune-untrack',
			title: 'untrack()',
			description: 'Reads reactive signals inside $effect without creating tracking loops',
			category: 'Rune',
			type: 'cheatsheet',
			href: '/cheatsheet#untrack'
		}
	];

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

	// Load guides & auto-focus input when palette opens
	$effect(() => {
		if (isOpen) {
			if (allItems.length === 0) {
				const modules = import.meta.glob<GuideModule>('/src/lib/content/guides/*.md', {
					eager: true
				});
				const guides: PaletteItem[] = Object.entries(modules).map(([path, mod]) => ({
					id: `guide-${path.split('/').pop()?.replace('.md', '') || ''}`,
					title: mod.metadata?.title || 'Untitled',
					description: mod.metadata?.description || '',
					category: mod.metadata?.category || 'Guide',
					type: 'guide',
					href: `/guides/${path.split('/').pop()?.replace('.md', '') || ''}`
				}));

				allItems = [...cheatsheetItems, ...corePages, ...guides];
			}

			// Focus input immediately after DOM paint
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
	class="inline-flex items-center gap-2 rounded-xl border border-border bg-card/60 px-3 py-1.5 text-xs text-muted-foreground shadow-xs transition hover:border-primary/40 hover:text-foreground"
	aria-label="Search Academy"
>
	<Search class="size-3.5" />
	<span class="hidden sm:inline-block">Search runes, guides...</span>
	<kbd
		class="hidden rounded border border-border bg-muted/60 px-1.5 font-mono text-[10px] font-semibold text-muted-foreground sm:inline-block"
	>
		⌘K
	</kbd>
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
	<div class="fixed top-1/4 left-1/2 z-50 w-full max-w-xl -translate-x-1/2 p-4">
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
					<div class="py-8 text-center text-xs text-muted-foreground">
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
							{:else if item.type === 'page'}
								<Terminal class="mt-0.5 size-4 shrink-0 text-cyan-400" />
							{:else if item.type === 'external'}
								<Rocket class="mt-0.5 size-4 shrink-0 text-emerald-400" />
							{:else}
								<BookOpen class="mt-0.5 size-4 shrink-0 text-primary" />
							{/if}

							<div class="min-w-0 flex-1">
								<div class="flex items-center gap-2">
									<span class="font-mono text-xs font-bold text-foreground">{item.title}</span>
									<span
										class="rounded-md px-1.5 py-0.5 text-[10px] font-semibold {item.type ===
										'cheatsheet'
											? 'border border-amber-500/20 bg-amber-500/10 text-amber-500'
											: item.type === 'external'
												? 'border border-emerald-500/20 bg-emerald-500/10 text-emerald-500'
												: 'border border-primary/20 bg-primary/10 text-primary'}"
									>
										{item.category}
									</span>
									{#if item.type === 'external'}
										<ExternalLink class="size-3 text-muted-foreground opacity-70" />
									{/if}
								</div>
								<p class="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
									{item.description}
								</p>
							</div>
						</button>
					{/each}
				{/if}
			</div>

			<div
				class="flex items-center justify-between border-t border-border bg-muted/30 px-4 py-2 text-[10px] text-muted-foreground"
			>
				<span>
					Press <kbd class="rounded border border-border bg-background px-1 font-mono">ESC</kbd> to close
				</span>
				<span class="flex items-center gap-1">
					<Command class="size-3" /> Navigation
				</span>
			</div>
		</div>
	</div>
{/if}
