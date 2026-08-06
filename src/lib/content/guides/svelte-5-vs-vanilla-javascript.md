---
title: 'Svelte 5 vs Vanilla HTML, CSS & JS: Why Use a Compiler?'
description: "Compare manual DOM manipulation and event listeners against Svelte 5's reactive signals and auto-updating UI primitives."
category: 'Framework Comparison'
readTime: '6 min read'
---

<script>
  import CodeComparison from '$lib/components/CodeComparison.svelte';

  const vanillaCode = `const button = document.querySelector('#btn');
const output = document.querySelector('#out');
let count = 0;

button.addEventListener('click', () => {
  count++;
  output.textContent = \`Count: \${count}\`;
});`;

  const svelteCode = `<` + `script>
  let count = $state(0);
</` + `script>

<button onclick={() => count++}>
  Count: {count}
</button>`;
</script>

Building with Vanilla JS gives you full control, but as applications grow, keeping the DOM in sync with underlying state requires tedious imperative code (`querySelector`, `addEventListener`, `textContent = ...`). Svelte 5 provides reactive primitives while compiling down to zero-overhead DOM mutations.

---

## State Mutation & DOM Updates

Comparing imperative Vanilla JS DOM manipulation against Svelte 5 `$state`:

<CodeComparison
  title="State Mutation & UI Sync"
  description="Imperative querySelector vs Svelte 5 fine-grained compiler updates."
  competingName="Vanilla JS"
  competingCode={vanillaCode}
  svelteCode={svelteCode}
/>

---

## Architecture Comparison

| Feature                   | Vanilla HTML/CSS/JS                       | Svelte 5                                |
| :------------------------ | :---------------------------------------- | :-------------------------------------- |
| **State Synchronization** | Imperative (`element.textContent = val`)  | Declarative compiler signals (`$state`) |
| **CSS Scoping**           | Manual naming conventions (BEM)           | Automatic scoped CSS classes per file   |
| **Component Model**       | Web Components or manual template strings | Native `.svelte` single-file components |
| **Bundle Overhead**       | 0 kB                                      | ~2 kB runtime compiler helper           |

---

## Key Core Advantages

1. **Eliminates DOM Boilerplate:** No more query selectors, event listener detachments, or manual DOM updates.
2. **Maintainability:** UI automatically mirrors application state without sync bugs.
3. **Native Feel:** Writes like standard HTML and JS without runtime performance hits.
