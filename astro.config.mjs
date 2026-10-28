import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import matter from 'gray-matter';
import { postUrl, hreflangCode } from './src/lib/urls.ts';

// `draft: true` posts must still build and be reachable by direct URL (for
// preview), just excluded from the sitemap, hreflang and the listing page.
// The listing page filters itself in src/pages/index.astro; the sitemap side
// pre-scans frontmatter here (content collections aren't available
// synchronously in the config file).
//
// The same scan feeds <lastmod> and the xhtml:link hreflang alternates.
// @astrojs/sitemap's built-in `i18n` option can't be used for the
// alternates: it groups translations by identical path after stripping the
// locale prefix, and PT/EN posts now have translated slugs.
const CONTENT_DIR = new URL('./src/content/blog', import.meta.url).pathname;
const SITE = 'https://blog.abitamo.com';

function scanPosts() {
  const posts = [];
  const walk = (dir) => {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) {
        walk(full);
      } else if (['.md', '.mdx'].includes(extname(entry))) {
        const { data } = matter(readFileSync(full, 'utf-8'));
        posts.push(data);
      }
    }
  };
  walk(CONTENT_DIR);
  return posts;
}

const toDay = (d) => new Date(d).toISOString().slice(0, 10);
const published = scanPosts().filter((p) => !p.draft);
const drafts = scanPosts().filter((p) => p.draft);
const excludedFromSitemap = new Set(drafts.map((p) => postUrl(SITE, p)));

const pageMeta = new Map();
for (const post of published) {
  const siblings = published.filter((p) => p.slug === post.slug);
  const defaultSibling = ['es', 'pt', 'en'].map((l) => siblings.find((p) => p.lang === l)).find(Boolean);
  const links = siblings.map((p) => ({ url: postUrl(SITE, p), lang: hreflangCode(p.lang) }));
  links.push({ url: postUrl(SITE, defaultSibling), lang: 'x-default' });
  pageMeta.set(postUrl(SITE, post), {
    lastmod: toDay(post.updatedDate ?? post.publishDate),
    links: siblings.length > 1 ? links : undefined,
  });
}
const homeLastmod = [...pageMeta.values()].map((m) => m.lastmod).sort().at(-1);

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
      serialize(item) {
        if (item.url === `${SITE}/`) return { ...item, lastmod: homeLastmod };
        const meta = pageMeta.get(item.url);
        return meta ? { ...item, lastmod: meta.lastmod, links: meta.links } : item;
      },
    }),
  ],
});
