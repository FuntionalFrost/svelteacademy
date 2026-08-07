---
title: 'Mastering Svelte 5 Runes: $state & $derived'
description: 'Learn how Svelte 5 replaces traditional store contracts and reactive declarations with fine-grained compiler runes.'
category: 'Reactivity'
readTime: '4 min read'
---

<script>
  import RuneVisualizer from '$lib/components/RuneVisualizer.svelte';
  import CodeComparison from '$lib/components/CodeComparison.svelte';
</script>

## Introduction

Svelte 5 introduces **Runes**—compiler-driven primitives that bring explicit, fine-grained reactivity to standard JavaScript objects and variables.

### React 19 vs Svelte 5 Comparison

Notice how Svelte 5 eliminates hooks, dependency arrays, and updater callbacks in favor of direct mutation:

<CodeComparison
title="State & Derived Calculations"
description="Comparing React 19 useState/useMemo hooks with Svelte 5 $state and $derived runes."
competingName="React 19"
competingCode={`import { useState, useMemo } from 'react';

export function Counter() {
const [count, setCount] = useState(0);
const double = useMemo(() => count * 2, [count]);

return (
<button onClick={() => setCount(c => c + 1)}>
Count: {count} (Double: {double})
</button>
);
}`}
  svelteCode={`<script lang="ts">
let count = $state(0);
  let double = $derived(count * 2);
</script>

<button onclick={() => count++}>
Count: {count} (Double: {double})
</button>`}
/>

---

## Interactive Rune Inspector

Test how `$state` mutations trigger instant derived calculations and `$effect` tracking in real-time below:

<RuneVisualizer />
