---
title: Attachments and Actions
description: Encapsulating custom DOM behaviors, event listeners, and third-party integrations with actions.
trackId: basic-svelte
level: intermediate
readTime: 6 min read
---

# Attachments and Actions

Actions (`use:action`) are element-level functions that provide lifecycle hooks when a DOM element is mounted, updated, or destroyed. They are the idiomatic way to integrate third-party libraries (e.g., tooltips, canvas, focus traps) and DOM measurements.

---

## 1. Writing a Reusable Action

An action is simply a JavaScript function that receives the DOM node as its first argument:

```ts
// src/lib/actions/clickOutside.ts
import type { Action } from 'svelte/action';

export const clickOutside: Action<HTMLElement, () => void> = (node, onOutsideClick) => {
	function handleClick(event: MouseEvent) {
		if (node && !node.contains(event.target as Node)) {
			onOutsideClick?.();
		}
	}

	document.addEventListener('click', handleClick, true);

	return {
		// Called when the passed parameter changes
		update(newCallback) {
			onOutsideClick = newCallback;
		},
		// Called when the element is unmounted from the DOM
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
};
```

---

## 2. Applying Actions in Markup (`use:`)

```svelte
<script lang="ts">
	import { clickOutside } from '$lib/actions/clickOutside';

	let isOpen = $state(false);
</script>

<button onclick={() => (isOpen = true)}>Open Dropdown</button>

{#if isOpen}
	<div class="dropdown-panel" use:clickOutside={() => (isOpen = false)}>
		<p>Click anywhere outside this box to dismiss it.</p>
	</div>
{/if}
```

> [!TIP]
> Actions keep component markup clean by encapsulating imperative DOM logic into reusable, testable functions.
