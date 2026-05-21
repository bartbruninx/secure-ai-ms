# secure-ai-ms — Copilot Instructions

## Project Overview

**secure-ai-ms** is a static website built with [Astro](https://astro.build/) and hosted on GitHub Pages. Its purpose is to provide an **overview and mapping of Microsoft solutions for securing AI environments** (Microsoft Agent 365, Defender, Purview, Entra, Sentinel, Azure AI Content Safety, Copilot security, …) against security frameworks (NIST CSF 2.0, NIST AI RMF, …).

Content-driven, performance-focused, intended as a reference for security architects and decision-makers.

## Tech Stack

- **Framework**: Astro 6 (static output, zero JS by default)
- **Language**: TypeScript strict (`astro/tsconfigs/strict`)
- **Schema validation**: `astro/zod` (Astro 6's re-exported Zod v4)
- **Content**: Astro Content Collections via the **glob loader**; schemas in `src/content.config.ts`
- **Styling**: scoped component styles + CSS custom properties in `src/styles/`; no heavy CSS frameworks unless justified
- **Hosting**: GitHub Pages via GitHub Actions
- **Package manager**: npm

## Architectural Principles

1. **Static-first**: No SSR, no runtime servers, no client-fetched data. Pre-render at build.
2. **Zero JS by default**: Islands (`client:*`) only for genuinely interactive components.
3. **Content as data**: Every factual claim lives in `src/content/` with a strict Zod schema. Never hardcode product/capability/control data in components.
4. **Composable components**: Small, single-purpose `.astro` components with typed `Props`. No business logic in templates.
5. **Accessibility & performance**: Semantic HTML, Lighthouse-friendly, no layout shift, images via `astro:assets`.
6. **No secrets**: Public static site — never embed keys, tokens, or private endpoints.

## Data Model (locked)

The schema is defined in [`src/content.config.ts`](../src/content.config.ts) — **the source of truth**. Changes must be **additive** (new optional fields). Breaking changes require explicit approval.

Collections:

| Collection      | Purpose                                                                  |
|-----------------|--------------------------------------------------------------------------|
| `vendors`       | Solution vendors (Microsoft today; future-proof)                         |
| `frameworks`    | Security frameworks (NIST CSF 2.0, NIST AI RMF, …)                       |
| `controls`      | Hierarchical entries within a framework (pillar → subcategory)           |
| `categories`    | Local taxonomy (identity, data, ai-posture, …)                           |
| `licenses`      | Microsoft SKUs / plans (E5, Defender CSPM, Purview add-on, …)            |
| `products`      | Microsoft solutions (Defender for Cloud, Purview, Entra, Agent 365, …)   |
| `capabilities`  | Discrete features of a product; **mappings to controls live here inline** |

Locked enums (do not extend without approval):

- `status`: `draft` | `published` | `deprecated`
- `coverage`: `full` | `partial` | `enables` | `not-applicable`
- `controls.level`: `pillar` | `function` | `category` | `subcategory`

Relationships:

- `product → vendor` (N:1), `product → categories` (M:N)
- `capability → product` (N:1), `capability → categories` (M:N)
- `capability → licenses[]` (M:N with `required`/`note`)
- `capability → mappings[]` (M:N to `controls` with `coverage`/`note`)
- `control → framework` (N:1), `control → parent control?` (self-ref, builds the tree)

**Mapping rule**: mappings are authored **inline on the capability**, at whichever control level is appropriate (pillar today, subcategory later). The helpers in [`src/lib/coverage.ts`](../src/lib/coverage.ts) compute inverse indexes and ancestor/descendant rollup at build time, so a pillar page surfaces capabilities mapped to its children automatically.

## Repository Conventions

- `astro.config.mjs` — site/base configured for GitHub Pages (`https://bartbruninx.github.io/secure-ai-ms/`).
- `src/pages/` — routes (`.astro`, `.md`, `.mdx`).
- `src/layouts/` — page layouts.
- `src/components/` — PascalCase `.astro` components.
- `src/content.config.ts` — collection schemas (single source of truth).
- `src/content/<collection>/` — entries as **YAML** (preferred) or `.md`/`.mdx` when narrative is needed.
- `src/lib/` — pure TS utilities (type imports from `astro:content` are OK).
- `src/styles/` — design tokens + globals.
- `public/` — static passthrough assets.

Filenames: **kebab-case** for routes and content entries; **PascalCase.astro** for components.

**Content IDs** are derived from the file path relative to the collection root (e.g. `controls/nist-csf-2/protect.yaml` → id `nist-csf-2/protect`). References across collections use those IDs verbatim.

## Custom Agents

Two specialist subagents in `.github/agents/`:

- **`web-developer`** — Astro/TypeScript expert. Owns site code, schemas, components, layouts, build, deploy. Does **not** invent content.
- **`content-expert`** — Microsoft security & AI expert. Owns content collection entries. Cites only Microsoft-trusted sources (preferring the Microsoft Learn MCP server). Does **not** edit site code.

Delegate by task domain. Keep concerns separated.

## Coding Guidance

- Prefer editing existing files over creating new ones.
- Keep components small and props-typed. No `any` — use `unknown` + narrowing.
- Use `astro/zod` (not the deprecated `z` from `astro:content`) and the new Zod v4 helpers (`z.url()`, not `z.string().url()`).
- Run `npm run check` **and** `npm run build` before declaring work done.
- Don't add features, comments, or abstractions that weren't requested.
