---
title: API Endpoints and +server.ts
description: Build REST API endpoints and webhooks using standard HTTP methods in +server.ts.
trackId: basic-sveltekit
level: intermediate
readTime: 5 min read
---

# API Endpoints and `+server.ts`

When you need to build custom REST APIs, webhook receivers, or return non-HTML responses (like generated SVGs, PDFs, or JSON data), create a `+server.ts` file.

---

## 1. Defining HTTP Handlers

Export functions corresponding to standard HTTP verbs (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`):

```ts
// src/routes/api/users/+server.ts
import { json, type RequestHandler } from '@sveltejs/kit';

const users = [
	{ id: '1', name: 'Alice' },
	{ id: '2', name: 'Bob' }
];

export const GET: RequestHandler = async ({ url }) => {
	const limit = Number(url.searchParams.get('limit') || '10');
	return json(users.slice(0, limit));
};

export const POST: RequestHandler = async ({ request }) => {
	const payload = await request.json();

	if (!payload.name) {
		return json({ error: 'Name is required' }, { status: 400 });
	}

	const newUser = { id: String(users.length + 1), name: payload.name };
	users.push(newUser);

	return json(newUser, { status: 201 });
};
```

---

## 2. Returning Custom Responses

You can return raw Web standard `Response` objects:

```ts
// src/routes/api/health/+server.ts
import type { RequestHandler } from './$types';

export const GET: RequestHandler = () => {
	return new Response('OK', {
		headers: { 'content-type': 'text/plain' }
	});
};
```
