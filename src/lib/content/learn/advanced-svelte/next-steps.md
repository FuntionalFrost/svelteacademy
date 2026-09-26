---
title: Next Steps and Component Libraries
description: Package reusable component libraries with @sveltejs/package, test with Vitest, and ship to npm.
trackId: advanced-svelte
level: intermediate
readTime: 5 min read
---

# Next Steps and Component Libraries

Now that you've mastered Svelte 5 runes, snippets, actions, and advanced transitions, the next horizon is packaging reusable component libraries and integrating full-stack capabilities.

---

## 1. Packaging Libraries with `@sveltejs/package`

To build an npm-ready component library, Svelte provides `@sveltejs/package`. It extracts TypeScript definitions (`.d.ts`), processes styles, and emits clean ES modules:

```bash
# Generate dist packages from src/lib
npx svelte-package
```

Ensure your `package.json` specifies proper exports:

```json
{
	"name": "my-svelte-ui",
	"type": "module",
	"exports": {
		".": {
			"types": "./dist/index.d.ts",
			"svelte": "./dist/index.js",
			"default": "./dist/index.js"
		}
	}
}
```

---

## 2. Testing Svelte 5 Components

Use **Vitest** with `@testing-library/svelte` for component testing:

```ts
// Button.test.ts
import { render, fireEvent } from '@testing-library/svelte';
import Button from './Button.svelte';
import { describe, it, expect, vi } from 'vitest';

describe('Button', () => {
	it('fires onclick handler when clicked', async () => {
		const handleClick = vi.fn();
		const { getByRole } = render(Button, { props: { onclick: handleClick } });

		const button = getByRole('button');
		await fireEvent.click(button);

		expect(handleClick).toHaveBeenCalledTimes(1);
	});
});
```

---

## 3. Ready for Full-Stack?

Continue your journey in **Track 3: Basic SvelteKit** to master file-based routing, server data loaders, secure cookie handling, form actions, and API endpoints!
