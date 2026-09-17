// src/routes/robots.txt/+server.ts
import { siteConfig } from '$lib/site';
import { createRobotsHandler } from 'yaxa-svelte';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = createRobotsHandler({
	config: siteConfig,
	isProduction: true,
	aiCrawlers: 'allow'
});
