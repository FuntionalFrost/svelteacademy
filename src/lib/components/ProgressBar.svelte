<!-- src/lib/components/ProgressBar.svelte -->
<script lang="ts">
	import { Progress } from 'yaxa-svelte';

	let scrollY = $state(0);
	let innerHeight = $state(0);

	let progress = $derived.by(() => {
		if (typeof document === 'undefined' || innerHeight === 0) return 0;
		const total = (document.documentElement?.scrollHeight || 0) - innerHeight;
		return total > 0 ? Math.min(100, Math.max(0, (scrollY / total) * 100)) : 0;
	});
</script>

<svelte:window bind:scrollY bind:innerHeight />

<div class="fixed top-0 left-0 z-50 w-full">
	<Progress
		value={progress}
		max={100}
		size="xs"
		color="primary"
		class="rounded-none bg-transparent"
	/>
</div>
