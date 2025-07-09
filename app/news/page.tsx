"use client"

import { useState } from "react"
import { useNews } from "@/hooks/use-news"
import NewsSection from "@/components/news-section"
import BottomNavigation from "@/components/bottom-navigation"
import { Loader2 } from "lucide-react"

export default function NewsPage() {
  const { loading, error } = useNews()
  const [activeSection, setActiveSection] = useState("news")

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600">Error</h2>
          <p className="text-gray-600 mt-2">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen">
      <NewsSection />
      <BottomNavigation activeSection={activeSection} setActiveSection={setActiveSection} />
    </main>
  )
} 