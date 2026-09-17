// src/routes/api/og/+server.ts
import { siteConfig } from '$lib/site';
import { createOgImageHandler } from 'yaxa-svelte';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = createOgImageHandler({ config: siteConfig });
