import { z } from "zod"

// News schema
export const newsSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  excerpt: z.string(),
  image: z.string().optional(),
  category: z.string(),
  author: z.string(),
  publishedAt: z.string(),
  updatedAt: z.string(),
})

export type NewsItem = z.infer<typeof newsSchema>

// Category schema
export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  slug: z.string(),
})

export type Category = z.infer<typeof categorySchema> 