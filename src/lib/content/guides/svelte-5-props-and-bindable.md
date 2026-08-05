---
title: "Mastering $props and $bindable in Svelte 5"
description: "Learn component communication with $props(), default values, rest property collection, and two-way state binding using $bindable()."
category: "Svelte 5"
readTime: "5 min read"
---

Svelte 5 replaces top-level variable exports with the explicit `$props()` rune. Component inputs are now standard JavaScript objects, making destructuring, TypeScript interface typing, and fallback defaults seamless.

---

## 1. Component Props with $props()

To receive properties from a parent component, declare a destructured object with `$props()`:

```svelte
<script lang="ts">
  interface Props {
    title: string;
    variant?: 'primary' | 'secondary';
    isDisabled?: boolean;
  }

  // Destructure props with TypeScript types and fallback default values
  let { title, variant = 'primary', isDisabled = false }: Props = $props();
</script>

<button class="btn-{variant}" disabled={isDisabled}>
  {title}
</button>

```

---

## 2. Collecting Rest Properties

Use rest parameters (`...restProps`) inside `$props()` to forward extra HTML attributes (like `aria-label`, `data-testid`, or custom classes) directly to an element:

```svelte
<script>
  let { label, ...restProps } = $props();
</script>

<label>
  {label}
  <input {...restProps} />
</label>

```

---

## 3. Two-Way State Binding with $bindable()

By default, props in Svelte 5 flow one-way from parent to child. If a component explicitly needs to update a parent's state signal, mark that prop with `$bindable()`:

```svelte
<!-- CustomInput.svelte -->
<script>
  // Mark value as two-way bindable with a default fallback
  let { value = $bindable('') } =$props();
</script>

<input bind:value={value} />

```

**Parent Usage:**

```svelte
<script>
  import CustomInput from './CustomInput.svelte';

  let search = $state('Svelte 5 Runes');
</script>

<!-- Two-way binding syncs changes between parent and child -->
<CustomInput bind:value="{search}"/>

<p>Current search signal: {search}</p>

```

---

## Key Core Advantages

1. **JavaScript Native:** Props behave like standard object arguments rather than magic compiler syntax.
2. **Explicit Two-Way Data Flow:** Component authors must explicitly allow `$bindable()` on props, preventing accidental state mutations.
3. **Seamless TypeScript:** Props integrate directly with TypeScript interfaces.
