import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  // A custom generateId keeps each entry's id as its full relative path
  // (e.g. "es/certificado-inquilino"). Without it, the glob loader
  // auto-detects a frontmatter `slug` field and uses THAT as the entry id --
  // which collides here, since translated siblings intentionally share the
  // same `slug` value to mark themselves as the same post.
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/blog',
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    // Shared identifier across a post's es/pt/en siblings, used to build
    // hreflang alternates. Defaults to the post's own slug for posts with
    // no translations.
    slug: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    lang: z.enum(['es', 'pt', 'en']),
    pillar: z.enum([
      'trust-gap',
      'regulation',
      'data-authority',
      'product-education',
      'founder-story',
    ]),
    // true = built locally, excluded from sitemap/listing, not linked
    // anywhere -- but still deployed and reachable by direct URL for preview.
    draft: z.boolean().default(false),
    // Required (non-empty) whenever the post body cites a stat -- enforced
    // by scripts/check-sources.mjs at build time, not by this schema alone,
    // since the schema only sees frontmatter, not the rendered body.
    sources: z
      .array(
        z.object({
          label: z.string(),
          url: z.string().url(),
        })
      )
      .default([]),
    canonicalUrl: z.string().url().optional(),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    // When present, BlogPost.astro emits a FAQPage JSON-LD block alongside
    // the Article schema.
    faq: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        })
      )
      .optional(),
  }),
});

export const collections = { blog };
