import type { APIRoute } from "astro";

const getRobotsTxt = (sitemapURL: URL) => `
User-agent: *
Allow: /

# Enhanced SEO directives for Right Rudder Marketing
# Disallow admin and sensitive pages
Disallow: /admin/
Disallow: /private/
Disallow: /_astro/
Disallow: /api/
Disallow: /*.json$

# Allow important marketing pages
Allow: /blog/
Allow: /webinars/
Allow: /podcasts/
Allow: /resources/
Allow: /our-flight-schools/
Allow: /about/
Allow: /contact

# Crawl delay to be respectful
Crawl-delay: 1

# Sitemap location
Sitemap: ${sitemapURL.href}

# Additional sitemaps for better indexing
Sitemap: ${new URL("rss.xml", sitemapURL.origin).href}
`;

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL("sitemap-index.xml", site);
  return new Response(getRobotsTxt(sitemapURL));
};
