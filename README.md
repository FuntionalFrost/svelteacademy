<div align="center">

# ⚡ SvelteAcademy

> **Code without the complexity.** Deep dives into Svelte 5 Runes, SvelteKit architecture, and framework comparisons brought down to earth.

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![Svelte](https://img.shields.io/badge/Svelte-5.56-ff3e00.svg?logo=svelte)](https://svelte.dev)
[![SvelteKit](https://img.shields.io/badge/SvelteKit-2.70-orange.svg?logo=svelte)](https://kit.svelte.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8.svg?logo=tailwindcss)](https://tailwindcss.com)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

[Live Platform](https://svelteacademy.netlify.app) • [Interactive Sandbox](https://svelteacademy.netlify.app/playground) • [Runes Cheatsheet](https://svelteacademy.netlify.app/cheatsheet) • [Guides](https://svelteacademy.netlify.app/guides) • [SuperSvelte Boilerplate](https://supersvelte.netlify.app)

</div>

---

## 📖 Overview

**SvelteAcademy** is an open-source educational platform, interactive signal inspector, and architectural reference hub designed for the modern Svelte 5 and SvelteKit ecosystem.

### ✨ Key Features

- **⚡ Svelte 5 Runes Native:** Fine-grained reactivity powered by `$state`, `$derived`, `$derived.by`, `$effect`, `$effect.pre`, `$props`, `$bindable`, and `untrack()`.
- **🔍 Universal ⌘K Command Palette:** Keyboard-first instant search modal (`Cmd+K` / `Ctrl+K`) that searches runes, architectural guides, and platform tools.
- **🧪 Interactive Signal Sandbox:** Live `/playground` route featuring interactive state mutations, derived signal trees, and class-based reactive service visualizers.
- **📑 19 In-Depth Guides:** Production architecture walkthroughs, React 19 vs Svelte 5 benchmarks, form action patterns, and SSR streaming guides.
- **📋 Deep-Linked Runes Cheatsheet:** Searchable syntax reference with copyable anchors (`#state`, `#derived`, `#effect`).
- **🎨 Shiki Code Highlighting & Clipboard Copy:** Dual-theme syntax highlighting with floating copy action buttons on all code blocks.
- **📜 Sticky Table of Contents:** `IntersectionObserver`-driven reading companion that tracks headings in real-time.
- **📊 Scroll Reading Progress:** Viewport-aware progress indicator for long-form tutorials.
- **🌗 Zero-Flash Dark Mode:** Powered by `mode-watcher` with system theme synchronization.
- **🌐 SEO & Web Feeds:** Prerendered Edge HTML, dynamic XML sitemaps, RSS feeds, and OpenGraph PNG card generation via `@resvg/resvg-js`.
- **🚀 SuperSvelte SaaS Integration:** Top-of-funnel funnel to the [SuperSvelte](https://supersvelte.netlify.app) enterprise TypeScript stack.

---

## 🛠️ Tech Stack

- **Framework:** [SvelteKit](https://kit.svelte.dev/) + [Svelte 5](https://svelte.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/), `@tailwindcss/typography`, OKLCH palette
- **Content Engine:** [MDsveX](https://mdsvex.pngwn.io/)
- **Syntax Highlighting:** [Shiki](https://shiki.style/)
- **Theme Management:** [mode-watcher](https://github.com/sainthkh/mode-watcher)
- **Icons:** [@lucide/svelte](https://lucide.dev/guide/packages/lucide-svelte)
- **Deployment Adapter:** `@sveltejs/adapter-netlify`

---

## 🚀 Getting Started Locally

### Prerequisites

- Node.js 20+
- pnpm 9+ or npm / yarn

### Installation & Run

```bash
# Clone repository
git clone https://github.com/FuntionalFrost/svelteacademy.git
cd svelteacademy

# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

Visit `http://localhost:5173` to explore the academy locally.

---

## 🧪 Quality Scripts

```bash
pnpm run check      # Run type checking via svelte-check
pnpm run lint       # Run Prettier style check & ESLint
pnpm run format     # Auto-format all code with Prettier
pnpm run build      # Compile production Edge prerender bundle
pnpm run preview    # Preview production build locally
```

---

## 📁 Directory Structure

```text
svelteacademy/
├── src/
│   ├── lib/
│   │   ├── components/               # Svelte 5 UI primitives & interactive widgets
│   │   │   ├── ClassStateVisualizer.svelte  # Shared class state inspector
│   │   │   ├── CodeComparison.svelte       # Side-by-side framework comparison widget
│   │   │   ├── CommandPalette.svelte       # Universal ⌘K search palette
│   │   │   ├── InteractiveRuneDemo.svelte  # Live signal mutation counter
│   │   │   ├── ProgressBar.svelte          # Reading progress bar
│   │   │   ├── RuneVisualizer.svelte       # $effect execution log inspector
│   │   │   ├── SEO.svelte                  # Dynamic metadata and OG tags
│   │   │   ├── SuperSvelteBanner.svelte    # SaaS funnel banner
│   │   │   ├── TableOfContents.svelte      # Sticky TOC observer sidebar
│   │   │   └── ThemeToggle.svelte          # Dark/Light mode switcher
│   │   └── content/
│   │       └── guides/               # 19 MDsveX guides and tutorials
│   └── routes/
│       ├── +layout.svelte            # Root layout with navbar and footer
│       ├── +layout.ts                # Global prerender = true Edge configuration
│       ├── +page.svelte              # Landing page hero & comparison showcase
│       ├── cheatsheet/               # Svelte 5 Runes reference guide
│       ├── guides/                   # Guide catalog & dynamic reader ([slug])
│       ├── og.png/                   # Dynamic OpenGraph SVG/PNG image generator
│       ├── playground/               # Live interactive signal sandbox
│       ├── robots.txt/               # Dynamic robots.txt endpoint
│       ├── rss.xml/                  # Syndication RSS feed
│       └── sitemap.xml/              # Dynamic XML sitemap
├── CONTRIBUTING.md                   # Community contribution guidelines
├── LICENSE                           # MIT License
├── svelte.config.js                  # SvelteKit & MDsveX config
└── vite.config.ts                    # Vite 8 build pipeline
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Check out our [Contributing Guide](CONTRIBUTING.md) to learn how to add new guides, update cheatsheet runes, or build interactive playground visualizers.

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).
