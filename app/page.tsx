"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import LoadingScreen from "@/components/loading-screen"

export default function RootPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    // Show loading screen for 2.5 seconds before redirecting
    const timer = setTimeout(() => {
      setIsExiting(true)
      // Wait for exit animation to complete before redirecting
      setTimeout(() => {
        setIsLoading(false)
        router.push("/home")
      }, 500) // Match the exit animation duration
    }, 2500)

    return () => clearTimeout(timer)
  }, [router])

  return isLoading ? <LoadingScreen isExiting={isExiting} /> : null
}

