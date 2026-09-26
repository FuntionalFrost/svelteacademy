---
title: Reactive App State ($app/state)
description: Access reactive router signals like page, navigating, and updated with modern Svelte 5 runes.
trackId: basic-sveltekit
level: beginner
readTime: 4 min read
---

# Reactive App State (`$app/state`)

In SvelteKit 2.12+ and Svelte 5, the legacy `$app/stores` module (`$page`, `$navigating`) is replaced by **Runes-powered state signals** from `$app/state`.

---

## 1. Inspecting Current Route (`page`)

`page` is a reactive signal containing URL details, route parameters, loaded data, and error status:

```svelte
<!-- src/lib/components/ActiveLink.svelte -->
<script lang="ts">
	import { page } from '$app/state';

	let { href, label }: { href: string; label: string } = $props();

	// Fine-grained derived reactivity without $ sign prefix!
	let isActive = $derived(page.url.pathname === href);
</script>

<a {href} class:active={isActive}>
	{label}
</a>
```

---

## 2. Navigation Progress (`navigating`)

Display global loading spinners or top progress bars when page transitions are in flight:

```svelte
<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import { navigating } from '$app/state';

	let { children } = $props();
</script>

{#if navigating.to}
	<div class="fixed top-0 left-0 h-1 w-full animate-pulse bg-primary"></div>
{/if}

{@render children()}
```

---

## 3. Detecting Deployed App Updates (`updated`)

```svelte
<script lang="ts">
	import { updated } from '$app/state';
</script>

{#if updated.current}
	<aside class="update-banner">
		<span>A new version of the app is available!</span>
		<button onclick={() => location.reload()}>Refresh</button>
	</aside>
{/if}
```
