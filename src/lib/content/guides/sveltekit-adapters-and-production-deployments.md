---
title: 'SvelteKit Adapters & Production Deployment: Static, Cloudflare, Node & Vercel'
description: 'Select, configure, and optimize SvelteKit adapters for static CDN hosting, Cloudflare edge workers, Node.js Docker containers, and serverless platforms.'
category: 'Deployment & Tooling'
level: 'intermediate'
readTime: '8 min read'
---

SvelteKit uses **adapters** to transform your compiled application into optimized server bundles for your target deployment platform.

---

## 1. Adapter Comparison Matrix

| Deployment Target               | Adapter Package                | Runtime Environment             | Best Suited For                                      |
| :------------------------------ | :----------------------------- | :------------------------------ | :--------------------------------------------------- |
| **Static CDN / Jamstack**       | `@sveltejs/adapter-static`     | Zero-runtime static HTML/CSS/JS | Documentation, marketing sites, pure client apps     |
| **Cloudflare Pages / Workers**  | `@sveltejs/adapter-cloudflare` | V8 Isolates (0ms cold start)    | Global low-latency APIs, edge-rendered portals       |
| **Node.js Containers (Docker)** | `@sveltejs/adapter-node`       | Stateful Node.js 20+ runtime    | Self-hosted enterprise apps, WebSocket servers       |
| **Vercel Serverless / Edge**    | `@sveltejs/adapter-vercel`     | AWS Lambda / Vercel Edge        | Automated branch previews, hybrid static/server apps |
| **Netlify Edge**                | `@sveltejs/adapter-netlify`    | Deno / AWS Lambda               | Netlify integrated ecosystems                        |

---

## 2. Dynamic Multi-Target Adapter Switching

You can configure `svelte.config.js` to dynamically select the adapter based on an environment variable, allowing the same codebase to deploy as a static site or a full-stack container:

```javascript
// svelte.config.js
import adapterStatic from '@sveltejs/adapter-static';
import adapterCloudflare from '@sveltejs/adapter-cloudflare';
import adapterNode from '@sveltejs/adapter-node';
import adapterVercel from '@sveltejs/adapter-vercel';

function getAdapter() {
	const target = process.env.DEPLOY_TARGET || 'static';

	switch (target) {
		case 'cloudflare':
			return adapterCloudflare({
				routes: { include: ['/*'], exclude: ['<all>'] }
			});
		case 'node':
			return adapterNode({ out: 'build' });
		case 'vercel':
			return adapterVercel({ runtime: 'nodejs22.x' });
		case 'static':
		default:
			return adapterStatic({
				pages: 'build',
				assets: 'build',
				fallback: '404.html',
				precompress: true
			});
	}
}

/** @type {import('@sveltejs/kit').Config} */
export default {
	kit: {
		adapter: getAdapter()
	}
};
```

---

## 3. Containerized Deployment (`adapter-node` & Docker)

When deploying to platforms like AWS ECS, Render, or Railway, use a multi-stage Dockerfile:

```dockerfile
# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
ENV DEPLOY_TARGET=node
RUN pnpm run build

# Stage 2: Production Runner
FROM node:22-alpine AS runner
WORKDIR /app
COPY --from=builder /app/package.json ./
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
ENV NODE_ENV=production
ENV PORT=3000
CMD ["node", "build/index.js"]
```

---

## 4. Edge CDN Hosting (`adapter-static`)

For zero-cost hosting on GitHub Pages, Cloudflare Pages, or Netlify, ensure `prerender = true` is declared in root layout `+layout.ts`:

```typescript
// src/routes/+layout.ts
export const prerender = true;
export const trailingSlash = 'never';
```

All HTML, CSS, JavaScript, and asset bundles are generated into `/build` ready for instant edge CDN distribution.
