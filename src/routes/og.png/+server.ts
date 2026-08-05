// src/routes/og.png/+server.ts
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const title = url.searchParams.get('title') || 'SvelteAcademy';
	const category = url.searchParams.get('category') || 'Svelte 5 & SvelteKit';

	// Truncate long guide titles safely
	const formattedTitle = title.length > 55 ? title.slice(0, 52) + '...' : title;

	const svg = `
	<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
		<rect width="1200" height="630" fill="#09090b"/>
		
		<!-- Ambient Radial Glows -->
		<circle cx="150" cy="150" r="300" fill="#ff3e00" opacity="0.18"/>
		<circle cx="1050" cy="500" r="250" fill="#06b6d4" opacity="0.12"/>

		<!-- Top Branding Header -->
		<g transform="translate(80, 80)">
			<rect width="44" height="44" rx="12" fill="url(#brandGradient)"/>
			<text x="60" y="30" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="900" font-size="28" letter-spacing="-0.5">Svelte<tspan fill="#ff3e00">Academy</tspan></text>
		</g>

		<!-- Category Pill -->
		<g transform="translate(80, 210)">
			<rect width="${category.length * 12 + 36}" height="36" rx="18" fill="#ff3e00" fill-opacity="0.15" stroke="#ff3e00" stroke-opacity="0.4" stroke-width="1.5"/>
			<text x="18" y="23" fill="#ff6b35" font-family="system-ui, sans-serif" font-weight="700" font-size="14" letter-spacing="1" text-transform="uppercase">${category}</text>
		</g>

		<!-- Title Text -->
		<text x="80" y="330" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="900" font-size="48" letter-spacing="-1">${formattedTitle}</text>

		<!-- Subtitle / Domain Footer -->
		<text x="80" y="520" fill="#a1a1aa" font-family="system-ui, sans-serif" font-weight="500" font-size="20">Modern Svelte 5 Runes &amp; SvelteKit Learning Engine</text>
		<text x="80" y="552" fill="#ff3e00" font-family="system-ui, sans-serif" font-weight="700" font-size="16">svelteacademy.dev</text>

		<defs>
			<linearGradient id="brandGradient" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
				<stop stop-color="#ff3e00"/>
				<stop offset="1" stop-color="#f59e0b"/>
			</linearGradient>
		</defs>
	</svg>
	`.trim();

	return new Response(svg, {
		headers: {
			'Content-Type': 'image/svg+xml',
			'Cache-Control': 'public, max-age=86400, s-maxage=604800'
		}
	});
};
