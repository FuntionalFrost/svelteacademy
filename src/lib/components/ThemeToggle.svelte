<!-- src/lib/components/ThemeToggle.svelte -->
<script lang="ts">
	import { Moon, Sun } from '@lucide/svelte';
	import { toggleMode } from 'mode-watcher';
</script>

<button
	onclick={toggleMode}
	class="inline-flex size-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition hover:bg-accent hover:text-foreground"
	aria-label="Toggle theme"
>
	<Sun class="size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
	<Moon class="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
</button>
