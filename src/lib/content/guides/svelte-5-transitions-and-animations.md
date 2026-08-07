---
title: 'Svelte 5 Transitions, Animations, and Gesture State'
description: 'Animate DOM elements with built-in transition directives (fade, fly, slide) and smooth list reordering using animate:flip.'
category: 'UI & Animation'
level: 'intermediate'
readTime: '5 min read'
---

Svelte provides built-in transition directives that execute CSS keyframe animations without extra external animation libraries. These directives integrate with `$state` signals when items enter or leave the DOM.

---

## 1. Element Entry and Exit Transitions

Apply transitions using `transition:`, `in:`, or `out:` directives:

```svelte
<script>
	import { fade, fly } from 'svelte/transition';

	let showCard = $state(true);
</script>

<button onclick={() => (showCard = !showCard)}>Toggle Card</button>

{#if showCard}
	<div in:fly={{ y: -20, duration: 300 }} out:fade={{ duration: 150 }} class="card">
		<h4>Smooth Animated Panel</h4>
		<p>Transitions run CSS keyframes natively on DOM mount and unmount.</p>
	</div>
{/if}
```

---

## 2. Reordering Lists with animate:flip

When array state updates cause list items to swap positions, apply `animate:flip` to smoothly interpolate item coordinates using First-Last-Invert-Play (FLIP):

```svelte
<script>
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';

	let items = $state([
		{ id: 1, text: 'Master Svelte 5 Runes' },
		{ id: 2, text: 'Explore Snippets' },
		{ id: 3, text: 'Build SvelteKit App' }
	]);

	function shuffle() {
		items = items.sort(() => Math.random() - 0.5);
	}
</script>

<button onclick={shuffle}>Shuffle List</button>

<ul>
	{#each items as item (item.id)}
		<li animate:flip={{ duration: 300 }} transition:fade>
			{item.text}
		</li>
	{/each}
</ul>
```

---

## Key Core Advantages

1. **Hardware Accelerated:** Built-in transitions generate native CSS keyframes that run directly on the GPU.
2. **Zero Extra Dependencies:** No heavy JavaScript animation engines required.
3. **FLIP Support:** `animate:flip` handles smooth layout recalculations when list order changes.
