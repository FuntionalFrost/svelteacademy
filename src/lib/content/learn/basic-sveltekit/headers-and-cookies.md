---
title: Headers and Cookies
description: Setting HTTP response headers and securely reading and mutating browser cookies with cookies.set().
trackId: basic-sveltekit
level: intermediate
readTime: 5 min read
---

# Headers and Cookies

SvelteKit provides safe, built-in helpers in server load functions, form actions, and API routes to inspect request headers, set HTTP response headers, and manage cookies.

---

## 1. Managing Cookies (`cookies`)

The `cookies` object provides secure defaults (e.g., `httpOnly: true`, `sameSite: 'lax'`, `path: '/'`):

```ts
// src/routes/login/+page.server.ts
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		const username = data.get('username') as string;

		// Set secure session cookie
		cookies.set('session_token', 'jwt_secret_token_123', {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 * 7 // 1 week
		});

		return { success: true };
	}
};
```

---

## 2. Setting HTTP Response Headers (`setHeaders`)

Customize caching strategies, content types, or security headers:

```ts
// src/routes/cached-data/+page.server.ts
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ setHeaders }) => {
	setHeaders({
		'cache-control': 'public, max-age=3600, s-maxage=86400',
		'x-custom-source': 'svelteacademy'
	});

	return {
		timestamp: new Date().toISOString()
	};
};
```
