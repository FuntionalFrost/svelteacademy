<!-- src/lib/components/learn/InteractiveLessonDemo.svelte -->
<script lang="ts">
	import type { LessonMeta } from '#lib/content/curriculum.js';
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

<div class="relative overflow-hidden rounded-2xl bg-zinc-950 p-6 text-zinc-100 shadow-2xl">
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
	<div class="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800/80 pb-3">
		<div class="flex items-center gap-2.5">
			<div
				class="flex size-8 items-center justify-center rounded-xl border border-orange-500/30 bg-orange-500/10 text-orange-400 shadow-xs"
			>
				<Zap class="size-4" />
			</div>
			<div>
				<div class="flex items-center gap-2">
					<h3 class="text-sm font-bold tracking-tight text-zinc-100">Interactive Laboratory</h3>
					<span
						class="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-400"
					>
						Live Runtime
					</span>
				</div>
				<p class="text-xs text-zinc-400">
					Experiment directly with {lesson.title} concepts in real time
				</p>
			</div>
		</div>

		<div class="flex items-center gap-2">
			<a
				href="https://svelte.dev/playground"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-zinc-300 shadow-xs transition hover:border-orange-500/50 hover:bg-zinc-800 hover:text-orange-400"
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
					<Network class="size-4 text-orange-400" />
					<span class="text-xs font-bold tracking-wider text-orange-400 uppercase"
						>Reactive Dependency Graph</span
					>
				</div>
				<Button
					variant="ghost"
					size="xs"
					class="text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
					onclick={resetReactivity}
				>
					<RotateCcw class="mr-1 size-3" />
					Reset
				</Button>
			</div>

			<!-- Signal Nodes Visual Flow: Seamless Column Dividers, Zero Inner Card Boxes -->
			<div
				class="grid grid-cols-1 divide-y divide-zinc-800/60 py-2 sm:grid-cols-3 sm:divide-x sm:divide-y-0"
			>
				<!-- Root Signal Node -->
				<div
					class="flex flex-col items-center justify-center p-4 text-center transition-all duration-200 {isSignalPulsing
						? 'scale-105'
						: ''}"
				>
					<span class="font-mono text-xs text-zinc-400">$state(count)</span>
					<div class="my-2 font-mono text-4xl font-black text-zinc-100">{reactCount}</div>
					<div class="flex gap-2">
						<button
							type="button"
							class="rounded-lg bg-zinc-900 px-4 py-1.5 font-mono text-xs font-bold text-zinc-200 transition hover:bg-zinc-800 active:scale-95"
							onclick={() => triggerSignalMutation(-1)}
						>
							-1
						</button>
						<button
							type="button"
							class="rounded-lg bg-orange-500 px-4 py-1.5 font-mono text-xs font-bold text-white shadow-xs transition hover:bg-orange-600 active:scale-95"
							onclick={() => triggerSignalMutation(1)}
						>
							+1
						</button>
					</div>
				</div>

				<!-- Multiplier Node -->
				<div class="flex flex-col items-center justify-center p-4 text-center">
					<span class="font-mono text-xs text-zinc-400">$state(multiplier)</span>
					<div class="my-2 font-mono text-4xl font-black text-zinc-100">{reactMultiplier}x</div>
					<div class="flex gap-2">
						<button
							type="button"
							class="rounded-lg bg-zinc-900 px-4 py-1.5 font-mono text-xs font-bold text-zinc-200 transition hover:bg-zinc-800 active:scale-95"
							onclick={() => (reactMultiplier = Math.max(1, reactMultiplier - 1))}
						>
							-
						</button>
						<button
							type="button"
							class="rounded-lg bg-zinc-900 px-4 py-1.5 font-mono text-xs font-bold text-zinc-200 transition hover:bg-zinc-800 active:scale-95"
							onclick={() => (reactMultiplier += 1)}
						>
							+
						</button>
					</div>
				</div>

				<!-- Auto-Memoized Derived Node -->
				<div
					class="flex flex-col items-center justify-center p-4 text-center transition-all duration-200 {isDerivedPulsing
						? 'scale-105'
						: ''}"
				>
					<div
						class="flex items-center justify-center gap-1.5 font-mono text-xs font-bold text-orange-400"
					>
						<Sparkles class="size-3.5 {isDerivedPulsing ? 'animate-bounce' : ''}" />
						<span>$derived()</span>
					</div>
					<div class="my-2 font-mono text-4xl font-black text-orange-400">{reactDerived}</div>
					<span class="font-mono text-[10px] text-zinc-500">Zero Virtual DOM Diffing</span>
				</div>
			</div>

			<!-- Terminal Execution Logs: Seamless Flush Pane -->
			<div class="rounded-xl bg-black/60 p-3.5">
				<div class="mb-2 flex items-center justify-between text-xs font-semibold text-zinc-400">
					<span class="flex items-center gap-1.5">
						<TerminalIcon class="size-3.5 text-emerald-400" />
						<span>Runtime Observer Stream</span>
					</span>
					<span class="font-mono text-[10px] text-zinc-500">Auto-scheduled</span>
				</div>
				<div
					class="max-h-24 space-y-1 overflow-y-auto font-mono text-xs text-emerald-400 transition-all duration-200 {isEffectPulsing
						? 'text-emerald-300'
						: ''}"
				>
					{#each effectLogs as log, i (i)}
						<div class="flex items-start gap-1.5 leading-relaxed">
							<span class="text-orange-400 opacity-80">❯</span>
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
					<Sliders class="size-4 text-orange-400" />
					<span class="text-xs font-bold tracking-wider text-orange-400 uppercase"
						>Two-Way $bindable() Synchronizer</span
					>
				</div>
			</div>

			<div
				class="grid grid-cols-1 divide-y divide-zinc-800/60 py-2 sm:grid-cols-2 sm:divide-x sm:divide-y-0"
			>
				<!-- Parent Controls -->
				<div class="space-y-3 p-4">
					<span class="font-mono text-xs font-bold text-zinc-400 uppercase"
						>Parent State Controller</span
					>
					<div>
						<label for="p-name" class="text-xs font-medium text-zinc-400">User Name:</label>
						<input
							id="p-name"
							type="text"
							bind:value={propName}
							class="focus:bg-zinc-850 mt-1 w-full rounded-lg bg-zinc-900 px-3 py-1.5 font-mono text-sm text-zinc-100 focus:outline-hidden"
						/>
					</div>

					<div class="grid grid-cols-2 gap-2">
						<div>
							<label for="p-role" class="text-xs font-medium text-zinc-400">Role:</label>
							<select
								id="p-role"
								bind:value={propRole}
								class="focus:bg-zinc-850 mt-1 w-full rounded-lg bg-zinc-900 px-3 py-1.5 text-xs text-zinc-100 focus:outline-hidden"
							>
								<option value="Architect">Architect</option>
								<option value="Engineer">Engineer</option>
								<option value="Lead">Lead</option>
							</select>
						</div>

						<div>
							<label for="p-verified" class="text-xs font-medium text-zinc-400">Status:</label>
							<button
								id="p-verified"
								type="button"
								onclick={() => (propVerified = !propVerified)}
								class="mt-1 flex w-full cursor-pointer items-center justify-between rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-200 hover:bg-zinc-800"
							>
								<span>{propVerified ? 'Verified ✓' : 'Standard'}</span>
								<span class="size-2 rounded-full {propVerified ? 'bg-emerald-400' : 'bg-zinc-600'}"
								></span>
							</button>
						</div>
					</div>
				</div>

				<!-- Rendered Child Component -->
				<div class="flex flex-col justify-between p-4">
					<span class="font-mono text-xs font-bold text-orange-400 uppercase"
						>Child Component Output</span
					>
					<div class="my-4 flex items-center gap-3">
						<div
							class="flex size-14 items-center justify-center rounded-2xl bg-linear-to-tr from-orange-500 to-amber-400 text-xl font-black text-zinc-950 shadow-md"
						>
							{propName.charAt(0) || 'U'}
						</div>
						<div>
							<h4 class="text-base font-bold text-zinc-100">
								{propName || 'Anonymous'}
								{#if propVerified}<span class="ml-1 text-emerald-400">✓</span>{/if}
							</h4>
							<span class="font-mono text-xs text-zinc-400">{propRole}</span>
						</div>
					</div>
					<div class="flex items-center justify-between text-xs">
						<span class="text-zinc-500">Sync Channel:</span>
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
					<Layers class="size-4 text-orange-400" />
					<span class="text-xs font-bold tracking-wider text-orange-400 uppercase"
						>Keyed List & Control Flow</span
					>
				</div>
				<div class="flex gap-2">
					<Button
						size="xs"
						variant="outline"
						class="border-zinc-800 bg-zinc-900 text-zinc-200 hover:bg-zinc-800 hover:text-zinc-100"
						onclick={shuffleLogicItems}
					>
						Shuffle Items
					</Button>
					<Button
						size="xs"
						variant="ghost"
						class="text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
						onclick={() => (logicShowDetails = !logicShowDetails)}
					>
						{'Toggle {#if}'}
					</Button>
				</div>
			</div>

			{#if logicShowDetails}
				<div class="divide-y divide-zinc-800/60 rounded-xl bg-zinc-900/40">
					{#each logicItems as item (item.id)}
						<div
							class="flex items-center justify-between p-3.5 transition-all first:rounded-t-xl last:rounded-b-xl hover:bg-zinc-900/80"
						>
							<div class="flex items-center gap-3">
								<span
									class="flex size-7 items-center justify-center rounded-lg bg-orange-500/15 font-mono text-xs font-bold text-orange-400"
								>
									#{item.id}
								</span>
								<div>
									<div class="text-sm font-semibold text-zinc-100">{item.label}</div>
									<span class="font-mono text-[10px] text-zinc-500">Keyed node preserved</span>
								</div>
							</div>

							<div class="flex items-center gap-2">
								<Badge variant="outline" size="sm">{item.tag}</Badge>
								<button
									type="button"
									class="rounded-md bg-zinc-800 px-2.5 py-1 font-mono text-xs font-bold text-zinc-200 hover:bg-zinc-700"
									onclick={() => incrementItemCount(item.id)}
								>
									+{item.count}
								</button>
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<div class="rounded-xl bg-zinc-900/30 p-8 text-center text-xs text-zinc-500">
					Condition Evaluated to FALSE — Subtree cleanly torn down from DOM
				</div>
			{/if}
		</div>

		<!-- SIMULATOR 4: Events & Event Propagation Pipeline -->
	{:else if lesson.slug === 'events'}
		<div class="mt-4 space-y-4">
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-2">
					<Activity class="size-4 text-orange-400" />
					<span class="text-xs font-bold tracking-wider text-orange-400 uppercase"
						>Event Dispatch & Modifiers</span
					>
				</div>
				<button
					type="button"
					onclick={() => (eventStopProp = !eventStopProp)}
					class="flex items-center gap-2 rounded-lg bg-zinc-900 px-3 py-1 font-mono text-xs text-zinc-300 transition hover:bg-zinc-800"
				>
					<span>stopPropagation:</span>
					<span class="font-bold {eventStopProp ? 'text-red-400' : 'text-emerald-400'}">
						{eventStopProp ? 'ON' : 'OFF'}
					</span>
				</button>
			</div>

			<div class="flex gap-2">
				<Button
					size="sm"
					class="flex-1 bg-orange-500 font-bold text-white hover:bg-orange-600"
					onclick={() => fireEventSimulation('Button Click Trigger')}
				>
					Fire onclick Handler
				</Button>
				<Button
					size="sm"
					variant="outline"
					class="flex-1 border-zinc-800 bg-zinc-900 text-zinc-200 hover:bg-zinc-800 hover:text-zinc-100"
					onclick={() => fireEventSimulation('Keyboard onkeydown')}
				>
					Fire onkeydown Handler
				</Button>
			</div>

			<!-- Event Stream Log: Seamless Flush Pane -->
			<div class="rounded-xl bg-black/60 p-3.5 font-mono text-xs text-cyan-300">
				{#each eventStages as stage, i (i)}
					<div class="leading-relaxed">>> {stage}</div>
				{:else}
					<div class="text-zinc-500">
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
					<Move class="size-4 text-orange-400" />
					<span class="text-xs font-bold tracking-wider text-orange-400 uppercase"
						>Physics Motion & Spring Bench</span
					>
				</div>
				<Button
					size="xs"
					class="bg-orange-500 font-bold text-white hover:bg-orange-600"
					onclick={pulseSpring}
				>
					Trigger Spring Pulse
				</Button>
			</div>

			<!-- Interactive Spring Physics Visualizer Arena -->
			<div
				class="relative flex h-36 items-center justify-center overflow-hidden rounded-xl bg-black/40"
			>
				<div
					class="flex size-16 items-center justify-center rounded-2xl bg-linear-to-tr from-orange-500 via-amber-400 to-emerald-400 font-bold text-zinc-950 shadow-xl transition-all duration-150 ease-out"
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
					<Code2 class="size-4 text-orange-400" />
					<span class="text-xs font-bold tracking-wider text-orange-400 uppercase"
						>DOM Action Lifecycle (use:action)</span
					>
				</div>
				<Button
					size="xs"
					variant="outline"
					class="border-zinc-800 bg-zinc-900 text-zinc-200 hover:bg-zinc-800 hover:text-zinc-100"
					onclick={updateActionParam}
				>
					Update Action Parameter
				</Button>
			</div>

			<div
				class="grid grid-cols-3 divide-x divide-zinc-800/60 rounded-xl bg-zinc-900/40 p-2 text-center"
			>
				<div class="p-2">
					<span class="font-mono text-[10px] text-zinc-500">Mount (init)</span>
					<div class="font-mono text-xl font-bold text-emerald-400">{actionMountCount}</div>
				</div>
				<div class="p-2">
					<span class="font-mono text-[10px] text-zinc-500">Updates (param)</span>
					<div class="font-mono text-xl font-bold text-amber-400">{actionUpdateCount}</div>
				</div>
				<div class="p-2">
					<span class="font-mono text-[10px] text-zinc-500">Destroy (cleanup)</span>
					<div class="font-mono text-xl font-bold text-orange-400">0</div>
				</div>
			</div>

			<div class="rounded-lg bg-zinc-900/40 p-3 font-mono text-xs text-zinc-400">
				Action payload: <span class="text-zinc-100">{actionTooltipText}</span>
			</div>
		</div>

		<!-- SIMULATOR 7: SvelteKit Streaming & Deferred Data -->
	{:else if lesson.slug === 'advanced-loading' || lesson.slug === 'loading-data'}
		<div class="mt-4 space-y-4">
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-2">
					<Database class="size-4 text-orange-400" />
					<span class="text-xs font-bold tracking-wider text-orange-400 uppercase"
						>Promise Streaming Waterfall</span
					>
				</div>
				<Button
					size="xs"
					class="bg-orange-500 font-bold text-white hover:bg-orange-600"
					onclick={simulateStreamingWaterfall}
					disabled={isStreaming}
				>
					{#if isStreaming}
						<RefreshCw class="mr-1 size-3 animate-spin" />
						Streaming Chunks...
					{:else}
						<Play class="mr-1 size-3" />
						Simulate Load()
					{/if}
				</Button>
			</div>

			<div class="divide-y divide-zinc-800/60 rounded-xl bg-zinc-900/40">
				{#each streamChunks as chunk (chunk.name)}
					<div class="flex items-center justify-between p-3 text-xs">
						<div class="flex items-center gap-2.5">
							{#if chunk.status === 'ready'}
								<CheckCircle2 class="size-4 text-emerald-400" />
							{:else}
								<Circle class="size-4 animate-pulse text-amber-400" />
							{/if}
							<span class="font-medium text-zinc-200">{chunk.name}</span>
						</div>
						<span class="font-mono text-zinc-500">{chunk.latency}</span>
					</div>
				{:else}
					<div class="p-6 text-center text-xs text-zinc-500">
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
					<ShieldCheck class="size-4 text-orange-400" />
					<span class="text-xs font-bold tracking-wider text-orange-400 uppercase"
						>Environment Security Matrix</span
					>
				</div>
			</div>

			<div class="flex gap-2">
				<button
					type="button"
					class="flex-1 cursor-pointer rounded-lg px-3 py-1.5 font-mono text-xs transition {selectedEnvModule ===
					'$env/static/private'
						? 'bg-orange-500/20 font-bold text-orange-400'
						: 'bg-zinc-900 text-zinc-400 hover:text-zinc-200'}"
					onclick={() => (selectedEnvModule = '$env/static/private')}
				>
					$env/static/private
				</button>
				<button
					type="button"
					class="flex-1 cursor-pointer rounded-lg px-3 py-1.5 font-mono text-xs transition {selectedEnvModule ===
					'$env/dynamic/public'
						? 'bg-emerald-500/20 font-bold text-emerald-400'
						: 'bg-zinc-900 text-zinc-400 hover:text-zinc-200'}"
					onclick={() => (selectedEnvModule = '$env/dynamic/public')}
				>
					$env/dynamic/public
				</button>
			</div>

			<div class="space-y-2 rounded-xl bg-zinc-900/40 p-4 text-xs">
				<div class="flex justify-between font-mono">
					<span class="text-zinc-500">Target Scope:</span>
					<span class="font-bold text-zinc-100">
						{selectedEnvModule.includes('private')
							? 'Server-Only (Private Fence)'
							: 'Public (Client & Server)'}
					</span>
				</div>
				<div class="flex justify-between font-mono">
					<span class="text-zinc-500">Evaluation Time:</span>
					<span class="font-bold text-zinc-100">
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
					<Server class="size-4 text-orange-400" />
					<span class="text-xs font-bold tracking-wider text-orange-400 uppercase"
						>SvelteKit Full-Stack Pipeline</span
					>
				</div>
				<Button
					size="xs"
					class="bg-orange-500 font-bold text-white hover:bg-orange-600"
					onclick={simulateStreamingWaterfall}
					disabled={isStreaming}
				>
					{#if isStreaming}
						<RefreshCw class="mr-1 size-3 animate-spin" />
						Executing...
					{:else}
						<Play class="mr-1 size-3" />
						Run Pipeline
					{/if}
				</Button>
			</div>

			<div
				class="grid grid-cols-4 divide-x divide-zinc-800/60 rounded-xl bg-zinc-900/40 p-2 text-center font-mono text-xs"
			>
				<div class="p-2">
					<span class="text-[10px] text-zinc-500">1. Request</span>
					<div class="font-bold text-zinc-100">Hook</div>
				</div>
				<div class="p-2">
					<span class="text-[10px] text-zinc-500">2. Loader</span>
					<div class="font-bold text-orange-400">load()</div>
				</div>
				<div class="p-2">
					<span class="text-[10px] text-zinc-500">3. Server</span>
					<div class="font-bold text-emerald-400">SSR HTML</div>
				</div>
				<div class="p-2">
					<span class="text-[10px] text-zinc-500">4. Browser</span>
					<div class="font-bold text-cyan-400">Hydrate</div>
				</div>
			</div>
		</div>
	{/if}
</div>
