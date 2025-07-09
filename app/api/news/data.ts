import { z } from "zod"

// News item schema
const newsSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  content: z.string(),
  image: z.string().url(),
  category: z.string(),
  author: z.string(),
  publishedAt: z.string(),
  readTime: z.number(),
  tags: z.array(z.string()),
})

export type NewsItem = z.infer<typeof newsSchema>

// Mock database
export const newsItems: NewsItem[] = [
  {
    id: "1",
    title: "Introduction to Python Programming",
    description: "Learn the basics of Python programming language",
    content: "Python is a versatile programming language that's great for beginners...",
    image: "https://cdn.wccftech.com/wp-content/uploads/2023/11/python.jpg",
    category: "programming",
    author: "John Doe",
    publishedAt: new Date().toISOString(),
    readTime: 5,
    tags: ["python", "programming", "beginners"],
  },
  {
    id: "2",
    title: "Web Development with React",
    description: "Master modern web development with React",
    content: "React is a popular JavaScript library for building user interfaces...",
    image: "https://cdn.wccftech.com/wp-content/uploads/2023/11/react.jpg",
    category: "web-development",
    author: "Jane Smith",
    publishedAt: new Date().toISOString(),
    readTime: 7,
    tags: ["react", "javascript", "web-development"],
  },
] 