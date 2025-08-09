import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: "https://rightruddermarketing.com/",
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes("/admin/") && !page.includes("/draft/"),
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
    }),
    tailwind(),
    react(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
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
});
