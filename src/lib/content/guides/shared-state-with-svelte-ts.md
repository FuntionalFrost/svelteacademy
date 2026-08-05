---
title: "Universal State Management with .svelte.ts Modules"
description: "Build global state singletons, class-based reactive services, and context-backed stores without external state libraries."
category: "Architecture"
readTime: "6 min read"
---

One of Svelte 5's biggest features is that **Runes work outside components**. You can place `$state()`, `$derived()`, and `$effect()` inside standard `.svelte.ts` (or `.svelte.js`) files to build reactive application state.

---

## 1. Class-Based Global State Singleton

Using ES6 classes alongside Svelte 5 runes creates self-contained reactive stores with zero boilerplate:

```typescript
// src/lib/stores/theme.svelte.ts
class ThemeManager {
  current = $state<'light' | 'dark'>('dark');
  isDark = $derived(this.current === 'dark');

  toggle() {
    this.current = this.current === 'dark' ? 'light' : 'dark';
  }

  setTheme(newTheme: 'light' | 'dark') {
    this.current = newTheme;
  }
}

// Export a single global instance
export const theme = new ThemeManager();

```

---

## 2. Consuming Shared State in Components

Import the shared instance directly into any Svelte 5 component. UI templates update surgically whenever class properties mutate:

```svelte
<script>
  import { theme } from '$lib/stores/theme.svelte.ts';
</script>

<button onclick={() => theme.toggle()}>
  Switch to {theme.isDark ? 'Light' : 'Dark'} Mode
</button>

```

---

## 3. SSR-Safe State with Svelte Context

Global singletons share memory across all users on a server. For SvelteKit Server-Side Rendering (SSR), scoped state must be passed using Svelte's context API:

```typescript
// src/lib/stores/user-context.svelte.ts
import { getContext, setContext } from 'svelte';

class UserState {
  name = $state('Guest');
  isLoggedIn = $state(false);

  login(username: string) {
    this.name = username;
    this.isLoggedIn = true;
  }
}

const USER_KEY = Symbol('USER_KEY');

export function initUserState() {
  return setContext(USER_KEY, new UserState());
}

export function getUserState(): UserState {
  return getContext(USER_KEY);
}

```

---

## Key Core Advantages

1. **Zero Abstraction Overhead:** No need for complex action dispatchers or reducer logic.
2. **Framework Portable:** Shared state logic lives in standard TS modules, making unit testing easy.
3. **Encapsulated Mutations:** Public methods safely encapsulate internal state updates.
