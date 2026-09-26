---
title: Introduction to Svelte 5
description: Discover Svelte's revolutionary compiler architecture, fine-grained reactivity, and component anatomy.
trackId: basic-svelte
level: beginner
readTime: 4 min read
---

# Introduction to Svelte 5

Svelte is a radical new approach to building user interfaces. Whereas traditional frameworks like React and Vue do the bulk of their work in the browser using a **Virtual DOM**, Svelte shifts that work into a **compile step** that happens when you build your app.

Instead of interpreting your application code at runtime, Svelte compiles your components into small, framework-free vanilla JavaScript that surgically updates the DOM when state changes.

---

## The Anatomy of a Svelte Component

A Svelte component is written in a `.svelte` file using superset HTML syntax. It consists of three primary sections:

```svelte
<script lang="ts">
	// 1. JavaScript / TypeScript logic & reactive state
	let name = $state('World');
</script>

<!-- 2. HTML Markup with Svelte Template Expressions -->
<main class="card">
	<h1>Hello, {name}!</h1>
	<input bind:value={name} placeholder="Enter your name" />
</main>

<style>
	/* 3. Component-scoped CSS styles */
	.card {
		padding: 1.5rem;
		border-radius: 1rem;
		background: var(--card);
	}
	h1 {
		color: var(--primary);
	}
</style>
```

---

## Why Svelte 5 Runes?

In Svelte 5, reactivity is declared explicitly through universal primitives called **Runes**. Runes start with a dollar sign (`$`) and work identically inside `.svelte` components as well as standalone `.svelte.ts` utility files:

- **`$state()`**: Declares reactive state signals.
- **`$derived()`**: Computes values derived from reactive state.
- **`$effect()`**: Runs side effects when dependencies update.
- **`$props()`**: Declares component input parameters with TypeScript support.

> [!TIP]
> Runes eliminate the distinction between component reactivity and global store reactivity. Everything uses the same universal fine-grained signal system.
