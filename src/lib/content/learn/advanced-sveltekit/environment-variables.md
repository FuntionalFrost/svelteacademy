---
title: Environment Variables and Security
description: Manage public vs private and static vs dynamic environment variables securely with $env modules.
trackId: advanced-sveltekit
level: intermediate
readTime: 5 min read
---

# Environment Variables and Security

SvelteKit provides four specialized `$env` modules to prevent secrets leakage and maximize compile-time dead-code elimination.

---

## 1. The Four `$env` Modules

| Module                 | Access              | Evaluated At | Use Case                                                       |
| :--------------------- | :------------------ | :----------- | :------------------------------------------------------------- |
| `$env/static/private`  | **Server Only**     | Build Time   | Database credentials, API secrets, Stripe private keys.        |
| `$env/static/public`   | **Client & Server** | Build Time   | Public keys, Supabase URLs, analytics tracking IDs.            |
| `$env/dynamic/private` | **Server Only**     | Runtime      | Secrets read dynamically per request from process environment. |
| `$env/dynamic/public`  | **Client & Server** | Runtime      | Public values configured per deployed container/instance.      |

---

## 2. Compile-Time Inlining (`$env/static/private`)

Static variables are replaced with constant values during build time, allowing compilers to eliminate unreachable branches:

```ts
// src/lib/server/stripe.ts
import { STRIPE_SECRET_KEY } from '$env/static/private';
import Stripe from 'stripe';

export const stripe = new Stripe(STRIPE_SECRET_KEY);
```

> [!CAUTION]
> If you accidentally import from `$env/static/private` inside client code (`+page.svelte` or `+page.ts`), SvelteKit will halt the build with an error to prevent exposing secrets in the client bundle.

---

## 3. Public Variables Prefix (`PUBLIC_`)

Public variables must start with `PUBLIC_` (configured via `publicPrefix` in `svelte.config.js`):

```ts
// src/routes/+layout.svelte
import { PUBLIC_ANALYTICS_ID } from '$env/static/public';
```
