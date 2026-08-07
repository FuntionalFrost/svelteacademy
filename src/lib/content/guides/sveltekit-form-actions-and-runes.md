---
title: 'Full-Stack Form Actions with SvelteKit and Runes'
description: 'Manage form mutations, pending states, optimistic UI updates, and validation errors using SvelteKit use:enhance and $state signals.'
category: 'SvelteKit'
level: 'intermediate'
readTime: '7 min read'
---

SvelteKit's native form actions provide progressive enhancement out of the box. Combined with Svelte 5 `$state` signals, managing async submissions, loading states, and validation feedback is simple and reliable.

---

## 1. Setting Up the Server Action

Define server-side form handlers inside `+page.server.ts`:

```typescript
// src/routes/newsletter/+page.server.ts
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	subscribe: async ({ request }) => {
		const data = await request.formData();
		const email = data.get('email')?.toString();

		if (!email || !email.includes('@')) {
			return fail(400, { email, error: 'Invalid email address' });
		}

		// Process subscription...
		return { success: true };
	}
};
```

---

## 2. Client UI with Progressive Enhancement

Use `use:enhance` in your Svelte 5 component to handle form submissions on the client without full page reloads:

```svelte
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
	<label for="email">Subscribe to Newsletter</label>
	<input type="email" id="email" name="email" disabled={isSubmitting} />

	<button type="submit" disabled={isSubmitting}>
		{isSubmitting ? 'Submitting...' : 'Join Newsletter'}
	</button>

	{#if form?.error}
		<p class="error">{form.error}</p>
	{/if}

	{#if form?.success}
		<p class="success">Successfully subscribed!</p>
	{/if}
</form>
```

---

## Key Core Advantages

1. **Progressive Enhancement:** Forms work cleanly even if JavaScript is disabled or fails to load.
2. **Fine-Grained Loading States:** Track submission status easily using standard `$state` booleans.
3. **Server Validation Sync:** Returned action errors integrate directly with component props.
