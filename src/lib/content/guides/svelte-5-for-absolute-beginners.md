---
title: 'Svelte 5 for Absolute Beginners: From Zero to First App'
description: 'A complete introductory guide to building your first Svelte 5 application. Learn template markup, $state reactivity, event handling, and conditional loops.'
category: 'Beginner'
readTime: '7 min read'
---

If you know basic HTML, CSS, and JavaScript, you already know 80% of Svelte 5. Svelte compiles standard web code into lean, high-performance JavaScript without complex framework abstractions.

---

## 1. Anatomy of a Svelte Component

A Svelte component lives inside a `.svelte` file and combines logic (`<script>`), markup (`HTML`), and scoped styles (`<style>`):

```svelte
<script>
	let name = $state('Developer');
</script>

<div class="card">
	<h1>Hello, {name}!</h1>
	<input bind:value={name} placeholder="Enter your name" />
</div>

<style>
	.card {
		padding: 1.5rem;
		border-radius: 0.75rem;
		border: 1px solid var(--border);
	}
</style>
```

---

## 2. Dynamic Rendering with if and each Blocks

Svelte templates use expressive logic blocks for control flow:

### Conditional Rendering (if blocks)

```svelte
<script>
	let isLoggedIn = $state(false);
</script>

{#if isLoggedIn}
	<button onclick={() => (isLoggedIn = false)}>Log Out</button>
{:else}
	<button onclick={() => (isLoggedIn = true)}>Log In</button>
{/if}
```

### List Rendering (each blocks)

```svelte
<script>
	let tasks = $state([
		{ id: 1, text: 'Install Svelte 5', done: true },
		{ id: 2, text: 'Learn $state and$derived', done: false }
	]);
</script>

<ul>
	{#each tasks as task (task.id)}
		<li>
			<input type="checkbox" bind:checked={task.done} />
			<span class:completed={task.done}>{task.text}</span>
		</li>
	{/each}
</ul>
```

---

## Key Core Advantages

1. **Zero Virtual DOM:** Svelte compiles directly to native DOM manipulation instructions.
2. **Scoped CSS by Default:** Styles inside a component never accidentally leak into other parts of your app.
3. **Low Conceptual Surface Area:** Write standard HTML and JS instead of framework-specific JSX paradigms.
