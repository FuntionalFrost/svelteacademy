---
title: Form Actions and Progressive Enhancement
description: Server form actions in +page.server.ts and progressive enhancement with use:enhance.
trackId: basic-sveltekit
level: intermediate
readTime: 7 min read
---

# Form Actions and Progressive Enhancement

Form actions in SvelteKit provide a full-stack, progressive enhancement model for data mutation. They work even if JavaScript is disabled in the browser, and gain instant client-side transitions and optimistic updates when JavaScript is active.

---

## 1. Defining Form Actions (`+page.server.ts`)

```ts
// src/routes/newsletter/+page.server.ts
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	subscribe: async ({ request }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;

		if (!email || !email.includes('@')) {
			return fail(400, { email, missing: true, message: 'Invalid email address' });
		}

		// Save to database or mailing list API...
		return { success: true };
	}
};
```

---

## 2. Consuming Actions with `use:enhance`

The `use:enhance` action intercepts form submissions on the client, preventing full page reloads while maintaining native form behavior:

```svelte
<!-- src/routes/newsletter/+page.svelte -->
<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
	let isSubmitting = $state(false);
</script>

<form
	method="POST"
	action="?/subscribe"
	use:enhance={() => {
		isSubmitting = true;
		return async ({ update }) => {
			await update();
			isSubmitting = false;
		};
	}}
>
	<input
		type="email"
		name="email"
		value={form?.email ?? ''}
		placeholder="you@domain.com"
		required
	/>

	<button type="submit" disabled={isSubmitting}>
		{isSubmitting ? 'Subscribing...' : 'Subscribe'}
	</button>

	{#if form?.missing}
		<p class="text-destructive">{form.message}</p>
	{:else if form?.success}
		<p class="text-emerald-500">Thank you for subscribing! 🎉</p>
	{/if}
</form>
```
