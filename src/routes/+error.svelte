<!-- src/routes/+error.svelte -->
<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { ArrowLeft, TriangleAlert } from '@lucide/svelte';
</script>

<div class="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
	<!-- Glowing Icon Badge -->
	<div
		class="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-lg shadow-primary/20"
	>
		<TriangleAlert class="size-8" />
	</div>

	<h1 class="mt-6 text-5xl font-black tracking-tight text-foreground sm:text-6xl">
		{page.status}
	</h1>

	<p class="mt-3 max-w-md text-sm text-muted-foreground">
		{page.error?.message ||
			'The page or guide you are looking for does not exist or has been moved.'}
	</p>

	<div class="mt-8 flex items-center gap-4">
		<a
			href={resolve('/')}
			class="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground shadow-md shadow-primary/20 transition hover:brightness-110"
		>
			<ArrowLeft class="size-4" />
			<span>Return to Homepage</span>
		</a>

		<a
			href={resolve('/learn')}
			class="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-xs font-bold text-foreground transition hover:bg-accent"
		>
			<span>Browse Guides</span>
		</a>
	</div>
</div>
