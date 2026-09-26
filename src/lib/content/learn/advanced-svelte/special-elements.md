---
title: Special Elements and Error Boundaries
description: Interact with the browser window, document, head, and catch rendering errors with svelte:boundary.
trackId: advanced-svelte
level: intermediate
readTime: 6 min read
---

# Special Elements and Error Boundaries

Svelte provides built-in `<svelte:...>` elements to interact with global browser APIs, inject document metadata, and handle component runtime errors gracefully.

---

## 1. Global Window & Document Listeners

Listen to window events and bind to viewport properties without manual `addEventListener` lifecycle management:

```svelte
<script lang="ts">
	let innerWidth = $state(0);
	let scrollY = $state(0);
	let online = $state(true);

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			console.log('Escape pressed globally!');
		}
	}
</script>

<svelte:window bind:innerWidth bind:scrollY bind:online onkeydown={handleKeydown} />

<p>Viewport width: {innerWidth}px | Scroll: {scrollY}px | Online: {online}</p>
```

---

## 2. Dynamic Head Tags (`<svelte:head>`)

Inject SEO titles, meta tags, and favicon icons directly from any component:

```svelte
<script lang="ts">
	let articleTitle = $state('Understanding Svelte 5 Runes');
</script>

<svelte:head>
	<title>{articleTitle} — SvelteAcademy</title>
	<meta name="description" content="Learn fine-grained reactivity in Svelte 5." />
</svelte:head>
```

---

## 3. Component Error Boundaries (`<svelte:boundary>`)

Catch unexpected runtime rendering errors in subtrees and render a resilient fallback UI instead of crashing the entire application:

```svelte
<script lang="ts">
	import FlakyWidget from './FlakyWidget.svelte';
</script>

<svelte:boundary>
	{#snippet failed(error, reset)}
		<div class="error-panel">
			<p>Failed to load widget: {error.message}</p>
			<button onclick={reset}>Try Again</button>
		</div>
	{/snippet}

	<FlakyWidget />
</svelte:boundary>
```
