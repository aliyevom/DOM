import { useCallback, useState } from "react"
import { toast } from "sonner"
import { getNews, getCategories, searchNews, getNewsByCategory, NewsServiceError } from "@/lib/services/news"
import type { NewsItem, Category } from "@/types/news"

const ITEMS_PER_PAGE = 10

interface UseNewsState {
  news: NewsItem[]
  categories: Category[]
  loading: boolean
  error: string | null
  currentPage: number
  totalPages: number
  totalItems: number
  selectedCategory: string | null
  searchQuery: string | null
}

export function useNews() {
  const [state, setState] = useState<UseNewsState>({
    news: [],
    categories: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    selectedCategory: null,
    searchQuery: null,
  })

  const fetchNews = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }))
    try {
      const response = await getNews(state.currentPage, ITEMS_PER_PAGE)
      setState((prev) => ({
        ...prev,
        loading: false,
        news: response.items,
        total: response.total,
        totalPages: response.totalPages,
      }))
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : "Failed to fetch news",
      }))
      toast.error("Failed to fetch news")
    }
  }, [state.currentPage])

  const fetchCategories = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }))
    try {
      const response = await getCategories()
      setState((prev) => ({
        ...prev,
        loading: false,
        categories: response.items,
      }))
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : "Failed to fetch categories",
      }))
      toast.error("Failed to fetch categories")
    }
  }, [])

  const search = useCallback(async (query: string) => {
    setState((prev) => ({ ...prev, loading: true, error: null, searchQuery: query }))
    try {
      const response = await searchNews(query, state.currentPage, ITEMS_PER_PAGE)
      setState((prev) => ({
        ...prev,
        loading: false,
        news: response.items,
        total: response.total,
        totalPages: response.totalPages,
      }))
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : "Failed to search news",
      }))
      toast.error("Failed to search news")
    }
  }, [state.currentPage])

  const filterByCategory = useCallback(async (category: string | null) => {
    setState((prev) => ({ ...prev, loading: true, error: null, selectedCategory: category }))
    try {
      const response = category
        ? await getNewsByCategory(category, state.currentPage, ITEMS_PER_PAGE)
        : await getNews(state.currentPage, ITEMS_PER_PAGE)
      setState((prev) => ({
        ...prev,
        loading: false,
        news: response.items,
        total: response.total,
        totalPages: response.totalPages,
      }))
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : "Failed to filter news",
      }))
      toast.error("Failed to filter news")
    }
  }, [state.currentPage])

  const loadMore = useCallback(async () => {
    if (state.loading || state.currentPage >= state.totalPages) return

    setState((prev) => ({ ...prev, loading: true, error: null }))
    try {
      const response = state.selectedCategory
        ? await getNewsByCategory(state.selectedCategory, state.currentPage + 1, ITEMS_PER_PAGE)
        : state.searchQuery
        ? await searchNews(state.searchQuery, state.currentPage + 1, ITEMS_PER_PAGE)
        : await getNews(state.currentPage + 1, ITEMS_PER_PAGE)

      setState((prev) => ({
        ...prev,
        loading: false,
        news: [...prev.news, ...response.items],
        currentPage: prev.currentPage + 1,
      }))
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : "Failed to load more news",
      }))
      toast.error("Failed to load more news")
    }
  }, [state.loading, state.currentPage, state.totalPages, state.selectedCategory, state.searchQuery])

  return {
    ...state,
    fetchNews,
    fetchCategories,
    search,
    filterByCategory,
    loadMore,
  }
} 