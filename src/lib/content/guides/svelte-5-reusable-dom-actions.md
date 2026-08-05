---
title: "Building Custom DOM Actions in Svelte 5"
description: "Create lightweight element directives with use:action. Learn how actions integrate with $effect and manage DOM element lifecycles."
category: "Architecture"
readTime: "5 min read"
---

Svelte **Actions** are element-level directives used to attach custom JavaScript behaviors directly to HTML nodes (such as click-outside detection, tooltips, or focus traps).

---

## 1. Creating a Click-Outside Action

An action is a plain JavaScript function that receives a target DOM element and returns an optional cleanup destroy method:

```typescript
// src/lib/actions/clickOutside.ts
export function clickOutside(node: HTMLElement, onOutsideClick: () => void) {
  function handleClick(event: MouseEvent) {
    if (node && !node.contains(event.target as Node)) {
      onOutsideClick();
    }
  }

  document.addEventListener('click', handleClick, true);

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true);
    }
  };
}

```

---

## 2. Using Actions in Components with use:

Attach the action to any HTML element using the `use:` directive:

```svelte
<script>
  import { clickOutside } from '$lib/actions/clickOutside';

  let isOpen = $state(false);
</script>

<button onclick={() => isOpen = true}>Open Modal</button>

{#if isOpen}
  <div class="modal" use:clickOutside={() => isOpen = false}>
    <h3>Modal Dialog</h3>
    <p>Click anywhere outside this box to dismiss.</p>
  </div>
{/if}

```

---

## 3. Reactive Actions with Signals

Actions can accept dynamic parameters. When parameters change, update action behavior cleanly:

```typescript
// src/lib/actions/tooltip.ts
export function tooltip(node: HTMLElement, text: string) {
  let tooltipEl: HTMLDivElement;

  function show() {
    tooltipEl = document.createElement('div');
    tooltipEl.className = 'tooltip-popup';
    tooltipEl.textContent = text;
    document.body.appendChild(tooltipEl);
  }

  function hide() {
    tooltipEl?.remove();
  }

  node.addEventListener('mouseenter', show);
  node.addEventListener('mouseleave', hide);

  return {
    update(newText: string) {
      text = newText;
      if (tooltipEl) tooltipEl.textContent = newText;
    },
    destroy() {
      hide();
      node.removeEventListener('mouseenter', show);
      node.removeEventListener('mouseleave', hide);
    }
  };
}

```

---

## Key Core Advantages

1. **Framework Agnostic DOM Access:** Perfect for integrating third-party libraries (Chart.js, Canvas, Mapbox).
2. **Encapsulated Lifecycle:** DOM listeners and event observers clean up automatically on element destruction.
3. **Reusable Directives:** Share UX behaviors across components without wrapping markup in extra `<div>` elements.
