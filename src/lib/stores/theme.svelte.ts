// src/lib/stores/theme.svelte.ts
import { browser } from '$app/env';

export type ThemeMode = 'light' | 'dark' | 'system';

class Theme {
	isDark = $state(true);
	mode = $state<ThemeMode>('dark');

	constructor() {
		if (browser) {
			const saved = (localStorage.getItem('theme') as ThemeMode) || 'dark';
			this.mode = saved;
			this.apply(saved);

			window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
				if (this.mode === 'system') {
					this.isDark = e.matches;
					document.documentElement.classList.toggle('dark', e.matches);
				}
			});
		}
	}

	private apply(mode: ThemeMode) {
		if (!browser) return;
		let dark = mode === 'dark';
		if (mode === 'system') {
			dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		}
		this.isDark = dark;
		document.documentElement.classList.toggle('dark', dark);
		document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
	}

	setMode(newMode: ThemeMode) {
		this.mode = newMode;
		if (browser) {
			localStorage.setItem('theme', newMode);
			this.apply(newMode);
		}
	}

	toggle() {
		const next = this.isDark ? 'light' : 'dark';
		this.setMode(next);
	}
}

export const theme = new Theme();
