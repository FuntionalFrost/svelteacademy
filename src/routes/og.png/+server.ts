import { Resvg } from '@resvg/resvg-js';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const title = url.searchParams.get('title') || 'SvelteAcademy';
	const desc = url.searchParams.get('desc') || 'Master Svelte 5 and SvelteKit';

	const safeTitle = title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	const safeDesc = desc.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

	const svg = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="630" fill="#09090b"/>
      <circle cx="1000" cy="100" r="350" fill="#FF3E00" opacity="0.2" filter="blur(100px)"/>
      <circle cx="150" cy="500" r="250" fill="#FF8A00" opacity="0.12" filter="blur(90px)"/>

      <path d="M0 100H1200M0 200H1200M0 300H1200M0 400H1200M0 500H1200" stroke="#ffffff" stroke-opacity="0.04" stroke-width="1"/>
      <path d="M200 0V630M400 0V630M600 0V630M800 0V630M1000 0V630" stroke="#ffffff" stroke-opacity="0.04" stroke-width="1"/>

      <rect x="80" y="80" width="160" height="40" rx="8" fill="#FF3E00" fill-opacity="0.15" stroke="#FF3E00" stroke-opacity="0.4"/>
      <text x="160" y="105" fill="#FF3E00" font-family="system-ui, sans-serif" font-size="16" font-weight="700" text-anchor="middle" letter-spacing="1">SVELTE 5</text>

      <text x="80" y="240" fill="#ffffff" font-family="system-ui, sans-serif" font-size="52" font-weight="800" width="1040">
        <tspan x="80" dy="0">${safeTitle.slice(0, 50)}${safeTitle.length > 50 ? '...' : ''}</tspan>
      </text>

      <text x="80" y="340" fill="#a1a1aa" font-family="system-ui, sans-serif" font-size="26" font-weight="400" width="1040">
        <tspan x="80" dy="0">${safeDesc.slice(0, 90)}${safeDesc.length > 90 ? '...' : ''}</tspan>
      </text>

      <rect x="80" y="490" width="1040" height="1" fill="#27272a"/>
      <text x="80" y="545" fill="#ffffff" font-family="system-ui, sans-serif" font-size="22" font-weight="700">
        Svelte<tspan fill="#FF3E00">Academy</tspan>
      </text>
      <text x="1120" y="545" fill="#71717a" font-family="monospace" font-size="18" text-anchor="end">
        svelteacademy.dev
      </text>
    </svg>
  `.trim();

	const resvg = new Resvg(svg, {
		fitTo: { mode: 'width', value: 1200 }
	});
	const pngData = resvg.render();
	const pngBuffer = pngData.asPng();

	// Wrap pngBuffer in new Uint8Array() for Web Standard Response compatibility
	return new Response(new Uint8Array(pngBuffer), {
		headers: {
			'Content-Type': 'image/png',
			'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400'
		}
	});
};
