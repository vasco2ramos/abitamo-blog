import legacyRedirects from './legacy-redirects.json' with { type: 'json' };

const APP_ORIGIN = 'https://abitamo.com';
const LEGACY_HOST = 'blog.abitamo.com';

// Paths on abitamo.com that belong to the blog; everything else is the
// Rails app's. wrangler.toml's `routes` already narrow what reaches this
// Worker, so this is the second line of defence (e.g. `/es/blogger` matches
// the `/es/blog*` route but is not ours).
const BLOG_PATH = /^\/(es|pt|en)\/blog(\/|$)/;
const BLOG_ASSETS = /^\/blog-assets\//;
const BLOG_SITEMAP = /^\/blog-sitemap(-index|-\d+)?\.xml$/;

function isBlogPath(pathname) {
  return BLOG_PATH.test(pathname) || BLOG_ASSETS.test(pathname) || BLOG_SITEMAP.test(pathname);
}

function redirect(target, request) {
  const url = new URL(request.url);
  return Response.redirect(`${APP_ORIGIN}${target}${url.search}`, 301);
}

// blog.abitamo.com: everything 301s to its new address on abitamo.com.
function handleLegacyHost(request) {
  const { pathname } = new URL(request.url);
  const path = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname;

  if (legacyRedirects[path]) return redirect(legacyRedirects[path], request);

  // Assets that were once linked from outside (social images, videos).
  if (/^\/(images|videos)\//.test(path)) return redirect(`/blog-assets${path}`, request);
  if (/^\/sitemap(-index|-\d+)\.xml$/.test(path)) {
    return redirect(path.replace('/sitemap', '/blog-sitemap'), request);
  }
  if (path === '/robots.txt') {
    return new Response('User-agent: *\nAllow: /\n', { headers: { 'content-type': 'text/plain' } });
  }
  return new Response('Not found', { status: 404 });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === LEGACY_HOST) return handleLegacyHost(request);

    if (isBlogPath(url.pathname)) return env.ASSETS.fetch(request);

    // Not ours: hand the request to the origin (the Rails app).
    return fetch(request);
  },
};
