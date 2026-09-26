---
title: Reusing Content with Snippets
description: First-class reusable template blocks with snippets and render tags, replacing legacy slots.
trackId: advanced-svelte
level: intermediate
readTime: 5 min read
---

# Reusing Content with Snippets

Svelte 5 introduces **Snippets** (`{#snippet ...}`) and **Render Tags** (`{@render ...}`) as a first-class replacement for legacy `<slot>` elements. Snippets allow you to declare parameterized markup blocks anywhere and pass them across components.

---

## 1. Declaring and Rendering Snippets

```svelte
<script lang="ts">
	let users = $state([
		{ id: '1', name: 'Sara Connor', role: 'Commander' },
		{ id: '2', name: 'John Doe', role: 'Engineer' }
	]);
</script>

<!-- Snippet declaration with parameters -->
{#snippet userBadge(name: string, role: string)}
	<div class="badge">
		<strong>{name}</strong>
		<span class="text-xs text-muted-foreground">({role})</span>
	</div>
{/snippet}

<!-- Rendering the snippet in multiple places -->
<section>
	<h2>Staff List</h2>
	{#each users as user (user.id)}
		{@render userBadge(user.name, user.role)}
	{/each}
</section>
```

---

## 2. Passing Snippets as Component Props

Snippets can be passed as regular props or as child body blocks:

```svelte
<!-- Generic Table.svelte -->
<script lang="ts" generics="T">
	import type { Snippet } from 'svelte';

	interface Props {
		items: T[];
		header?: Snippet;
		row: Snippet<[T, number]>;
	}

	let { items, header, row }: Props = $props();
</script>

<table>
	{#if header}
		<thead>{@render header()}</thead>
	{/if}
	<tbody>
		{#each items as item, i}
			{@render row(item, i)}
		{/each}
	</tbody>
</table>
```
