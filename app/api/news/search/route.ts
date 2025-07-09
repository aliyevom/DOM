import { NextResponse } from "next/server"
import { newsItems, type NewsItem } from "../data"

export const dynamic = "force-static"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")?.toLowerCase() || ""
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")

    if (!query) {
      return NextResponse.json(
        { error: "Search query is required" },
        { status: 400 }
      )
    }

    // Search in title, description, content, and tags
    const searchResults = newsItems.filter((item: NewsItem) => {
      const searchableText = [
        item.title.toLowerCase(),
        item.description.toLowerCase(),
        item.content.toLowerCase(),
        ...item.tags.map((tag: string) => tag.toLowerCase()),
      ].join(" ")

      return searchableText.includes(query)
    })

    // Calculate pagination
    const start = (page - 1) * limit
    const end = start + limit
    const paginatedResults = searchResults.slice(start, end)

    return NextResponse.json({
      items: paginatedResults,
      total: searchResults.length,
      page,
      totalPages: Math.ceil(searchResults.length / limit),
    })
  } catch (error) {
    console.error("Error searching news:", error)
    return NextResponse.json(
      { error: "Failed to search news items" },
      { status: 500 }
    )
  }
} 