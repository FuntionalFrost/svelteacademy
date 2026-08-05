<!-- src/routes/login/+page.svelte -->
<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<!-- Works zero-JS by default; enhances into smooth client update when JS is available -->
<form method="POST" action="?/login" use:enhance>
	<input name="email" type="email" required />
	<input name="password" type="password" required />
	<button type="submit">Sign In</button>
</form>
