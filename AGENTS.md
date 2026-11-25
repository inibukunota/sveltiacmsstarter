# AGENTS.md

## Purpose

This repository is a beginner-friendly website starter designed for AI-assisted development ("vibe coding").

The goal is to let a non-technical website owner:
- Manage content through Sveltia CMS.
- Ask an AI coding assistant to customise the website.
- Publish through GitHub and Cloudflare Pages.
- Store optimised media in Cloudflare R2.

Keep the project simple, readable, predictable and easy for both humans and AI agents to understand.

## Technology

- Astro 5 for the website and static builds.
- Markdown/MDX for content.
- Sveltia CMS for content management.
- GitHub for source control and CMS commits.
- Cloudflare Pages for deployment.
- Cloudflare R2 for media storage.
- TypeScript only where it provides a clear benefit.

Do not introduce React, Vue, another frontend framework, a CSS framework, a database or a backend service unless the project requirements genuinely need it.

## Architecture

The intended flow is:

```
Sveltia CMS
   ├── content → GitHub → Astro → Cloudflare Pages
   └── media → browser optimisation → Cloudflare R2
```

Sveltia is the content interface. AI is the development/customisation interface.

Content should remain separate from presentation. Blog posts belong in `src/content/blog/`; do not hard-code normal editorial content into page templates.

## Project Structure

- `src/pages/` - routes and page templates.
- `src/content/` - CMS-managed content.
- `src/components/` - reusable UI components.
- `src/layouts/` - shared page layouts.
- `src/styles/` - global and shared styling, when present.
- `public/` - static files and Sveltia CMS.
- `public/admin/index.html` - Sveltia CMS entry point.
- `public/admin/config.yml` - Sveltia CMS configuration.
- `astro.config.mjs` - Astro configuration.
- `package.json` - scripts and dependencies.

If a new feature does not clearly fit the existing structure, prefer a simple conventional location over creating a new architectural layer.

## AI Development Rules

Before making changes:

1. Inspect the existing implementation.
2. Reuse existing components, styles and patterns where possible.
3. Understand the relevant content schema and CMS configuration.
4. Make the smallest change that properly solves the request.
5. Keep code readable enough for a beginner to follow.

Do not rewrite working parts of the project just to use a different approach.

Prefer:
- Simple Astro components.
- Semantic HTML.
- Small reusable components where repetition exists.
- CSS that is easy to locate and modify.
- Clear filenames and descriptive variables.
- Existing dependencies over adding new ones.

Avoid:
- Unnecessary abstractions.
- Deep component hierarchies.
- Duplicate implementations.
- Large dependencies for small features.
- Hidden behaviour or clever code that is difficult to explain.

When a user asks for a visual or content change, modify the relevant component, page or stylesheet rather than rebuilding the architecture.

## CMS and Content

Sveltia CMS is the primary interface for managing editorial content.

Do not change the content schema or Sveltia field names without checking how the Astro content collection uses them.

The current blog fields are:
- `title`
- `description`
- `pubDate`
- `updatedDate`
- `heroImage`
- `body`

Blog content is stored under `src/content/blog/`.

## Images

Sveltia performs raster image optimisation in the browser before upload to R2.

Current transformation:
- WebP
- Maximum width: 1200px
- Quality: 75
- EXIF metadata removed by the client-side processing

Do not add another image-processing Worker or pipeline unless there is a specific requirement that the existing Sveltia transformation cannot satisfy.

Animated images are handled according to Sveltia's media transformation behaviour. Do not assume every image format is converted to WebP.

## SEO and Accessibility

Preserve the site's existing SEO foundations when modifying pages.

Do not remove or weaken:
- Semantic HTML.
- Page titles and descriptions.
- Canonical URLs.
- Sitemap generation.
- Responsive behaviour.
- Accessible links, buttons and form controls.

When adding a new page or content type, consider its metadata, heading structure, internal links and accessibility.

Do not add SEO features simply for the sake of adding them. Prefer useful, standards-based implementation.

## Dependencies

Before adding a dependency, ask whether the requirement can be solved with existing Astro, HTML, CSS or browser capabilities.

If a dependency is necessary:
- Use a well-maintained package.
- Keep the implementation minimal.
- Update `package.json` and the lockfile.
- Explain why it is needed.

Do not replace the existing stack with another framework without an explicit requirement.

## Configuration and Secrets

Never commit secret keys, tokens or passwords.

Do not expose Cloudflare R2 secret access keys in source files, documentation or commits.

The Sveltia CMS configuration may contain non-secret identifiers such as repository names, bucket names, account IDs and public URLs. Treat credentials separately and keep actual secrets out of Git.

## Git and Deployment

The production branch is `main`.

Normal flow:

```
AI or developer
    ↓
Git change
    ↓
GitHub
    ↓
Cloudflare Pages
    ↓
Live website
```

Do not modify Cloudflare deployment settings unless the task requires it.

After meaningful code changes, run:

```bash
npm run build
```

If the project has a relevant type or validation check, run it as well.

Do not claim a change works unless it has been tested or the limitation is clearly stated.

## Definition of Done

A change is generally complete when:
- The requested behaviour is implemented.
- Existing CMS/content functionality still works.
- The project builds successfully.
- No unnecessary dependency or architectural complexity was introduced.
- The code remains understandable to a beginner and future AI agents.
- Changes are committed when the user asks for a commit.

## Guiding Principle

This is a starter, not a showcase of technical complexity.

When choosing between a clever solution and a simple solution that is easier for a beginner and an AI to understand, choose the simple solution.
