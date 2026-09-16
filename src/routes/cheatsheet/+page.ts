// src/routes/cheatsheet/+page.ts
import { cheatsheetItems, type CheatsheetItem } from '$lib/content/cheatsheet';
import type { PageLoad } from './$types';

export type { CheatsheetItem };

export const load: PageLoad = () => {
	return { items: cheatsheetItems };
};
