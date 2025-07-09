"use client"

import { useState } from "react"
import Image from "next/image"
import { useAuth } from '@/hooks/use-auth'
import { useRouter } from "next/navigation"
import { CustomEmailInput } from "@/components/custom-email-input"
import { FaShieldAlt, FaLock, FaChevronLeft } from "react-icons/fa"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { signIn } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const fullEmail = `${email}@domtech.com`
      await signIn(fullEmail, password)
      router.push('/portal/main')
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  const handleForgotPassword = () => {
    const subject = `Password Reset Request - ${email}`;
    const body = `Hello,\n\nI need to reset my password for the account associated with ${email}.\n\nThank you.`;
    const mailtoLink = `mailto:${process.env.NEXT_PUBLIC_ADMIN_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#1a237e]">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[10%] left-[15%] w-48 h-48 bg-blue-300/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] right-[10%] w-56 h-56 bg-purple-300/30 rounded-full blur-[100px]" />
        <div className="absolute top-[40%] right-[20%] w-40 h-40 bg-indigo-300/30 rounded-full blur-[100px]" />
      </div>

      {/* Back button */}
      <div className="relative z-10 p-4">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
        >
          <FaChevronLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center p-4 min-h-[calc(100vh-120px)]">
        {/* Main glass container */}
        <div className="w-full max-w-[1200px] bg-white/5 backdrop-blur-sm rounded-[40px] p-4 md:p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/10">
          <div className="flex items-center justify-between gap-8">
            {/* Left side - Login form */}
            <div className="w-full max-w-[500px]">
              <div className="mb-8 md:mb-12 flex flex-col items-center">
                <Image 
                  src="/images/dom-tech-logo.png" 
                  alt="DOM Tech Academy" 
                  width={120} 
                  height={48} 
                  className="mb-6 md:mb-8"
                />
                <h1 className="text-3xl md:text-4xl font-bold text-white">Login</h1>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <label className="block text-sm md:text-base font-medium mb-2 md:mb-3 text-white">Email</label>
                  <CustomEmailInput
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your username"
                    className="w-full bg-white/10 border-white/10 text-white placeholder:text-white/50 rounded-lg py-2.5 md:py-3"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm md:text-base font-medium mb-2 md:mb-3 text-white">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full bg-white/10 border border-white/10 text-white placeholder:text-white/50 rounded-lg px-3 py-2.5 md:py-3"
                    required
                  />
                </div>

                <div className="text-right">
                  <button 
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-sm text-blue-300 hover:text-blue-200"
                  >
                    Forgot Password?
                  </button>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-lg py-2.5 md:py-3 font-medium text-base md:text-lg"
                >
                  Sign in
                </button>
              </form>
            </div>

            {/* Right side - Robot image with glass effect */}
            <div className="hidden lg:block w-[600px] h-[600px] bg-white/10 backdrop-blur-lg rounded-[32px] p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/20">
              <Image 
                src="/images/robot-login.png" 
                alt="3D Robot" 
                width={600} 
                height={600} 
                className="object-contain" 
                priority 
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-auto">
        <div className="bg-white/5 backdrop-blur-md border-t border-white/10">
          <div className="container mx-auto px-2 md:px-4 py-1 md:py-2">
            <div className="flex flex-col md:flex-row items-center justify-between gap-0.5 md:gap-4 text-white/80 text-[8px] md:text-sm">
              {/* Security badge - Always visible */}
              <div className="flex items-center gap-1 md:gap-2">
                <FaShieldAlt className="w-2.5 h-2.5 md:w-4 md:h-4 text-blue-300" />
                <span>Protected by DOM Tech Security</span>
              </div>
              
              {/* Security notices - Hidden on mobile */}
              <div className="hidden md:flex md:flex-row items-center gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <FaLock className="w-3 h-3 text-blue-300" />
                  <span>All activities are monitored and recorded</span>
                </div>
                <div className="h-4 w-px bg-white/20" />
                <span>Unauthorized access is strictly prohibited</span>
                <div className="h-4 w-px bg-white/20" />
              </div>

              {/* Copyright - Always visible */}
              <div className="text-[8px] md:text-xs">
                <span>© 2025 DOM Tech Academy</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

