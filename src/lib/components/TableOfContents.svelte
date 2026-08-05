<!-- src/lib/components/TableOfContents.svelte -->
<script lang="ts">
	import { List } from '@lucide/svelte';
	import { onMount } from 'svelte';

	interface Heading {
		id: string;
		text: string;
		level: number;
	}

	let headings = $state<Heading[]>([]);
	let activeId = $state('');

	onMount(() => {
		// Scan article for h2 and h3 elements
		const articleElements = document.querySelectorAll('article h2, article h3');
		const extracted: Heading[] = [];

		articleElements.forEach((el, index) => {
			if (!el.id) {
				// Generate clean id from text content if missing
				el.id =
					el.textContent
						?.toLowerCase()
						.replace(/[^a-z0-9]+/g, '-')
						.replace(/(^-|-$)/g, '') || `heading-${index}`;
			}

			extracted.push({
				id: el.id,
				text: el.textContent || '',
				level: el.tagName === 'H2' ? 2 : 3
			});
		});

		headings = extracted;

		// Scroll observer to update active heading indicator
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						activeId = entry.target.id;
					}
				});
			},
			{ rootMargin: '-80px 0px -60% 0px' }
		);

		articleElements.forEach((el) => observer.observe(el));

		return () => observer.disconnect();
	});

	function scrollToHeading(id: string) {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	}
</script>

{#if headings.length > 0}
	<div class="space-y-3">
		<div
			class="flex items-center gap-2 text-xs font-bold tracking-wider text-muted-foreground uppercase"
		>
			<List class="size-3.5" />
			<span>On this page</span>
		</div>

		<nav class="space-y-1 text-xs">
			{#each headings as heading (heading.id)}
				<button
					onclick={() => scrollToHeading(heading.id)}
					class="block w-full text-left transition-colors duration-150 {heading.level === 3
						? 'pl-3'
						: 'pl-0'} {activeId === heading.id
						? 'font-bold text-primary'
						: 'text-muted-foreground hover:text-foreground'}"
				>
					{heading.text}
				</button>
			{/each}
		</nav>
	</div>
{/if}
