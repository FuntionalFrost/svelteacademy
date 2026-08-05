---
title: "Data Streaming and Async UI Patterns in SvelteKit"
description: "Leverage non-blocking server loader streaming and await blocks to render instant layouts with deferred promise resolution."
category: "SvelteKit"
readTime: "6 min read"
---

SvelteKit allows server loaders to stream slow backend data asynchronously without blocking initial HTML rendering. Combined with Svelte's `await` blocks, you can ship fast, responsive UI shell layouts instantly.

---

## 1. Streaming Non-Blocking Promises in Loaders

In `+page.server.ts`, return slow data as an un-awaited Promise:

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  // Fast query - awaited immediately
  const user = await fetchUserProfile();

  // Slow query - return promise WITHOUT await to stream to client
  const analyticsPromise = fetchDeepAnalyticsData();

  return {
    user,
    streamed: {
      analytics: analyticsPromise
    }
  };
};

```

---

## 2. Rendering Streamed Promises with await Blocks

In your Svelte 5 component, render the fast data immediately and use `{#await}` blocks to handle the streamed promise states:

```svelte
<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<h1>Welcome back, {data.user.name}</h1>

<!-- Streamed promise handles pending, resolved, and rejected states -->
{#await data.streamed.analytics}
  <div class="skeleton-loader">
    <p>Loading analytics calculations...</p>
  </div>
{:then analytics}
  <div class="stats-grid">
    <div class="card">Total Views: {analytics.views}</div>
    <div class="card">Conversions: {analytics.conversions}</div>
  </div>
{:catch error}
  <div class="error-banner">
    <p>Failed to load analytics: {error.message}</p>
  </div>
{/await}

```

---

## Key Core Advantages

1. **Faster First Contentful Paint (FCP):** Critical UI renders instantly while background queries complete.
2. **Zero Client Libraries:** Built-in streaming powered by native SvelteKit response pipelines and web standards.
3. **Integrated Error Boundaries:** Handle promise rejections gracefully directly inside templates using `{:catch}`.
