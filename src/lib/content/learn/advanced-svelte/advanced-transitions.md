---
title: Advanced Transitions and FLIP Animations
description: Coordinate elements across lists with crossfade and smooth reordering with animate:flip.
trackId: advanced-svelte
level: advanced
readTime: 7 min read
---

# Advanced Transitions and FLIP Animations

When elements move between different containers (like a Kanban board or shopping cart) or change order in a list, Svelte provides **crossfade transitions** and **FLIP animations** to make movements visually continuous.

---

## 1. Deferred Transitions with `crossfade`

The `crossfade` function pairs an outgoing element in one container with an incoming element in another:

```svelte
<script lang="ts">
	import { crossfade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200),
		fallback(node, params) {
			return {
				duration: 300,
				easing: quintOut,
				css: (t) => `opacity: ${t}`
			};
		}
	});

	let todos = $state([
		{ id: 1, text: 'Design UI', done: false },
		{ id: 2, text: 'Write Tests', done: true }
	]);
</script>

{#each todos.filter((t) => !t.done) as item (item.id)}
	<li in:receive={{ key: item.id }} out:send={{ key: item.id }}>
		{item.text}
	</li>
{/each}
```

---

## 2. List Reordering with `animate:flip`

Use `flip` from `svelte/animate` inside keyed `{#each}` blocks to automatically interpolate position changes when items are sorted:

```svelte
<script lang="ts">
	import { flip } from 'svelte/animate';

	let items = $state(['Apple', 'Banana', 'Cherry', 'Date']);

	function shuffle() {
		items = [...items].sort(() => Math.random() - 0.5);
	}
</script>

<button onclick={shuffle}>Shuffle Items</button>

<ul>
	{#each items as item (item)}
		<li animate:flip={{ duration: 400 }}>
			{item}
		</li>
	{/each}
</ul>
```
