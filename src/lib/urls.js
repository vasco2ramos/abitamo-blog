// Plain JS (with JSDoc types) rather than TS so the Node scripts in
// scripts/ and astro.config.mjs can import it without a TS loader.
//
// The blog lives on abitamo.com under the app's locale prefixes:
// /es/blog, /pt/blog, /en/blog (see worker/index.js, which serves them).
// `slug` in frontmatter is the translation key shared by a post's siblings;
// `urlSlug` (optional) is the language-specific path segment, defaulting to
// `slug` (so the Spanish originals need no extra field).

/** @typedef {'es' | 'pt' | 'en'} Lang */
/** @typedef {{ lang: string, slug: string, urlSlug?: string }} PostRef */

/** @type {Lang[]} */
export const LANGS = ['es', 'pt', 'en'];

/** @param {string} lang */
export function blogIndexPath(lang) {
  return `/${lang}/blog`;
}

/** @param {PostRef} post */
export function postPath({ lang, slug, urlSlug }) {
  return `${blogIndexPath(lang)}/${urlSlug ?? slug}`;
}

/**
 * @param {URL | string | undefined} site
 * @param {PostRef} post
 */
export function postUrl(site, post) {
  return new URL(postPath(post), site).toString();
}

// URLs the post has had on blog.abitamo.com, for the 301 map in
// worker/legacy-redirects.json: the original layout (Spanish at the root,
// pt/en reusing the Spanish slug) and the interim translated-slug layout.
/** @param {PostRef} post */
export function legacyPaths({ lang, slug, urlSlug }) {
  const original = lang === 'es' ? `/${slug}` : `/${lang}/${slug}`;
  const seg = urlSlug ?? slug;
  const translated = lang === 'es' ? `/${seg}` : `/${lang}/${seg}`;
  return [...new Set([original, translated])];
}

// Locale prefix on abitamo.com (Rails app), which always uses /es, /pt, /en.
/**
 * @param {string} lang
 * @param {string} [path]
 */
export function appUrl(lang, path = '') {
  return `https://abitamo.com/${lang}${path}`;
}

/** @param {string} lang */
export function hreflangCode(lang) {
  return /** @type {Record<string, string>} */ ({ es: 'es-ES', pt: 'pt-PT', en: 'en' })[lang] ?? lang;
}
