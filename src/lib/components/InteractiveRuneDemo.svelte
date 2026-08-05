<!-- src/lib/components/InteractiveRuneDemo.svelte -->
<script lang="ts">
	import { Minus, Plus, RefreshCw } from '@lucide/svelte';

	let count = $state(0);
	let step = $state(1);

	// Svelte 5 Derived Rune
	let doubleCount = $derived(count * 2);
	let isEven = $derived(count % 2 === 0);
</script>

<div class="my-8 rounded-2xl border border-primary/20 bg-muted/30 p-6 shadow-xs">
	<div class="flex items-center justify-between border-b border-border pb-4">
		<div>
			<span class="font-mono text-[10px] font-bold tracking-wider text-primary uppercase">
				Live Svelte 5 Playground
			</span>
			<h4 class="text-base font-bold text-foreground">Interactive $state & $derived Demo</h4>
		</div>
		<button
			onclick={() => {
				count = 0;
				step = 1;
			}}
			class="inline-flex items-center gap-1 text-xs text-muted-foreground transition hover:text-foreground"
		>
			<RefreshCw class="size-3" />
			<span>Reset</span>
		</button>
	</div>

	<div class="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
		<!-- Live Counter Controls -->
		<div class="space-y-4 rounded-xl border border-border bg-card p-4">
			<div class="flex items-center justify-between">
				<span class="text-xs font-semibold text-muted-foreground">Count Value</span>
				<span class="font-mono text-2xl font-black text-primary">{count}</span>
			</div>

			<div class="flex gap-2">
				<button
					onclick={() => (count -= step)}
					class="flex flex-1 items-center justify-center gap-1 rounded-lg border border-border bg-background py-2 text-xs font-bold text-foreground transition hover:bg-accent"
				>
					<Minus class="size-3.5" />
					<span>Subtract</span>
				</button>
				<button
					onclick={() => (count += step)}
					class="flex flex-1 items-center justify-center gap-1 rounded-lg bg-primary py-2 text-xs font-bold text-primary-foreground shadow-xs transition hover:bg-primary/90"
				>
					<Plus class="size-3.5" />
					<span>Add</span>
				</button>
			</div>

			<div class="flex items-center justify-between border-t border-border pt-3 text-xs">
				<span class="text-muted-foreground">Step Increment:</span>
				<div class="flex gap-1">
					{#each [1, 5, 10] as s (s)}
						<button
							onclick={() => (step = s)}
							class="rounded-md px-2 py-0.5 font-mono text-[11px] font-semibold transition {step ===
							s
								? 'bg-primary text-primary-foreground'
								: 'bg-muted text-muted-foreground hover:text-foreground'}"
						>
							+{s}
						</button>
					{/each}
				</div>
			</div>
		</div>

		<!-- Live Reactive Output -->
		<div
			class="flex flex-col justify-between space-y-3 rounded-xl border border-border bg-card p-4"
		>
			<span class="text-xs font-semibold text-muted-foreground">Derived Signal State</span>

			<div class="space-y-2">
				<div class="flex justify-between text-xs">
					<span class="text-muted-foreground">$derived(count * 2):</span>
					<span class="font-mono font-bold text-foreground">{doubleCount}</span>
				</div>
				<div class="flex justify-between text-xs">
					<span class="text-muted-foreground">Parity Check:</span>
					<span class="font-mono font-bold {isEven ? 'text-emerald-500' : 'text-amber-500'}">
						{isEven ? 'EVEN' : 'ODD'}
					</span>
				</div>
			</div>

			<p class="text-[11px] leading-relaxed text-muted-foreground/80">
				✨ Mutating <code class="text-primary">count</code> directly updates these derived values in fine-grained
				DOM signals without re-rendering the surrounding template tree.
			</p>
		</div>
	</div>
</div>
