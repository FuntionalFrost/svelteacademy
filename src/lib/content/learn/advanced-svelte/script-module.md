---
title: Module Context Scripts (<script module>)
description: Run code once per module, share static singletons across component instances, and export constants.
trackId: advanced-svelte
level: intermediate
readTime: 4 min read
---

# Module Context Scripts (`<script module>`)

A standard `<script>` tag in Svelte executes **every time a component is instantiated**. Adding the `module` attribute creates a module-level execution scope that runs **once when the module is imported**.

---

## 1. Sharing State Across All Component Instances

Variables declared in `<script module>` are shared as a singleton across all instances of that component:

```svelte
<!-- AudioPlayer.svelte -->
<script module lang="ts">
	// Shared singleton: tracks currently playing instance
	let activePlayer: HTMLAudioElement | null = null;

	export function stopAllPlayback() {
		activePlayer?.pause();
	}
</script>

<script lang="ts">
	let { src }: { src: string } = $props();
	let audioEl: HTMLAudioElement;

	function play() {
		if (activePlayer && activePlayer !== audioEl) {
			activePlayer.pause();
		}
		activePlayer = audioEl;
		audioEl.play();
	}
</script>

<audio bind:this={audioEl} {src}></audio>
<button onclick={play}>Play</button>
```

---

## 2. Exporting Named Constants & Types

You can export types, constants, or utility functions directly from a `.svelte` file:

```svelte
<script module lang="ts">
	export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
	export const DEFAULT_VARIANT: ButtonVariant = 'primary';
</script>

<script lang="ts">
	let { variant = DEFAULT_VARIANT }: { variant?: ButtonVariant } = $props();
</script>

<button class="btn-{variant}">Click Me</button>
```
