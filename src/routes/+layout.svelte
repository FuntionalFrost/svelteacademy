<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { navigating, page } from '$app/state';
	import CommandPalette from '#lib/components/CommandPalette.svelte';
	import Logo from '#lib/components/Logo.svelte';
	import ThemeToggle from '#lib/components/ThemeToggle.svelte';
	import {
		BookOpen,
		CodeXml,
		ExternalLink,
		GraduationCap,
		Menu,
		Terminal,
		X
	} from '@lucide/svelte';
	import { Toaster } from 'yaxa-svelte';
	import './layout.css';

	let { children } = $props();
	let mobileMenuOpen = $state(false);

	// Native Hardware-Accelerated SvelteKit View Transitions
	onNavigate((navigation) => {
		if (navigation.shallow) return;
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	const navItems = [
		{ href: resolve('learn'), label: 'Learn', icon: GraduationCap },
		{
			href: resolve('cheatsheet'),
			label: 'Cheatsheet',
			icon: CodeXml
		},

		{
			href: resolve('playground'),
			label: 'Playground',
			icon: Terminal
		},
		{ href: resolve('guides'), label: 'Guides', icon: BookOpen }
	];

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}
</script>

<!-- src/routes/+layout.svelte -->
<!-- Global Toast Notification Center -->
<Toaster position="bottom-right" richColors />

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
				class="flex shrink-0 items-center gap-2.5 transition hover:opacity-90"
			>
				<Logo />
				<span class="text-lg font-extrabold tracking-tight whitespace-nowrap text-foreground">
					Svelte<span class="text-primary">Academy</span>
				</span>
			</a>

			<!-- Desktop Route Links -->
			<nav class="hidden items-center gap-1.5 md:flex">
				{#each navItems as item (item.href)}
					{@const isActive = page.url.pathname.startsWith(item.href)}
					<a
						href={item.href}
						aria-current={isActive ? 'page' : undefined}
						class="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition-all {isActive
							? 'bg-primary/10 text-primary'
							: 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'}"
					>
						<item.icon class="size-4" />
						<span>{item.label}</span>
					</a>
				{/each}
			</nav>

			<!-- Action Items -->
			<div class="flex items-center gap-2.5">
				<CommandPalette />
				<ThemeToggle />

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
							aria-current={isActive ? 'page' : undefined}
							onclick={closeMobileMenu}
							class="flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm font-semibold transition {isActive
								? 'bg-primary/10 text-primary'
								: 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'}"
						>
							<item.icon class="size-4" />
							<span>{item.label}</span>
						</a>
					{/each}
				</nav>
			</div>
		{/if}
	</header>

	{#if navigating.to !== null}
		<div
			class="fixed top-0 left-0 z-60 h-0.5 w-full origin-left animate-pulse bg-primary"
			aria-hidden="true"
		></div>
	{/if}

	<main class="flex-1">
		{@render children()}
	</main>

	<!-- Footer -->
	<footer class="border-t border-border bg-card/40 py-12 text-sm text-muted-foreground">
		<div class="container mx-auto max-w-6xl px-4">
			<div class="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
				<!-- Brand Column (wider) -->
				<div class="space-y-4 lg:col-span-2">
					<div class="flex items-center gap-2.5">
						<Logo />
						<span class="text-base font-extrabold tracking-tight text-foreground">
							Svelte<span class="text-primary">Academy</span>
						</span>
						<span
							class="rounded-full border border-primary/25 bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary"
						>
							Svelte 5 &amp; Kit
						</span>
					</div>
					<p class="max-w-sm text-sm leading-relaxed text-muted-foreground">
						Interactive educational platform, signal visualizer, and architectural reference suite
						for Svelte 5 and SvelteKit. Built with Yaxa.
					</p>
					<p class="font-mono text-xs text-muted-foreground/80">
						&copy; 2026 SvelteAcademy. &middot; MIT Licensed
					</p>
				</div>

				<!-- Navigation Column -->
				<div class="space-y-3">
					<h4 class="font-mono text-xs font-bold tracking-wider text-foreground uppercase">
						Navigation
					</h4>
					<ul class="space-y-2 text-sm">
						<li>
							<a href={resolve('learn')} class="transition hover:text-foreground">Learn</a>
						</li>
						<li>
							<a href={resolve('cheatsheet')} class="transition hover:text-foreground">
								Cheatsheet
							</a>
						</li>
						<li>
							<a href={resolve('playground')} class="transition hover:text-foreground">
								Playground
							</a>
						</li>
						<li>
							<a href={resolve('guides')} class="transition hover:text-foreground">Guides</a>
						</li>
					</ul>
				</div>

				<!-- Legal & Compliance Column -->
				<div class="space-y-3">
					<h4 class="font-mono text-xs font-bold tracking-wider text-foreground uppercase">
						Legal &amp; Compliance
					</h4>
					<ul class="space-y-2 text-sm">
						<li>
							<a
								href="https://github.com/FuntionalFrost/svelteacademy/blob/main/LICENSE"
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center gap-1 transition hover:text-foreground"
							>
								<span>Terms of Service</span>
								<ExternalLink class="size-3 opacity-60" />
							</a>
						</li>
						<li>
							<a
								href="https://github.com/FuntionalFrost/svelteacademy/blob/main/CONTRIBUTING.md"
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center gap-1 transition hover:text-foreground"
							>
								<span>Contributing Guide</span>
								<ExternalLink class="size-3 opacity-60" />
							</a>
						</li>
						<li>
							<a
								href="https://github.com/FuntionalFrost/svelteacademy/issues"
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center gap-1 transition hover:text-foreground"
							>
								<span>Contact &amp; Support</span>
								<ExternalLink class="size-3 opacity-60" />
							</a>
						</li>
					</ul>
				</div>

				<!-- Community Column -->
				<div class="space-y-3">
					<h4 class="font-mono text-xs font-bold tracking-wider text-foreground uppercase">
						Community
					</h4>
					<ul class="space-y-2 text-sm">
						<li>
							<a
								href="https://github.com/FuntionalFrost/svelteacademy"
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center gap-1 transition hover:text-foreground"
							>
								<span>GitHub</span>
								<ExternalLink class="size-3 opacity-60" />
							</a>
						</li>
						<li>
							<a
								href="https://supersvelte.netlify.app"
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center gap-1 transition hover:text-foreground"
							>
								<span>SuperSvelte</span>
								<ExternalLink class="size-3 opacity-60" />
							</a>
						</li>
						<li>
							<a
								href="https://svelte.dev"
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center gap-1 transition hover:text-foreground"
							>
								<span>Official Svelte</span>
								<ExternalLink class="size-3 opacity-60" />
							</a>
						</li>
						<li>
							<a
								href="https://yaxa.vercel.app"
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center gap-1 transition hover:text-foreground"
							>
								<span>Built with Yaxa</span>
								<ExternalLink class="size-3 opacity-60" />
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</footer>
</div>
