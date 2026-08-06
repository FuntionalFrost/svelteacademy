<!-- src/lib/components/RuneVisualizer.svelte -->
<script lang="ts">
	import { Cpu, RefreshCw } from '@lucide/svelte';
	import { untrack } from 'svelte';

	let count = $state(0);
	let multiplier = $state(2);

	// $derived signals automatically re-calculate when count or multiplier change
	let multiplied = $derived(count * multiplier);
	let isEven = $derived(count % 2 === 0);

	interface LogEntry {
		id: string;
		time: string;
		count: number;
		multiplied: number;
	}

	let logs = $state<LogEntry[]>([]);

	// $effect automatically tracks reads of `count` and `multiplied`
	$effect(() => {
		// 1. Read tracked dependencies
		const currentCount = count;
		const currentMultiplied = multiplied;

		// 2. Wrap log array mutations in untrack() to prevent an infinite effect loop
		untrack(() => {
			const newLog: LogEntry = {
				id: Math.random().toString(36).substring(2, 9),
				time: new Date().toLocaleTimeString(),
				count: currentCount,
				multiplied: currentMultiplied
			};
			logs = [newLog, ...logs.slice(0, 9)];
		});
	});

	function reset() {
		count = 0;
		multiplier = 2;
		logs = [];
	}
</script>

<div class="my-6 rounded-2xl border border-border bg-card p-6 shadow-xl">
	<!-- Top Bar -->
	<div class="flex items-center justify-between border-b border-border/80 pb-4">
		<div class="flex items-center gap-2.5">
			<div class="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
				<Cpu class="size-4" />
			</div>
			<div>
				<h3 class="text-base font-bold text-foreground">Interactive Svelte 5 Rune Inspector</h3>
				<p class="text-xs text-muted-foreground">
					Observe $state mutations trigger $derived signals and $effect observers
				</p>
			</div>
		</div>

		<button
			type="button"
			onclick={reset}
			class="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
		>
			<RefreshCw class="size-3.5" />
			<span>Reset Signals</span>
		</button>
	</div>

	<!-- Main Inspector Grid -->
	<div class="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
		<!-- 1. $state Signals Column -->
		<div class="space-y-4 rounded-xl border border-border bg-muted/20 p-4">
			<div class="flex items-center justify-between">
				<span class="font-mono text-xs font-bold tracking-wider text-cyan-400 uppercase"
					>1. $state Signals</span
				>
			</div>

			<!-- Count Control -->
			<div class="space-y-2 rounded-lg border border-border bg-background p-3.5">
				<div class="flex items-center justify-between text-xs">
					<span class="font-mono text-muted-foreground">count</span>
					<span class="font-mono text-base font-extrabold text-foreground">{count}</span>
				</div>
				<div class="flex gap-2">
					<button
						type="button"
						onclick={() => (count -= 1)}
						class="flex-1 rounded-md border border-border bg-muted/50 py-1.5 font-mono text-xs font-bold text-foreground transition hover:border-primary/40 hover:bg-muted active:scale-95"
					>
						-1
					</button>
					<button
						type="button"
						onclick={() => (count += 1)}
						class="flex-1 rounded-md bg-primary py-1.5 font-mono text-xs font-bold text-primary-foreground shadow-xs transition hover:bg-primary/90 active:scale-95"
					>
						+1
					</button>
				</div>
			</div>

			<!-- Multiplier Control -->
			<div class="space-y-2 rounded-lg border border-border bg-background p-3.5">
				<div class="flex items-center justify-between text-xs">
					<span class="font-mono text-muted-foreground">multiplier</span>
					<span class="font-mono font-bold text-primary">{multiplier}x</span>
				</div>
				<input
					type="range"
					min="1"
					max="10"
					bind:value={multiplier}
					class="w-full cursor-pointer accent-primary"
				/>
			</div>
		</div>

		<!-- 2. $derived Signals Column -->
		<div class="space-y-4 rounded-xl border border-border bg-muted/20 p-4">
			<div class="flex items-center justify-between">
				<span class="font-mono text-xs font-bold tracking-wider text-emerald-400 uppercase"
					>2. $derived Signals</span
				>
			</div>

			<!-- Multiplied Output -->
			<div class="space-y-1 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3.5">
				<div class="flex items-center justify-between text-xs">
					<span class="font-mono font-semibold text-emerald-400">multiplied ($derived)</span>
					<span class="font-mono text-base font-bold text-emerald-400">{multiplied}</span>
				</div>
				<p class="font-mono text-[11px] text-muted-foreground">
					Calculated as: {count} × {multiplier}
				</p>
			</div>

			<!-- isEven Output -->
			<div
				class="flex items-center justify-between rounded-lg border border-border bg-background p-3.5 text-xs"
			>
				<span class="font-mono text-muted-foreground">isEven ($derived)</span>
				<span
					class={`rounded-md px-2 py-0.5 font-mono text-[11px] font-bold ${isEven ? 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-400' : 'border border-amber-500/30 bg-amber-500/10 text-amber-400'}`}
				>
					{isEven ? 'true' : 'false'}
				</span>
			</div>
		</div>

		<!-- 3. $effect Execution Log Column -->
		<div class="flex flex-col rounded-xl border border-border bg-muted/20 p-4">
			<div class="mb-3 flex items-center justify-between">
				<span class="font-mono text-xs font-bold tracking-wider text-purple-400 uppercase"
					>3. $effect Execution Log</span
				>
			</div>

			<div class="flex-1 overflow-hidden rounded-lg border border-border bg-background p-3">
				{#if logs.length === 0}
					<p class="py-4 text-center font-mono text-xs text-muted-foreground">
						No effect executions yet.
					</p>
				{:else}
					<div class="max-h-55 space-y-2 overflow-y-auto pr-1">
						{#each logs as log (log.id)}
							<div
								class="border-b border-border/60 pb-1.5 font-mono text-[11px] leading-tight last:border-none"
							>
								<span class="block text-[10px] text-muted-foreground">{log.time}</span>
								<span class="font-semibold text-purple-400">$effect triggered</span>
								<span class="text-foreground">
									→ count: {log.count}, multiplied: {log.multiplied}</span
								>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
