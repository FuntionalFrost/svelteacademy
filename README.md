# ⚡ SvelteAcademy

> **Code without the complexity.** Deep dives into Svelte 5 Runes, SvelteKit architecture, and framework comparisons brought down to earth.

SvelteAcademy is a modern learning platform, interactive benchmark hub, and guide engine designed to showcase the zero-complexity developer experience of Svelte 5 and SvelteKit.

---

## ✨ Features

- **⚡ Svelte 5 Runes Native:** Built ground-up leveraging modern fine-grained reactivity (`$state`, `$derived`, `$effect`).
- **🎨 Shiki Syntax Highlighting:** High-contrast dual-theme code blocks (`tokyo-night` in dark mode, `github-light` in light mode) with dynamic chunk code-splitting.
- **🔍 Instant Search & Category Filtering:** Zero-latency client-side search by title, description, slug, or framework category.
- **🌗 Dark Mode & Theme Persistence:** Powered by `mode-watcher` with seamless system theme sync and zero light/dark flickering.
- **📝 MDsveX Interactive Guides:** Write long-form articles in Markdown while embedding live, interactive Svelte 5 components directly in content.
- **🌐 SEO & Web Syndication:** Dynamic `/sitemap.xml` crawler endpoint, `/rss.xml` feed, and OpenGraph social card previews.
- **📊 Reading Progress Bar:** Smooth scroll-driven progress indicator for long-form guides.
- **🚀 Netlify Ready:** Configured with `@sveltejs/adapter-netlify` and optimized Vite chunk thresholds.

---

## 🛠️ Tech Stack

- **Framework:** [SvelteKit](https://kit.svelte.dev/) + [Svelte 5](https://svelte.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/), `shadcn-svelte`, OKLCH Color Palette
- **Content Engine:** [mdsvex](https://mdsvex.pngwn.io/)
- **Syntax Highlighting:** [Shiki](https://shiki.style/)
- **Theme Manager:** [mode-watcher](https://github.com/sainthkh/mode-watcher)
- **Icons:** [@lucide/svelte](https://lucide.dev/guide/packages/lucide-svelte)
- **Deployment Adapter:** `@sveltejs/adapter-netlify`

---

## 📁 Project Structure

```text
sveltey/
├── src/
│   ├── app.css                   # Tailwind v4 theme, OKLCH Svelte Orange, Shiki styles
│   ├── app.d.ts                  # Global type definitions & App.Locals configuration
│   ├── lib/
│   │   ├── components/           # Reusable UI Components
│   │   │   ├── CodeComparison.svelte    # Side-by-side framework benchmark widget
│   │   │   ├── InteractiveRuneDemo.svelte # Live interactive Svelte 5 widget
│   │   │   ├── ProgressBar.svelte        # Scroll reading progress bar
│   │   │   ├── SEO.svelte                # OpenGraph & Twitter metadata manager
│   │   │   └── ThemeToggle.svelte        # Dark/Light theme button
│   │   └── content/
│   │       └── guides/           # Markdown (.md) articles and comparisons
│   └── routes/
│       ├── +layout.svelte        # Root layout with navbar, theme provider, and ambient glows
│       ├── +page.svelte          # Homepage hero and primary framework benchmarks
│       ├── learn/
│       │   ├── +page.ts          # Guide loader index
│       │   ├── +page.svelte      # Guide catalog with search & category filters
│       │   └── [slug]/           # Dynamic guide renderer
│       ├── rss.xml/              # Dynamic RSS feed endpoint
│       └── sitemap.xml/          # Dynamic XML sitemap endpoint
├── netlify.toml                  # Netlify deployment & redirect configuration
├── svelte.config.js              # SvelteKit & mdsvex preprocessor configuration
└── vite.config.ts                # Vite build configuration & chunk thresholds
```
