---
title: Classes and Style Directives
description: Managing dynamic CSS classes, inline styling directives, scoped CSS, and global overrides.
trackId: basic-svelte
level: beginner
readTime: 4 min read
---

# Classes and Style Directives

Svelte provides intuitive syntax for conditionally toggling CSS classes and applying dynamic inline styles without messy template string concatenation.

---

## 1. Class Shorthand and Directives

```svelte
<script lang="ts">
	let isActive = $state(false);
	let isError = $state(false);
	let theme = $state<'dark' | 'light'>('dark');
</script>

<!-- 1. class:name directive -->
<button class="btn" class:active={isActive} class:danger={isError}> Toggle Status </button>

<!-- 2. Object class syntax -->
<div class={{ active: isActive, error: isError, 'theme-dark': theme === 'dark' }}>Status Panel</div>
```

---

## 2. Style Directives (`style:property`)

Apply dynamic inline CSS styles directly to elements:

```svelte
<script lang="ts">
	let hue = $state(210);
	let size = $state(24);
</script>

<div
	style:background-color="hsl({hue}, 80%, 50%)"
	style:font-size="{size}px"
	style:padding="1rem"
	style:border-radius="8px"
>
	Dynamic Box
</div>
```

---

## 3. Scoped Styles and `:global()`

By default, all styles inside `<style>` blocks are **strictly scoped** to the current component. Svelte generates unique hash class selectors to eliminate style collisions.

To style child elements or targeted global selectors, use the `:global()` modifier:

```svelte
<style>
	/* Scoped to this component only */
	h1 {
		font-weight: 800;
	}

	/* Targets all .highlight elements inside child components */
	:global(.highlight) {
		background-color: var(--primary);
	}
</style>
```
