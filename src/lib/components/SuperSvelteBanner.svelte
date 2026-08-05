<!-- src/lib/components/SuperSvelteBanner.svelte -->
<script lang="ts">
	import { ArrowRight, CircleCheck, Flame, Sparkles } from '@lucide/svelte';
</script>

<div
	class="relative my-12 overflow-hidden rounded-3xl border border-primary/30 bg-card p-8 shadow-2xl transition hover:border-primary/50"
>
	<!-- Ambient Background Glow -->
	<div
		class="pointer-events-none absolute -top-20 -right-20 size-64 rounded-full bg-primary/20 blur-3xl"
	></div>
	<div
		class="pointer-events-none absolute -bottom-20 -left-20 size-64 rounded-full bg-amber-500/10 blur-3xl"
	></div>

	<div class="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
		<div class="space-y-3 lg:max-w-xl">
			<div
				class="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold text-primary"
			>
				<Sparkles class="size-3.5" />
				<span>Accelerate Your Development</span>
			</div>

			<h3 class="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
				Ready to ship full-stack apps in record time?
			</h3>

			<p class="text-xs text-muted-foreground sm:text-sm">
				Skip weeks of boilerplate configuration. <strong class="text-foreground"
					>Super Svelte</strong
				> gives you production-ready Auth, Stripe Payments, Database Schema, and Svelte 5 UI primitives
				out of the box.
			</p>

			<div class="grid grid-cols-2 gap-2 pt-2 text-xs font-medium text-foreground">
				<div class="flex items-center gap-1.5">
					<CircleCheck class="size-3.5 text-primary" />
					<span>Svelte 5 Runes Engine</span>
				</div>
				<div class="flex items-center gap-1.5">
					<CircleCheck class="size-3.5 text-primary" />
					<span>Stripe & Auth Ready</span>
				</div>
				<div class="flex items-center gap-1.5">
					<CircleCheck class="size-3.5 text-primary" />
					<span>Zero-Complexity Setup</span>
				</div>
				<div class="flex items-center gap-1.5">
					<CircleCheck class="size-3.5 text-primary" />
					<span>Lifetime License</span>
				</div>
			</div>
		</div>

		<div class="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
			<a
				href="https://supersvelte.dev"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-primary via-orange-500 to-amber-500 px-6 py-3.5 text-xs font-bold text-white shadow-lg shadow-primary/25 transition hover:brightness-110 active:scale-95"
			>
				<Flame class="size-4 fill-white" />
				<span>Get Super Svelte Kit</span>
				<ArrowRight class="size-4" />
			</a>
			<span class="text-center text-[10px] text-muted-foreground">
				Join 1,000+ developers building with Svelte 5
			</span>
		</div>
	</div>
</div>
