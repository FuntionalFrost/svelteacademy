---
title: Advanced Options: Service Workers, Snapshots, and Security
description: Build offline PWAs with $service-worker, preserve form input with snapshot, and configure CSP.
trackId: advanced-sveltekit
level: advanced
readTime: 6 min read
---

# Advanced Options: Service Workers, Snapshots, and Security

Explore powerful enterprise capabilities for offline support, UI state preservation across back/forward navigation, and Content Security Policy (CSP).

---

## 1. Built-in Service Worker Support (`$service-worker`)

Create `src/service-worker.ts` and SvelteKit will bundle and version it automatically:

```ts
// src/service-worker.ts
/// <reference types="@sveltejs/kit" />
import { build, files, version } from '$service-worker';

const CACHE_NAME = `cache-${version}`;
const ASSETS = [...build, ...files];

self.addEventListener('install', (event: any) => {
	event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});
```

---

## 2. Preserving Form State with `snapshot`

When users navigate away and click "Back", prevent loss of unsaved textarea input or scroll offsets:

```svelte
<!-- src/routes/comments/+page.svelte -->
<script lang="ts">
	import type { Snapshot } from './$types';

	let commentText = $state('');

	export const snapshot: Snapshot<string> = {
		capture: () => commentText,
		restore: (value) => {
			commentText = value;
		}
	};
</script>

<textarea bind:value={commentText} placeholder="Write a draft comment..."></textarea>
```

---

## 3. Content Security Policy (CSP)

Configure strict nonces and CSP directives in `svelte.config.js`:

```js
// svelte.config.js
export default {
	kit: {
		csp: {
			mode: 'auto',
			directives: {
				'script-src': ['self']
			}
		}
	}
};
```
