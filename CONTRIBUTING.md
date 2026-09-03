# Contributing to SvelteAcademy

Thank you for your interest in contributing to **SvelteAcademy**! 🎉

We welcome contributions of all kinds: from fixing typos and adding code explanations to authoring new Svelte 5 / SvelteKit guides and creating interactive playground widgets.

---

## 🚀 Quick Start & Development Setup

1. **Fork & Clone the repository:**

   ```bash
   git clone https://github.com/FuntionalFrost/sveltey.git
   cd svelteacademy
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Start the local development server:**

   ```bash
   pnpm run dev
   ```

4. **Verify quality checks:**

   ```bash
   pnpm run check    # Type-checking via svelte-check
   pnpm run lint     # Code formatting & ESLint verification
   pnpm run build    # Netlify edge prerender production build
   ```

---

## ✍️ How to Contribute

### 1. Adding or Improving a Guide

All guides live in `src/lib/content/guides/` as MDsveX (`.md`) files.

Each guide includes frontmatter metadata at the top:

```markdown
---
title: 'Your Guide Title'
description: 'A concise 1-2 sentence overview of what readers will learn.'
category: 'Svelte 5' # "Beginner" | "Svelte 5" | "Reactivity" | "SvelteKit" | "Architecture" | "Framework Comparison"
level: 'intermediate' # "beginner" | "intermediate" | "advanced"
readTime: '6 min read'
---
```

You can embed standard Markdown, syntax-highlighted code blocks (with language identifiers like `svelte`, `ts`, `js`), and interactive Svelte components directly in your guide!

### 2. Updating the Cheatsheet

Cheatsheet items are configured in `src/routes/cheatsheet/+page.ts`. Each rune entry includes:

- `id`: URL-safe anchor tag (e.g. `state`, `derived`)
- `name`: Rune name (e.g. `$state`)
- `category`: Categorization badge
- `syntax`: Signature snippet
- `summary`: Quick reference explanation
- `example`: Code snippet for syntax comparison
- `notes`: Pro-tip / performance advice

### 3. Adding Playground Visualizers

Interactive demos are located in `src/lib/components/` and rendered inside `src/routes/playground/+page.svelte`. Demos leverage native Svelte 5 runes (`$state`, `$derived`, `$effect`) to display real-time signal mechanics.

---

## 📋 Pull Request Process

1. Create a new topic branch:

```bash
git checkout -b feat/your-feature-name
```

1. Commit your changes with clear, descriptive commit messages.
2. Run `pnpm run format` and `pnpm run lint` before committing.
3. Push your branch to your fork and open a Pull Request against `main`.

---

## 📜 Code of Conduct & Licensing

By contributing to SvelteAcademy, you agree that your contributions will be licensed under the project's [MIT License](LICENSE). Please ensure all communication is respectful, constructive, and welcoming to developers of all experience levels.
