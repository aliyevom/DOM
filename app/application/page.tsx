"use client"

import { useState } from "react"
import ApplicationSection from "@/components/application-section"
import BottomNavigation from "@/components/bottom-navigation"

export default function ApplicationPage() {
  const [activeSection, setActiveSection] = useState("application")

  return (
    <main className="min-h-screen">
      <ApplicationSection />
      <BottomNavigation activeSection={activeSection} setActiveSection={setActiveSection} />
    </main>
  )
} 