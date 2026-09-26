---
title: Advanced Bindings
description: Element dimension tracking, media playback bindings, contenteditable, and client dimensions.
trackId: advanced-svelte
level: intermediate
readTime: 5 min read
---

# Advanced Bindings

Beyond basic form inputs, Svelte allows you to bind directly to element dimensions, media elements (audio/video), and rich text containers.

---

## 1. Element Dimension Bindings

Read-only bindings give you real-time access to the computed dimensions of any block-level element:

```svelte
<script lang="ts">
	let width = $state(0);
	let height = $state(0);
</script>

<div class="resizable-card" bind:clientWidth={width} bind:clientHeight={height}>
	<h3>Card Dimensions</h3>
	<p>{width}px wide × {height}px tall</p>
</div>
```

---

## 2. Media Player Bindings (`<audio>` & `<video>`)

Synchronize video and audio state directly with reactive variables:

```svelte
<script lang="ts">
	let currentTime = $state(0);
	let duration = $state(0);
	let paused = $state(true);
	let volume = $state(0.8);
</script>

<video src="/demo.mp4" bind:currentTime bind:duration bind:paused bind:volume></video>

<div class="controls">
	<button onclick={() => (paused = !paused)}>
		{paused ? '▶ Play' : '⏸ Pause'}
	</button>
	<span>{currentTime.toFixed(1)}s / {duration.toFixed(1)}s</span>
</div>
```

---

## 3. `contenteditable` Bindings

```svelte
<script lang="ts">
	let htmlContent = $state('<p>Edit this content in real time!</p>');
</script>

<div contenteditable="true" bind:innerHTML={htmlContent} class="editor-box"></div>

<pre>{htmlContent}</pre>
```
