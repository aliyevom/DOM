"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Home, Newspaper, FileText, Phone, Bot } from "lucide-react"
import { motion } from "framer-motion"
import { useIsMobile } from "@/hooks/use-mobile"

interface BottomNavigationProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export default function BottomNavigation({ activeSection, setActiveSection }: BottomNavigationProps) {
  const [prevSection, setPrevSection] = useState(activeSection)
  const isMobile = useIsMobile()
  const router = useRouter()

  // Track previous section to determine animation direction
  useEffect(() => {
    setPrevSection(activeSection)
  }, [activeSection])

  const isLoginActive = activeSection === "login"

  const handleNavigation = (section: string) => {
    setActiveSection(section)
    switch (section) {
      case "home":
        router.push("/home")
        break
      case "news":
        router.push("/news")
        break
      case "application":
        router.push("/application")
        break
      case "contact":
        router.push("/contact")
        break
      case "login":
        router.push("/login")
        break
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pb-safe">
      <div className="mx-auto max-w-md px-4 pb-2">
        <div className={`relative ${isMobile ? "h-14" : "h-16"}`}>
          {/* Portal Login button (positioned absolutely) */}
          <div className={`absolute left-1/2 -translate-x-1/2 ${isMobile ? "-top-4" : "-top-6"} z-20`}>
            <button className="flex flex-col items-center justify-center" onClick={() => handleNavigation("login")}>
              <motion.div
                className={`flex items-center justify-center ${isMobile ? "w-12 h-12" : "w-16 h-16"} rounded-full overflow-hidden relative`}
                animate={{
                  boxShadow: isLoginActive
                    ? "0 0 0 3px rgba(22, 163, 74, 0.7), 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                    : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                }}
                transition={{ duration: 0.3 }}
                style={{
                  background: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(8px)",
                  border: "2px solid rgba(255, 255, 255, 0.8)",
                  boxShadow:
                    "0 8px 32px rgba(31, 38, 135, 0.2), inset 0 -4px 8px rgba(31, 38, 135, 0.1), inset 0 4px 8px rgba(255, 255, 255, 0.8)",
                }}
              >
                <motion.div
                  animate={
                    isLoginActive
                      ? {
                          x: [20, -20, 0],
                          rotate: [0, 360],
                          scale: [1, 1.2, 1.1],
                        }
                      : {
                          x: 0,
                          rotate: 0,
                          scale: 1,
                        }
                  }
                  transition={{
                    duration: isLoginActive ? 1.2 : 0.8,
                    ease: "easeInOut",
                    times: isLoginActive ? [0, 0.6, 1] : [0, 1],
                  }}
                >
                  <Bot className={`${isMobile ? "h-5 w-5" : "h-7 w-7"} text-[#3050D8]`} />
                </motion.div>
              </motion.div>
              <span className={`${isMobile ? "text-[10px]" : "text-xs"} mt-1 font-medium text-white whitespace-nowrap`}>Portal Login</span>
            </button>
          </div>

          {/* Main navigation bar */}
          <div className={`absolute inset-x-0 bottom-0 ${isMobile ? "h-12" : "h-14"} bg-[#3050D8] rounded-full overflow-hidden`}>
            <div className="relative h-full">
              {/* Home - positioned at 15% from left */}
              <button
                className="absolute left-[15%] -translate-x-1/2 flex flex-col items-center justify-center h-full"
                onClick={() => handleNavigation("home")}
              >
                <Home className={`${isMobile ? "h-4 w-4" : "h-5 w-5"} text-white`} />
                <span className={`${isMobile ? "text-[10px]" : "text-xs"} mt-0.5 text-white`}>Home</span>
                {activeSection === "home" && (
                  <motion.div
                    layoutId="activeIndicator"
                    className={`absolute bottom-1 h-0.5 ${isMobile ? "w-6" : "w-8"} bg-white rounded-full`}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>

              {/* News - positioned at 32.5% from left */}
              <button
                className="absolute left-[32.5%] -translate-x-1/2 flex flex-col items-center justify-center h-full"
                onClick={() => handleNavigation("news")}
              >
                <Newspaper className={`${isMobile ? "h-4 w-4" : "h-5 w-5"} text-white`} />
                <span className={`${isMobile ? "text-[10px]" : "text-xs"} mt-0.5 text-white`}>Catalog</span>
                {activeSection === "news" && (
                  <motion.div
                    layoutId="activeIndicator"
                    className={`absolute bottom-1 h-0.5 ${isMobile ? "w-6" : "w-8"} bg-white rounded-full`}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>

              {/* Application - positioned at 69% from left */}
              <button
                className="absolute left-[69%] -translate-x-1/2 flex flex-col items-center justify-center h-full"
                onClick={() => handleNavigation("application")}
              >
                <FileText className={`${isMobile ? "h-4 w-4" : "h-5 w-5"} text-white`} />
                <span className={`${isMobile ? "text-[10px]" : "text-xs"} mt-0.5 text-white`}>Application</span>
                {activeSection === "application" && (
                  <motion.div
                    layoutId="activeIndicator"
                    className={`absolute bottom-1 h-0.5 ${isMobile ? "w-6" : "w-8"} bg-white rounded-full`}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>

              {/* Contact us - positioned at 86.5% from left */}
              <button
                className="absolute left-[86.5%] -translate-x-1/2 flex flex-col items-center justify-center h-full"
                onClick={() => handleNavigation("contact")}
              >
                <Phone className={`${isMobile ? "h-4 w-4" : "h-5 w-5"} text-white`} />
                <span className={`${isMobile ? "text-[10px]" : "text-xs"} mt-0.5 text-white whitespace-nowrap`}>Contact us</span>
                {activeSection === "contact" && (
                  <motion.div
                    layoutId="activeIndicator"
                    className={`absolute bottom-1 h-0.5 ${isMobile ? "w-6" : "w-8"} bg-white rounded-full`}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

