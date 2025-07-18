import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    keywords: z.string().optional(),
    readingTime: z.number().optional(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    type: z.enum(["blog"]).default("blog").optional(),
    status: z.enum(["draft", "published"]).default("published").optional(),
    // Enhanced SEO fields
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    canonicalUrl: z.string().optional(),
    noindex: z.boolean().default(false),
    ogImage: z.string().optional(),
    twitterCard: z
      .enum(["summary", "summary_large_image", "app", "player"])
      .default("summary_large_image")
      .optional(),
    relatedPosts: z.array(z.string()).optional(),
    faq: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        }),
      )
      .optional(),
  }),
});

const webinarCollection = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    keywords: z.string().optional(),
    readingTime: z.number(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    type: z.enum(["webinar"]).default("webinar").optional(),
    status: z.enum(["draft", "published"]).default("published").optional(),
    // Enhanced SEO fields
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    canonicalUrl: z.string().optional(),
    noindex: z.boolean().default(false),
    ogImage: z.string().optional(),
    // Webinar specific fields
    webinarDate: z.coerce.date().optional(),
    duration: z.string().optional(),
    speakers: z.array(z.string()).optional(),
    registrationUrl: z.string().optional(),
  }),
});

const podcastCollection = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    keywords: z.string().optional(),
    readingTime: z.number(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    type: z.enum(["podcast"]).default("podcast").optional(),
    status: z.enum(["draft", "published"]).default("published").optional(),
    // Enhanced SEO fields
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    canonicalUrl: z.string().optional(),
    noindex: z.boolean().default(false),
    ogImage: z.string().optional(),
    // Podcast specific fields
    episodeNumber: z.number().optional(),
    season: z.number().optional(),
    duration: z.string().optional(),
    audioUrl: z.string().optional(),
    transcript: z.string().optional(),
    guests: z
      .array(
        z.object({
          name: z.string(),
          title: z.string().optional(),
          company: z.string().optional(),
          bio: z.string().optional(),
        }),
      )
      .optional(),
  }),
});

const crew = defineCollection({
  schema: z.object({
    name: z.string(),
    slug: z.string().optional(),
    title: z.string(),
    social: z
      .object({
        facebook: z.string().optional(),
        instagram: z.string().optional(),
        linkedin: z.string().optional(),
        twitter: z.string().optional(),
        github: z.string().optional(),
        website: z.string().optional(),
        youtube: z.string().optional(),
      })
      .optional(),
    image: z.string(),
    bio: z.string().optional(),
    status: z.enum(["active", "former", "external"]).default("active"),
    // Enhanced SEO fields for team members
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    expertise: z.array(z.string()).optional(),
    certifications: z.array(z.string()).optional(),
    seniority: z.number().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
  webinars: webinarCollection,
  podcasts: podcastCollection,
  crew: crew,
};
