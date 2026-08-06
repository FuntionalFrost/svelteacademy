<!-- src/lib/components/RuneVisualizer.svelte -->
<script lang="ts">
	import { Activity, Cpu, RotateCcw } from '@lucide/svelte';

	// Reactive state signals
	let count = $state(0);
	let multiplier = $state(2);
	let logs = $state<{ id: number; message: string; timestamp: string }[]>([]);

	// Derived reactive signals
	let multiplied = $derived(count * multiplier);
	let isEven = $derived(count % 2 === 0);

	// Side-effect tracking execution
	$effect(() => {
		// Reading 'count' and 'multiplied' creates implicit dependencies
		const currentCount = count;
		const currentMultiplied = multiplied;

		const entry = {
			id: Date.now() + Math.random(),
			message: `$effect triggered → count: ${currentCount}, multiplied: ${currentMultiplied}`,
			timestamp: new Date().toLocaleTimeString()
		};

		logs = [entry, ...logs].slice(0, 5); // Keep last 5 executions
	});

	function increment() {
		count += 1;
	}

	function decrement() {
		count -= 1;
	}

	function reset() {
		count = 0;
		multiplier = 2;
		logs = [];
	}
</script>

<div class="not-prose my-8 overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
	<!-- Top Header Accent -->
	<div class="h-1 w-full bg-linear-to-r from-cyan-500 via-primary to-emerald-500"></div>

	<!-- Component Title Bar -->
	<div class="flex items-center justify-between border-b border-border bg-muted/40 p-4 sm:p-5">
		<div class="flex items-center gap-2">
			<Cpu class="size-5 text-primary" />
			<h3 class="text-sm font-bold text-foreground sm:text-base">
				Interactive Svelte 5 Rune Inspector
			</h3>
		</div>
		<button
			onclick={reset}
			class="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold text-muted-foreground transition hover:border-primary/50 hover:text-foreground"
		>
			<RotateCcw class="size-3.5" />
			<span>Reset Signals</span>
		</button>
	</div>

	<div class="grid grid-cols-1 divide-y divide-border lg:grid-cols-3 lg:divide-x lg:divide-y-0">
		<!-- Signal Controls & State Signals -->
		<div class="flex flex-col gap-4 p-5">
			<div class="flex items-center justify-between">
				<span class="font-mono text-xs font-bold tracking-wider text-cyan-500 uppercase">
					1. $state Signals
				</span>
			</div>

			<div class="space-y-3">
				<!-- Count Controls -->
				<div class="rounded-xl border border-border bg-background/60 p-3.5">
					<div class="mb-2 flex items-center justify-between">
						<span class="font-mono text-xs text-muted-foreground">count</span>
						<span class="font-mono text-sm font-bold text-foreground">{count}</span>
					</div>
					<div class="flex gap-2">
						<button
							onclick={decrement}
							class="flex-1 rounded-md border border-border bg-muted/50 py-1 font-mono text-xs font-bold hover:bg-muted"
						>
							-1
						</button>
						<button
							onclick={increment}
							class="flex-1 rounded-md bg-primary py-1 font-mono text-xs font-bold text-primary-foreground hover:bg-primary/90"
						>
							+1
						</button>
					</div>
				</div>

				<!-- Multiplier Controls -->
				<div class="rounded-xl border border-border bg-background/60 p-3.5">
					<div class="mb-2 flex items-center justify-between">
						<span class="font-mono text-xs text-muted-foreground">multiplier</span>
						<span class="font-mono text-sm font-bold text-foreground">{multiplier}x</span>
					</div>
					<input
						type="range"
						min="1"
						max="10"
						bind:value={multiplier}
						class="w-full accent-primary"
					/>
				</div>
			</div>
		</div>

		<!-- Derived Computation Inspector -->
		<div class="flex flex-col gap-4 bg-muted/10 p-5">
			<div class="flex items-center justify-between">
				<span class="font-mono text-xs font-bold tracking-wider text-emerald-500 uppercase">
					2. $derived Signals
				</span>
			</div>

			<div class="space-y-3">
				<!-- Multiplied Output -->
				<div class="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3.5">
					<div class="flex items-center justify-between">
						<span class="font-mono text-xs text-emerald-600 dark:text-emerald-400">
							multiplied ($derived)
						</span>
						<span class="font-mono text-base font-extrabold text-emerald-500">
							{multiplied}
						</span>
					</div>
					<p class="mt-1 font-mono text-[10px] text-muted-foreground">
						Calculated as: {count} × {multiplier}
					</p>
				</div>

				<!-- Parity Check -->
				<div class="rounded-xl border border-border bg-background/60 p-3.5">
					<div class="flex items-center justify-between">
						<span class="font-mono text-xs text-muted-foreground">isEven ($derived)</span>
						<span
							class="rounded-md px-2 py-0.5 font-mono text-xs font-bold {isEven
								? 'border border-emerald-500/20 bg-emerald-500/10 text-emerald-500'
								: 'border border-amber-500/20 bg-amber-500/10 text-amber-500'}"
						>
							{isEven}
						</span>
					</div>
				</div>
			</div>
		</div>

		<!-- $effect Log Feed -->
		<div class="flex flex-col gap-4 p-5">
			<div class="flex items-center justify-between">
				<span
					class="flex items-center gap-1 font-mono text-xs font-bold tracking-wider text-purple-500 uppercase"
				>
					<Activity class="size-3.5" />
					3. $effect Execution Log
				</span>
			</div>

			<div class="flex-1 rounded-xl border border-border bg-zinc-950 p-3 font-mono text-xs">
				{#if logs.length > 0}
					<ul class="space-y-2">
						{#each logs as log (log.id)}
							<li
								class="flex flex-col gap-0.5 border-b border-zinc-800/60 pb-1.5 text-zinc-300 last:border-none"
							>
								<span class="text-[10px] text-zinc-500">{log.timestamp}</span>
								<span class="font-semibold text-purple-400">{log.message}</span>
							</li>
						{/each}
					</ul>
				{:else}
					<div class="flex h-full items-center justify-center text-center text-zinc-500">
						<span>Click controls to trigger $effect updates</span>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
