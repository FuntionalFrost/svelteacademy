---
title: 'Managing Side Effects & untrack() in Svelte 5'
description: 'Understand when to use $effect, how to handle teardowns, and how to read signals without creating reactivity dependencies using untrack().'
category: 'Reactivity'
level: 'advanced'
readTime: '6 min read'
---

<script>
  import CodeComparison from '$lib/components/CodeComparison.svelte';

  const reactCode = `import { useState, useEffect } from 'react';

export function Logger() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Count updated to:', count);

    return () => console.log('Cleanup previous effect');
  }, [count]);

  return <button onClick={() => setCount(c => c + 1)}>Increment</button>;
}`;

  const svelteCode = `<${'script'} lang="ts">
  let count = $state(0);

  $effect(() => {
    console.log('Count updated to:', count);

    return () => {
      console.log('Cleanup previous effect');
    };
  });
</${'script'}>

<button onclick={() => count++}>Increment</button>`;
</script>

## Fine-Grained Effect Dependencies

In Svelte 5, `$effect` automatically tracks any reactive state read inside its body during execution.

<CodeComparison
  title="Side Effects & Dependency Tracking"
  description="React 19 explicit dependency arrays vs Svelte 5 auto-tracked $effect dependencies."
  competingName="React 19"
  competingCode={reactCode}
  svelteCode={svelteCode}
/>

### Preventing Unwanted Dependencies with `untrack()`

If you need to read a reactive signal inside an `$effect` without re-running the effect when that specific signal changes, wrap it in `untrack()`:

```ts
import { untrack } from 'svelte';

let count = $state(0);
let totalClicks = $state(0);

$effect(() => {
	// Re-runs whenever 'count' changes, but ignores changes to 'totalClicks'
	console.log('Count:', count);
	console.log(
		'Total clicks snapshot:',
		untrack(() => totalClicks)
	);
});
```
