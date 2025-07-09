import { useCallback, useState } from "react"
import { toast } from "sonner"
import {
  getApplications,
  getApplication,
  updateApplication,
  deleteApplication,
  ApplicationServiceError,
  createApplication,
  updateApplicationStatus,
} from "@/lib/services/application"
import type { Application } from "@/types/application"

interface UseApplicationState {
  applications: Application[]
  loading: boolean
  error: string | null
  currentPage: number
  totalPages: number
  totalItems: number
  selectedStatus: string | null
  total: number
}

interface UseApplicationActions {
  loadMore: () => Promise<void>
  filterByStatus: (status: string | null) => Promise<void>
  submitApplication: (data: Omit<Application, "id" | "status" | "createdAt" | "updatedAt">) => Promise<void>
  updateStatus: (id: string, status: Application["status"]) => Promise<void>
  deleteApplication: (id: string) => Promise<void>
  refresh: () => Promise<void>
}

const ITEMS_PER_PAGE = 10

export function useApplication(): UseApplicationState & UseApplicationActions {
  const [state, setState] = useState<UseApplicationState>({
    applications: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    selectedStatus: null,
    total: 0,
  })

  const fetchApplications = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }))
    try {
      const response = await getApplications(state.currentPage, ITEMS_PER_PAGE)
      setState((prev) => ({
        ...prev,
        loading: false,
        applications: response.items,
        total: response.total,
        totalPages: Math.ceil(response.total / response.limit),
      }))
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : "Failed to fetch applications",
      }))
    }
  }, [state.currentPage])

  const submitApplication = useCallback(async (data: Omit<Application, "id" | "status" | "createdAt" | "updatedAt">) => {
    setState((prev) => ({ ...prev, loading: true, error: null }))
    try {
      const newApplication = await createApplication({
        ...data,
        status: "pending",
      })
      setState((prev) => ({
        ...prev,
        loading: false,
        applications: [...prev.applications, newApplication],
        total: prev.total + 1,
        totalPages: Math.ceil((prev.total + 1) / ITEMS_PER_PAGE),
      }))
      toast.success("Application submitted successfully")
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : "Failed to submit application",
      }))
      toast.error("Failed to submit application")
    }
  }, [])

  async function loadMore() {
    if (state.loading || state.currentPage >= state.totalPages) return

    setState(prev => ({ ...prev, loading: true }))

    try {
      const response = await getApplications(state.currentPage + 1, ITEMS_PER_PAGE)

      setState(prev => ({
        ...prev,
        applications: [...prev.applications, ...response.items],
        currentPage: prev.currentPage + 1,
        loading: false,
      }))
    } catch (error) {
      handleError(error)
    }
  }

  async function filterByStatus(status: string | null) {
    setState(prev => ({
      ...prev,
      loading: true,
      selectedStatus: status,
      currentPage: 1,
    }))

    try {
      const response = await getApplications(1, ITEMS_PER_PAGE)

      setState(prev => ({
        ...prev,
        applications: response.items,
        totalPages: response.totalPages,
        totalItems: response.total,
        loading: false,
      }))
    } catch (error) {
      handleError(error)
    }
  }

  const updateStatus = useCallback(async (id: string, status: Application["status"]) => {
    setState((prev) => ({ ...prev, loading: true, error: null }))
    try {
      const updatedApplication = await updateApplicationStatus(id, status)
      setState((prev) => ({
        ...prev,
        loading: false,
        applications: prev.applications.map((app) =>
          app.id === id ? updatedApplication : app
        ),
      }))
      toast.success("Application status updated successfully")
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : "Failed to update application status",
      }))
      toast.error("Failed to update application status")
    }
  }, [])

  const remove = useCallback(async (id: string) => {
    setState((prev) => ({ ...prev, loading: true, error: null }))
    try {
      await deleteApplication(id)
      setState((prev) => ({
        ...prev,
        loading: false,
        applications: prev.applications.filter((app) => app.id !== id),
        total: prev.total - 1,
        totalPages: Math.ceil((prev.total - 1) / ITEMS_PER_PAGE),
      }))
      toast.success("Application deleted successfully")
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : "Failed to delete application",
      }))
      toast.error("Failed to delete application")
    }
  }, [])

  async function refresh() {
    setState(prev => ({ ...prev, loading: true }))
    await fetchApplications()
  }

  function handleError(error: unknown) {
    const message =
      error instanceof ApplicationServiceError
        ? error.message
        : "An unexpected error occurred"

    setState(prev => ({
      ...prev,
      loading: false,
      error: message,
    }))

    toast.error(message)
  }

  return {
    ...state,
    loadMore,
    filterByStatus,
    submitApplication,
    updateStatus,
    deleteApplication: remove,
    refresh,
  }
} 