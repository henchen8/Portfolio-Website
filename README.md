# Henry Chen — Portfolio

Personal engineering portfolio. Next.js (App Router) + TypeScript, MDX-driven content,
deployed on Vercel at [henrychen.com](https://henrychen.com).

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run test       # Vitest unit tests
npm run test:e2e   # Playwright end-to-end tests
```

## Adding a project

Everything about a project lives in one folder — no route, card, or config edits needed.

1. Create `content/projects/<slug>/index.mdx`.
2. Fill in the frontmatter (`title`, `tagline`, `category`, `heroTitle`, `heroSubtitle`,
   `description`, `date`, `order`, `heroImage`, `cardImage`, optional `featured`, `stats`,
   `tags`, and `resources`).
3. Register the project's images in `lib/projectImages.ts` under its slug (import from
   `assets/<slug>/…`). The keys you use there are what `heroImage`/`cardImage` and
   `<Figure img="…" />` in the MDX refer to.
4. Write the body with the shared components: `<Section>` / `<Text>` / `<Media>` /
   `<Figure>` / `<Equation>` / `<CodeBlock>` / `<TechTags>`, plus bespoke ones like
   `<VideoDemo>` and `<PhoneMockup>`.

The home card, the `/projects/<slug>` route, the sitemap entry, and the per-project
link-preview card are all generated from that content automatically.

## Structure

- `app/` — routes, layout, metadata, sitemap/robots, OG images, 404
- `content/projects/` — one MDX folder per project (the single source of truth)
- `components/shell/` — Nav, Footer, Logo, LoadingScreen, Reveal
- `components/project/` — ProjectLayout + MDX component library
- `lib/` — content loader, image registry, site data
- `assets/` — imported (optimized) images
- `tests/` — Vitest unit + Playwright e2e
