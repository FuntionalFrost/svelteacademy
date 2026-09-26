---
title: Declarative Transitions and Animations
description: Animate elements smoothly entering and leaving the DOM using built-in Svelte transitions and easings.
trackId: basic-svelte
level: beginner
readTime: 5 min read
---

# Declarative Transitions and Animations

Svelte provides built-in transition directives that automatically animate elements as they enter and leave the DOM during conditional rendering.

---

## 1. Built-in Transitions (`transition:`)

Import transitions from `svelte/transition`:

```svelte
<script lang="ts">
	import { fade, fly, slide, scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	let visible = $state(true);
</script>

<button onclick={() => (visible = !visible)}>Toggle Card</button>

{#if visible}
	<div class="alert-box" transition:fly={{ y: -20, duration: 400, easing: quintOut }}>
		<h3>Smooth Entrance!</h3>
		<p>This box slides and fades seamlessly without external CSS libraries.</p>
	</div>
{/if}
```

---

## 2. Independent In and Out Transitions (`in:` and `out:`)

You can specify different transitions when an element enters versus when it exits:

```svelte
<script lang="ts">
	import { fade, slide } from 'svelte/transition';

	let showBanner = $state(true);
</script>

{#if showBanner}
	<div in:slide={{ duration: 300 }} out:fade={{ duration: 200 }} class="banner">
		Important Announcement
	</div>
{/if}
```

---

## 3. Global vs Local Transitions

By default, Svelte transitions are **local**, meaning they only play if their immediate parent block changes. Add the `|global` modifier if you want the transition to play when an outer block transitions:

```svelte
<div transition:fade|global>Always transitions even if parent unmounts</div>
```
