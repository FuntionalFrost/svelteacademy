---
title: Advanced Data Loading and Streaming
description: Stream slow promises with nested {#await}, track cache dependencies with depends(), and invalidate.
trackId: advanced-sveltekit
level: advanced
readTime: 7 min read
---

# Advanced Data Loading and Streaming

Optimize perceived loading performance by streaming non-critical promises and controlling fine-grained data re-fetching with cache dependency keys.

---

## 1. Streaming Non-Critical Promises

Return un-awaited promises from `+page.server.ts` to allow SvelteKit to immediately deliver initial page HTML, streaming slow data as chunks:

```ts
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		// Fast critical data (awaited)
		user: await fetchUserFast(),

		// Slow non-critical data (streamed!)
		heavyAnalytics: fetchHeavyAnalyticsSlow()
	};
};
```

Render the streamed promise with `{#await}` in `+page.svelte`:

```svelte
<!-- src/routes/dashboard/+page.svelte -->
<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<h1>Welcome, {data.user.name}</h1>

{#await data.heavyAnalytics}
	<p class="animate-pulse">Loading detailed analytics chart...</p>
{:then analytics}
	<AnalyticsChart data={analytics} />
{:catch error}
	<p class="text-destructive">Failed to load analytics: {error.message}</p>
{/await}
```

---

## 2. Granular Cache Invalidation with `depends()` and `invalidate()`

Declare explicit cache dependencies in `load()` functions and invalidate them selectively from client components:

```ts
// src/routes/notifications/+page.ts
export const load = async ({ fetch, depends }) => {
	depends('app:notifications');
	const res = await fetch('/api/notifications');
	return { notifications: await res.json() };
};
```

```svelte
<script lang="ts">
	import { invalidate } from '$app/navigation';

	async function refreshNotifications() {
		// Only re-runs load functions that declared depends('app:notifications')
		await invalidate('app:notifications');
	}
</script>
```
