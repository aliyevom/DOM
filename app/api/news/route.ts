import { NextResponse } from "next/server"
import { z } from "zod"
import { newsItems } from "./data"

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

export const dynamic = "force-static"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")

    let filteredNews = [...newsItems]

    // Apply category filter if provided
    if (category) {
      filteredNews = filteredNews.filter(item => item.category === category)
    }

    // Calculate pagination
    const start = (page - 1) * limit
    const end = start + limit
    const paginatedNews = filteredNews.slice(start, end)

    return NextResponse.json({
      items: paginatedNews,
      total: filteredNews.length,
      page,
      totalPages: Math.ceil(filteredNews.length / limit),
    })
  } catch (error) {
    console.error("Error fetching news:", error)
    return NextResponse.json(
      { error: "Failed to fetch news items" },
      { status: 500 }
    )
  }
} 