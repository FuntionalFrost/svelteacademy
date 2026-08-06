// vite.config.ts
import adapter from '@sveltejs/adapter-netlify';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { escapeSvelte, mdsvex } from 'mdsvex';
import { createHighlighter } from 'shiki';
import { defineConfig } from 'vite';

// Initialize Shiki highlighter at top-level with all languages used in your markdown files
const highlighter = await createHighlighter({
	themes: ['github-dark'],
	langs: ['javascript', 'typescript', 'css', 'html', 'svelte', 'bash', 'json']
});

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			adapter: adapter(),
			preprocess: [
				mdsvex({
					extensions: ['.svx', '.md'],
					highlight: {
						highlighter: async (code, lang = 'text') => {
							const html = escapeSvelte(
								highlighter.codeToHtml(code, {
									lang: lang || 'text',
									theme: 'github-dark'
								})
							);
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
