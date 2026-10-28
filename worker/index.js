import legacyRedirects from './legacy-redirects.json' with { type: 'json' };

const APP_ORIGIN = 'https://abitamo.com';
const LEGACY_HOST = 'blog.abitamo.com';

// This Worker is not reachable on abitamo.com itself: the apex is proxied to
// Render, which sits behind its own Cloudflare network, and zone Workers do
// not run there. Instead the Rails app proxies the blog paths to this Worker
// and visitors only ever see abitamo.com/{es,pt,en}/blog. The proxy should
// call the workers.dev URL: blog-origin.abitamo.com sits in the abitamo.com
// zone, whose bot protection challenges requests coming from Render.
// See docs/rails-blog-proxy.diff.
//
// Paths that belong to the blog; anything else is a 404 here.
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

    if (!isBlogPath(url.pathname)) return new Response('Not found', { status: 404 });

    const response = await env.ASSETS.fetch(request);

    // Only the Rails proxy should reach this Worker for real traffic. Anyone
    // hitting it directly must not get duplicate content indexed.
    const headers = new Headers(response.headers);
    headers.set('x-robots-tag', 'noindex');
    return new Response(response.body, { status: response.status, headers });
  },
};
