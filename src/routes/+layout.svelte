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

<!-- Mounts ModeWatcher to physically toggle .dark on <html> -->
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
					{@const isActive = page.url.pathname.startsWith(item.href)}
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
				<CommandPalette />
				<ThemeToggle />

				<a
					href="https://github.com/FuntionalFrost/svelteacademy"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex size-9 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
					aria-label="GitHub Repository"
				>
					<svg class="size-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
						/>
					</svg>
				</a>

				<a
					href="https://supersvelte.netlify.app"
					target="_blank"
					rel="noopener noreferrer"
					class="hidden items-center gap-1.5 rounded-xl bg-linear-to-r from-emerald-400 via-teal-300 to-cyan-400 px-3.5 py-2 text-xs font-bold text-slate-950 shadow-xs transition hover:brightness-110 sm:inline-flex"
				>
					<Rocket class="size-3.5" />
					<span>SuperSvelte</span>
					<ExternalLink class="size-3 opacity-70" />
				</a>

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

		<!-- Mobile Drawer -->
		{#if mobileMenuOpen}
			<div class="border-b border-border bg-background p-4 md:hidden">
				<nav class="flex flex-col space-y-2">
					{#each navItems as item (item.href)}
						{@const isActive = page.url.pathname.startsWith(item.href)}
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
						rel="noopener noreferrer"
						onclick={closeMobileMenu}
						class="flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-emerald-400 via-teal-300 to-cyan-400 py-3 text-sm font-bold text-slate-950 shadow-xs"
					>
						<Rocket class="size-4" />
						<span>Explore SuperSvelte</span>
						<ExternalLink class="size-3 opacity-70" />
					</a>
				</nav>
			</div>
		{/if}
	</header>

	<main class="flex-1">
		{@render children()}
	</main>

	<!-- Footer -->
	<footer class="border-t border-border bg-card/40 py-12 text-xs text-muted-foreground">
		<div class="container mx-auto max-w-6xl px-4">
			<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
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

				<div>
					<h4 class="mb-3 font-mono text-xs font-bold text-foreground uppercase">
						Open Source & SaaS
					</h4>
					<ul class="space-y-2 font-medium">
						<li>
							<a
								href="https://supersvelte.netlify.app"
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline"
							>
								<span>SuperSvelte Boilerplate</span>
								<ExternalLink class="size-3" />
							</a>
						</li>
						<li>
							<a
								href="https://github.com/FuntionalFrost/svelteacademy"
								target="_blank"
								rel="noopener noreferrer"
								class="transition hover:text-primary">GitHub Repository</a
							>
						</li>
						<li>
							<a
								href="https://github.com/FuntionalFrost/svelteacademy/blob/main/CONTRIBUTING.md"
								target="_blank"
								rel="noopener noreferrer"
								class="transition hover:text-primary">Contributing Guide</a
							>
						</li>
						<li>
							<a
								href="https://github.com/FuntionalFrost/svelteacademy/blob/main/LICENSE"
								target="_blank"
								rel="noopener noreferrer"
								class="transition hover:text-primary">MIT License</a
							>
						</li>
					</ul>
				</div>

				<div>
					<h4 class="mb-3 font-mono text-xs font-bold text-foreground uppercase">
						Official Ecosystem
					</h4>
					<ul class="space-y-2 font-medium">
						<li>
							<a
								href="https://svelte.dev"
								target="_blank"
								rel="noopener noreferrer"
								class="transition hover:text-primary">Svelte Official Documentation</a
							>
						</li>
						<li>
							<a
								href="https://svelte.dev/docs/svelte/what-are-runes"
								target="_blank"
								rel="noopener noreferrer"
								class="transition hover:text-primary">Svelte 5 Runes Docs</a
							>
						</li>
						<li>
							<a
								href="https://svelte.dev/playground"
								target="_blank"
								rel="noopener noreferrer"
								class="transition hover:text-primary">Official Svelte Playground</a
							>
						</li>
					</ul>
				</div>
			</div>

			<div
				class="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 font-mono text-[11px] sm:flex-row"
			>
				<span>&copy; {new Date().getFullYear()} Svelte Academy • MIT Open Source</span>
				<span>Hosted on Netlify</span>
			</div>
		</div>
	</footer>
</div>
