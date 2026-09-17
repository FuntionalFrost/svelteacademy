// src/routes/sitemap.xsl/+server.ts
import { siteConfig } from '$lib/site';
import { createSitemapXslHandler } from 'yaxa-svelte';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = createSitemapXslHandler({ config: siteConfig });
