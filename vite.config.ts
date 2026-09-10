// vite.config.ts
import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';
import { escapeSvelte, mdsvex } from 'mdsvex';
import { createHighlighter } from 'shiki';
import { defineConfig } from 'vite';

// Initialize Shiki highlighter at top-level
const highlighter = await createHighlighter({
	themes: ['github-dark'],
	langs: ['javascript', 'typescript', 'css', 'html', 'svelte', 'bash', 'json', 'sql', 'yaml']
});

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			adapter: adapter({
				fallback: '404.html'
			}),
			paths: {
				relative: false
			},
			preprocess: [
				vitePreprocess(),
				mdsvex({
					extensions: ['.svx', '.md'],
					highlight: {
						highlighter: async (code, lang = 'text') => {
							let html: string;
							try {
								html = escapeSvelte(
									highlighter.codeToHtml(code, {
										lang: lang || 'text',
										theme: 'github-dark'
									})
								);
							} catch {
								// Fallback for unloaded languages to prevent build failures
								html = escapeSvelte(
									highlighter.codeToHtml(code, {
										lang: 'text',
										theme: 'github-dark'
									})
								);
							}
							return `{@html \`${html}\`}`;
						}
					}
				})
			],
			extensions: ['.svelte', '.svx', '.md']
		})
	],
	ssr: {
		noExternal: ['mdsvex', 'shiki']
	}
});
