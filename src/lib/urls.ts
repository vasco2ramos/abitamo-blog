// Spanish is the primary market/company voice, so it gets the unprefixed
// canonical path; pt/en translations are prefixed by language. Keep this in
// sync with the routing logic in src/pages/[...slug].astro.
export function postPath(lang: string, slug: string): string {
  return lang === 'es' ? `/${slug}` : `/${lang}/${slug}`;
}

export function postUrl(site: URL | undefined, lang: string, slug: string): string {
  return new URL(postPath(lang, slug), site).toString();
}
