"use client"

import { useState, useEffect } from "react"
import ContactSection from "@/components/contact-section"
import BottomNavigation from "@/components/bottom-navigation"

export default function ContactPage() {
  const [activeSection, setActiveSection] = useState("contact")

  useEffect(() => {
    // Listen for section changes from other components
    const handleSectionChange = (event: CustomEvent) => {
      setActiveSection(event.detail)
    }

    document.addEventListener("changeSection", handleSectionChange as EventListener)
    return () => {
      document.removeEventListener("changeSection", handleSectionChange as EventListener)
    }
  }, [])

  return (
    <>
      <ContactSection />
      <BottomNavigation activeSection={activeSection} setActiveSection={setActiveSection} />
    </>
  )
} 