---
title: Introduction to SvelteKit
description: Full-stack web application architecture, file conventions, and universal vs server environments.
trackId: basic-sveltekit
level: beginner
readTime: 4 min read
---

# Introduction to SvelteKit

**SvelteKit** is the official full-stack application framework for Svelte. It provides everything needed to build production-grade web applications:

- **File-based Routing**: Folders in `src/routes` define your URL structure.
- **Server-Side Rendering (SSR)**: Instant initial page loads with HTML pre-rendered on the server.
- **Client-Side Hydration & SPA Navigation**: Instant subsequent page transitions without full browser reloads.
- **Type-Safe Data Loading**: Generated `./$types` synchronize server data payloads directly with components.
- **Platform Agnostic Deployments**: Deploy seamlessly to Node.js, Vercel, Cloudflare, Netlify, or static hosting.

---

## Directory Structure Overview

```
my-sveltekit-app/
├── src/
│   ├── lib/                  # Reusable components & shared code ($lib)
│   │   └── server/           # Server-only modules ($lib/server)
│   ├── routes/               # File-based routing tree
│   │   ├── +layout.svelte    # Global shell & persistent layout
│   │   ├── +page.svelte      # Root page (/)
│   │   └── blog/
│   │       ├── +page.svelte  # Blog list page (/blog)
│   │       └── [slug]/
│   │           ├── +page.svelte # Dynamic article view
│   │           └── +page.server.ts # Server-side data loader
│   ├── app.html              # HTML document template
│   └── hooks.server.ts       # Server middleware and session handling
```
