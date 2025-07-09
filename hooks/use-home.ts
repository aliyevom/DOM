import { useState, useEffect } from 'react'
import { 
  getTestimonials, 
  getFeatures, 
  getStats, 
  submitRegistration,
  Testimonial,
  Feature,
  Stats,
  Registration,
  HomeServiceError
} from '@/lib/services/home'
import { useToast } from '@/hooks/use-toast'

export function useHome() {
  console.log("[useHome] Initializing hook")
  
  // State
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [features, setFeatures] = useState<Feature[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState({
    testimonials: true,
    features: true,
    stats: true,
  })
  const [error, setError] = useState<string | null>(null)
  
  const { toast } = useToast()

  // Fetch data
  useEffect(() => {
    console.log("[useHome] Starting data fetch")
    
    async function fetchData() {
      try {
        // Fetch testimonials
        console.log("[useHome] Fetching testimonials")
        const testimonialsData = await getTestimonials()
        console.log("[useHome] Testimonials received:", testimonialsData)
        setTestimonials(testimonialsData)
        setLoading(prev => ({ ...prev, testimonials: false }))

        // Fetch features
        console.log("[useHome] Fetching features")
        const featuresData = await getFeatures()
        console.log("[useHome] Features received:", featuresData)
        setFeatures(featuresData)
        setLoading(prev => ({ ...prev, features: false }))

        // Fetch stats
        console.log("[useHome] Fetching stats")
        const statsData = await getStats()
        console.log("[useHome] Stats received:", statsData)
        setStats(statsData)
        setLoading(prev => ({ ...prev, stats: false }))
      } catch (error) {
        console.error("[useHome] Error fetching data:", error)
        if (error instanceof HomeServiceError) {
          setError(error.message)
          toast({
            title: 'Error',
            description: error.message,
            variant: 'destructive',
          })
        } else {
          setError('An unexpected error occurred')
          toast({
            title: 'Error',
            description: 'An unexpected error occurred',
            variant: 'destructive',
          })
        }
      }
    }

    fetchData()
  }, [toast])

  // Handle registration
  const handleRegistration = async (registrationData: Registration) => {
    console.log("[useHome] Handling registration:", registrationData)
    try {
      const response = await submitRegistration(registrationData)
      console.log("[useHome] Registration successful:", response)
      toast({
        title: 'Success',
        description: response.message,
      })
      return true
    } catch (error) {
      console.error("[useHome] Registration failed:", error)
      if (error instanceof HomeServiceError) {
        toast({
          title: 'Registration Failed',
          description: error.message,
          variant: 'destructive',
        })
      } else {
        toast({
          title: 'Registration Failed',
          description: 'An unexpected error occurred',
          variant: 'destructive',
        })
      }
      return false
    }
  }

  // Derived state
  const isLoading = Object.values(loading).some(Boolean)
  const hasError = error !== null

  console.log("[useHome] Current state:", {
    isLoading,
    hasError,
    error,
    testimonialsCount: testimonials.length,
    featuresCount: features.length,
    hasStats: stats !== null,
  })

  return {
    testimonials,
    features,
    stats,
    isLoading,
    hasError,
    error,
    handleRegistration,
  }
} 