---
title: Page and Layout Options
description: Configure static prerendering (SSG), SSR, SPA client-only mode, and trailing slashes per route.
trackId: advanced-sveltekit
level: intermediate
readTime: 5 min read
---

# Page and Layout Options

You can export configuration flags from `+page.ts`, `+page.server.ts`, `+layout.ts`, or `+layout.server.ts` to control rendering modes across routes.

---

## 1. Prerendering Static Pages (`prerender`)

Prerendering generates static HTML and JSON files at build time for instant CDN delivery:

```ts
// src/routes/about/+page.ts
export const prerender = true; // Build-time Static Site Generation (SSG)
```

To prerender the entire application statically (e.g. for GitHub Pages, Netlify, or Cloudflare Pages), export `prerender = true` in the root `src/routes/+layout.ts`.

---

## 2. Server-Side Rendering (`ssr`) & Client-Side Rendering (`csr`)

```ts
// src/routes/admin/+page.ts
// Disable SSR to create a pure client-side Single Page App (SPA) dashboard
export const ssr = false;
export const csr = true;
```

---

## 3. URL Trailing Slash Strategy (`trailingSlash`)

Control whether SvelteKit automatically adds, removes, or ignores trailing slashes:

```ts
// src/routes/+layout.ts
export const trailingSlash = 'always'; // '/about/' instead of '/about'
// Options: 'never' | 'always' | 'ignore'
```
