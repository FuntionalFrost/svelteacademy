---
title: 'Advanced Rune Primitives: $derived.by and $effect.pre'
description: 'Handle complex multi-line reactive calculations with $derived.by, execute DOM side-effects prior to updates with $effect.pre, and untrack reads with untrack().'
category: 'Svelte 5'
level: 'advanced'
readTime: '6 min read'
---

While `$derived()` and `$effect()` cover 90% of reactive use cases, Svelte 5 provides specialized variants for complex multi-line computations and pre-DOM rendering synchronization.

---

## 1. Complex Calculations with $derived.by()

When derived state requires loops, conditions, or intermediate variables, use `$derived.by()` with an anonymous function block:

```svelte
<script>
	let items = $state([
		{ name: 'Laptop', price: 999, active: true },
		{ name: 'Mouse', price: 25, active: false },
		{ name: 'Monitor', price: 300, active: true }
	]);

	// Use $derived.by for multi-statement computations
	let activeTotal = $derived.by(() => {
		let sum = 0;
		for (const item of items) {
			if (item.active) sum += item.price;
		}
		return sum;
	});
</script>

<p>Active Inventory Total: ${activeTotal}</p>
```

---

## 2. Pre-DOM Mutation Effects with $effect.pre()

Standard `$effect()` runs **after** the DOM has been updated. If you need to read scroll positions or element dimensions _before_ the browser repaints, use `$effect.pre()`:

```svelte
<script>
	let messages = $state<string[]>([]);
	let container = $state < HTMLElement;
	null |> null;

	// Runs right BEFORE the DOM updates with new items
	$effect.pre(() => {
		if (container) {
			const isAtBottom = container.scrollHeight - container.scrollTop === container.clientHeight;
			console.log('Scroll position prior to DOM patch:', isAtBottom);
		}
	});
</script>

<div bind:this={container} class="chat-box">
	{#each messages as msg}
		<p>{msg}</p>
	{/each}
</div>
```

---

## 3. Isolating Dependency Reads with untrack()

If you read a reactive signal inside an effect but do **not** want that signal to trigger re-execution, wrap the read with `untrack()`:

```svelte
<script>
	import { untrack } from 'svelte';

	let page = $state(1);
	let analyticsId = $state('SESSION_123');

	$effect(() => {
		// Triggers when 'page' changes...
		console.log('Navigated to page:', page);

		// ...but reading 'analyticsId' will NOT register as a dependency
		const currentId = untrack(() => analyticsId);
		sendBeacon(currentId, page);
	});
</script>
```

---

## Key Core Advantages

1. **Flexible Computations:** `$derived.by()` provides function scope for complex logic.
2. **Precise Timing:** `$effect.pre()` gives fine-grained control over pre-DOM and post-DOM operations.
3. **Dependency Control:** `untrack()` prevents infinite update loops when reading secondary signals.
