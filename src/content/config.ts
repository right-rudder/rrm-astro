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
  }),
});

const crew = defineCollection({
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    title: z.string(),
    social: z.object({
      facebook: z.string().optional(),
      instagram: z.string().optional(),
      linkedin: z.string().optional(),
      twitter: z.string().optional(),
      github: z.string().optional(),
      website: z.string().optional(),
      youtube: z.string().optional(),
    }).optional(),
    image: z.string(),
    status: z.enum(['active', 'former', 'external']).default('active'),
  }),
});

export const collections = {
  blog: blogCollection,
  webinars: webinarCollection,
  podcasts: podcastCollection,
};
