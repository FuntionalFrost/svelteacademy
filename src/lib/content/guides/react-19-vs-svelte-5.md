---
title: "React 19 Hooks vs Svelte 5 Runes: Benchmark & Architecture"
description: "Comparing React 19 Virtual DOM rendering and useActionState against Svelte 5 signals compiler model."
category: "Framework Comparison"
readTime: "8 min read"
---

<script>
  import CodeComparison from '$lib/components/CodeComparison.svelte';

  const reactCode = `import { useActionState } from 'react';

async function updateName(prevState, formData) {
  const name = formData.get("name");
  return await saveToDb(name);
}

export function Profile() {
  const [state, formAction, isPending] = useActionState(updateName, null);
  return (
    <form action={formAction}>
      <input name="name" disabled={isPending} />
      <button type="submit">Save</button>
    </form>
  );
}`;

  const svelteCode = `<` + `script>
  import { enhance } from '$app/forms';
  let isPending = $state(false);
</` + `script>

<form method="POST" use:enhance={() => {
  isPending = true;
  return async ({ update }) => {
    await update();
    isPending = false;
  };
}}>
  <input name="name" disabled={isPending} />
  <button type="submit">Save</button>
</form>`;
</script>

Both React 19 and Svelte 5 bring major architectural shifts. While React doubles down on compiler memoization (React Compiler) and server-first components, Svelte 5 transitions to signal-based compiler primitives (Runes).

---

## State and Form Handlers

Comparing form handling and reactive state between React 19 `useActionState` and Svelte 5 `$state`:

<CodeComparison
  title="Form & Action State"
  description="Managing async submission state."
  competingName="React 19"
  competingCode={reactCode}
  svelteCode={svelteCode}
/>

---

## Rendering Architecture Comparison

| Feature                    | React 19                             | Svelte 5                                        |
| :------------------------- | :----------------------------------- | :---------------------------------------------- |
| **Reactivity Mechanism**   | Fiber Virtual DOM Tree Diffing       | Signals (`$state`) with DOM Node Mutation       |
| **Component Model**        | Re-executes whole function on render | Executes setup once; updates DOM nodes directly |
| **Bundle Impact**          | ~45 kB runtime engine                | ~2-4 kB runtime engine                          |
| **Re-render Optimization** | Requires React Compiler / `useMemo`  | Built-in granular dependency tracking           |