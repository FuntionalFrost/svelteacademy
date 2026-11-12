// src/routes/sitemap.xsl/+server.ts
import { siteConfig } from '#lib/site.js';
import { createSitemapXslHandler } from 'yaxa-svelte/seo';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = createSitemapXslHandler({ config: siteConfig });
