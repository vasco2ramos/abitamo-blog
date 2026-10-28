// Spanish is the primary market/company voice, so it gets the unprefixed
// canonical path; pt/en translations are prefixed by language. Keep this in
// sync with the routing logic in src/pages/[...slug].astro.
//
// `slug` in frontmatter is the translation key shared by a post's siblings;
// `urlSlug` (optional) is the language-specific path segment, defaulting to
// `slug` (so the Spanish originals need no extra field).
export type Lang = 'es' | 'pt' | 'en';

export const LANGS: Lang[] = ['es', 'pt', 'en'];

export interface PostRef {
  lang: string;
  slug: string;
  urlSlug?: string;
}

export function postPath({ lang, slug, urlSlug }: PostRef): string {
  const segment = urlSlug ?? slug;
  return lang === 'es' ? `/${segment}` : `/${lang}/${segment}`;
}

export function postUrl(site: URL | string | undefined, post: PostRef): string {
  return new URL(postPath(post), site).toString();
}

// Locale prefix on abitamo.com (Rails app), which always uses /es, /pt, /en.
export function appUrl(lang: string, path = ''): string {
  return `https://abitamo.com/${lang}${path}`;
}

export function hreflangCode(lang: string): string {
  return { es: 'es-ES', pt: 'pt-PT', en: 'en' }[lang] ?? lang;
}
