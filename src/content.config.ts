import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const blog = defineCollection({
	// Load Markdown and MDX files in the src/content/blog/ directory.
	loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		// Sveltia can save an optional datetime field as an empty string.
		// Treat an empty value as missing instead of an invalid date.
		updatedDate: z.preprocess(
			(value) => (value === "" ? undefined : value),
			z.coerce.date().optional(),
		),
		heroImage: z.string().optional(),
	}),
});

export const collections = { blog };
