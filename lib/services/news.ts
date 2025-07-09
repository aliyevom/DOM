import type { NewsItem, Category } from "@/types/news"

interface NewsResponse {
  items: NewsItem[]
  total: number
  page: number
  limit: number
  totalPages: number
}

interface CategoriesResponse {
  items: Category[]
  total: number
}

export class NewsServiceError extends Error {
  constructor(
    message: string,
    public status: number = 500
  ) {
    super(message)
    this.name = "NewsServiceError"
  }
}

export async function getNews(page = 1, limit = 10): Promise<NewsResponse> {
  // Mock data for static export
  const mockNews: NewsItem[] = [
    {
      id: "1",
      title: "New Programming Course for Kids",
      content: "We are excited to announce our new programming course designed specifically for kids aged 8-12...",
      excerpt: "Introducing a new programming course for young minds",
      image: "/images/news/programming-course.jpg",
      category: "courses",
      author: "Jane Smith",
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    // Add more mock news as needed
  ]

  return {
    items: mockNews,
    total: mockNews.length,
    page,
    limit,
    totalPages: Math.ceil(mockNews.length / limit),
  }
}

export async function getCategories(): Promise<CategoriesResponse> {
  // Mock data for static export
  const mockCategories: Category[] = [
    {
      id: "1",
      name: "Courses",
      description: "Updates about our courses",
      slug: "courses",
    },
    {
      id: "2",
      name: "Events",
      description: "Upcoming and past events",
      slug: "events",
    },
    // Add more mock categories as needed
  ]

  return {
    items: mockCategories,
    total: mockCategories.length,
  }
}

export async function searchNews(query: string, page = 1, limit = 10): Promise<NewsResponse> {
  // Mock search functionality for static export
  const allNews = await getNews(1, 100)
  const filteredNews = allNews.items.filter(
    (news) =>
      news.title.toLowerCase().includes(query.toLowerCase()) ||
      news.content.toLowerCase().includes(query.toLowerCase())
  )

  return {
    items: filteredNews.slice((page - 1) * limit, page * limit),
    total: filteredNews.length,
    page,
    limit,
    totalPages: Math.ceil(filteredNews.length / limit),
  }
}

export async function getNewsByCategory(categorySlug: string, page = 1, limit = 10): Promise<NewsResponse> {
  // Mock category filtering for static export
  const allNews = await getNews(1, 100)
  const filteredNews = allNews.items.filter(
    (news) => news.category === categorySlug
  )

  return {
    items: filteredNews.slice((page - 1) * limit, page * limit),
    total: filteredNews.length,
    page,
    limit,
    totalPages: Math.ceil(filteredNews.length / limit),
  }
} 