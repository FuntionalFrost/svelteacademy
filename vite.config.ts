// vite.config.ts
import adapter from '@sveltejs/adapter-netlify';
import { sveltekit } from '@sveltejs/kit/vite';
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
			adapter: adapter(),
			preprocess: [
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
