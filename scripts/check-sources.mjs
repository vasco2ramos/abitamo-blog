// Fails the build if a post's body cites a stat (a percentage, or a
// decimal-comma/decimal-point figure like "33,5" or "€15,3/m²") but the
// post's frontmatter has no matching `sources` entry. writing-style.md
// mandates every anchoring stat trace to a named, verified primary source
// before anything ships -- this makes that a build-time check instead of a
// manual read-through.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import matter from 'gray-matter';

const CONTENT_DIR = new URL('../src/content/blog', import.meta.url).pathname;
const STAT_PATTERN = /\d+(?:[.,]\d+)?\s?%|\d+[.,]\d+/;

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...walk(full));
    } else if (['.md', '.mdx'].includes(extname(entry))) {
      out.push(full);
    }
  }
  return out;
}

let failed = false;

for (const file of walk(CONTENT_DIR)) {
  const raw = readFileSync(file, 'utf-8');
  const { data, content } = matter(raw);
  const hasStat = STAT_PATTERN.test(content);
  const hasSources = Array.isArray(data.sources) && data.sources.length > 0;

  if (hasStat && !hasSources) {
    failed = true;
    const match = content.match(STAT_PATTERN);
    console.error(
      `[check-sources] ${file}\n  cites a stat ("${match[0]}") but has no "sources" entry in frontmatter.`
    );
  }
}

if (failed) {
  console.error(
    '\n[check-sources] Add a `sources: [{ label, url }]` entry for every anchoring stat before building.'
  );
  process.exit(1);
}

console.log('[check-sources] OK -- every stat-bearing post has a source.');
