<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import CommandPalette from '$lib/components/CommandPalette.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import { BookOpen, CodeXml, ExternalLink, Menu, Rocket, Terminal, X } from '@lucide/svelte';
	import { ModeWatcher } from 'mode-watcher';
	import './layout.css';

	let { children } = $props();
	let mobileMenuOpen = $state(false);

	const navItems = [
		{ href: resolve('/cheatsheet'), label: 'Cheatsheet', icon: CodeXml },
		{ href: resolve('/playground'), label: 'Playground', icon: Terminal },
		{ href: resolve('/guides'), label: 'Guides', icon: BookOpen }
	];

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}
</script>

<!-- Mounts ModeWatcher to physically toggle .dark on <html> for mode-watcher -->
<ModeWatcher defaultMode="dark" />

<div
	class="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary"
>
	<!-- Top Global Navigation Bar -->
	<header
		class="sticky top-0 z-40 w-full border-b border-border/80 bg-background/80 backdrop-blur-md"
	>
		<div class="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
			<!-- Site Brand Logo -->
			<a
				href={resolve('/')}
				onclick={closeMobileMenu}
				class="flex items-center gap-2.5 transition hover:opacity-90"
			>
				<Logo />
				<span class="text-lg font-extrabold tracking-tight text-foreground">
					Svelte<span class="text-primary">Academy</span>
				</span>
				<span
					class="hidden rounded-md border border-primary/30 bg-primary/10 px-1.5 py-0.5 font-mono text-[10px] font-bold text-primary sm:inline-block"
				>
					Svelte 5
				</span>
			</a>

			<!-- Desktop Route Links -->
			<nav class="hidden items-center gap-1 md:flex">
				{#each navItems as item (item.href)}
					{@const isActive = page.url.pathname === item.href}
					<a
						href={item.href}
						class="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all {isActive
							? 'bg-primary/10 text-primary'
							: 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'}"
					>
						<item.icon class="size-3.5" />
						<span>{item.label}</span>
					</a>
				{/each}
			</nav>

			<!-- Action Items & Conversion Link -->
			<div class="flex items-center gap-2.5">
				<!-- Command Search Palette -->
				<CommandPalette />

				<!-- Theme Switcher Button -->
				<ThemeToggle />

				<!-- Conversion Button to SuperSvelte SaaS Kit -->
				<a
					href="https://supersvelte.netlify.app"
					target="_blank"
					rel="noreferrer"
					class="hidden items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-xs font-bold text-primary-foreground shadow-xs transition hover:bg-primary/90 sm:inline-flex"
				>
					<Rocket class="size-3.5" />
					<span>Super Svelte Kit</span>
					<ExternalLink class="size-3 opacity-70" />
				</a>

				<!-- Mobile Menu Toggle Button -->
				<button
					onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
					class="inline-flex size-9 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition hover:text-foreground md:hidden"
					aria-label="Toggle Navigation Menu"
				>
					{#if mobileMenuOpen}
						<X class="size-4" />
					{:else}
						<Menu class="size-4" />
					{/if}
				</button>
			</div>
		</div>

		<!-- Mobile Navigation Drawer -->
		{#if mobileMenuOpen}
			<div class="border-b border-border bg-background p-4 md:hidden">
				<nav class="flex flex-col space-y-2">
					{#each navItems as item (item.href)}
						{@const isActive = page.url.pathname === item.href}
						<a
							href={item.href}
							onclick={closeMobileMenu}
							class="flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm font-semibold transition {isActive
								? 'bg-primary/10 text-primary'
								: 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'}"
						>
							<item.icon class="size-4" />
							<span>{item.label}</span>
						</a>
					{/each}

					<a
						href="https://supersvelte.netlify.app"
						target="_blank"
						rel="noreferrer"
						onclick={closeMobileMenu}
						class="flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground shadow-xs"
					>
						<Rocket class="size-4" />
						<span>Explore Super Svelte Kit</span>
						<ExternalLink class="size-3 opacity-70" />
					</a>
				</nav>
			</div>
		{/if}
	</header>

	<!-- Page Content Viewport -->
	<main class="flex-1">
		{@render children()}
	</main>

	<!-- Global Footer -->
	<footer class="border-t border-border bg-card/40 py-12 text-xs text-muted-foreground">
		<div class="container mx-auto max-w-6xl px-4">
			<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
				<!-- Brand Info -->
				<div class="space-y-3">
					<div class="flex items-center gap-2">
						<Logo />
						<span class="text-sm font-bold text-foreground">Svelte Academy</span>
					</div>
					<p class="text-xs leading-relaxed text-muted-foreground">
						Interactive educational platform, signal visualizer, and architectural reference suite
						for Svelte 5 and SvelteKit.
					</p>
				</div>

				<!-- Site Directory -->
				<div>
					<h4 class="mb-3 font-mono text-xs font-bold text-foreground uppercase">
						Learning Resources
					</h4>
					<ul class="space-y-2 font-medium">
						<li>
							<a href={resolve('/cheatsheet')} class="transition hover:text-primary"
								>Svelte 5 Runes Cheatsheet</a
							>
						</li>
						<li>
							<a href={resolve('/playground')} class="transition hover:text-primary"
								>Interactive Signal Sandbox</a
							>
						</li>
						<li>
							<a href={resolve('/guides')} class="transition hover:text-primary"
								>Production Architecture Guides</a
							>
						</li>
					</ul>
				</div>

				<!-- Product Funnel -->
				<div>
					<h4 class="mb-3 font-mono text-xs font-bold text-foreground uppercase">
						Boilerplate & SaaS
					</h4>
					<ul class="space-y-2 font-medium">
						<li>
							<a
								href="https://supersvelte.netlify.app"
								target="_blank"
								rel="noreferrer"
								class="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline"
							>
								<span>Super Svelte Starter Kit</span>
								<ExternalLink class="size-3" />
							</a>
						</li>
					</ul>
				</div>

				<!-- Official Ecosystem Links -->
				<div>
					<h4 class="mb-3 font-mono text-xs font-bold text-foreground uppercase">Official Links</h4>
					<ul class="space-y-2 font-medium">
						<li>
							<a
								href="https://svelte.dev"
								target="_blank"
								rel="noreferrer"
								class="transition hover:text-primary">Svelte Official Documentation</a
							>
						</li>
						<li>
							<a
								href="https://svelte.dev/e/runes"
								target="_blank"
								rel="noreferrer"
								class="transition hover:text-primary">Svelte 5 Runes Overview</a
							>
						</li>
					</ul>
				</div>
			</div>

			<div
				class="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 font-mono text-[11px] sm:flex-row"
			>
				<span>&copy; {new Date().getFullYear()} Svelte Academy. Built for Svelte 5.</span>
				<span>Hosted on Netlify</span>
			</div>
		</div>
	</footer>
</div>
