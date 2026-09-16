<!-- src/lib/components/ProgressBar.svelte -->
<script lang="ts">
	let scrollY = $state(0);
	let innerHeight = $state(0);

	let progress = $derived.by(() => {
		if (typeof document === 'undefined' || innerHeight === 0) return 0;
		const total = (document.documentElement?.scrollHeight || 0) - innerHeight;
		return total > 0 ? Math.min(100, Math.max(0, (scrollY / total) * 100)) : 0;
	});
</script>

<svelte:window bind:scrollY bind:innerHeight />

<div class="fixed top-0 left-0 z-50 h-1 w-full bg-primary/10">
	<div
		class="h-full bg-linear-to-r from-primary via-orange-500 to-amber-500 transition-all duration-75"
		style="width: {progress}%"
	></div>
</div>
