// src/routes/robots.txt/+server.ts
import { siteConfig } from '#lib/site.js';
import { createRobotsHandler } from 'yaxa-svelte/seo';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = createRobotsHandler({
	config: siteConfig,
	isProduction: true,
	aiCrawlers: 'allow'
});
