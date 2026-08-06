---
title: 'Svelte 5 Runes: The Complete Developer Guide'
description: 'Master $state, $derived, $effect, and $props. Learn how Svelte 5 delivers zero-boilerplate, fine-grained reactivity using compiler signals.'
category: 'Svelte 5'
readTime: '7 min read'
---

<script>
  import CodeComparison from '$lib/components/CodeComparison.svelte';
  import InteractiveRuneDemo from '$lib/components/InteractiveRuneDemo.svelte';

  const reactCode = `import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  function increment() {
    setCount(prev => prev + 1);
  }

  return <button onClick={increment}>Count: {count}</button>;
}`;

  const svelteCode = `<${'script'}>
  let count = $state(0);

  function increment() {
    count += 1;
  }
</${'script'}>

<button onclick={increment}>Count: {count}</button>`;
</script>

Svelte 5 introduces **Runes**, an explicit set of compiler primitives that bring fine-grained reactivity directly into standard JavaScript logic without virtual DOM overhead or complex dependency arrays.

---

## Interactive Rune Playground

Try updating the counter below to see Svelte 5's `$state` and `$derived` signal calculations update instantly:

<InteractiveRuneDemo />

---

## 1. Fine-Grained Reactive State with $state

State in Svelte 5 is declared using the `$state()` rune. Unlike framework implementations that require explicit setter functions (`setState`), Svelte 5 allows direct mutations while surgical DOM updates happen behind the scenes:

<CodeComparison
  title="Reactive State Mutation"
  description="Comparing React 19 useState setters with Svelte 5 $state signals."
  competingName="React 19"
  competingCode={reactCode}
  svelteCode={svelteCode}
/>

---

## 2. Derived Computations with $derived

Use `$derived()` to calculate reactive values automatically. Derived signals are memoized and only re-evaluate when their underlying dependencies change:

```svelte
<script>
	let count = $state(5);
	let double = $derived(count * 2);
	let quad = $derived(double * 2);
</script>

<p>Count: {count} | Double: {double} | Quad: {quad}</p>
```

---

## 3. Side Effects with $effect

The `$effect()` rune handles side effects and synchronization with external systems. It tracks reactive reads automatically and runs after the DOM updates:

```svelte
<script>
	let query = $state('');

	$effect(() => {
		console.log('Search query updated:', query);

		// Optional teardown function runs before effect re-executes
		return () => {
			console.log('Cleaning up previous search...');
		};
	});
</script>
```

---

## 4. Shared Universal State (.svelte.ts)

Runes aren't restricted to Svelte components. You can declare reactive state in standard `.svelte.ts` files and share it across your application:

```typescript
// src/lib/stores/cart.svelte.ts
export class CartStore {
	items = $state<string[]>([]);
	totalCount = $derived(this.items.length);

	addItem(item: string) {
		this.items.push(item); // Deep reactivity updates all subscribers
	}
}

export const cart = new CartStore();
```

---

## Key Core Advantages

1. **Universal Usage:** Runes work seamlessly inside `.svelte` components and `.svelte.ts` modules.
2. **No Dependency Arrays:** Unlike React's `useEffect` or `useMemo`, `$effect` and `$derived` track read properties automatically.
3. **Deep Mutation Tracking:** Object property updates (`user.name = 'Alex'`) and array mutations (`items.push()`) trigger surgical DOM patches natively.
