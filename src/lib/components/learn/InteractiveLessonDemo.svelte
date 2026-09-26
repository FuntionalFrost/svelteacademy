<!-- src/lib/components/learn/InteractiveLessonDemo.svelte -->
<script lang="ts">
	import type { LessonMeta } from '$lib/content/curriculum';
	import {
		Activity,
		CheckCircle2,
		Circle,
		Code2,
		Database,
		ExternalLink,
		Layers,
		Move,
		Network,
		Play,
		RefreshCw,
		RotateCcw,
		Server,
		ShieldCheck,
		Sliders,
		Sparkles,
		Terminal as TerminalIcon,
		Zap
	} from '@lucide/svelte';
	import { Badge, Button } from 'yaxa-svelte';

	let { lesson }: { lesson: LessonMeta } = $props();

	// --- 1. Reactivity & Signal Graph State ---
	let reactCount = $state(3);
	let reactMultiplier = $state(2);
	let reactDerived = $derived(reactCount * reactMultiplier);
	let isSignalPulsing = $state(false);
	let isDerivedPulsing = $state(false);
	let isEffectPulsing = $state(false);
	let effectLogs = $state<string[]>([
		'Signal Graph Initialized: [count: 3] -> [derived: 6]',
		'$effect scheduled observer on root component'
	]);

	function triggerSignalMutation(delta: number) {
		reactCount = Math.max(0, reactCount + delta);
		isSignalPulsing = true;
		setTimeout(() => {
			isSignalPulsing = false;
			isDerivedPulsing = true;
			setTimeout(() => {
				isDerivedPulsing = false;
				isEffectPulsing = true;
				setTimeout(() => (isEffectPulsing = false), 250);
			}, 180);
		}, 160);

		effectLogs = [
			`[Mutation] count = ${reactCount} | recomputed derived = ${reactCount * reactMultiplier}`,
			...effectLogs.slice(0, 5)
		];
	}

	function resetReactivity() {
		reactCount = 3;
		reactMultiplier = 2;
		effectLogs = ['Signal state reset to initial defaults'];
	}

	// --- 2. Props & Two-Way Binding State ---
	let propName = $state('Elena Rostova');
	let propRole = $state<'Architect' | 'Engineer' | 'Lead'>('Architect');
	let propVerified = $state(true);

	// --- 3. Logic & Keyed DOM State ---
	let logicShowDetails = $state(true);
	let logicItems = $state([
		{ id: '1', label: '$state() Signal Root', count: 4, tag: 'Rune' },
		{ id: '2', label: '$derived() Memoizer', count: 12, tag: 'Graph' },
		{ id: '3', label: '$effect() DOM Sync', count: 9, tag: 'Scheduler' }
	]);

	function shuffleLogicItems() {
		logicItems = [...logicItems].sort(() => Math.random() - 0.5);
	}

	function incrementItemCount(id: string) {
		const target = logicItems.find((i) => i.id === id);
		if (target) target.count += 1;
	}

	// --- 4. Event Propagation Stage Monitor ---
	let eventStopProp = $state(false);
	let eventStages = $state<string[]>([]);

	function fireEventSimulation(stage: string) {
		const log = eventStopProp
			? `[Capture] ${stage} -> Event Propagation HALTED (stopPropagation)`
			: `[Capture -> Target -> Bubble] ${stage} executed cleanly`;
		eventStages = [log, ...eventStages.slice(0, 4)];
	}

	// --- 5. Attachments & Actions State ---
	let actionMountCount = $state(1);
	let actionUpdateCount = $state(0);
	let actionTooltipText = $state('Dynamic action parameter');

	function updateActionParam() {
		actionTooltipText = `Updated at ${new Date().toLocaleTimeString()}`;
		actionUpdateCount += 1;
	}

	// --- 6. Transitions & Motion Physics Bench ---
	let springPos = $state(0);
	let springRotation = $state(0);
	let isSpringActive = $state(false);

	function pulseSpring() {
		if (isSpringActive) return;
		isSpringActive = true;
		springPos = -35;
		springRotation = 25;
		setTimeout(() => {
			springPos = 20;
			springRotation = -15;
			setTimeout(() => {
				springPos = -8;
				springRotation = 5;
				setTimeout(() => {
					springPos = 0;
					springRotation = 0;
					isSpringActive = false;
				}, 120);
			}, 120);
		}, 140);
	}

	// --- 7. SvelteKit Server & Streaming Simulator ---
	let isStreaming = $state(false);
	let streamChunks = $state<{ name: string; latency: string; status: 'pending' | 'ready' }[]>([]);

	async function simulateStreamingWaterfall() {
		isStreaming = true;
		streamChunks = [
			{ name: 'Critical Shell & User Auth', latency: '20ms', status: 'ready' },
			{ name: 'Heavy Analytics Dashboard (Streamed)', latency: '350ms', status: 'pending' },
			{ name: 'Global Activity Feed (Streamed)', latency: '700ms', status: 'pending' }
		];

		await new Promise((r) => setTimeout(r, 350));
		if (streamChunks[1]) streamChunks[1].status = 'ready';

		await new Promise((r) => setTimeout(r, 350));
		if (streamChunks[2]) streamChunks[2].status = 'ready';

		isStreaming = false;
	}

	// --- 8. Environment Security Matrix ---
	let selectedEnvModule = $state<
		'$env/static/private' | '$env/dynamic/public' | '$env/static/public'
	>('$env/static/private');
