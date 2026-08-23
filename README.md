# ⚡ SvelteAcademy

> **Code without the complexity.** Deep dives into Svelte 5 Runes, SvelteKit architecture, and framework comparisons brought down to earth.

SvelteAcademy is a modern learning platform, interactive signal sandbox, and guide engine designed to showcase the zero-complexity developer experience of Svelte 5 and SvelteKit.

---

## ✨ Features

- **⚡ Svelte 5 Runes Native:** Built ground-up leveraging modern fine-grained reactivity (`$state`, `$derived`, `$effect`).
- **🔍 ⌘K Command Palette:** Keyboard-first search modal (`Cmd+K` / `Ctrl+K`) powered by Vite's `import.meta.glob` for instant article discovery.
- **🧪 Interactive Signal Sandbox:** Live `/playground` route featuring interactive `$state` counters, `$effect` execution streams with `untrack()`, and class-based store inspectors.
- **🎨 Shiki Syntax Highlighting:** High-contrast dual-theme code blocks (`tokyo-night` in dark mode, `github-light` in light mode) with dynamic chunk code-splitting.
- **📜 Sticky Table of Contents:** IntersectionObserver-driven in-page navigation bar that tracks your reading location automatically.
- **📊 Reading Progress Bar:** Smooth scroll-driven progress indicator for long-form guides.
- **🌗 Dark Mode & Theme Persistence:** Powered by `mode-watcher` with seamless system theme sync and zero light/dark flickering.
- **🚀 SuperSvelte Funnel Integration:** Embedded conversion banners and brand touchpoints for the official SuperSvelte edge boilerplate.
- **📝 MDsveX Interactive Guides:** Write long-form articles in Markdown while embedding live, interactive Svelte 5 components directly in content.
- **🌐 SEO & Web Syndication:** Dynamic `/sitemap.xml` crawler endpoint, `/rss.xml` feed, OpenGraph card generation, and static `robots.txt`.

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
svelte-academy/
├── static/
│   └── robots.txt                    # Static crawler rules & sitemap declaration
├── src/
│   ├── app.css                       # Tailwind v4 theme, OKLCH colors, Shiki styles
│   ├── app.d.ts                      # Global type definitions & App.Locals configuration
│   ├── lib/
│   │   ├── components/               # Reusable UI Components
│   │   │   ├── ClassStateVisualizer.svelte  # Shared class state inspector
│   │   │   ├── CodeComparison.svelte       # React vs Svelte benchmark widget
│   │   │   ├── CommandPalette.svelte       # ⌘K instant search modal
│   │   │   ├── InteractiveRuneDemo.svelte # Live counter & derived signal demo
│   │   │   ├── Logo.svelte                 # Brand logo container
│   │   │   ├── ProgressBar.svelte          # Scroll reading progress bar
│   │   │   ├── RuneVisualizer.svelte       # $effect execution logger & untrack() demo
│   │   │   ├── SEO.svelte                  # OpenGraph & Twitter metadata manager
│   │   │   ├── SuperSvelteBanner.svelte    # High-converting SaaS promo banner
│   │   │   ├── TableOfContents.svelte      # Sticky in-page navigation sidebar
│   │   │   └── ThemeToggle.svelte          # Dark/Light theme button
│   │   └── content/
│   │       └── guides/               # Markdown (.md) articles and comparisons
│   └── routes/
│       ├── +layout.svelte            # Root layout with navbar, theme provider, and footer
│       ├── +page.svelte              # Homepage hero & code comparison benchmarks
│       ├── cheatsheet/               # Svelte 5 Runes reference guide
│       ├── guides/                   # Guide catalog & dynamic dynamic guide renderer ([slug])
│       ├── playground/               # Live interactive signal sandbox
│       ├── rss.xml/                  # Dynamic RSS feed endpoint
│       └── sitemap.xml/              # Dynamic XML sitemap endpoint
├── netlify.toml                      # Netlify deployment & redirect configuration
├── svelte.config.js                  # SvelteKit & mdsvex preprocessor configuration
└── vite.config.ts                    # Vite build configuration & chunk thresholds
```
