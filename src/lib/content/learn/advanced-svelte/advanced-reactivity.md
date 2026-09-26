---
title: Advanced Reactivity Patterns
description: Raw state, snapshots, untrack(), $effect.pre(), and encapsulated class state in Svelte 5.
trackId: advanced-svelte
level: advanced
readTime: 7 min read
---

# Advanced Reactivity Patterns

As applications scale, understanding fine-grained reactivity boundaries, non-reactive references, and pre-DOM effects is crucial for peak performance.

---

## 1. Non-Proxy State (`$state.raw()`)

For large datasets, complex third-party instances (e.g., Three.js meshes, WebGL contexts, Monaco editors), or immutable payloads, deep proxy wrapping adds overhead. Use `$state.raw()` to create a shallow reactive reference that only triggers updates when reassigned:

```svelte
<script lang="ts">
	// Shallow reactivity: only reassignment triggers observers
	let largeDataset = $state.raw<number[]>([1, 2, 3]);

	function updateDataset() {
		// Won't trigger reactivity: largeDataset.push(4);
		// Correct for raw state: reassign array reference
		largeDataset = [...largeDataset, 4];
	}
</script>
```

---

## 2. Breaking Reactive Dependency Chains with `untrack()`

Read a signal inside an `$effect` without subscribing to its future updates:

```svelte
<script lang="ts">
	import { untrack } from 'svelte';

	let activePage = $state(1);
	let filterTag = $state('all');

	$effect(() => {
		// Re-runs when activePage changes...
		console.log(`Page changed to: ${activePage}`);

		// ...but ignores changes to filterTag!
		const currentFilter = untrack(() => filterTag);
		console.log(`Current filter when page changed: ${currentFilter}`);
	});
</script>
```

---

## 3. Encapsulated Class State in `.svelte.ts`

Svelte 5 allows you to build object-oriented domain models with reactive class properties:

```ts
// src/lib/models/Cart.svelte.ts
export class Cart {
	items = $state<{ id: string; price: number; qty: number }[]>([]);

	total = $derived(this.items.reduce((sum, item) => sum + item.price * item.qty, 0));

	addItem(id: string, price: number) {
		const existing = this.items.find((i) => i.id === id);
		if (existing) {
			existing.qty += 1;
		} else {
			this.items.push({ id, price, qty: 1 });
		}
	}
}
```
