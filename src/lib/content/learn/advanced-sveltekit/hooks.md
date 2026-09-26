---
title: Server and Client Hooks
description: Request interception, auth middleware, and error logging with handle, handleFetch, and sequence().
trackId: advanced-sveltekit
level: advanced
readTime: 7 min read
---

# Server and Client Hooks

Hooks are application-wide lifecycle interceptors. They act as middleware to authenticate requests, rewrite responses, handle global exceptions, and attach contextual data to `event.locals`.

---

## 1. The `handle` Hook (`src/hooks.server.ts`)

The `handle` hook intercepts every HTTP request made to the server:

```ts
// src/hooks.server.ts
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const sessionCookie = event.cookies.get('session_id');

	if (sessionCookie) {
		// Populate event.locals for downstream load functions
		event.locals.user = { id: 'usr_123', name: 'Commander' };
	} else {
		event.locals.user = null;
	}

	// Resolve the request into a Response
	const response = await resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%LANG%', 'en')
	});

	return response;
};
```

---

## 2. Composing Middleware with `sequence()`

Chain multiple handle functions together:

```ts
// src/hooks.server.ts
import { sequence } from '@sveltejs/kit/hooks';
import { authMiddleware, loggerMiddleware, corsMiddleware } from '$lib/server/middleware';

export const handle = sequence(loggerMiddleware, corsMiddleware, authMiddleware);
```

---

## 3. Global Error Logging (`handleError`)

Intercept unexpected runtime exceptions in both SSR and client-side code:

```ts
// src/hooks.server.ts
import type { HandleServerError } from '@sveltejs/kit';

export const handleError: HandleServerError = ({ error, event, status, message }) => {
	console.error('Server error on route:', event.url.pathname, error);

	// Return a sanitized message for the user
	return {
		message: 'Something went wrong on our end. Our team has been notified.'
	};
};
```
