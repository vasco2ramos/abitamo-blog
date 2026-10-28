import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import matter from 'gray-matter';
import { postUrl, blogIndexPath, hreflangCode, LANGS } from './src/lib/urls.js';

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
const SITE = 'https://abitamo.com';

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

// Per-language listing pages: lastmod is the newest post in that language,
// alternates are the other languages' listings.
const indexLinks = [
  ...LANGS.map((l) => ({ url: `${SITE}${blogIndexPath(l)}`, lang: hreflangCode(l) })),
  { url: `${SITE}${blogIndexPath('es')}`, lang: 'x-default' },
];
for (const lang of LANGS) {
  const lastmods = published.filter((p) => p.lang === lang).map((p) => toDay(p.updatedDate ?? p.publishDate));
  pageMeta.set(`${SITE}${blogIndexPath(lang)}`, { lastmod: lastmods.sort().at(-1), links: indexLinks });
}

// The blog is served from abitamo.com/{es,pt,en}/blog by the Worker in
// worker/index.js (config in wrangler.toml). Routes live at the dist root
// (dist/es/blog/...), and every asset sits under /blog-assets/ so the
// Worker's routes can claim a narrow set of paths and leave the Rails app's
// own /assets, /images etc. alone.
export default defineConfig({
  site: SITE,
  trailingSlash: 'never',
  build: { assets: 'blog-assets/_astro' },
  integrations: [
    mdx(),
    sitemap({
      filenameBase: 'blog-sitemap',
      filter: (page) => !excludedFromSitemap.has(page),
      serialize(item) {
        const meta = pageMeta.get(item.url);
        return meta ? { ...item, lastmod: meta.lastmod, links: meta.links } : item;
      },
    }),
  ],
});
