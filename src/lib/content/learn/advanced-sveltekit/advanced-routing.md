---
title: Advanced Routing Patterns
description: Route parameter matchers [id=integer], route groups (app), rest parameters, and optional params.
trackId: advanced-sveltekit
level: advanced
readTime: 6 min read
---

# Advanced Routing Patterns

SvelteKit includes powerful routing primitives to validate parameters, organize layout hierarchies without altering URLs, and handle nested wildcards.

---

## 1. Route Parameter Matchers (`[id=integer]`)

Ensure a dynamic parameter only matches if it satisfies a validation rule (otherwise returning a 404):

```ts
// src/params/integer.ts
import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (param) => {
	return /^\d+$/.test(param);
};
```

Apply the matcher in your directory name:

```
src/routes/items/[id=integer]/+page.svelte
```

---

## 2. Route Groups (`(app)` and `(marketing)`)

Use parentheses to group routes and assign distinct root layouts without affecting the public URL:

```
src/routes/
├── (marketing)/
│   ├── +layout.svelte      # Public header, pricing footer
│   ├── +page.svelte        # /
│   └── pricing/
│       └── +page.svelte    # /pricing
└── (app)/
    ├── +layout.svelte      # Authenticated sidebar, user menu
    └── dashboard/
        └── +page.svelte    # /dashboard
```

---

## 3. Rest & Optional Parameters

- **Rest Parameters (`[...path]`)**: Matches any depth of subpaths (e.g. documentation tree or file viewer).
- **Optional Parameters (`[[lang]]`)**: Matches `/` as well as `/en`, `/es`, `/de`.
