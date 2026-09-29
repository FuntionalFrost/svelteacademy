<!-- src/lib/components/InteractiveRuneDemo.svelte -->
<script lang="ts">
	import { Minus, Plus, RefreshCw } from '@lucide/svelte';

	let count = $state(0);
	let step = $state(1);

	// Svelte 5 Derived Rune
	let doubleCount = $derived(count * 2);
	let isEven = $derived(count % 2 === 0);
</script>

<div class="my-8 rounded-2xl bg-zinc-950 p-6 text-zinc-100 shadow-2xl">
	<div class="flex items-center justify-between border-b border-zinc-800/80 pb-4">
		<div>
			<span class="font-mono text-xs font-bold tracking-wider text-orange-400 uppercase">
				Live Svelte 5 Playground
			</span>
			<h4 class="text-base font-bold text-zinc-100 sm:text-lg">
				Interactive $state & $derived Demo
			</h4>
		</div>
		<button
			onclick={() => {
				count = 0;
				step = 1;
			}}
			class="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-zinc-400 transition hover:bg-zinc-800 hover:text-zinc-100"
		>
			<RefreshCw class="size-3.5" />
			<span>Reset</span>
		</button>
	</div>

	<div
		class="mt-4 grid grid-cols-1 divide-y divide-zinc-800/60 sm:grid-cols-2 sm:divide-x sm:divide-y-0"
	>
		<!-- Live Counter Controls -->
		<div class="space-y-4 p-4 sm:pr-6">
			<div class="flex items-center justify-between">
				<span class="text-xs font-bold text-zinc-400 uppercase">Count Value</span>
				<span class="font-mono text-3xl font-black text-orange-400">{count}</span>
			</div>

			<div class="flex gap-2">
				<button
					onclick={() => (count -= step)}
					class="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-zinc-900 py-2 text-sm font-bold text-zinc-200 transition hover:bg-zinc-800 active:scale-95"
				>
					<Minus class="size-4" />
					<span>Subtract</span>
				</button>
				<button
					onclick={() => (count += step)}
					class="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-orange-500 py-2 text-sm font-bold text-white shadow-xs transition hover:bg-orange-600 active:scale-95"
				>
					<Plus class="size-4" />
					<span>Add</span>
				</button>
			</div>

			<div class="flex items-center justify-between border-t border-zinc-800/60 pt-3 text-xs">
				<span class="text-zinc-400">Step Increment:</span>
				<div class="flex gap-1.5">
					{#each [1, 5, 10] as s (s)}
						<button
							onclick={() => (step = s)}
							class="rounded-md px-2.5 py-1 font-mono text-xs font-semibold transition {step === s
								? 'bg-orange-500 text-white shadow-xs'
								: 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white'}"
						>
							+{s}
						</button>
					{/each}
				</div>
			</div>
		</div>

		<!-- Live Reactive Output -->
		<div class="flex flex-col justify-between space-y-3 p-4 sm:pl-6">
			<span class="text-xs font-bold text-zinc-400 uppercase">Derived Signal State</span>

			<div class="space-y-2">
				<div class="flex justify-between text-sm">
					<span class="font-mono text-xs text-zinc-400">$derived(count * 2):</span>
					<span class="font-mono font-bold text-zinc-100">{doubleCount}</span>
				</div>
				<div class="flex justify-between text-sm">
					<span class="font-mono text-xs text-zinc-400">Parity Check:</span>
					<span class="font-mono font-bold {isEven ? 'text-emerald-400' : 'text-amber-400'}">
						{isEven ? 'EVEN' : 'ODD'}
					</span>
				</div>
			</div>

			<p class="text-xs leading-relaxed text-zinc-400">
				✨ Mutating <code class="font-bold text-orange-400">count</code> directly updates these derived
				values in fine-grained DOM signals without re-rendering the surrounding template tree.
			</p>
		</div>
	</div>
</div>
