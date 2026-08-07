---
title: 'Svelte 5 Snippets and Render: Replaces Slots'
description: 'Master {#snippet} blocks and {@render ...} tags. Learn how Svelte 5 handles component composition, named layouts, and scoped parameters.'
category: 'Svelte 5'
level: 'intermediate'
readTime: '6 min read'
---

<script>
  import CodeComparison from '$lib/components/CodeComparison.svelte';

  const reactChildrenCode = `export function Card({ header, children }) {
  return (
    <div className="card">
      <header>{header}</header>

      <main>{children}</main>
    </div>
  );
}`;

  const svelteSnippetCode = `<` + `script>
  let { header, children } = $props();
</` + `script>

<div class="card">
  <header>{@render header()}</header>
  <main>{@render children()}</main>
</div>`;
</script>

Svelte 5 completely replaces layout slots with **Snippets** (`{#snippet}`) and the **Render** tag (`{@render}`). Snippets are first-class template primitives that can be passed as component props, invoked like functions, and parameterized with typed arguments.

---

## 1. Defining and Rendering Basic Snippets

Snippets allow you to define reusable chunks of markup inside a component template:

```svelte
<script>
	let username = $state('Alex');
</script>

<!-- Declare a snippet named userBadge -->
{#snippet userBadge(name)}
	<div class="badge">
		<span>User:</span>
		<strong>{name}</strong>
	</div>
{/snippet}

<!-- Render the snippet using {@render} -->
{@render userBadge(username)}
```

---

## 2. Passing Snippets as Component Props

Component composition in Svelte 5 relies on passing snippets as standard props:

---

## 3. Implicit Default Children Snippet

When a Svelte 5 component wraps nested HTML or child elements, those elements automatically populate a snippet named `children`:

```svelte
<!-- Modal.svelte -->
<script>
	let { title, children } = $props();
</script>

<div class="modal">
	<h3>{title}</h3>

	<!-- Renders whatever is placed inside <Modal>...</Modal> -->
	{@render children()}
</div>
```

**Usage:**

```svelte
<Modal title="Confirm Delete">
	<p>Are you sure you want to permanently delete this guide?</p>

	<button>Delete</button>
</Modal>
```

---

## Key Core Advantages

1. **First-Class Values:** Snippets can be stored in variables, passed to nested child components, or rendered conditionally.
2. **Type Safety:** Snippets accept typed parameters directly in Svelte template markup.
3. **No Overhead:** Unlike JSX function props, snippets do not create unnecessary DOM wrapper elements.
