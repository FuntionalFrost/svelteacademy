---
title: Reactivity in Svelte 5
description: Deep dive into $state(), $derived(), $derived.by(), and $effect() fine-grained reactivity.
trackId: basic-svelte
level: beginner
readTime: 6 min read
---

# Reactivity in Svelte 5

Reactivity in Svelte 5 is powered by fine-grained signals. When a signal value changes, only the specific DOM nodes or computations that depend on that signal are executed.

---

## 1. `$state()` — Declaring Reactive State

Use `$state()` to declare reactive variables. Mutating arrays and objects directly triggers updates without needing spread operators or immutable setters:

```svelte
<script lang="ts">
	let count = $state(0);
	let numbers = $state([1, 2, 3]);
	let user = $state({ name: 'Alice', age: 28 });

	function increment() {
		count += 1;
		numbers.push(count); // Direct mutation is reactive!
		user.age += 1;
	}
</script>

<button onclick={increment}>
	Clicks: {count}
</button>
```

---

## 2. `$derived()` and `$derived.by()` — Computed Values

Derived values automatically track which signals they read and only recompute when those signals change:

```svelte
<script lang="ts">
	let count = $state(5);
	let price = $state(19.99);

	// Simple derivation
	let total = $derived(count * price);

	// Complex multi-statement derivation with $derived.by
	let summary = $derived.by(() => {
		const formattedPrice = total.toFixed(2);
		return `Total order for ${count} items: $${formattedPrice}`;
	});
</script>
```

---

## 3. `$effect()` — Handling Side Effects

`$effect()` runs after the DOM updates when any reactive dependency changes. Return a cleanup function to tear down timers, event listeners, or subscriptions:

```svelte
<script lang="ts">
	let activeTab = $state('general');

	$effect(() => {
		console.log(`Switched to tab: ${activeTab}`);

		const timer = setInterval(() => {
			console.log('Heartbeat for tab:', activeTab);
		}, 5000);

		// Cleanup runs before re-execution and upon unmount
		return () => clearInterval(timer);
	});
</script>
```

> [!WARNING]
> Do NOT mutate state directly inside an `$effect()` without a guard condition, or you may trigger an infinite update loop.
