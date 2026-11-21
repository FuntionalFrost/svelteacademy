// vite.config.ts
import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';
import { mdsvex } from 'mdsvex';
import { defineConfig } from 'vite';
import { yaxa } from 'yaxa-svelte/vite';
import { renderHighlightedCode } from './src/lib/highlighter.ts';

export default defineConfig({
	plugins: [
		tailwindcss(),
		mdsvex({
			extensions: ['.svx', '.md'],
			highlight: renderHighlightedCode
		}),
		sveltekit({
			adapter: adapter({ fallback: '404.html' }),
			paths: { relative: false },
			compilerOptions: {
				runes: true
			},
			preprocess: [vitePreprocess()],
			extensions: ['.svelte', '.svx', '.md']
		}),
		yaxa()
	]
});
