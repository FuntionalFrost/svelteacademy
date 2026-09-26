---
title: Context API and Dependency Injection
description: Eliminate prop drilling across deep component hierarchies using setContext and getContext.
trackId: advanced-svelte
level: intermediate
readTime: 5 min read
---

# Context API and Dependency Injection

When deeply nested components need access to shared state without passing props through intermediate layers (prop drilling), the **Context API** provides a hierarchical dependency injection system.

---

## 1. Setting and Getting Context

Context is scoped to a component and all of its descendants:

```ts
// src/lib/context/theme.ts
import { getContext, setContext } from 'svelte';

const THEME_KEY = Symbol('THEME_KEY');

export interface ThemeContext {
	isDark: boolean;
	toggle: () => void;
}

export function setThemeContext(ctx: ThemeContext) {
	setContext(THEME_KEY, ctx);
}

export function getThemeContext(): ThemeContext {
	const ctx = getContext<ThemeContext>(THEME_KEY);
	if (!ctx) throw new Error('getThemeContext must be called within a ThemeProvider');
	return ctx;
}
```

---

## 2. Providing Context in a Root Component

```svelte
<!-- ThemeProvider.svelte -->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { setThemeContext } from '$lib/context/theme';

	let { children }: { children: Snippet } = $props();

	let isDark = $state(true);

	setThemeContext({
		get isDark() {
			return isDark;
		},
		toggle: () => {
			isDark = !isDark;
		}
	});
</script>

<div class={isDark ? 'dark' : 'light'}>
	{@render children()}
</div>
```

---

## 3. Consuming Context in a Child Component

```svelte
<!-- DeepChild.svelte -->
<script lang="ts">
	import { getThemeContext } from '$lib/context/theme';

	const theme = getThemeContext();
</script>

<button onclick={theme.toggle}>
	Current Theme: {theme.isDark ? '🌙 Dark' : '☀️ Light'}
</button>
```
