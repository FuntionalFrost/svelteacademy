---
title: 'Svelte as an HTML Superset: Zero Synthetic Overhead'
description: 'Why Svelte builds on standard HTML, CSS, and JavaScript rather than inventing proprietary template abstractions like JSX or custom directives.'
category: 'Architecture'
readTime: '6 min read'
---

Many modern frameworks force developers to write HTML inside JavaScript (JSX) or reinvent standard web attributes. Svelte takes the opposite approach: **Svelte is a pure superset of standard HTML**. Any valid HTML file is a valid `.svelte` component.

---

## 1. Standard HTML Attributes vs Synthetic React JSX

Because Svelte compiles directly to native DOM operations, it respects standard web attributes without requiring synthetic abstractions:

```html
<!-- Native HTML in Svelte 5 (Works out of the box) -->
<label for="email">Email Address</label>
<input id="email" class="form-input" autocomplete="email" readonly />

<svg tabindex="0" onclick="{handleClick}">
	<path d="M10 20L20 10" />
</svg>
```

**Compared to React JSX Synthetic Replacements:**

- `class` → forced to use `className`
- `for` → forced to use `htmlFor`
- `onclick` → forced to use `onClick`
- SVG attributes require camelCase translation (`stroke-width` → `strokeWidth`)

---

## 2. Standard CSS Scoping

In Svelte, CSS styles placed inside a `<style>` tag are scoped automatically to the component at compile time. No external CSS-in-JS libraries or build configurations required:

```svelte
<div class="card">
	<h2>Scoped Component Header</h2>
</div>

<style>
	/* This rule ONLY applies to .card elements inside THIS component */
	.card {
		background-color: var(--card);
		border: 1px solid var(--border);
		padding: 1rem;
	}
</style>
```

---

## 3. Native JavaScript Logic Blocks

Instead of wrapping HTML elements inside JavaScript array transformations (`.map()`), Svelte provides clean, readable logic tags built into the HTML template:

```svelte
<script>
	let items = $state(['Svelte 5', 'Tailwind', 'TypeScript']);
</script>

<ul>
	{#each items as item}
		<li>{item}</li>
	{/each}
</ul>
```

---

## Key Core Advantages

1. **Zero Mental Friction:** Copy and paste raw HTML from standard documentation or UI design kits directly into Svelte components.
2. **Built-in Style Isolation:** CSS stays clean and predictable without class name collision bugs.
3. **Low Barrier to Entry:** Designers and junior developers who know basic HTML/CSS can immediately contribute to a Svelte codebase.
