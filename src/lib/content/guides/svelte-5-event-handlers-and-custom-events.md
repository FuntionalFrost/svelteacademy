---
title: 'Event Handling in Svelte 5: From on:click to onclick'
description: "Learn Svelte 5's modern event handling model. Replace createEventDispatcher with callback props, handle DOM events, and support modifier keys."
category: 'Svelte 5'
readTime: '5 min read'
---

<script>
  import CodeComparison from '$lib/components/CodeComparison.svelte';

  const reactEventCode = `export function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}`;

  const svelteEventCode = `<` + `script>
  let { onclick, children } = $props();
</` + `script>

<button {onclick}>
  {@render children()}
</button>`;
</script>

Svelte 5 replaces framework-specific directives like `on:click` with standard HTML event properties (`onclick`, `onkeydown`, `oninput`). Custom component events are now passed as standard function props, eliminating complex event dispatchers.

---

## 1. Standard Native DOM Events

Events in Svelte 5 match native DOM element attributes directly:

```svelte
<script>
	let count = $state(0);

	function handleClick(event: MouseEvent) {
		console.log('Clicked element at:', event.clientX, event.clientY);
		count++;
	}
</script>

<button onclick={handleClick}>
	Clicked {count} times
</button>

<input oninput={(e) => console.log(e.currentTarget.value)} />
```

---

## 2. Component Callbacks vs Event Dispatchers

To send events from a child component to a parent, declare a function property inside `$props()`. Callbacks act as typed, explicit event listeners:

**Consuming the Custom Event in a Parent:**

```svelte
<!-- Parent.svelte -->
<script>
  import CustomButton from './CustomButton.svelte';
</script>

<CustomButton onclick="{()"> console.log('Button clicked in parent!')}>
  Save Changes
</CustomButton>

```

---

## Key Core Advantages

1. **Native Web Standards:** Uses familiar HTML attribute names (`onclick`, `onkeydown`, `onsubmit`).
2. **Type-Safe Payloads:** Callback props accept typed parameters directly without event wrapping objects.
3. **Zero Boilerplate:** Removes the need for component-level event dispatching tools.
