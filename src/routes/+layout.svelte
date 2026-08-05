<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import { resolve } from '$app/paths';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import { ArrowRight, Flame } from '@lucide/svelte';
	import { ModeWatcher } from 'mode-watcher';
	import './layout.css';

	let { children } = $props();
</script>

<ModeWatcher />

<div
	class="relative flex min-h-screen flex-col bg-background text-foreground transition-colors duration-200 selection:bg-primary selection:text-primary-foreground"
>
	<!-- Background Glowing Ambient Orbs -->
	<div class="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
		<div class="absolute -top-40 -left-40 size-96 rounded-full bg-primary/15 blur-3xl"></div>
		<div class="absolute top-1/3 -right-40 size-96 rounded-full bg-cyan-500/10 blur-3xl"></div>
		<div class="absolute bottom-10 left-1/3 size-96 rounded-full bg-emerald-500/10 blur-3xl"></div>
	</div>

	<!-- Navigation Header -->
	<header class="sticky top-0 z-40 border-b border-border/80 bg-background/80 backdrop-blur-md">
		<div class="container mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5">
			<a href={resolve('/')} class="group flex items-center gap-2">
				<div
					class="flex size-8 items-center justify-center rounded-xl bg-linear-to-br from-primary via-orange-500 to-amber-500 text-white shadow-md shadow-primary/20 transition group-hover:scale-105"
				>
					<Flame class="size-4 fill-white" />
				</div>
				<span class="text-xl font-black tracking-tight"
					>Svelte<span class="text-primary">Academy</span></span
				>
				<span
					class="rounded-full bg-primary/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-primary"
				>
					Svelte 5
				</span>
			</a>

			<div class="flex items-center gap-3 text-xs font-medium">
				<a href={resolve('/learn')} class="text-muted-foreground transition hover:text-foreground">
					Guides
				</a>

				<ThemeToggle />

				<a
					href="https://supersvelte.netlify.app"
					target="_blank"
					class="inline-flex items-center gap-1.5 rounded-lg bg-linear-to-r from-primary to-orange-600 px-3.5 py-2 font-bold text-primary-foreground shadow-md shadow-primary/25 transition hover:brightness-110"
				>
					<span>Super Svelte Kit</span>
					<ArrowRight class="size-3.5" />
				</a>
			</div>
		</div>
	</header>

	<!-- Main Content Body -->
	<main class="flex-1">
		{@render children()}
	</main>

	<!-- Footer -->
	<footer class="border-t border-border/60 py-8 text-center text-xs text-muted-foreground">
		<div class="container mx-auto max-w-6xl px-4">
			<p>SvelteAcademy — Modern Svelte 5 and SvelteKit learning engine.</p>
		</div>
	</footer>
</div>
