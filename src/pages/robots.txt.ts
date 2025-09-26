import type { APIRoute } from "astro";

/**
 * Enhanced Robots.txt Generator for Right Rudder Marketing
 * Optimized for SEO performance, crawler efficiency, and security
 */

interface RobotsConfig {
  baseURL: string;
  environment: "production" | "development" | "staging";
  allowAllCrawlers: boolean;
}

const getEnvironment = (): "production" | "development" | "staging" => {
  const hostname =
    typeof window !== "undefined"
      ? window.location.hostname
      : process.env.PUBLIC_SITE_URL || "";

  if (hostname.includes("rightruddermarketing.com")) return "production";
  if (hostname.includes("staging") || hostname.includes("preview"))
    return "staging";
  return "development";
};

const getRobotsTxt = (config: RobotsConfig) => {
  const { baseURL, environment, allowAllCrawlers } = config;
  const sitemapURL = new URL("sitemap-index.xml", baseURL);
  const rssURL = new URL("rss.xml", baseURL);

  // Base robots.txt content
  let robotsContent = `# Right Rudder Marketing - Robots.txt
# Generated: ${new Date().toISOString()}
# Environment: ${environment}
# Optimized for flight school marketing SEO

`;

  // Main crawler directives
  if (environment === "production" && allowAllCrawlers) {
    robotsContent += `# Allow all well-behaved crawlers
User-agent: *
Allow: /

# Google-specific optimizations
User-agent: Googlebot
Allow: /
Crawl-delay: 1

# Bing crawler settings
User-agent: Bingbot
Allow: /
Crawl-delay: 2

# Yandex crawler (international SEO)
User-agent: YandexBot
Allow: /
Crawl-delay: 3

# Facebook crawler for social sharing
User-agent: facebookexternalhit
Allow: /

# Twitter crawler for card previews
User-agent: Twitterbot
Allow: /

# LinkedIn crawler for professional sharing
User-agent: LinkedInBot
Allow: /

`;
  } else if (environment === "staging") {
    robotsContent += `# Staging environment - Limited crawler access
User-agent: *
Disallow: /

# Allow only Google for staging verification
User-agent: Googlebot
Allow: /
Crawl-delay: 10

`;
  } else {
    robotsContent += `# Development/Preview environment - Block all crawlers
User-agent: *
Disallow: /

`;
  }

  if (environment === "production") {
    robotsContent += `# Security and Privacy Directives
# Block access to sensitive areas
Disallow: /admin/
Disallow: /private/
Disallow: /dashboard/
Disallow: /api/
Disallow: /auth/
Disallow: /_astro/
Disallow: /.well-known/
Disallow: /tmp/
Disallow: /cache/

# Block access to files that shouldn't be indexed
Disallow: /*.json$
Disallow: /*.xml$
Disallow: /*.txt$
Disallow: /*.log$
Disallow: /*.config$
Disallow: /*?*utm_*
Disallow: /*?*ref=*
Disallow: /*?*source=*
Disallow: /*?*medium=*
Disallow: /*?*campaign=*

# Block confirmation and thank you pages from search results
Disallow: /*-confirmation
Disallow: /*-confirmation/
Disallow: /thank-you*
Disallow: /thankyou*

# Block form processing pages
Disallow: /submit*
Disallow: /process*
Disallow: /handler*

# Explicitly allow high-value content
Allow: /blog/
Allow: /blog/*
Allow: /webinars/
Allow: /webinars/*
Allow: /podcasts/
Allow: /podcasts/*
Allow: /resources/
Allow: /resources/*
Allow: /our-flight-schools/
Allow: /our-flight-schools/*
Allow: /about/
Allow: /about/*
Allow: /contact/
Allow: /contact
Allow: /locations/
Allow: /locations/*
Allow: /flight-crew/
Allow: /flight-crew/*
Allow: /flight-school-seo/
Allow: /flight-school-website-design/
Allow: /marketing-system/
Allow: /schedule-call/

# Allow important static assets for rendering
Allow: /*.css$
Allow: /*.js$
Allow: /*.woff$
Allow: /*.woff2$
Allow: /*.jpg$
Allow: /*.jpeg$
Allow: /*.png$
Allow: /*.webp$
Allow: /*.svg$
Allow: /*.gif$

`;

    // Add crawler-specific rules for better performance
    robotsContent += `# Crawler Performance Optimization
# Standard crawl delay for respectful crawling
Crawl-delay: 1

# Request rate limiting (requests per second)
Request-rate: 1/2

# Visit time restrictions (optional - specify hours in UTC)
Visit-time: 0100-0600

`;

    // Add sitemap references
    robotsContent += `# Sitemap References for Enhanced Discovery
Sitemap: ${sitemapURL.href}
Sitemap: ${rssURL.href}

`;

    // Add additional SEO directives
    robotsContent += `# Additional SEO and Accessibility Directives
# Clean URLs are preferred (no trailing slashes for consistency)
# Canonical URLs: https://rightruddermarketing.com

# Host directive for canonical domain preference
Host: rightruddermarketing.com

`;

    // Add bad bot protection
    robotsContent += `# Bad Bot Protection
# Block known problematic crawlers and scrapers
User-agent: AhrefsBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: BLEXBot
Disallow: /

User-agent: PetalBot
Crawl-delay: 86400

User-agent: CCBot
Disallow: /

User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: Claude-Web
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: PerplexityBot
Disallow: /

# Block aggressive SEO tools
User-agent: MajesticSEO
Disallow: /

User-agent: spbot
Disallow: /

User-agent: SiteAuditBot
Disallow: /

`;
  }

  return robotsContent.trim();
};

export const GET: APIRoute = ({ site, request }) => {
  const environment = "production"; // Manually set to production
  const baseURL = site?.toString() || "https://rightruddermarketing.com/";

  const config: RobotsConfig = {
    baseURL,
    environment,
    allowAllCrawlers: environment === "production",
  };

  const robotsContent = getRobotsTxt(config);

  return new Response(robotsContent, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600", // Cache for 1 hour
      "X-Content-Type-Options": "nosniff",
    },
  });
};
