<!-- src/routes/posts/[id]/+page.svelte -->
<script lang="ts">
	let { data } = $props(); // 'data.post' is fully typed!
</script>

<h1>{data.post.title}</h1>
