---
title: Two-Way Data Bindings
description: Synchronize form inputs, element references, and component props with bind directives and $bindable().
trackId: basic-svelte
level: beginner
readTime: 5 min read
---

# Two-Way Data Bindings

Data normally flows top-down from parent to child. The `bind:` directive creates a two-way synchronization channel between DOM controls and your reactive state.

---

## 1. Input Bindings

```svelte
<script lang="ts">
	let text = $state('Hello');
	let isAgreed = $state(false);
	let selectedFruit = $state('apple');
	let volume = $state(75);
</script>

<!-- Text Input -->
<input type="text" bind:value={text} />

<!-- Checkbox -->
<label>
	<input type="checkbox" bind:checked={isAgreed} />
	I agree to terms
</label>

<!-- Select Dropdown -->
<select bind:value={selectedFruit}>
	<option value="apple">Apple</option>
	<option value="banana">Banana</option>
	<option value="orange">Orange</option>
</select>

<!-- Range Slider -->
<input type="range" min="0" max="100" bind:value={volume} />
<span>Volume: {volume}%</span>
```

---

## 2. Element Reference (`bind:this`)

To obtain a direct reference to a rendered DOM node, use `bind:this`:

```svelte
<script lang="ts">
	let inputElement = $state<HTMLInputElement | null>(null);

	function focusInput() {
		inputElement?.focus();
	}
</script>

<input bind:this={inputElement} placeholder="Focus me with the button!" />
<button onclick={focusInput}>Focus Input</button>
```

---

## 3. Component Prop Two-Way Bindings with `$bindable()`

To make a prop bindable by a parent component, wrap its default fallback in `$bindable()`:

```svelte
<!-- CustomSlider.svelte -->
<script lang="ts">
	interface Props {
		value?: number;
	}

	let { value = $bindable(0) }: Props = $props();
</script>

<input type="range" min="0" max="100" bind:value />
```

```svelte
<!-- Parent.svelte -->
<script lang="ts">
	import CustomSlider from './CustomSlider.svelte';
	let parentLevel = $state(50);
</script>

<CustomSlider bind:value={parentLevel} /><p>Parent level is: {parentLevel}</p>
```
