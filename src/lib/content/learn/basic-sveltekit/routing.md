---
title: File-Based Routing
description: Directory conventions (+page.svelte, +layout.svelte, +error.svelte) and dynamic parameters.
trackId: basic-sveltekit
level: beginner
readTime: 5 min read
---

# File-Based Routing in SvelteKit

In SvelteKit, your application's routes are determined by the directory structure inside `src/routes/`.

---

## 1. Route File Conventions

| File                               | Purpose                                                 |
| :--------------------------------- | :------------------------------------------------------ |
| `+page.svelte`                     | The UI component for the route.                         |
| `+page.ts` / `+page.server.ts`     | Data loading logic and server actions.                  |
| `+layout.svelte`                   | Wraps all child routes in a shared persistent layout.   |
| `+layout.ts` / `+layout.server.ts` | Loads shared data for layouts and all descendant pages. |
| `+error.svelte`                    | Custom error fallback UI rendered when an error occurs. |
| `+server.ts`                       | Standalone API endpoint (e.g. `GET`, `POST`, `DELETE`). |

---

## 2. Dynamic Route Parameters (`[slug]`)

To capture variable segments in a URL, wrap the folder name in brackets:

```
src/routes/guides/[slug]/+page.svelte
```

Inside your page component or load function, access the parameter:

```ts
// src/routes/guides/[slug]/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	console.log('User navigated to guide slug:', params.slug);
	return {
		slug: params.slug
	};
};
```

---

## 3. Persistent Layouts (`+layout.svelte`)

Layouts wrap all nested pages. They don't re-mount during navigation, preserving scroll positions, audio playback, and UI state:

```svelte
<!-- src/routes/+layout.svelte -->
<script lang="ts">
	let { children } = $props();
</script>

<header>
	<nav><a href="/">Home</a> | <a href="/guides">Guides</a></nav>
</header>

<main>
	{@render children()}
</main>
```
