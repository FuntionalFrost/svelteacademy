---
title: 'Why Svelte 5 Runes End the React Hook Era'
description: "A detailed breakdown comparing React 19 stateful hooks against Svelte 5's fine-grained reactivity model."
category: 'Framework Comparison'
readTime: '6 min read'
---

<script module>
  import CodeComparison from '$lib/components/CodeComparison.svelte';

  const reactState = `const [user, setUser] = useState({ name: 'Alex', role: 'Dev' });

// Updating nested object requires spread syntax
setUser(prev => ({ ...prev, role: 'Lead' }));`;

  const svelteState = `let user = $state({ name: 'Alex', role: 'Dev' });

// Direct mutation works out of the box
user.role = 'Lead';`;
</script>

React introduced Hooks in 2018 to solve class component state management. While revolutionary at the time, Hooks introduced a massive set of synthetic rules: stale closures, dependency array traps, and infinite re-render cascades.

**Svelte 5 Runes** fix this at the language level rather than relying on runtime virtual-DOM reconciliation.

## 1. Direct State Mutation vs. Immutable Setters

In React, state objects must be treated as immutable. Updating a single property requires shallow spreading or `immer`. In Svelte 5, `$state` turns properties reactive automatically:

<CodeComparison
  title="Mutating Nested State"
  description="React requires immutable copies; Svelte 5 allows natural JS property assignment."
  competingName="React 19"
  competingCode={reactState}
  svelteCode={svelteState}
/>

## 2. Derived Values Without Re-renders

In React, calculated values require `useMemo` with explicit dependency arrays. If you forget a dependency, your UI breaks silently.

In Svelte 5, `$derived` automatically tracks every reactive signal accessed inside its expression:

```typescript
let price = $state(100);
let tax = $state(0.2);

// Automatically updates whenever price OR tax changes
let total = $derived(price * (1 + tax));
```
