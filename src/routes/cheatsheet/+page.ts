// src/routes/cheatsheet/+page.ts
import type { PageLoad } from './$types';

export interface CheatsheetItem {
	id: string;
	name: string;
	category: 'Runes' | 'Props & Binding' | 'Effects & Utilities';
	summary: string;
	syntax: string;
	example: string;
	notes: string;
}

export const load: PageLoad = () => {
	const items: CheatsheetItem[] = [
		{
			id: 'state',
			name: '$state',
			category: 'Runes',
			summary:
				'Declares fine-grained reactive state. Mutating properties on objects or arrays triggers targeted updates.',
			syntax: 'let count = $state(0);',
			example: `<script lang="ts">
  let user = $state({ name: 'Alex', score: 10 });
</script>

<button onclick={() => user.score++}>
  Score: {user.score}
</button>`,
			notes:
				'Deeply reactive proxy by default. Replaces Svelte 3/4 `let x = 0;` and writable stores.'
		},
		{
			id: 'state-raw',
			name: '$state.raw',
			category: 'Runes',
			summary:
				'Declares shallow reactive state. Variable is reactive, inner properties are not proxied.',
			syntax: 'let data = $state.raw(largeObject);',
			example: `<script lang="ts">
  let dataset = $state.raw([{ id: 1, val: 'A' }]);

  function replaceAll() {
    dataset = [{ id: 2, val: 'B' }];
  }
</script>`,
			notes:
				'Optimized for large immutable datasets, third-party library instances, or canvas objects.'
		},
		{
			id: 'derived',
			name: '$derived',
			category: 'Runes',
			summary: 'Computes derived state automatically when referenced reactive signals change.',
			syntax: 'let double = $derived(count * 2);',
			example: `<script lang="ts">
  let count = $state(5);
  let double = $derived(count * 2);
  let isEven = $derived(count % 2 === 0);
</script>

<p>{count} x 2 = {double} ({isEven ? 'Even' : 'Odd'})</p>`,
			notes:
				'Replaces Svelte 3/4 `$:` reactive declarations. Derived values are pure and read-only.'
		},
		{
			id: 'derived-by',
			name: '$derived.by',
			category: 'Runes',
			summary: 'Computes complex derived state using a multi-line closure function.',
			syntax: 'let total = $derived.by(() => { ... return val; });',
			example: `<script lang="ts">
  let items = $state([10, 25, 40]);
  let totalWithTax = $derived.by(() => {
    const sum = items.reduce((acc, curr) => acc + curr, 0);
    return sum * 1.2;
  });
</script>`,
			notes:
				'Use when derivation requires loops, branch conditionals, or temporary local variables.'
		},
		{
			id: 'props',
			name: '$props',
			category: 'Props & Binding',
			summary: 'Declares component input props with optional default values and rest properties.',
			syntax: 'let { title, count = 0 } = $props();',
			example: `<script lang="ts">
  interface Props {
    title: string;
    variant?: 'primary' | 'secondary';
  }

  let { title, variant = 'primary' }: Props = $props();
</script>

<span class={variant}>{title}</span>`,
			notes:
				'Replaces `export let prop = ...`. Destructured variables retain reactivity automatically.'
		},
		{
			id: 'bindable',
			name: '$bindable',
			category: 'Props & Binding',
			summary: 'Marks a prop as eligible for two-way binding using `bind:prop`.',
			syntax: 'let { value = $bindable() } = $props();',
			example: `<script lang="ts">
  // Child Component
  let { value = $bindable('') }: { value?: string } = $props();
</script>

<input bind:value={value} />`,
			notes: 'Parents can bind via `<Child bind:value={myVar} />` or pass a standard one-way prop.'
		},
		{
			id: 'effect',
			name: '$effect',
			category: 'Effects & Utilities',
			summary: 'Runs side effects when read reactive signals update. Executes post-DOM render.',
			syntax: '$effect(() => { ... return () => cleanup(); });',
			example: `<script lang="ts">
  let query = $state('');

  $effect(() => {
    console.log('Search query changed:', query);
    return () => console.log('Cleanup before re-run');
  });
</script>`,
			notes:
				'Replaces `onMount`, `afterUpdate`, and `$:` side effects. Automatically tracks dependencies.'
		},
		{
			id: 'effect-pre',
			name: '$effect.pre',
			category: 'Effects & Utilities',
			summary: 'Runs side effects BEFORE the DOM updates.',
			syntax: '$effect.pre(() => { ... });',
			example: `<script lang="ts">
  let messages = $state<string[]>([]);
  let listEl: HTMLElement;

  $effect.pre(() => {
    const isAtBottom = listEl?.scrollHeight - listEl?.scrollTop === listEl?.clientHeight;
  });
</script>`,
			notes: 'Ideal for scroll positioning synchronization or DOM measurements prior to paint.'
		},
		{
			id: 'inspect',
			name: '$inspect',
			category: 'Effects & Utilities',
			summary:
				'Console-logs reactive signal changes in development builds. Stripped in production.',
			syntax: '$inspect(count, user).with(console.trace);',
			example: `<script lang="ts">
  let count = $state(0);
  $inspect(count);
</script>`,
			notes:
				'Development debugging rune. Attach `.with(fn)` to pipe inspection into custom loggers.'
		},
		{
			id: 'untrack',
			name: 'untrack()',
			category: 'Effects & Utilities',
			summary:
				'Reads reactive signals inside `$effect` or `$derived` without creating a tracking dependency.',
			syntax: 'import { untrack } from "svelte";',
			example: `<script lang="ts">
  import { untrack } from 'svelte';
  let a = $state(0);
  let b = $state(0);

  $effect(() => {
    console.log('A changed to:', a);
    console.log('Current snapshot of B:', untrack(() => b));
  });
</script>`,
			notes:
				'Prevents infinite effect loops when reading auxiliary state values inside side effects.'
		}
	];

	return { items };
};
