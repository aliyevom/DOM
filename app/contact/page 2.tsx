"use client"

import ContactSection from "@/components/contact-section"
import { useEffect } from "react"

export default function ContactPage() {
  useEffect(() => {
    // Update active section for bottom navigation
    const event = new CustomEvent("changeSection", { detail: "contact" })
    document.dispatchEvent(event)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <ContactSection />
    </div>
  )
} 