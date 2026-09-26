---
title: Errors and Redirects
description: Gracefully handle HTTP errors, trigger redirects, and build resilient error pages with +error.svelte.
trackId: basic-sveltekit
level: beginner
readTime: 5 min read
---

# Errors and Redirects

SvelteKit provides explicit helpers to handle expected application errors, unexpected exceptions, and server-side redirects.

---

## 1. Throwing Expected Errors (`error()`)

Use `error()` from `@sveltejs/kit` in load functions or form actions:

```ts
// src/routes/posts/[id]/+page.server.ts
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const post = await fetchPostById(params.id);

	if (!post) {
		// Throws a type-safe 404 response
		error(404, {
			message: `Post #${params.id} could not be found`
		});
	}

	return { post };
};
```

---

## 2. Triggering Redirects (`redirect()`)

Redirect users (e.g., after login or when accessing protected routes):

```ts
// src/routes/admin/+page.server.ts
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		// 303 See Other or 307 Temporary Redirect
		redirect(303, '/login?redirectTo=/admin');
	}

	return { adminData: 'Top Secret' };
};
```

---

## 3. Custom Error Fallback (`+error.svelte`)

When an error is thrown, SvelteKit walks up the route tree to find the nearest `+error.svelte` boundary:

```svelte
<!-- src/routes/+error.svelte -->
<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="error-container">
	<h1>{page.status}</h1>
	<p>{page.error?.message ?? 'An unexpected error occurred'}</p>
	<a href="/">Return Home</a>
</div>
```
