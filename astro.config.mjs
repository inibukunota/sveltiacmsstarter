// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

const site = process.env.PUBLIC_SITE_URL || "https://sveltiacmsstarter.pages.dev";

export default defineConfig({
	site,
	integrations: [mdx(), sitemap()],
});
