---
title: Link Options and Preloading Strategies
description: Boost navigation speed with data-sveltekit-preload-data, preload-code, reload, and noscroll.
trackId: advanced-sveltekit
level: intermediate
readTime: 5 min read
---

# Link Options and Preloading Strategies

SvelteKit provides HTML data attributes to control navigation performance, prefetching, and scroll restoration.

---

## 1. Instant Data Preloading (`data-sveltekit-preload-data`)

Preload route code and execute `load()` functions the moment a user hovers (`hover`) or taps (`tap`) an anchor tag:

```svelte
<!-- Preload on hover -->
<a href="/guides" data-sveltekit-preload-data="hover"> Guides (Preloads on hover) </a>

<!-- Preload on tap/touch -->
<a href="/pricing" data-sveltekit-preload-data="tap"> Pricing </a>
```

You can also place `data-sveltekit-preload-data="hover"` on parent containers (like `<body>` or `<nav>`) to apply it universally.

---

## 2. Code-Only Preloading (`data-sveltekit-preload-code`)

Preload the JavaScript chunk for the target route without executing its `load()` function:

```svelte
<a href="/dashboard" data-sveltekit-preload-code="hover"> Dashboard Code Preloaded </a>
```

---

## 3. Disabling Client-Side Navigation (`data-sveltekit-reload`)

Force a full browser reload when navigating to a specific link:

```svelte
<a href="/logout" data-sveltekit-reload> Log Out (Full reload) </a>
```

---

## 4. Preserving Scroll Position (`data-sveltekit-noscroll`)

Prevent SvelteKit from scrolling to the top of the page upon navigation (useful for tab switchers or pagination):

```svelte
<a href="?page=2" data-sveltekit-noscroll> Next Page </a>
```

---

## 5. Type-Safe Routing with `resolve()` (`$app/paths`)

In modern SvelteKit, hardcoding string URLs like `href="/guides"` can break when deploying under a base path or during site refactors. Use the `resolve()` helper from `$app/paths` to generate canonical, base-aware route URLs:

```svelte
<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<!-- Automatically prepends base paths and verifies route paths -->
<a href={resolve('guides')} data-sveltekit-preload-data="hover"> Guides </a>

<a href={resolve('learn/[track]/[slug]', { track: 'basic-svelte', slug: 'props' })}>
	Lesson: Props
</a>
```
