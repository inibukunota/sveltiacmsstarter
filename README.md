# Astro + Sveltia CMS Starter

A reusable static blog starter built with **Astro**, **Sveltia CMS**, **GitHub**, **Cloudflare Pages**, and **Cloudflare R2**.

## Stack

- **Astro** for the website and static builds
- **Sveltia CMS** for content management
- **GitHub** for content and source control
- **Cloudflare Pages** for deployment
- **Cloudflare R2** for CMS media storage
- **WebP image optimization** before images reach R2

## How It Works

```
Sveltia CMS
    ↓
GitHub → Astro → Cloudflare Pages
    ↓
Cloudflare R2
```

Blog content is saved as Markdown files in `src/content/blog/`. Sveltia commits changes directly to the GitHub repository, which triggers a Cloudflare Pages build.

Images uploaded through Sveltia are optimized in the browser before being uploaded to R2. Raster images such as JPEG and PNG are converted to WebP, resized to a maximum width of 1200px, and compressed at quality 75. EXIF metadata is also removed. This keeps the stored files smaller without needing a separate image-processing Worker.

## CMS

Open:

`/admin/`

The Sveltia configuration is located at:

`public/admin/config.yml`

The blog collection supports:

- Title
- Description
- Publish date
- Updated date
- Hero image
- Rich-text body

Images are stored in the `sveltiacms` R2 bucket under the `cms-uploads/` prefix.

The R2 secret access key is entered in Sveltia and is **not stored in this repository**.

## Project Structure

```
public/
└── admin/
    ├── index.html
    └── config.yml

src/
├── content/
│   └── blog/
└── pages/

astro.config.mjs
package.json
```

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build the production site:

```bash
npm run build
```

The production output is generated in `dist/`.

## Cloudflare Pages

Production deployment uses the `main` branch.

Build command:

```
npm run build
```

Output directory:

```
dist
```

Set `PUBLIC_SITE_URL` in the Cloudflare Pages environment variables when using a custom domain.

## Reusing This Starter

Fork or copy this repository, then update:

1. The GitHub repository in `public/admin/config.yml`
2. The Sveltia CMS GitHub authentication
3. The Cloudflare R2 bucket and credentials
4. The Cloudflare Pages project
5. `PUBLIC_SITE_URL` for the new site

The goal is to provide a simple, repeatable foundation for launching Astro content sites without rebuilding the CMS and deployment setup from scratch.
