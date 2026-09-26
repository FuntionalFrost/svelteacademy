---
title: Loading Data
description: Universal load (+page.ts) vs server load (+page.server.ts), type-safe PageData, and parent data.
trackId: basic-sveltekit
level: intermediate
readTime: 7 min read
---

# Loading Data in SvelteKit

Every `+page.svelte` can have a companion `+page.ts` (universal load) or `+page.server.ts` (server-only load) that provides data to the page before it renders.

---

## 1. Server Load (`+page.server.ts`)

Use server load functions when querying databases, accessing private API keys, or inspecting HTTP cookies:

```ts
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ cookies }) => {
	const sessionId = cookies.get('session_id');
	const user = await db.findUserBySession(sessionId);

	return {
		user,
		serverTimestamp: Date.now()
	};
};
```

---

## 2. Universal Load (`+page.ts`)

Universal load functions run on the server during SSR and in the browser during client-side navigation. Ideal for fetching public APIs or importing local modules:

```ts
// src/routes/posts/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	// SvelteKit's fetch inherits credentials and handles internal SSR routing!
	const response = await fetch('/api/posts');
	const posts = await response.json();

	return { posts };
};
```

---

## 3. Consuming Data in `+page.svelte`

In Svelte 5, receive loaded data directly from `$props()` typed with `PageData`:

```svelte
<!-- src/routes/posts/+page.svelte -->
<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<h1>Posts ({data.posts.length})</h1>
<ul>
	{#each data.posts as post}
		<li>{post.title}</li>
	{/each}
</ul>
```
