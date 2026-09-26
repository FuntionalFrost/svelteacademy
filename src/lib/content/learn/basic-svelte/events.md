---
title: Modern Event Handling
description: Handling user interactions with standard HTML attributes (onclick, onkeydown) and custom callbacks.
trackId: basic-svelte
level: beginner
readTime: 5 min read
---

# Modern Event Handling in Svelte 5

Svelte 5 simplifies event handling by removing the legacy `on:click` directive in favor of **standard lowercase DOM properties** like `onclick`, `onkeydown`, `onpointermove`, and callback props.

---

## 1. Native DOM Events

Event handlers can be assigned directly to functions or written inline:

```svelte
<script lang="ts">
	let count = $state(0);
	let lastKey = $state('');

	function handleClick(event: MouseEvent) {
		console.log('Mouse coordinates:', event.clientX, event.clientY);
		count += 1;
	}
</script>

<button onclick={handleClick}>
	Clicked {count} times
</button>

<input
	type="text"
	placeholder="Type something..."
	onkeydown={(e) => {
		lastKey = e.key;
	}}
/>

<p>Last pressed key: <kbd>{lastKey}</kbd></p>
```

---

## 2. Replacing Event Modifiers

In Svelte 5, replace legacy modifiers like `|preventDefault` and `|stopPropagation` with explicit JavaScript inside the handler:

```svelte
<script lang="ts">
	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		console.log('Form submission intercepted!');
	}
</script>

<form onsubmit={handleSubmit}>
	<button type="submit">Submit Form</button>
</form>
```

---

## 3. Custom Component Events (Callback Props)

In Svelte 5, child components communicate with parents by taking standard callback function props instead of using `createEventDispatcher()`:

```svelte
<!-- Child Component: Stepper.svelte -->
<script lang="ts">
	interface Props {
		value: number;
		onchange: (newValue: number) => void;
	}

	let { value, onchange }: Props = $props();
</script>

<button onclick={() => onchange(value - 1)}>-</button>
<span>{value}</span>
<button onclick={() => onchange(value + 1)}>+</button>
```
