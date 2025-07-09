import { NextResponse } from "next/server"
import { z } from "zod"

export const dynamic = "force-static"

// Category schema
const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  count: z.number(),
})

export type Category = z.infer<typeof categorySchema>

// Mock categories database
const categories: Category[] = [
  {
    id: "1",
    name: "Programming",
    slug: "programming",
    description: "Learn various programming languages and concepts",
    count: 10,
  },
  {
    id: "2",
    name: "Web Development",
    slug: "web-development",
    description: "Modern web development technologies and frameworks",
    count: 8,
  },
  {
    id: "3",
    name: "Robotics",
    slug: "robotics",
    description: "Robotics and automation technologies",
    count: 5,
  },
  {
    id: "4",
    name: "Artificial Intelligence",
    slug: "ai",
    description: "AI and machine learning concepts",
    count: 7,
  },
]

export async function GET() {
  try {
    return NextResponse.json({
      categories,
      total: categories.length,
    })
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    )
  }
} 