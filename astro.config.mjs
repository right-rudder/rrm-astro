import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  site: "https://rightruddermarketing.com/",

  integrations: [
    mdx(),
    sitemap({
      // Advanced filtering for better SEO
      filter: (page) => {
        // Exclude admin, draft, and confirmation pages
        if (
          page.includes("/admin/") ||
          page.includes("/draft/") ||
          page.includes("-confirmation")
        ) {
          return false;
        }

        // Exclude utility pages that shouldn't be indexed
        const excludePages = [
          "/404",
          "/500",
          "/terms-of-service",
          "/privacy-policy",
          "/thank-you",
        ];

        return !excludePages.some((exclude) => page.includes(exclude));
      },

      // Dynamic priority and change frequency based on page type
      serialize(item) {
        const url = new URL(item.url);
        const path = url.pathname;

        // Homepage - highest priority
        if (path === "/") {
          return {
            ...item,
            changefreq: "daily",
            priority: 1.0,
            lastmod: new Date(),
          };
        }

        // Core service pages - very high priority
        if (
          path.includes("/flight-school-seo") ||
          path.includes("/flight-school-website-design") ||
          path.includes("/marketing-system") ||
          path.includes("/contact")
        ) {
          return {
            ...item,
            changefreq: "weekly",
            priority: 0.9,
            lastmod: new Date(),
          };
        }

        // Blog posts - high priority, frequent updates
        if (path.includes("/blog/") && path !== "/blog/") {
          return {
            ...item,
            changefreq: "monthly",
            priority: 0.8,
            lastmod: new Date(),
          };
        }

        // Blog index and main sections
        if (path === "/blog/" || path === "/about/" || path === "/resources/") {
          return {
            ...item,
            changefreq: "weekly",
            priority: 0.8,
            lastmod: new Date(),
          };
        }

        // Podcasts and webinars - medium-high priority
        if (path.includes("/podcasts/") || path.includes("/webinars/")) {
          return {
            ...item,
            changefreq: "monthly",
            priority: 0.7,
            lastmod: new Date(),
          };
        }

        // Location and team pages - medium priority
        if (path.includes("/locations/") || path.includes("/flight-crew/")) {
          return {
            ...item,
            changefreq: "monthly",
            priority: 0.6,
            lastmod: new Date(),
          };
        }

        // Client case studies - medium priority
        if (path.includes("/our-flight-schools/")) {
          return {
            ...item,
            changefreq: "monthly",
            priority: 0.6,
            lastmod: new Date(),
          };
        }

        // Resource pages - medium priority
        if (path.includes("/resources/")) {
          return {
            ...item,
            changefreq: "monthly",
            priority: 0.5,
            lastmod: new Date(),
          };
        }

        // Default for other pages
        return {
          ...item,
          changefreq: "monthly",
          priority: 0.4,
          lastmod: new Date(),
        };
      },

      // Add custom entries for dynamic content
      customPages: [
        "https://rightruddermarketing.com/blog",
        "https://rightruddermarketing.com/podcasts",
        "https://rightruddermarketing.com/webinars",
        "https://rightruddermarketing.com/locations",
        "https://rightruddermarketing.com/our-flight-schools",
        "https://rightruddermarketing.com/about/who-we-are",
        "https://rightruddermarketing.com/about/partners-affiliates",
        "https://rightruddermarketing.com/resources/flight-school-keywords",
        "https://rightruddermarketing.com/resources/marketing-checklist",
      ],
    }),
    tailwind(),
    react(),
  ],

  // Performance optimizations
  vite: {
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          assetFileNames: "assets/[name]-[hash][extname]",
          chunkFileNames: "assets/[name]-[hash].js",
          entryFileNames: "assets/[name]-[hash].js",
        },
      },
    },
    ssr: {
      external: ["react-icons"],
    },
  },

  // Image optimization
  image: {
    domains: ["rightruddermarketing.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rightruddermarketing.com",
      },
    ],
  },

  // Compression and optimization
  compressHTML: true,

  build: {
    inlineStylesheets: "auto",
    assets: "_astro",
  },

  redirects: {
    // View previous sitemap and Google Search Console and place redirects from old routes to new routes here
    /*     "/notams": "/blog",
    "/notams/new-rules-of-marketing-in-2024-for-flight-schools":
      "/webinars/new-rules-of-marketing-in-2024-for-flight-schools",
    "/notams/how-flight-schedule-pro-helps-grow-flight-schools-in-america":
      "/webinars",
    "/our-team": "/about/who-we-are",
    "/mission-and-vision": "/about/who-we-are",
    "/core-values": "/about/who-we-are",
    "/notams/[...slug]": "/blog/[...slug]",
    "/flight-school-hot-aviation-keyword-list":
      "/resources/flight-school-keywords",
    "/flight-school-marketing-checklist": "/resources/marketing-checklist",
    "flight-school-sop-template": "/resources/sop-templates",
    "/flight-school-google-my-business": "/resources/gmb",
    "/partners-affiliates-sponsors": "/about/partners-affiliates",
    "/investors": "/about/investors",
    "/careers": "/about/careers",
    "/contact-us": "/contact",
    "/keywords": "/resources/flight-school-keywords",
    "search-engine-optimization": "/flight-school-seo",
    "/flight-crew": "/about/who-we-are",
    "/webinars/your-2025-digital-marketing-plan-for-flight-school-businesses":
      "/webinars/your-2026-digital-marketing-plan-for-flight-school-businesses/", */
  },

  adapter: netlify(),
});