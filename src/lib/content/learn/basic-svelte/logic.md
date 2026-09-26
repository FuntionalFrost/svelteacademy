---
title: Logic and Control Flow
description: Conditional rendering, lists, iteration with keyed each blocks, and async await expressions.
trackId: basic-svelte
level: beginner
readTime: 6 min read
---

# Logic and Control Flow

Svelte templates support expressive logic blocks for conditionals, lists, promise resolution, and keyed remounting.

---

## 1. Conditional Rendering (`{#if}`)

```svelte
<script lang="ts">
	let user = $state<{ name: string; isSubscribed: boolean; plan: string } | null>(null);
</script>

{#if !user}
	<a href="/login">Please sign in</a>
{:else if user.isSubscribed}
	<p>Welcome back, Premium member {user.name} ({user.plan})!</p>
{:else}
	<p>Hello {user.name}! Upgrade your account to access all features.</p>
{/if}
```

---

## 2. Lists and Keys (`{#each}`)

Always provide a unique key expression (e.g. `(item.id)`) to preserve DOM focus, transition states, and prevent unnecessary re-renders when sorting or filtering:

```svelte
<script lang="ts">
	interface Task {
		id: string;
		title: string;
		completed: boolean;
	}

	let tasks = $state<Task[]>([
		{ id: '1', title: 'Learn Svelte 5 Runes', completed: true },
		{ id: '2', title: 'Master SvelteKit Routing', completed: false }
	]);
</script>

<ul>
	{#each tasks as task, index (task.id)}
		<li>
			<span>#{index + 1} - {task.title}</span>
			<input type="checkbox" bind:checked={task.completed} />
		</li>
	{:else}
		<li>No tasks remaining! 🎉</li>
	{/each}
</ul>
```

---

## 3. Async Resolution (`{#await}`)

The `{#await}` block allows you to render pending, resolved, and rejected states directly in markup:

```svelte
<script lang="ts">
	async function fetchUserProfile() {
		const res = await fetch('https://api.example.com/user');
		if (!res.ok) throw new Error('Failed to load profile');
		return res.json();
	}

	let userPromise = $state(fetchUserProfile());
</script>

{#await userPromise}
	<p>Loading profile...</p>
{:then user}
	<h2>{user.name}</h2>
	<p>Email: {user.email}</p>
{:catch error}
	<p class="text-destructive">Error: {error.message}</p>
{/await}
```
