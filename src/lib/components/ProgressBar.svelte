<!-- src/lib/components/ProgressBar.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';

	let progress = $state(0);

	onMount(() => {
		const handleScroll = () => {
			const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
			progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<div class="fixed top-0 left-0 z-50 h-1 w-full bg-primary/10">
	<div
		class="h-full bg-linear-to-r from-primary via-orange-500 to-amber-500 transition-all duration-75"
		style="width: {progress}%"
	></div>
</div>
