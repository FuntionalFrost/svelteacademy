// src/lib/actions/copyCode.ts
import { toast } from 'yaxa-svelte';
import type { Action } from 'svelte/action';

/**
 * Svelte Action that attaches sleek floating copy-to-clipboard buttons
 * to all <pre> code blocks within a container element.
 */
export const enhanceCodeBlocks: Action<HTMLElement> = (node) => {
	const preElements = node.querySelectorAll('pre');
	const cleanups: (() => void)[] = [];

	preElements.forEach((pre) => {
		if (pre.querySelector('.code-copy-btn')) return;

		pre.classList.add('relative', 'group/code');

		const btn = document.createElement('button');
		btn.type = 'button';
		btn.className =
			'code-copy-btn absolute top-3 right-3 opacity-0 group-hover/code:opacity-100 transition-all rounded-md border border-white/10 bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 px-2.5 py-1 text-sm font-mono font-medium shadow-sm flex items-center gap-1 cursor-pointer whitespace-nowrap';
		btn.innerHTML = '<span>Copy</span>';
		btn.setAttribute('aria-label', 'Copy code to clipboard');

		const onClick = async () => {
			const code = pre.querySelector('code')?.innerText || pre.innerText;
			if (typeof navigator !== 'undefined' && navigator.clipboard) {
				await navigator.clipboard.writeText(code.trim());
				btn.innerHTML = '<span class="text-emerald-400">Copied!</span>';
				toast.success('Code copied to clipboard');
				setTimeout(() => {
					btn.innerHTML = '<span>Copy</span>';
				}, 2000);
			}
		};

		btn.addEventListener('click', onClick);
		pre.appendChild(btn);

		cleanups.push(() => {
			btn.removeEventListener('click', onClick);
			btn.remove();
		});
	});

	return {
		destroy() {
			cleanups.forEach((c) => c());
		}
	};
};
