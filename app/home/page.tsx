"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useHome } from "@/hooks/use-home"
import HomeSection from "@/components/home-section-alt"
import NewsSection from "@/components/news-section"
import ApplicationSection from "@/components/application-section"
import ContactSection from "@/components/contact-section"
import LoginSection from "@/components/login-section"
import BottomNavigation from "@/components/bottom-navigation"
import { Loader2 } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

export default function HomePage() {
  const router = useRouter()
  const pathname = usePathname()
  const { isLoading, hasError, error } = useHome()
  const { signIn } = useAuth()
  const [activeSection, setActiveSection] = useState("home")
  const [showBottomNav, setShowBottomNav] = useState(true)
  const [isLoginLoading, setIsLoginLoading] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return
    
    // Handle section changes from URL
    if (pathname === "/home") {
      setActiveSection("home")
    } else if (pathname === "/news") {
      setActiveSection("news")
    } else if (pathname === "/application") {
      setActiveSection("application")
    } else if (pathname === "/contact") {
      setActiveSection("contact")
    } else if (pathname === "/login") {
      setActiveSection("login")
    }
  }, [pathname, isMounted])

  useEffect(() => {
    if (!isMounted) return

    // Listen for section change events
    const handleSectionChange = (event: CustomEvent<string>) => {
      const section = event.detail
      
      if (section === "home") {
        router.push("/home")
      } else if (section === "news") {
        router.push("/news")
      } else if (section === "application") {
        router.push("/application")
      } else if (section === "contact") {
        router.push("/contact")
      } else if (section === "login") {
        router.push("/login")
      }
      setActiveSection(section)
    }

    document.addEventListener("changeSection", handleSectionChange as EventListener)
    return () => {
      document.removeEventListener("changeSection", handleSectionChange as EventListener)
    }
  }, [router, isMounted])

  // Show/hide bottom nav based on section
  useEffect(() => {
    if (!isMounted) return
    setShowBottomNav(!["login"].includes(activeSection))
  }, [activeSection, isMounted])

  const handleLogin = async (email: string, password: string) => {
    try {
      setIsLoginLoading(true)
      await signIn(email, password)
      router.push("/portal/main")
    } catch (error) {
      throw error
    } finally {
      setIsLoginLoading(false)
    }
  }

  if (!isMounted) {
    return null
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (hasError) {
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
      {activeSection === "home" && <HomeSection />}
      {activeSection === "news" && <NewsSection />}
      {activeSection === "application" && <ApplicationSection />}
      {activeSection === "contact" && <ContactSection />}
      {activeSection === "login" && (
        <LoginSection
          onBack={() => router.push("/home")}
          onSubmit={handleLogin}
          isLoading={isLoginLoading}
        />
      )}
      {showBottomNav && <BottomNavigation activeSection={activeSection} setActiveSection={setActiveSection} />}
    </main>
  )
} 