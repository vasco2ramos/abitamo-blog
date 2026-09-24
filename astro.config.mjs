import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import matter from 'gray-matter';
import { postUrl } from './src/lib/urls.ts';

// `draft: true` posts must still build and be reachable by direct URL (for
// preview), just excluded from the sitemap and the listing page -- the
// listing page filters itself in src/pages/index.astro, this does the
// sitemap side by pre-scanning frontmatter (content collections aren't
// available synchronously here in the config file).
const CONTENT_DIR = new URL('./src/content/blog', import.meta.url).pathname;

function draftUrls() {
  const urls = [];
  const walk = (dir) => {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) {
        walk(full);
      } else if (['.md', '.mdx'].includes(extname(entry))) {
        const { data } = matter(readFileSync(full, 'utf-8'));
        if (data.draft) {
          urls.push(postUrl(new URL('https://blog.abitamo.com'), data.lang, data.slug));
        }
      }
    }
  };
  walk(CONTENT_DIR);
  return urls;
}

const excludedFromSitemap = new Set(draftUrls());

// Site is blog.abitamo.com (subdomain, not abitamo.com/blog/*) -- every
// route lives at src/pages/ root and the Worker is attached to that
// hostname via wrangler.toml's `routes` (custom_domain = true).
export default defineConfig({
  site: 'https://blog.abitamo.com',
  trailingSlash: 'never',
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !excludedFromSitemap.has(page),
    }),
  ],
});
