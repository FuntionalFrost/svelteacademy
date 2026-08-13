<!-- src/lib/components/SuperSvelteBanner.svelte -->
<script lang="ts">
	import { Check, Rocket, Sparkles, Terminal } from '@lucide/svelte';
</script>

<div
	class="group relative my-12 overflow-hidden rounded-3xl border border-emerald-500/30 bg-[#09090b] p-8 shadow-[0_0_50px_-12px_rgba(16,185,129,0.2)] transition-all duration-300 hover:border-emerald-400/50 hover:shadow-[0_0_60px_-10px_rgba(6,182,212,0.3)]"
>
	<!-- Ambient Glowing Aura Blobs (Mint, Cyan, Teal) -->
	<div
		class="pointer-events-none absolute -top-28 -right-28 size-80 rounded-full bg-cyan-500/20 blur-[100px] transition-all duration-500 group-hover:bg-cyan-400/30"
	></div>
	<div
		class="pointer-events-none absolute -bottom-28 -left-28 size-80 rounded-full bg-emerald-500/20 blur-[100px] transition-all duration-500 group-hover:bg-emerald-400/30"
	></div>
	<div
		class="pointer-events-none absolute top-1/2 left-1/2 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-500/10 blur-[120px]"
	></div>

	<div class="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
		<div class="space-y-4 lg:max-w-xl">
			<!-- SuperSvelte Header Lockup -->
			<div class="flex flex-wrap items-center gap-3">
				<!-- S5 Badge + Glowing Brand -->
				<div class="flex items-center gap-2">
					<div
						class="flex size-7 items-center justify-center rounded-lg bg-slate-100 font-mono text-xs font-black text-slate-950 shadow-[0_0_15px_rgba(255,255,255,0.4)]"
					>
						S5
					</div>
					<span class="text-base font-extrabold tracking-tight text-white sm:text-lg">
						Super<span
							class="bg-linear-to-r from-emerald-300 via-teal-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(52,211,153,0.4)]"
							>Svelte</span
						>
					</span>
				</div>

				<!-- Glowing SuperSvelte Feature Pill -->
				<div
					class="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-slate-900/90 px-3 py-1 font-mono text-[11px] text-slate-300 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
				>
					<Sparkles class="size-3 text-emerald-400" />
					<span>Svelte 5 + Hono RPC + Neon</span>
				</div>
			</div>

			<!-- Main Tagline -->
			<h3 class="text-2xl font-black tracking-tight text-white sm:text-3xl">
				The Batteries-Included Edge TS Framework
			</h3>

			<p class="text-xs leading-relaxed text-slate-400 sm:text-sm">
				Stop assembling your stack from 15 npm packages. <strong class="text-slate-200"
					>Super Svelte</strong
				> ships Auth, Neon DB, Redis SSE, OpenAPI 3.1 Hono RPC, Uploads, and Resend out-of-the-box with
				sub-10ms edge cold starts.
			</p>

			<!-- Glowing Feature List -->
			<div class="grid grid-cols-2 gap-2.5 pt-1 font-mono text-xs font-semibold text-slate-300">
				<div class="flex items-center gap-2">
					<div
						class="flex size-4 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.3)]"
					>
						<Check class="size-3 stroke-3" />
					</div>
					<span>OpenAPI 3.1 Hono RPC</span>
				</div>
				<div class="flex items-center gap-2">
					<div
						class="flex size-4 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.3)]"
					>
						<Check class="size-3 stroke-3" />
					</div>
					<span>Better Auth & Multi-Tenancy</span>
				</div>
				<div class="flex items-center gap-2">
					<div
						class="flex size-4 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.3)]"
					>
						<Check class="size-3 stroke-3" />
					</div>
					<span>Neon DB + Drizzle ORM</span>
				</div>
				<div class="flex items-center gap-2">
					<div
						class="flex size-4 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.3)]"
					>
						<Check class="size-3 stroke-3" />
					</div>
					<span>Sub-10ms Edge Starts</span>
				</div>
			</div>
		</div>

		<!-- Action Buttons -->
		<div class="flex shrink-0 flex-col gap-3.5 sm:flex-row lg:flex-col">
			<!-- Glowing Primary Button Wrapper -->
			<div class="group/btn relative">
				<!-- Radiant Gradient Glow Underlay -->
				<div
					class="absolute -inset-0.5 rounded-xl bg-linear-to-r from-emerald-400 via-teal-300 to-cyan-400 opacity-70 blur-md transition duration-300 group-hover/btn:opacity-100 group-hover/btn:blur-lg"
				></div>

				<a
					href="https://supersvelte.netlify.app"
					target="_blank"
					rel="noopener noreferrer"
					class="relative inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 px-6 py-3 text-xs font-bold text-slate-950 shadow-lg transition active:scale-95"
				>
					<Rocket class="size-4" />
					<span>Get SuperSvelte!</span>
				</a>
			</div>

			<!-- Secondary Live Sandbox Button -->
			<a
				href="https://supersvelte.netlify.app"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-950/90 px-6 py-3 text-xs font-semibold text-slate-300 transition hover:border-emerald-500/40 hover:text-white hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]"
			>
				<Terminal class="size-3.5 text-slate-400" />
				<span>Live Interactive Sandbox</span>
			</a>
		</div>
	</div>
</div>
