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

<div class="my-6 rounded-2xl bg-zinc-950 p-6 text-zinc-100 shadow-2xl">
	<!-- Top Bar -->
	<div class="flex items-center justify-between border-b border-zinc-800/80 pb-4">
		<div class="flex items-center gap-2.5">
			<div
				class="flex size-8 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-cyan-400"
			>
				<Cpu class="size-4" />
			</div>
			<div>
				<h3 class="text-base font-bold text-zinc-100 sm:text-lg">
					Interactive Svelte 5 Rune Inspector
				</h3>
				<p class="text-sm text-zinc-400">
					Observe $state mutations trigger $derived signals and $effect observers
				</p>
			</div>
		</div>

		<button
			type="button"
			onclick={reset}
			class="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-zinc-400 transition hover:bg-zinc-800 hover:text-zinc-100"
		>
			<RefreshCw class="size-3.5" />
			<span>Reset Signals</span>
		</button>
	</div>

	<!-- Main Inspector Grid: Seamless Flat Columns -->
	<div
		class="mt-4 grid grid-cols-1 divide-y divide-zinc-800/60 md:grid-cols-3 md:divide-x md:divide-y-0"
	>
		<!-- 1. $state Signals Column -->
		<div class="space-y-4 p-4">
			<div class="flex items-center justify-between">
				<span class="font-mono text-xs font-bold tracking-wider text-cyan-400 uppercase"
					>1. $state Signals</span
				>
			</div>

			<!-- Count Control -->
			<div class="space-y-2">
				<div class="flex items-center justify-between text-xs">
					<span class="font-mono text-zinc-400">count</span>
					<span class="font-mono text-xl font-black text-zinc-100">{count}</span>
				</div>
				<div class="flex gap-2">
					<button
						type="button"
						onclick={() => (count -= 1)}
						class="flex-1 rounded-lg bg-zinc-900 py-1.5 font-mono text-xs font-bold text-zinc-200 transition hover:bg-zinc-800 active:scale-95"
					>
						-1
					</button>
					<button
						type="button"
						onclick={() => (count += 1)}
						class="flex-1 rounded-lg bg-cyan-500 py-1.5 font-mono text-xs font-bold text-zinc-950 shadow-xs transition hover:bg-cyan-400 active:scale-95"
					>
						+1
					</button>
				</div>
			</div>

			<!-- Multiplier Control -->
			<div class="space-y-2 pt-2">
				<div class="flex items-center justify-between text-xs">
					<span class="font-mono text-zinc-400">multiplier</span>
					<span class="font-mono font-bold text-cyan-400">{multiplier}x</span>
				</div>
				<input
					type="range"
					min="1"
					max="10"
					bind:value={multiplier}
					class="w-full cursor-pointer accent-cyan-400"
				/>
			</div>
		</div>

		<!-- 2. $derived Signals Column -->
		<div class="space-y-4 p-4">
			<div class="flex items-center justify-between">
				<span class="font-mono text-xs font-bold tracking-wider text-emerald-400 uppercase"
					>2. $derived Signals</span
				>
			</div>

			<!-- Multiplied Output -->
			<div class="space-y-1 rounded-xl bg-emerald-500/10 p-3">
				<div class="flex items-center justify-between text-xs">
					<span class="font-mono font-semibold text-emerald-400">multiplied ($derived)</span>
					<span class="font-mono text-lg font-bold text-emerald-400">{multiplied}</span>
				</div>
				<p class="font-mono text-[11px] text-zinc-400">
					Calculated as: {count} × {multiplier}
				</p>
			</div>

			<!-- isEven Output -->
			<div class="flex items-center justify-between pt-2 text-xs">
				<span class="font-mono text-zinc-400">isEven ($derived)</span>
				<span
					class={`rounded-md px-2.5 py-0.5 font-mono text-xs font-bold ${isEven ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}
				>
					{isEven ? 'true' : 'false'}
				</span>
			</div>
		</div>

		<!-- 3. $effect Execution Log Column -->
		<div class="flex flex-col p-4">
			<div class="mb-2 flex items-center justify-between">
				<span class="font-mono text-xs font-bold tracking-wider text-purple-400 uppercase"
					>3. $effect Log</span
				>
			</div>

			<div class="flex-1 overflow-hidden rounded-xl bg-black/50 p-3">
				{#if logs.length === 0}
					<p class="py-4 text-center font-mono text-xs text-zinc-500">No effect executions yet.</p>
				{:else}
					<div class="max-h-48 space-y-1.5 overflow-y-auto pr-1 font-mono text-xs">
						{#each logs as log (log.id)}
							<div class="border-b border-zinc-800/50 pb-1 leading-normal last:border-none">
								<span class="block text-[10px] text-zinc-500">{log.time}</span>
								<span class="font-semibold text-purple-400">$effect triggered</span>
								<span class="text-zinc-300"> → count: {log.count}, mult: {log.multiplied}</span>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
