---
title: Props in Svelte 5
description: Passing parameters and data to child components with $props(), default fallbacks, and rest attributes.
trackId: basic-svelte
level: beginner
readTime: 5 min read
---

# Component Props in Svelte 5

In Svelte 5, component properties (props) are received via the `$props()` rune. This brings full TypeScript type inference, natural destructuring, default fallback values, and rest attributes.

---

## Receiving Props with `$props()`

```svelte
<!-- src/lib/components/UserBadge.svelte -->
<script lang="ts">
	interface Props {
		name: string;
		role?: 'admin' | 'editor' | 'viewer';
		avatarUrl?: string;
		verified?: boolean;
	}

	// Destructuring with default values
	let {
		name,
		role = 'viewer',
		avatarUrl = '/placeholder-avatar.png',
		verified = false
	}: Props = $props();
</script>

<div class="user-card">
	<img src={avatarUrl} alt={name} />
	<div>
		<h3>{name} {verified ? '✓' : ''}</h3>
		<span class="role-badge">{role}</span>
	</div>
</div>
```

---

## Forwarding Rest Props

You can capture remaining HTML attributes using standard rest syntax `...restProps` and spread them onto native elements:

```svelte
<!-- src/lib/components/Button.svelte -->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends HTMLButtonAttributes {
		variant?: 'primary' | 'secondary' | 'danger';
		children?: Snippet;
	}

	let { variant = 'primary', children, class: className, ...restProps }: Props = $props();
</script>

<button class="btn btn-{variant} {className ?? ''}" {...restProps}>
	{#if children}
		{@render children()}
	{/if}
</button>
```

> [!NOTE]
> Notice how `class: className` renames the reserved `class` attribute during destructuring so you can safely merge custom classes.
