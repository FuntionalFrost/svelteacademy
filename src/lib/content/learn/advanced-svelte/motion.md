---
title: Physics-Based Motion and Springs
description: Craft natural, interactive UI animations with Tween and Spring from svelte/motion.
trackId: advanced-svelte
level: intermediate
readTime: 6 min read
---

# Physics-Based Motion and Springs

The `svelte/motion` module provides physics-based motion primitives (`Tween` and `Spring`) that smoothly interpolate values over time or react dynamically to user input with physical momentum.

---

## 1. `Spring` — Physics with Stiffness and Damping

Springs do not have fixed durations. Instead, their motion is governed by mass, stiffness, and damping, making them ideal for cursor tracking, drag-and-drop, and organic bouncy UI:

```svelte
<script lang="ts">
	import { Spring } from 'svelte/motion';

	// Spring with configurable physics
	const coords = new Spring(
		{ x: 50, y: 50 },
		{
			stiffness: 0.15,
			damping: 0.8
		}
	);

	function handleMouseMove(e: MouseEvent) {
		coords.target = { x: e.clientX, y: e.clientY };
	}
</script>

<svelte:window onmousemove={handleMouseMove} />

<div
	class="follower-circle"
	style:transform="translate({coords.current.x}px, {coords.current.y}px)"
></div>
```

---

## 2. `Tween` — Interpolated Transitions

`Tween` transitions values smoothly over a specified duration with custom easing curves:

```svelte
<script lang="ts">
	import { Tween } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	const progress = new Tween(0, {
		duration: 800,
		easing: cubicOut
	});

	function completeTask() {
		progress.target = 100;
	}
</script>

<button onclick={completeTask}>Complete 100%</button>

<progress value={progress.current} max="100"></progress>
<p>{Math.round(progress.current)}%</p>
```
