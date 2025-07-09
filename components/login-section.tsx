"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useIsMobile } from "@/hooks/use-mobile"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface LoginSectionProps {
  onBack?: () => void
  onSubmit: (email: string, password: string) => Promise<void>
  isLoading?: boolean
}

export default function LoginSection({ onBack, onSubmit, isLoading = false }: LoginSectionProps) {
  const { toast } = useToast()
  const { signIn } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const isMobile = useIsMobile()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await onSubmit(email, password)
    } catch (error) {
      console.error('Login error:', error)
      toast({
        title: "Error",
        description: "Failed to sign in. Please try again.",
        variant: "destructive"
      })
    }
  }

  // Mobile view
  if (isMobile) {
    return (
      <div className="min-h-screen bg-[#0A2158] flex flex-col">
        {/* Back button */}
        <div className="p-4">
          <Button
            variant="ghost"
            className="flex items-center text-white/90 hover:text-white hover:bg-white/10 text-sm"
            onClick={onBack}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>

        {/* Login container */}
        <div className="flex-1 flex items-center justify-center px-4 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            {/* Robot character for mobile */}
            <motion.div 
              className="flex justify-center mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative w-28 h-28">
                <Image
                  src="/images/robot-login.png"
                  alt="DOM Tech Academy"
                  fill
                  className="object-contain"
                  priority
                />
                {/* Glowing eyes effect */}
                <motion.div
                  animate={{
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                  className="absolute top-[28%] left-[35%] w-[40px] h-[10px] flex justify-between"
                >
                  <div className="w-[10px] h-[10px] rounded-full bg-[#4FC3F7] blur-[1px]"></div>
                  <div className="w-[10px] h-[10px] rounded-full bg-[#4FC3F7] blur-[1px]"></div>
                </motion.div>
              </div>
            </motion.div>

            <div className="bg-[#1E3A8A]/90 backdrop-blur-sm rounded-3xl shadow-lg p-6 border border-white/10">
              <div className="text-center mb-6">
                <div className="flex justify-center mb-2">
                  <Image
                    src="/images/dom-tech-logo.png"
                    alt="DOM Tech Academy Logo"
                    width={120}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <h1 className="text-xl font-bold text-white">Welcome Back!</h1>
                <p className="text-white/70 text-sm mt-1">Sign in to continue your journey</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/90">Email</label>
                  <div className="relative">
                    <Input
                      type="email"
                      placeholder="student@domtech.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/90">Password</label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-xl pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    variant="link"
                    className="text-sm text-[#4285F4] hover:text-[#4285F4]/80 p-0 h-auto"
                    onClick={() => toast({
                      title: "Coming Soon",
                      description: "Password recovery is not implemented in this demo.",
                    })}
                  >
                    Forgot Password?
                  </Button>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-[#4285F4] hover:bg-[#2563EB] rounded-xl text-white font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <motion.div
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <span className="ml-2">Signing in...</span>
                    </div>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  // Desktop view
  return (
    <div className="min-h-screen bg-[#0A2158] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute top-[10%] left-[20%] w-64 h-64 rounded-full bg-[#4285F4]/30 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute bottom-[15%] right-[25%] w-80 h-80 rounded-full bg-[#4285F4]/20 blur-3xl"
        />
      </div>

      {/* Main container with glass effect */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-5xl bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden p-8"
      >
        {/* Inner container */}
        <div className="flex flex-col md:flex-row items-center">
          {/* Login form */}
          <div className="w-full md:w-1/2 p-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#1E3A8A]/90 backdrop-blur-sm rounded-3xl shadow-lg p-8"
            >
              <div className="text-center mb-6">
                <div className="flex justify-center mb-2">
                  <Image
                    src="/images/dom-tech-logo.png"
                    alt="DOM Tech Academy Logo"
                    width={180}
                    height={70}
                    className="object-contain"
                  />
                </div>
                <h1 className="text-2xl font-bold text-white mt-2">Welcome Back!</h1>
                <p className="text-white/70 text-sm mt-1">Sign in to continue your journey</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/90">Email</label>
                  <Input
                    type="email"
                    placeholder="student@domtech.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/90">Password</label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-xl pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    variant="link"
                    className="text-sm text-[#4285F4] hover:text-[#4285F4]/80 p-0 h-auto"
                    onClick={() => toast({
                      title: "Coming Soon",
                      description: "Password recovery is not implemented in this demo.",
                    })}
                  >
                    Forgot Password?
                  </Button>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-[#4285F4] hover:bg-[#2563EB] rounded-xl text-white font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <motion.div
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <span className="ml-2">Signing in...</span>
                    </div>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </form>
            </motion.div>
          </div>

          {/* Robot character */}
          <div className="w-full md:w-1/2 flex justify-center items-center relative">
            {/* Enhanced shadow effect - robot silhouette in background */}
            <div className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
              <div className="absolute left-[-80%] top-[10%] w-[600px] h-[600px] transform scale-[1.8]">
                <Image
                  src="/images/robot-login.png"
                  alt="Robot Shadow"
                  fill
                  className="object-contain opacity-30 blur-sm"
                />
              </div>
            </div>

            {/* Robot with animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative z-10"
            >
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                <Image
                  src="/images/robot-login.png"
                  alt="Robot Assistant"
                  width={280}
                  height={350}
                  className="object-contain"
                />

                {/* Glowing eyes effect */}
                <motion.div
                  animate={{
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                  className="absolute top-[28%] left-[35%] w-[80px] h-[20px] flex justify-between"
                >
                  <div className="w-[20px] h-[20px] rounded-full bg-[#4FC3F7] blur-[2px]"></div>
                  <div className="w-[20px] h-[20px] rounded-full bg-[#4FC3F7] blur-[2px]"></div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Back button - positioned absolutely */}
      <Button
        variant="ghost"
        className="absolute top-4 left-4 flex items-center text-white hover:text-blue-200 hover:bg-white/10 z-20"
        onClick={onBack}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Button>
    </div>
  )
}

