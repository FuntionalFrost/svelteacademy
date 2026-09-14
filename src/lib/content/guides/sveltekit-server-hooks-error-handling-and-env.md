---
title: 'SvelteKit Server Hooks, Error Handling & Strict Environment Isolation'
description: 'Learn how to intercept requests with hooks.server.ts, enforce authentication policies, manage expected vs unexpected errors, and isolate secrets with $env modules.'
category: 'SvelteKit Architecture'
level: 'advanced'
readTime: '9 min read'
---

SvelteKit provides server-level lifecycle hooks and environment modules to ensure enterprise security, resilient error boundaries, and strict secret boundaries.

---

## 1. Server Lifecycle Hooks (`src/hooks.server.ts`)

Server hooks execute on every request handled by SvelteKit:

```typescript
// src/hooks.server.ts
import type { Handle, HandleServerError, HandleFetch } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

export const handle: Handle = async ({ event, resolve }) => {
	// 1. Session Verification & Context Injection
	const sessionId = event.cookies.get('session_id');
	if (sessionId) {
		event.locals.user = { id: 'usr_88', role: 'admin' };
	}

	// 2. Resolve Request & Inject Security Headers
	const response = await resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%app.theme%', 'dark')
	});

	response.headers.set('X-Frame-Options', 'DENY');
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

	return response;
};

// Handle Inter-Server Fetches (Optimizes internal routing)
export const handleFetch: HandleFetch = async ({ event, request, fetch }) => {
	if (request.url.startsWith('https://api.internal/')) {
		request.headers.set('Authorization', `Bearer internal-token`);
	}
	return fetch(request);
};

// Global Error Catching Hook (Logs server exceptions)
export const handleError: HandleServerError = ({ error, event, status, message }) => {
	const errorId = crypto.randomUUID();
	console.error(`[Error ${errorId}] at ${event.url.pathname}:`, error);

	return {
		message: 'An internal server error occurred.',
		errorId
	};
};
```

---

## 2. Expected vs Unexpected Errors

SvelteKit differentiates between **expected** operational failures (e.g. invalid form submissions, 404s, unauthorized access) and **unexpected** runtime exceptions:

### Expected Errors (`error()` & `fail()`)

```typescript
import { error, fail } from '@sveltejs/kit';

// 1. In load functions: throws an HTTP response with custom status
export const load = async ({ locals }) => {
	if (!locals.user) {
		error(401, { message: 'Authentication required' });
	}
};

// 2. In Form Actions: returns structured failure data without throwing
export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const email = data.get('email');

		if (!email) {
			return fail(400, { email, missing: true, error: 'Email is required' });
		}
	}
};
```

### Custom `+error.svelte` Views

When an error is thrown, SvelteKit walks up the route tree to find the nearest `+error.svelte` view:

```svelte
<!-- src/routes/+error.svelte -->
<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="error-container">
	<h1>{page.status}: {page.error?.message}</h1>
	<p>Please check the URL or return to the homepage.</p>
</div>
```

---

## 3. Strict Environment Variable Isolation

SvelteKit provides four specialized `$env` import paths to prevent accidental leaks of private tokens into client-side bundles:

```
$env/
├── static/
│   ├── private  <- Compile-time replaced secrets (Server Only)
│   └── public   <- Compile-time replaced safe constants (Server & Client)
└── dynamic/
    ├── private  <- Runtime dynamic secrets (Server Only, e.g., Docker env)
    └── public   <- Runtime dynamic safe variables (Server & Client)
```

### Private Secrets (Server-Only)

Attempting to import from `$env/static/private` or `$env/dynamic/private` inside client-side components (`+page.svelte`) triggers a **compile-time build error**:

```typescript
// src/lib/server/database.ts (Safe server file)
import { DATABASE_URL, STRIPE_SECRET_KEY } from '$env/static/private';
import postgres from 'postgres';

export const sql = postgres(DATABASE_URL);
```

### Public Constants

Public variables must be prefixed with `PUBLIC_` (configurable in `svelte.config.js`):

```svelte
<!-- src/routes/+page.svelte (Safe client component) -->
<script lang="ts">
	import { PUBLIC_APP_URL } from '$env/static/public';
</script>

<a href={PUBLIC_APP_URL}>Visit Portal</a>
```
