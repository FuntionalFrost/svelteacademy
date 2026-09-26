---
title: Shared Modules and Security Boundaries
description: Organizing reusable components with $lib and preventing sensitive code leaks with $lib/server.
trackId: basic-sveltekit
level: beginner
readTime: 4 min read
---

# Shared Modules and Security Boundaries

SvelteKit includes built-in module aliases and security fences to keep your codebase tidy and prevent sensitive backend logic from leaking into client-side bundles.

---

## 1. The `$lib` Alias

The `$lib` alias maps to `src/lib/`. It lets you import components and utilities from anywhere without complex relative paths (`../../../`):

```svelte
<script lang="ts">
	// Clean import from src/lib/components/Button.svelte
	import Button from '$lib/components/Button.svelte';
	import { formatDate } from '$lib/utils';
</script>
```

---

## 2. Server-Only Security Boundary (`$lib/server`)

Any file placed inside `src/lib/server/` or named with `.server.ts` is strictly prohibited from being imported by client-side code:

```ts
// src/lib/server/database.ts
import { Pool } from 'pg';

export const dbPool = new Pool({
	connectionString: process.env.DATABASE_PRIVATE_URL
});
```

If you accidentally import a server module inside a client component (`+page.svelte` or `+page.ts`), the SvelteKit compiler will fail the build with an immediate security violation:

```
Cannot import $lib/server/database.ts into client code
```

---

## 3. Static Assets in `/static`

Files placed in the `static/` directory (e.g. `favicon.ico`, `robots.txt`, images) are served directly from the root URL (`/favicon.ico`).