</script>

<div
	class="relative overflow-hidden rounded-2xl border border-border bg-card/70 p-5 shadow-lg backdrop-blur-md"
>
	<!-- Top Glowing Track Border Ambient -->
	<div
		class="absolute top-0 right-0 left-0 h-1 bg-linear-to-r {lesson.trackId === 'basic-svelte'
			? 'from-orange-500 via-amber-400 to-yellow-500'
			: lesson.trackId === 'advanced-svelte'
				? 'from-purple-500 via-indigo-400 to-pink-500'
				: lesson.trackId === 'basic-sveltekit'
					? 'from-emerald-500 via-teal-400 to-cyan-500'
					: 'from-cyan-500 via-blue-500 to-indigo-500'}"
	></div>

	<!-- Interactive Header Toolbar -->
	<div class="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3">
		<div class="flex items-center gap-2.5">
			<div
				class="flex size-8 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary shadow-xs"
			>
				<Zap class="size-4" />
			</div>
			<div>
				<div class="flex items-center gap-2">
					<h3 class="text-sm font-bold tracking-tight text-foreground">Interactive Laboratory</h3>
					<span
						class="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-500"
					>
						Live Runtime
					</span>
				</div>
				<p class="text-xs text-muted-foreground">
					Experiment directly with {lesson.title} concepts in real time
				</p>
			</div>
		</div>

		<div class="flex items-center gap-2">
			<a
				href="https://svelte.dev/playground"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground shadow-xs transition hover:border-primary/50 hover:bg-muted hover:text-primary"
			>
				<span>Svelte 5 REPL</span>
				<ExternalLink class="size-3.5 opacity-70" />
			</a>
		</div>
	</div>

	<!-- SIMULATOR 1: Reactivity & Signal Graph Visualizer ($state, $derived, $effect) -->
	{#if lesson.slug === 'reactivity' || lesson.slug === 'introduction' || lesson.slug === 'advanced-reactivity'}
		<div class="mt-4 space-y-4">
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-2">
					<Network class="size-4 text-primary" />
					<span class="text-xs font-bold tracking-wider text-primary uppercase"
						>Reactive Dependency Graph</span
					>
				</div>
				<Button variant="ghost" size="xs" onclick={resetReactivity}>
					<RotateCcw class="mr-1 size-3" />
					Reset
				</Button>
			</div>

			<!-- Signal Nodes Visual Flow -->
			<div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
				<!-- Root Signal Node -->
				<div
					class="relative overflow-hidden rounded-xl border p-3.5 text-center transition-all duration-250 {isSignalPulsing
						? 'scale-[1.03] border-primary bg-primary/20 shadow-lg ring-2 shadow-primary/30 ring-primary/40'
						: 'border-border bg-background'}"
				>
					<span class="font-mono text-xs text-muted-foreground">$state(count)</span>
					<div class="my-1.5 font-mono text-3xl font-black text-foreground">{reactCount}</div>
					<div class="flex gap-1.5 pt-1">
						<Button
							size="xs"
							variant="outline"
							class="flex-1"
							onclick={() => triggerSignalMutation(-1)}
						>
							-1
						</Button>
						<Button size="xs" class="flex-1" onclick={() => triggerSignalMutation(1)}>+1</Button>
					</div>
				</div>

				<!-- Multiplier Node -->
				<div class="rounded-xl border border-border bg-background p-3.5 text-center">
					<span class="font-mono text-xs text-muted-foreground">$state(multiplier)</span>
					<div class="my-1.5 font-mono text-3xl font-black text-foreground">{reactMultiplier}x</div>
					<div class="flex gap-1.5 pt-1">
						<Button
							size="xs"
							variant="outline"
							class="flex-1"
							onclick={() => (reactMultiplier = Math.max(1, reactMultiplier - 1))}
						>
							-
						</Button>
						<Button
							size="xs"
							variant="outline"
							class="flex-1"
							onclick={() => (reactMultiplier += 1)}
						>
							+
						</Button>
					</div>
				</div>

				<!-- Auto-Memoized Derived Node -->
				<div
					class="rounded-xl border p-3.5 text-center shadow-inner transition-all duration-250 {isDerivedPulsing
						? 'scale-[1.03] border-primary bg-primary/25 shadow-lg ring-2 shadow-primary/30 ring-primary/40'
						: 'border-primary/40 bg-linear-to-br from-primary/10 via-card to-primary/5'}"
				>
					<div
						class="flex items-center justify-center gap-1 font-mono text-xs font-bold text-primary"
					>
						<Sparkles class="size-3.5 {isDerivedPulsing ? 'animate-bounce' : ''}" />
						<span>$derived()</span>
					</div>
					<div class="my-1.5 font-mono text-3xl font-black text-primary">{reactDerived}</div>
					<span class="font-mono text-[10px] text-muted-foreground">Zero Virtual DOM Diffing</span>
				</div>
			</div>

			<!-- Terminal Execution Logs -->
			<div class="space-y-1.5">
				<div class="flex items-center justify-between text-xs font-semibold text-muted-foreground">
					<span class="flex items-center gap-1.5">
						<TerminalIcon class="size-3.5 text-emerald-400" />
						<span>Fine-Grained Runtime Observer Stream</span>
					</span>
					<span class="font-mono text-[10px] opacity-70">Auto-scheduled</span>
				</div>
				<div
					class="max-h-28 overflow-y-auto rounded-xl border bg-slate-950 p-3 font-mono text-xs text-emerald-400 shadow-inner transition-all duration-250 {isEffectPulsing
						? 'border-emerald-400 ring-1 shadow-emerald-500/20 ring-emerald-400/40'
						: 'border-border'}"
				>
					{#each effectLogs as log, i (i)}
						<div class="flex items-start gap-1.5 leading-relaxed">
							<span class="text-primary opacity-60">❯</span>
							<span>{log}</span>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<!-- SIMULATOR 2: Props & Two-Way Bindings ($bindable) -->
	{:else if lesson.slug === 'props' || lesson.slug === 'bindings' || lesson.slug === 'advanced-bindings'}
		<div class="mt-4 space-y-4">
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-2">
					<Sliders class="size-4 text-primary" />
					<span class="text-xs font-bold tracking-wider text-primary uppercase"
						>Two-Way $bindable() Synchronizer</span
					>
				</div>
			</div>

			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<!-- Parent Controls -->
				<div class="space-y-3 rounded-xl border border-border bg-background/80 p-4">
					<span class="font-mono text-xs font-bold text-muted-foreground uppercase"
						>Parent State Controller</span
					>
					<div>
						<label for="p-name" class="text-xs font-medium text-muted-foreground">User Name:</label>
						<input
							id="p-name"
							type="text"
							bind:value={propName}
							class="mt-1 w-full rounded-lg border border-border bg-card px-3 py-1.5 font-mono text-sm text-foreground focus:border-primary focus:outline-hidden"
						/>
					</div>

					<div class="grid grid-cols-2 gap-2">
						<div>
							<label for="p-role" class="text-xs font-medium text-muted-foreground">Role:</label>
							<select
								id="p-role"
								bind:value={propRole}
								class="mt-1 w-full rounded-lg border border-border bg-card px-3 py-1.5 text-xs text-foreground focus:border-primary focus:outline-hidden"
							>
								<option value="Architect">Architect</option>
								<option value="Engineer">Engineer</option>
								<option value="Lead">Lead</option>
							</select>
						</div>

						<div>
							<label for="p-verified" class="text-xs font-medium text-muted-foreground"
								>Status:</label
							>
							<button
								id="p-verified"
								type="button"
								onclick={() => (propVerified = !propVerified)}
								class="mt-1 flex w-full cursor-pointer items-center justify-between rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:border-primary/40"
							>
								<span>{propVerified ? 'Verified ✓' : 'Standard'}</span>
								<span
									class="size-2 rounded-full {propVerified
										? 'bg-emerald-400'
										: 'bg-muted-foreground'}"
								></span>
							</button>
						</div>
					</div>
				</div>

				<!-- Rendered Child Component -->
				<div
					class="flex flex-col justify-between rounded-xl border border-primary/30 bg-primary/5 p-4 shadow-xs"
				>
					<span class="font-mono text-xs font-bold text-primary uppercase"
						>Child Component Output</span
					>
					<div class="my-2 flex items-center gap-3">
						<div
							class="flex size-12 items-center justify-center rounded-2xl bg-linear-to-tr from-primary to-amber-400 text-lg font-black text-slate-950 shadow-md"
						>
							{propName.charAt(0) || 'U'}
						</div>
						<div>
							<h4 class="font-bold text-foreground">
								{propName || 'Anonymous'}
								{#if propVerified}<span class="ml-1 text-primary">✓</span>{/if}
							</h4>
							<span class="font-mono text-xs text-muted-foreground">{propRole}</span>
						</div>
					</div>
					<div class="flex items-center justify-between border-t border-border/60 pt-2 text-xs">
						<span class="text-muted-foreground">Sync Channel:</span>
						<Badge variant="solid" size="sm">Active Signal Sync</Badge>
					</div>
				</div>
			</div>
		</div>

		<!-- SIMULATOR 3: Logic, Lists & Keyed Identity -->
	{:else if lesson.slug === 'logic' || lesson.slug === 'reusing-content' || lesson.slug === 'context-api'}
		<div class="mt-4 space-y-4">
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-2">
					<Layers class="size-4 text-primary" />
					<span class="text-xs font-bold tracking-wider text-primary uppercase"
						>Keyed List & Control Flow</span
					>
				</div>
				<div class="flex gap-2">
					<Button size="xs" variant="outline" onclick={shuffleLogicItems}>Shuffle Items</Button>
					<Button size="xs" variant="ghost" onclick={() => (logicShowDetails = !logicShowDetails)}>
						{'Toggle {#if}'}
					</Button>
				</div>
			</div>

			{#if logicShowDetails}
				<div class="space-y-2">
					{#each logicItems as item (item.id)}
						<div
							class="flex items-center justify-between rounded-xl border border-border bg-background p-3 transition-all hover:border-primary/50"
						>
							<div class="flex items-center gap-3">
								<span
									class="flex size-7 items-center justify-center rounded-lg bg-primary/10 font-mono text-xs font-bold text-primary"
								>
									#{item.id}
								</span>
								<div>
									<div class="text-sm font-semibold text-foreground">{item.label}</div>
									<span class="font-mono text-[10px] text-muted-foreground"
										>Keyed node preserved</span
									>
								</div>
							</div>

							<div class="flex items-center gap-2">
								<Badge variant="outline" size="sm">{item.tag}</Badge>
								<Button size="xs" variant="ghost" onclick={() => incrementItemCount(item.id)}>
									+{item.count}
								</Button>
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<div
					class="rounded-xl border border-dashed border-border/80 p-8 text-center text-xs text-muted-foreground"
				>
					Condition Evaluated to FALSE — Subtree cleanly torn down from DOM
				</div>
			{/if}
		</div>

		<!-- SIMULATOR 4: Events & Event Propagation Pipeline -->
	{:else if lesson.slug === 'events'}
		<div class="mt-4 space-y-4">
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-2">
					<Activity class="size-4 text-primary" />
					<span class="text-xs font-bold tracking-wider text-primary uppercase"
						>Event Dispatch & Modifiers</span
					>
				</div>
				<button
					type="button"
					onclick={() => (eventStopProp = !eventStopProp)}
					class="flex items-center gap-2 rounded-lg border border-border bg-background px-2.5 py-1 font-mono text-xs transition hover:border-primary/40"
				>
					<span>stopPropagation:</span>
					<span class="font-bold {eventStopProp ? 'text-destructive' : 'text-emerald-400'}">
						{eventStopProp ? 'ON' : 'OFF'}
					</span>
				</button>
			</div>

			<div class="flex gap-2">
				<Button
					size="sm"
					class="flex-1"
					onclick={() => fireEventSimulation('Button Click Trigger')}
				>
					Fire onclick Handler
				</Button>
				<Button
					size="sm"
					variant="outline"
					class="flex-1"
					onclick={() => fireEventSimulation('Keyboard onkeydown')}
				>
					Fire onkeydown Handler
				</Button>
			</div>

			<!-- Event Stream Log -->
			<div class="rounded-xl border border-border bg-slate-950 p-3 font-mono text-xs text-cyan-300">
				{#each eventStages as stage, i (i)}
					<div class="leading-relaxed">>> {stage}</div>
				{:else}
					<div class="text-muted-foreground">
						Click a button above to inspect modern Svelte 5 event dispatch...
					</div>
				{/each}
			</div>
		</div>

		<!-- SIMULATOR 5: Motion, Physics & Spring Bench -->
	{:else if lesson.slug === 'motion' || lesson.slug === 'transitions' || lesson.slug === 'advanced-transitions'}
		<div class="mt-4 space-y-4">
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-2">
					<Move class="size-4 text-primary" />
					<span class="text-xs font-bold tracking-wider text-primary uppercase"
						>Physics Motion & Spring Bench</span
					>
				</div>
				<Button size="xs" onclick={pulseSpring}>Trigger Spring Pulse</Button>
			</div>

			<!-- Interactive Spring Physics Visualizer Arena -->
			<div
				class="relative flex h-36 items-center justify-center overflow-hidden rounded-xl border border-border bg-background/60"
			>
				<div
					class="flex size-16 items-center justify-center rounded-2xl bg-linear-to-tr from-primary via-emerald-400 to-cyan-400 font-bold text-slate-950 shadow-xl transition-all duration-150 ease-out"
					style:transform="translateY({springPos}px) rotate({springRotation}deg) scale({isSpringActive
						? 1.2
						: 1})"
				>
					<Sparkles
						class="size-7 transition-transform duration-150 {isSpringActive ? 'scale-125' : ''}"
					/>
				</div>
			</div>
		</div>

		<!-- SIMULATOR 6: Attachments & Actions Sandbox -->
	{:else if lesson.slug === 'attachments'}
		<div class="mt-4 space-y-4">
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-2">
					<Code2 class="size-4 text-primary" />
					<span class="text-xs font-bold tracking-wider text-primary uppercase"
						>DOM Action Lifecycle (use:action)</span
					>
				</div>
				<Button size="xs" variant="outline" onclick={updateActionParam}>
					Update Action Parameter
				</Button>
			</div>

			<div class="grid grid-cols-3 gap-2 text-center">
				<div class="rounded-lg border border-border bg-background p-2.5">
					<span class="font-mono text-[10px] text-muted-foreground">Mount (init)</span>
					<div class="font-mono text-lg font-bold text-emerald-400">{actionMountCount}</div>
				</div>
				<div class="rounded-lg border border-border bg-background p-2.5">
					<span class="font-mono text-[10px] text-muted-foreground">Updates (param)</span>
					<div class="font-mono text-lg font-bold text-amber-400">{actionUpdateCount}</div>
				</div>
				<div class="rounded-lg border border-border bg-background p-2.5">
					<span class="font-mono text-[10px] text-muted-foreground">Destroy (cleanup)</span>
					<div class="font-mono text-lg font-bold text-primary">0</div>
				</div>
			</div>

			<div
				class="rounded-lg border border-border bg-card p-3 font-mono text-xs text-muted-foreground"
			>
				Action payload: <span class="text-foreground">{actionTooltipText}</span>
			</div>
		</div>

		<!-- SIMULATOR 7: SvelteKit Streaming & Deferred Data -->
	{:else if lesson.slug === 'advanced-loading' || lesson.slug === 'loading-data'}
		<div class="mt-4 space-y-4">
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-2">
					<Database class="size-4 text-primary" />
					<span class="text-xs font-bold tracking-wider text-primary uppercase"
						>Promise Streaming Waterfall</span
					>
				</div>
				<Button size="xs" onclick={simulateStreamingWaterfall} disabled={isStreaming}>
					{#if isStreaming}
						<RefreshCw class="mr-1 size-3 animate-spin" />
						Streaming Chunks...
					{:else}
						<Play class="mr-1 size-3" />
						Simulate Load()
					{/if}
				</Button>
			</div>

			<div class="space-y-2">
				{#each streamChunks as chunk (chunk.name)}
					<div
						class="flex items-center justify-between rounded-xl border border-border bg-background p-3 text-xs"
					>
						<div class="flex items-center gap-2.5">
							{#if chunk.status === 'ready'}
								<CheckCircle2 class="size-4 text-emerald-400" />
							{:else}
								<Circle class="size-4 animate-pulse text-amber-400" />
							{/if}
							<span class="font-medium text-foreground">{chunk.name}</span>
						</div>
						<span class="font-mono text-muted-foreground">{chunk.latency}</span>
					</div>
				{:else}
					<div
						class="rounded-xl border border-dashed border-border p-6 text-center text-xs text-muted-foreground"
					>
						Click "Simulate Load()" to observe initial SSR render followed by deferred promise
						streaming...
					</div>
				{/each}
			</div>
		</div>

		<!-- SIMULATOR 8: Environment Security & Variable Isolation -->
	{:else if lesson.slug === 'environment-variables'}
		<div class="mt-4 space-y-4">
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-2">
					<ShieldCheck class="size-4 text-primary" />
					<span class="text-xs font-bold tracking-wider text-primary uppercase"
						>Environment Security Matrix</span
					>
				</div>
			</div>

			<div class="flex gap-1.5">
				<button
					type="button"
					class="flex-1 cursor-pointer rounded-lg border px-2 py-1.5 font-mono text-xs transition {selectedEnvModule ===
					'$env/static/private'
						? 'border-primary bg-primary/10 font-bold text-primary'
						: 'border-border bg-background text-muted-foreground'}"
					onclick={() => (selectedEnvModule = '$env/static/private')}
				>
					$env/static/private
				</button>
				<button
					type="button"
					class="flex-1 cursor-pointer rounded-lg border px-2 py-1.5 font-mono text-xs transition {selectedEnvModule ===
					'$env/dynamic/public'
						? 'border-emerald-500 bg-emerald-500/10 font-bold text-emerald-500'
						: 'border-border bg-background text-muted-foreground'}"
					onclick={() => (selectedEnvModule = '$env/dynamic/public')}
				>
					$env/dynamic/public
				</button>
			</div>

			<div class="space-y-2 rounded-xl border border-border bg-background p-4 text-xs">
				<div class="flex justify-between font-mono">
					<span class="text-muted-foreground">Target Scope:</span>
					<span class="font-bold text-foreground">
						{selectedEnvModule.includes('private')
							? 'Server-Only (Private Fence)'
							: 'Public (Client & Server)'}
					</span>
				</div>
				<div class="flex justify-between font-mono">
					<span class="text-muted-foreground">Evaluation Time:</span>
					<span class="font-bold text-foreground">
						{selectedEnvModule.includes('static')
							? 'Build-Time (Constant Inlined)'
							: 'Runtime (Per Request)'}
					</span>
				</div>
			</div>
		</div>

		<!-- SIMULATOR 9: Full-Stack SvelteKit Pipeline Simulator (Default for Hooks, Routing, Forms, API) -->
	{:else}
		<div class="mt-4 space-y-4">
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-2">
					<Server class="size-4 text-primary" />
					<span class="text-xs font-bold tracking-wider text-primary uppercase"
						>SvelteKit Full-Stack Pipeline</span
					>
				</div>
				<Button size="xs" onclick={simulateStreamingWaterfall} disabled={isStreaming}>
					{#if isStreaming}
						<RefreshCw class="mr-1 size-3 animate-spin" />
						Executing...
					{:else}
						<Play class="mr-1 size-3" />
						Run Pipeline
					{/if}
				</Button>
			</div>

			<div class="grid grid-cols-4 gap-2 text-center font-mono text-xs">
				<div class="rounded-lg border border-border bg-background p-2">
					<span class="text-[10px] text-muted-foreground">1. Request</span>
					<div class="font-bold text-foreground">Hook</div>
				</div>
				<div class="rounded-lg border border-border bg-background p-2">
					<span class="text-[10px] text-muted-foreground">2. Loader</span>
					<div class="font-bold text-primary">load()</div>
				</div>
				<div class="rounded-lg border border-border bg-background p-2">
					<span class="text-[10px] text-muted-foreground">3. Server</span>
					<div class="font-bold text-emerald-400">SSR HTML</div>
				</div>
				<div class="rounded-lg border border-border bg-background p-2">
					<span class="text-[10px] text-muted-foreground">4. Browser</span>
					<div class="font-bold text-cyan-400">Hydrate</div>
				</div>
			</div>
		</div>
	{/if}
</div>
