---
title: 'SvelteKit 2 Routing Topology: Page Options, Layout Resets & Route Groups'
description: 'Master SvelteKit file-based routing hierarchies, dynamic parameters, catch-all routes, route groups, layout inheritance resets, and per-route page options.'
category: 'SvelteKit Architecture'
level: 'intermediate'
readTime: '8 min read'
---

SvelteKit provides a filesystem-based router where folders inside `src/routes/` define the URL topology of your application. Every page, layout, and API endpoint is declared through reserved filenames (`+page.svelte`, `+layout.svelte`, `+server.ts`, `+error.svelte`).

---

## 1. Page Options (`prerender`, `ssr`, `csr`)

SvelteKit allows granular, per-route control over how pages are compiled, rendered, and hydrated. These options are exported directly from `+page.ts` (or `+page.server.ts`):

```typescript
// src/routes/docs/+page.ts
import type { PageLoad } from './$types';

// 1. Prerender statically at build time (SSG)
export const prerender = true;

// 2. Control Server-Side Rendering (SSR)
export const ssr = true;

// 3. Control Client-Side Hydration (CSR)
export const csr = true;

// 4. URL Trailing Slash Strategy
export const trailingSlash = 'never'; // 'never' | 'always' | 'ignore'

export const load: PageLoad = async ({ fetch, params, parent }) => {
	const parentData = await parent(); // Inherits data from ancestor +layout.ts
	const res = await fetch('/api/metrics');

	return {
		metrics: await res.json(),
		user: parentData.user
	};
};
```

---

## 2. Dynamic Routing Topologies

### Dynamic Parameters (`[slug]`)

Directories wrapped in square brackets capture dynamic URL segments:

```typescript
// src/routes/guides/[slug]/+page.ts
export const load = ({ params }) => {
	return {
		slug: params.slug // e.g., /guides/runes-deep-dive -> params.slug = 'runes-deep-dive'
	};
};
```

### Catch-All Routes (`[...rest]`)

Match multiple path segments:

```
src/routes/docs/[...path]/+page.svelte
// Matches /docs/getting-started, /docs/api/v2/auth, etc.
```

### Route Matchers (`[param=matcher]`)

Constrain parameters to valid types using custom regex matchers in `src/params/`:

```typescript
// src/params/integer.ts
import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (param) => {
	return /^\d+$/.test(param);
};

// Route: src/routes/invoices/[id=integer]/+page.svelte
```

---

## 3. Route Groups & Layout Isolation

Route groups allow grouping routes under a common folder without affecting the public URL structure:

```
src/routes/
├── (marketing)/
│   ├── +layout.svelte      # Marketing layout (hero, promo banner, footer)
│   ├── +page.svelte        # Maps to '/'
│   └── pricing/
│       └── +page.svelte    # Maps to '/pricing'
└── (app)/
    ├── +layout.svelte      # App dashboard layout (sidebar, user menu)
    └── dashboard/
        └── +page.svelte    # Maps to '/dashboard'
```

---

## 4. Layout Resets (`+layout@`)

By default, layouts inherit from all ancestor `+layout.svelte` files. SvelteKit provides the `@` symbol to reset layout inheritance to a specific ancestor or the root layout:

```
src/routes/
├── +layout.svelte                     # Root Layout
├── admin/
│   ├── +layout.svelte                 # Admin Layout
│   └── settings/
│       └── +page@.svelte              # Resets to Root Layout (bypasses Admin Layout)
│       └── +page@(app).svelte         # Targets the (app) group layout
```

---

## 5. Universal Data Inheritance with `parent()`

Child load functions can consume and extend data returned by parent layouts:

```typescript
// src/routes/dashboard/+page.ts
export const load = async ({ parent }) => {
	const { session, organization } = await parent();

	return {
		dashboardTitle: `${organization.name} Overview`,
		userId: session.user.id
	};
};
```
