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
		sveltekit({
			adapter: adapter({ fallback: '404.html' }),
			paths: { relative: false },
			compilerOptions: {
				runes: ({ filename }) => (filename.includes('node_modules') ? undefined : true),
				warningFilter: (warning) =>
					!(warning.code === 'script_context_deprecated' && warning.filename?.endsWith('.md'))
			},
			preprocess: [
				vitePreprocess(),
				mdsvex({
					extensions: ['.svx', '.md'],
					highlight: { highlighter: renderHighlightedCode }
				})
			],
			extensions: ['.svelte', '.svx', '.md']
		}),
		yaxa()
	]
});
