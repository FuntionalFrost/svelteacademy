---
title: 'Debugging Svelte 5 Signals with $inspect'
description: 'Learn how to use $inspect() for development logging, trace reactive signal dependency triggers, and run custom inspector callbacks.'
category: 'Tooling'
readTime: '4 min read'
---

Debugging reactive state in frameworks can be difficult when logs trigger unintended side-effects. Svelte 5 solves this with the `$inspect()` rune, a dedicated development tool designed to track signal updates cleanly.

---

## 1. Basic Reactive Logging with $inspect()

Pass reactive signals or variables to `$inspect()`. Svelte automatically logs changes to the console whenever those values mutate:

```svelte
<script>
	let count = $state(0);
	let user = $state({ name: 'Alex', role: 'Developer' });

	// Automatically logs to console when count or user mutates
	$inspect(count, user);
</script>

<button onclick={() => count++}>Count: {count}</button>
<button onclick={() => (user.name = 'Sam')}>Update Name</button>
```

---

## 2. Adding Custom Inspector Callbacks with .with()

Use `$inspect(...).with()` to intercept signal updates and run custom functions (such as logging to external dev tools or triggering breakpoints):

```svelte
<script>
	let search = $state('');

	$inspect(search).with((type, value) => {
		if (type === 'init') {
			console.log('Search signal initialized:', value);
		} else {
			console.trace(`Search signal updated via [${type}]:`, value);
		}
	});
</script>

<input bind:value={search} placeholder="Search docs..." />
```

---

## 3. Production Safety

Unlike manual `console.log` statements inside effects, `$inspect()` is stripped out during production builds. It carries **zero runtime size overhead** in production.

---

## Key Core Advantages

1. **Zero Production Footprint:** The Svelte compiler strips `$inspect()` calls entirely from production output.
2. **No Infinite Loops:** Calling `$inspect()` never triggers additional reactive updates.
3. **Traceability:** `.with()` callbacks show exactly what triggered a state change (`init` vs `update`).
