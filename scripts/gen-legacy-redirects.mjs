// Writes worker/legacy-redirects.json: every URL a post has ever had on
// blog.abitamo.com -> its address on abitamo.com. The Worker serves these as
// 301s. Runs before each build so a renamed slug can't go stale; the file is
// committed so the Worker can be deployed without running the build.
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, extname } from 'node:path';
import matter from 'gray-matter';
import { postPath, blogIndexPath, legacyPaths } from '../src/lib/urls.js';

const CONTENT_DIR = new URL('../src/content/blog', import.meta.url).pathname;
const OUT = new URL('../worker/legacy-redirects.json', import.meta.url).pathname;

const posts = [];
const walk = (dir) => {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full);
    else if (['.md', '.mdx'].includes(extname(entry))) posts.push(matter(readFileSync(full, 'utf-8')).data);
  }
};
walk(CONTENT_DIR);

const map = { '/': blogIndexPath('es') };
for (const post of posts) {
  for (const old of legacyPaths(post)) map[old] = postPath(post);
}
const sorted = Object.fromEntries(Object.entries(map).sort(([a], [b]) => a.localeCompare(b)));
writeFileSync(OUT, JSON.stringify(sorted, null, 2) + '\n');
console.log(`[gen-legacy-redirects] ${Object.keys(sorted).length} redirects -> worker/legacy-redirects.json`);
