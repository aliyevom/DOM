"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  BookOpen,
  Code,
  Users,
  Award,
  CalendarDays,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Quote,
  HelpCircle,
  Clock,
  DollarSign,
  Info,
  Download,
} from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { useEffect, useState } from "react"
import HandwrittenWelcome from "./handwritten-welcome"
import { useHome } from "@/hooks/use-home"
import StyledText from "./StyledText"

interface Tag {
  label: string;
  bgColor: string;
  textColor: string;
}

interface Course {
  id: number;
  name: string;
  startDate: string;
  availableSeats: number;
  tags?: Tag[];
}

interface FeatureImage {
  src: string;
  alt: string;
}

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
  images: FeatureImage[];
}

// Icon mapping
const IconMap: { [key: string]: React.ComponentType<any> } = {
  BookOpen,
  Code,
  Users,
  Award,
}

export default function HomeSection() {
  const isMobile = useIsMobile()
  const [mounted, setMounted] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const { testimonials, features, stats } = useHome()
  const [imageIndices, setImageIndices] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    setMounted(true)

    // Auto-rotate testimonials every 5 seconds
    if (!isMobile) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
      }, 5000)

      return () => {
        clearInterval(interval)
      }
    }
  }, [isMobile, testimonials.length])

  useEffect(() => {
    const intervalIds: NodeJS.Timeout[] = [];
    
    features.forEach((feature) => {
      if (feature.images.length > 1) {  // Only set up interval for features with multiple images
        const interval = setInterval(() => {
          setImageIndices((prev) => ({
            ...prev,
            [feature.id]: ((prev[feature.id] || 0) + 1) % feature.images.length,
          }));
        }, 4000); // Increased to 4 seconds for better readability
        
        intervalIds.push(interval);
      }
    });

    return () => intervalIds.forEach(clearInterval);
  }, [features]);

  const handleEarlyRegistration = () => {
    const event = new CustomEvent("changeSection", { detail: "application" })
    document.dispatchEvent(event)
  }

  const goToPrevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToNextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  if (!mounted) {
    return null
  }
  return (
    <div className="flex flex-col items-center min-h-screen p-4 pb-24 sm:pb-4 relative">
      {/* Background gradient - visible on all screens */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/80 via-indigo-50/40 to-white/60"></div>

      {/* Background circle - hidden on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
        <motion.div
          className="absolute rounded-full bg-blue-200/50 backdrop-blur-3xl"
          style={{ width: "50%", height: "50%", left: "-15%", top: "-15%" }}
          animate={{
            x: [0, 15, 0],
            y: [0, 10, 0],
            scale: [1, 1.05, 1],
            opacity: [0.5, 0.6, 0.5],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Content wrapper */}
      <div className="w-full max-w-6xl mx-auto relative z-10">
        {/* Opening Soon Banner */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-xl mx-auto bg-white/80 backdrop-blur-lg rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-4 mb-2 border border-white/20"
          style={{
            transform: "perspective(1000px) rotateX(2deg)",
            transformStyle: "preserve-3d"
          }}
        >
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center gap-2 text-primary">
              <CalendarDays className="w-5 h-5" />
              <h3 className={`
                text-lg font-semibold 
                font-['Chewy_Bubble']
                tracking-wide
                relative
                z-10
                after:content-['']
                after:absolute
                after:-inset-1
                after:bg-white/50
                after:blur-[2px]
                after:-z-10
              `}>
                <span className="block relative overflow-hidden">
                  <span className="relative z-10">Upcoming Summer Camp</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] animate-shimmer" />
                </span>
                <span className="inline-block mt-1 px-3 py-1 bg-blue-500/20 text-blue-700 rounded-full text-sm font-bold border border-blue-300/30 relative overflow-hidden group">
                  <span className="relative z-10">July 14th-21st</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
                </span>
                
                <style jsx>{`
                  @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                  }
                  .animate-shimmer {
                    animation: shimmer 3s infinite;
                    animation-delay: 2s;
                  }
                `}</style>
              </h3>
            </div>
            <a 
              href="https://g.co/kgs/nU3Rtyk"
              target="_blank"
              rel="noopener noreferrer" 
              className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors group w-full"
            >
              <MapPin className="w-4 h-4 group-hover:text-primary flex-shrink-0" />
              <span className={`
                whitespace-nowrap overflow-hidden text-ellipsis 
                ${isMobile ? 'text-xs' : 'text-base'}
                font-['Chewy_Bubble']
                tracking-wide
                leading-tight
              `}
              style={{
                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                303 WYMAN ST SUITE 300, WALTHAM, MA 02451
              </span>
            </a>
            <div className={`w-full grid ${isMobile ? 'grid-cols-[1fr,auto] gap-2' : 'grid-cols-[1fr,auto] gap-3'} mt-2`}>
              <Button
                onClick={handleEarlyRegistration}
                className="
                  relative overflow-hidden
                  bg-gradient-to-r from-blue-600 to-indigo-600 
                  hover:from-blue-700 hover:to-indigo-700
                  text-white font-medium
                  flex items-center justify-center 
                  shadow-lg hover:shadow-xl
                  transform hover:scale-[1.02] active:scale-[0.98]
                  transition-all duration-300 ease-in-out
                  cursor-pointer
                  min-h-[44px]
                  after:absolute after:inset-0 
                  after:bg-gradient-to-r after:from-white/20 after:to-transparent 
                  after:opacity-0 after:hover:opacity-100 
                  after:transition-opacity after:duration-300
                  group
                "
              >
                <span className="relative z-10 flex items-center justify-center w-full text-white group-hover:text-white transition-colors duration-300">
                  Early Registration Started
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
              <Button
                onClick={() => window.location.href = 'https://www.instagram.com/stories/highlights/18153862945363473/'}
                className={`
                  relative overflow-hidden
                  bg-gradient-to-r from-blue-600 to-indigo-600
                  hover:from-blue-500 hover:to-indigo-500
                  text-white raleway-medium
                  flex items-center justify-center
                  ${isMobile ? 'px-4' : 'px-6'}
                  shadow-[0_4px_15px_-3px_rgba(37,99,235,0.5)]
                  hover:shadow-[0_6px_20px_-3px_rgba(37,99,235,0.6)]
                  transform hover:-translate-y-0.5 transition-all duration-300
                  after:absolute after:inset-0 after:bg-gradient-to-r after:from-white/20 after:to-transparent after:opacity-0 after:hover:opacity-100 after:transition-opacity
                `}
              >
                <HelpCircle className={`w-4 h-4 ${isMobile ? 'mr-0.5' : 'mr-1'} animate-pulse`} />
                FAQ
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col items-center text-center">
          {/* Logo section */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className={`${isMobile ? 'mb-0 -mt-[30px]' : 'mb-0 -mt-[59px] -mb-[5px]'}`}
          >
            <div className="relative inline-block mx-auto">
              <Image
                src="/images/dom-tech-logo.png"
                alt="DOM Tech Academy Logo"
                width={isMobile ? 200 : 350}
                height={isMobile ? 140 : 190}
                className="object-contain logo-shadow"
                priority
              />
            </div>
          </motion.div>

          {/* All content in a single div moved up closer to logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-0"
          >
            {/* Title text */}
            <div className="text-center mb-4 md:mb-6 mt-4 md:mt-4">
              <StyledText 
                text="Development of Mindset"
                className="text-2xl md:text-6xl font-extrabold tracking-wide"
                size={isMobile ? "3xl" : "6xl"}
              />
            </div>

            {/* Divider line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.2 }}
              className="h-0.5 bg-primary/30 mx-auto max-w-md mb-2"
            />

            {/* Why choose us section */}
            <div className="mb-2">
              <p className={`
                ${isMobile ? "text-lg" : "text-xl"} 
                text-primary-light 
                mb-1
                font-['Chewy_Bubble']
                tracking-wide
                text-center
              `}
              style={{
                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                Education of Coding
              </p>
              <p className={`
                text-gray-600 max-w-lg mx-auto 
                ${isMobile ? "text-sm" : "text-base"} 
                font-['Chewy_Bubble']
                leading-relaxed
                tracking-wide
              `}
              style={{
                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                Inspiring young minds ages 6-16 to discover the world of coding, robotics, and computational thinking.
                Start their tech journey today!
              </p>
            </div>

            {/* Mystery Box Brochure Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-2xl mx-auto mb-6 relative"
            >
              <div className="bg-gradient-to-br from-blue-500/90 to-indigo-600/90 rounded-2xl p-6 shadow-lg transform hover:scale-[1.02] transition-all duration-300 group">
                <div className="absolute -top-3 -right-3">
                  <div className="relative">
                    {/* Robot container with gradient */}
                    <div className="bg-gradient-to-br from-yellow-300 to-yellow-500 w-12 h-12 rounded-full flex items-center justify-center shadow-lg relative z-10">
                      <img
                        alt="Mini Robot"
                        loading="lazy"
                        width="32"
                        height="32"
                        decoding="async"
                        data-nimg="1"
                        className="object-contain"
                        src="/images/robot-mini.png"
                        style={{ color: 'transparent' }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="relative w-full md:w-1/2">
                    <div className="relative w-32 h-32 mx-auto">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/40 to-purple-400/40 backdrop-blur-sm rounded-2xl transform rotate-45 group-hover:from-blue-500/50 group-hover:to-purple-500/50 transition-all duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-400/40 to-blue-400/40 backdrop-blur-sm rounded-2xl transform -rotate-45 group-hover:from-indigo-500/50 group-hover:to-blue-500/50 transition-all duration-500" />
                      
                      {/* Light bulb effects */}
                      <div className="absolute inset-0">
                        <div className="absolute w-4 h-4 bg-white/30 rounded-full blur-sm animate-pulse" 
                             style={{ 
                               left: '20%', 
                               top: '20%', 
                               animationDuration: '2s',
                               animationDelay: '0.5s' 
                             }} 
                        />
                        <div className="absolute w-3 h-3 bg-white/30 rounded-full blur-sm animate-pulse" 
                             style={{ 
                               right: '30%', 
                               top: '40%', 
                               animationDuration: '2.5s' 
                             }} 
                        />
                        <div className="absolute w-2 h-2 bg-white/30 rounded-full blur-sm animate-pulse" 
                             style={{ 
                               left: '40%', 
                               bottom: '30%', 
                               animationDuration: '1.8s',
                               animationDelay: '0.3s' 
                             }} 
                        />
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center">
                        {/* Light bulb SVG with animations */}
                        <div className="relative w-24 h-24">
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 64 64" 
                            className="w-full h-full transform transition-transform duration-300 group-hover:scale-110"
                          >
                            {/* Neural connection lines */}
                            <g className="neural-connections">
                              <path 
                                d="M32,51.22v6.91" 
                                className="animate-pulse-line stroke-yellow-300/50"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                              <path 
                                d="M13.53,13l4.88,4.88" 
                                className="animate-pulse-line stroke-yellow-300/50"
                                strokeWidth="2"
                                strokeLinecap="round"
                                style={{ animationDelay: "0.2s" }}
                              />
                              <path 
                                d="M50.47,13l-4.88,4.88" 
                                className="animate-pulse-line stroke-yellow-300/50"
                                strokeWidth="2"
                                strokeLinecap="round"
                                style={{ animationDelay: "0.4s" }}
                              />
                              <path 
                                d="M5.5,32h6.91" 
                                className="animate-pulse-line stroke-yellow-300/50"
                                strokeWidth="2"
                                strokeLinecap="round"
                                style={{ animationDelay: "0.6s" }}
                              />
                              <path 
                                d="M51.59,32h6.91" 
                                className="animate-pulse-line stroke-yellow-300/50"
                                strokeWidth="2"
                                strokeLinecap="round"
                                style={{ animationDelay: "0.8s" }}
                              />
                            </g>
                            {/* Main light bulb */}
                            <path 
                              d="M32,18.5c-5.62,0-10.19,4.57-10.19,10.19c0,3.33,1.63,6.45,4.36,8.36c0.11,0.24,0.23,0.47,0.33,0.7 c0.83,1.72,1.49,3.08,1.49,6.09c0,0.21,0.17,0.38,0.38,0.38h7.25c0.21,0,0.38-0.17,0.38-0.38c0-3.01,0.66-4.37,1.49-6.09 c0.11-0.22,0.22-0.46,0.33-0.7c2.73-1.91,4.36-5.02,4.36-8.36C42.19,23.07,37.62,18.5,32,18.5z"
                              className="fill-yellow-300 transition-colors duration-300 group-hover:fill-yellow-400"
                            />
                            {/* Glowing effect */}
                            <circle 
                              cx="32" 
                              cy="28" 
                              r="8" 
                              className="fill-white/30 animate-pulse-glow"
                            />
                          </svg>
                          {/* Additional glowing orbs */}
                          <div className="absolute -left-4 -top-4 w-3 h-3 bg-yellow-300/40 rounded-full blur-sm animate-pulse" />
                          <div className="absolute -right-4 -top-4 w-3 h-3 bg-yellow-300/40 rounded-full blur-sm animate-pulse" style={{ animationDelay: "0.3s" }} />
                          <div className="absolute -left-4 -bottom-4 w-3 h-3 bg-yellow-300/40 rounded-full blur-sm animate-pulse" style={{ animationDelay: "0.6s" }} />
                          <div className="absolute -right-4 -bottom-4 w-3 h-3 bg-yellow-300/40 rounded-full blur-sm animate-pulse" style={{ animationDelay: "0.9s" }} />
                        </div>
                      </div>

                      {/* Add neural network background effect */}
                      <div className="absolute inset-0">
                        <div className="absolute w-full h-full">
                          {[...Array(6)].map((_, i) => (
                            <div
                              key={i}
                              className="absolute w-1 h-1 bg-yellow-300/30 rounded-full"
                              style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animation: `float ${2 + Math.random() * 2}s infinite alternate`
                              }}
                            />
                          ))}
                        </div>
                      </div>

                      <style jsx>{`
                        @keyframes float {
                          0% { transform: translate(0, 0); }
                          100% { transform: translate(10px, 10px); }
                        }
                        .animate-pulse-line {
                          animation: pulseLine 2s infinite;
                        }
                        .animate-pulse-glow {
                          animation: pulseGlow 2s infinite;
                        }
                        @keyframes pulseLine {
                          0% { opacity: 0.2; }
                          50% { opacity: 0.8; }
                          100% { opacity: 0.2; }
                        }
                        @keyframes pulseGlow {
                          0% { opacity: 0.3; }
                          50% { opacity: 0.6; }
                          100% { opacity: 0.3; }
                        }
                      `}</style>
                    </div>
                  </div>
                  
                  <div className="text-center md:text-left md:w-1/2">
                    <h3 className={`
                      text-white text-xl md:text-2xl font-bold mb-2
                      font-['Chewy_Bubble']
                      tracking-wide
                      drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]
                    `}>
                      Discover Our 2025 Q2
                    </h3>
                    <p className={`
                      text-blue-100 mb-4
                      font-['Chewy_Bubble']
                      tracking-wide
                      leading-relaxed
                      ${isMobile ? 'text-sm' : 'text-base'}
                      drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]
                    `}>
                      Unlock the mystery of our upcoming programs! Download our brochure to explore exciting courses and activities.
                    </p>
                    <Button
                      disabled
                      className={`
                        relative overflow-hidden
                        bg-gray-100 text-gray-500
                        cursor-not-allowed
                        font-medium
                        group-hover:shadow-none
                        transition-all duration-300
                        ${isMobile ? 'w-full' : 'w-auto'}
                        flex items-center justify-center gap-2
                        opacity-75
                      `}
                    >
                      <BookOpen className="w-4 h-4" />
                      <span className="font-['Chewy_Bubble'] tracking-wide">Coming Soon</span>
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse" />
                    </Button>
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute -left-4 -bottom-4 w-12 h-12 bg-blue-400/30 rounded-full backdrop-blur-sm animate-pulse" />
                <div className="absolute right-8 top-0 w-8 h-8 bg-indigo-400/30 rounded-full backdrop-blur-sm animate-pulse" style={{ animationDelay: "0.5s" }} />
                <div className="absolute right-4 bottom-8 w-6 h-6 bg-purple-400/30 rounded-full backdrop-blur-sm animate-pulse" style={{ animationDelay: "1s" }} />
              </div>
            </motion.div>

            {/* Features Grid */}
            <div className={`grid ${isMobile ? 'grid-cols-2 gap-3' : 'grid-cols-4 gap-4'} mb-4`}>
              {features.map((feature) => {
                const Icon = IconMap[feature.icon];
                const currentImageIndex = imageIndices[feature.id] || 0;
                
                return (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: feature.id * 0.1 }}
                    className={`bg-white ${isMobile ? 'rounded-xl shadow-md hover:shadow-lg p-2' : 'rounded-xl shadow-md hover:shadow-lg'} transition-shadow relative overflow-hidden`}
                  >
                    <div className="aspect-[3/2] relative overflow-hidden rounded-lg">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentImageIndex}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0"
                        >
                          <Image
                            src={feature.images[currentImageIndex].src}
                            alt={feature.images[currentImageIndex].alt}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes={isMobile ? "160px" : "280px"}
                            priority={feature.id === 1}
                          />
                        </motion.div>
                      </AnimatePresence>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-50 group-hover:opacity-30 transition-opacity" />
                      {!isMobile && (
                        <div className="absolute bottom-2 left-2 bg-blue-600/80 backdrop-blur-[2px] p-1.5 rounded-lg">
                          {Icon && <Icon className="h-5 w-5 text-white" />}
                        </div>
                      )}
                      {feature.images.length > 1 && (
                        <div className="absolute bottom-2 right-2 flex gap-1">
                          {feature.images.map((_, index) => (
                            <div
                              key={index}
                              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                                index === currentImageIndex
                                  ? "bg-white"
                                  : "bg-white/50"
                              }`}
                            />
                          ))}
                      </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Upcoming Courses - Moved here */}
            {stats && (
              <div className="w-full max-w-7xl mx-auto mb-8">
                <div className="flex justify-center mb-6">
                  <StyledText 
                    text="Upcoming Courses"
                    className={`${isMobile ? "text-xl" : "text-3xl"} font-bold tracking-wide`}
                    size={isMobile ? "2xl" : "4xl"}
                  />
                </div>

                {/* Course Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {stats.upcomingCourses.map((course) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all"
                    >
                      <div className="flex flex-col">
                        <h4 className="font-bold text-lg mb-2 text-center text-gray-900">
                          {course.name.split(":")[0]}
                          <div className="flex flex-wrap gap-1 mt-1 justify-center">
                            {/* Course tags */}
                            {(course as Course).tags?.map((tag: Tag, index: number) => (
                              <span
                                key={index}
                                className={`inline-block px-2 py-1 text-xs font-bold rounded-full ${tag.bgColor} ${tag.textColor}`}
                              >
                                {tag.label}
                              </span>
                            )) || (
                              <>
                                {/* Fallback tags if course.tags is not provided */}
                                <span className="inline-block px-2 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-700">
                                  {course.name.toLowerCase().includes("arduino") ? "Advanced" : 
                                   course.name.toLowerCase().includes("robotics") ? "Intermediate" :
                                   course.name.toLowerCase().includes("python") ? "Basic" :
                                   "Entry"}
                                </span>
                                <span className="inline-block px-2 py-1 text-xs font-bold rounded-full bg-green-100 text-green-700">
                                  Ages {course.name.toLowerCase().includes("pre-coding") || course.name.toLowerCase().includes("python") ? "6-10" : "11-16"}
                                </span>
                                {/* Additional focus area tags */}
                                {course.name.toLowerCase().includes("pre-coding") && (
                                  <span className="inline-block px-2 py-1 text-xs font-bold rounded-full bg-indigo-100 text-indigo-700">
                                    STEM-Coding
                                  </span>
                                )}
                                {course.name.toLowerCase().includes("python") && (
                                  <span className="inline-block px-2 py-1 text-xs font-bold rounded-full bg-amber-100 text-amber-700">
                                    Lego-oriented
                                  </span>
                                )}
                                {course.name.toLowerCase().includes("robotics") && (
                                  <span className="inline-block px-2 py-1 text-xs font-bold rounded-full bg-rose-100 text-rose-700">
                                    Sensor
                                  </span>
                                )}
                                {course.name.toLowerCase().includes("arduino") && (
                                  <span className="inline-block px-2 py-1 text-xs font-bold rounded-full bg-teal-100 text-teal-700">
                                    IoT
                                  </span>
                                )}
                              </>
                            )}
                          </div>
                        </h4>
                      </div>

                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-center gap-2">
                          <CalendarDays className="w-4 h-4 text-gray-700" />
                          <p className="text-sm font-semibold text-gray-700">
                            Starts {course.name.includes("6-10") ? "May 5, 2025" : "May 12, 2025"}
                          </p>
                        </div>
                        <p className="text-sm font-bold text-blue-700 text-center">
                          {course.availableSeats} seats available
                        </p>
                      </div>

                      <Button
                        onClick={() => {
                          const courseId = course.name.toLowerCase().includes('pre-coding') ? 'pre-coding'
                            : course.name.toLowerCase().includes('python') ? 'python-ev3'
                            : course.name.toLowerCase().includes('robotics') ? 'mid-robotics'
                            : 'arduino';
                          window.location.href = `/news?section=curriculum&course=${courseId}`;
                        }}
                        className="w-full mt-3 bg-blue-50 hover:bg-blue-100 text-blue-600"
                      >
                        Course Materials
                      </Button>
                    </motion.div>
                  ))}
                </div>

                {/* Modern Compact Pricing Section with unified register button */}
                <div className="relative">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                    {[
                      { name: "DOM:\nEntry Vision", schedule: "2x/Week", amount: 289, color: "from-blue-500 to-blue-600" },
                      { name: "DOM:\nMid Vision", schedule: "3x/Week", amount: 389, color: "from-indigo-500 to-indigo-600" },
                      { name: "DOM:\nFast Vision", schedule: "4x/Week", amount: 489, color: "from-violet-500 to-violet-600" }
                    ].map((plan, index) => (
                      <div
                        key={plan.schedule}
                        className="group relative"
                      >
                        {/* Schedule badge */}
                        <div className={`
                          absolute -top-3 left-4 z-20 px-4 py-1.5 rounded-full
                          bg-gradient-to-r ${plan.color}
                          font-['Chewy_Bubble']
                          after:content-['']
                          after:absolute
                          after:-inset-0.5
                          after:bg-white/50
                          after:blur-[2px]
                          after:-z-10
                          transform hover:scale-105 transition-transform duration-200
                        `}>
                          <p className="text-sm tracking-wider font-medium text-white">{plan.schedule}</p>
                        </div>

                        {/* Main card */}
                        <div className="relative bg-white rounded-2xl overflow-hidden">
                          {/* Top gradient bar */}
                          <div className={`h-2 bg-gradient-to-r ${plan.color}`} />
                          
                          <div className="p-6">
                            <div className="text-center">
                              {/* Vision name with split text for better control */}
                              <div className="space-y-1">
                                <h3 className={`
                                  text-2xl md:text-3xl tracking-tight
                                  font-['Chewy_Bubble']
                                  text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600
                                  after:content-['']
                                  after:absolute
                                  after:-inset-1
                                  after:bg-white/50
                                  after:blur-[2px]
                                  after:-z-10
                                `}>
                                  DOM
                                </h3>
                                <h4 className={`
                                  text-xl md:text-2xl tracking-tight
                                  font-['Chewy_Bubble']
                                  text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600
                                  after:content-['']
                                  after:absolute
                                  after:-inset-1
                                  after:bg-white/50
                                  after:blur-[2px]
                                  after:-z-10
                                `}>
                                  {plan.name.split('\n')[1]}
                                </h4>
                              </div>

                              {/* Price with monthly text */}
                              <div className="mt-4 flex items-baseline justify-center">
                                <span className={`
                                  text-4xl md:text-5xl font-['Chewy_Bubble'] tracking-tight
                                  text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700
                                `}>
                                  ${plan.amount}
                                </span>
                                <span className={`
                                  ml-2 text-sm md:text-base font-['Chewy_Bubble'] text-gray-500 tracking-wide
                                  after:content-['']
                                  after:absolute
                                  after:-inset-1
                                  after:bg-white/50
                                  after:blur-[2px]
                                  after:-z-10
                                `}>
                                  /MONTHLY
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Unified Register Button */}
                  <div className="mt-12 flex justify-center relative">
                    {/* Connection point circles */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 flex gap-16 md:gap-32">
                      <div className="w-2 h-2 rounded-full bg-blue-500/50" />
                      <div className="w-2 h-2 rounded-full bg-indigo-500/50" />
                      <div className="w-2 h-2 rounded-full bg-violet-500/50" />
                    </div>
                    
                    <button 
                      onClick={handleEarlyRegistration}
                      className="relative bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 text-white py-3 px-8 rounded-xl text-lg font-semibold tracking-wide
                        transform transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg
                        overflow-hidden group"
                    >
                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 
                        translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                      
                      {/* Button content */}
                      <span className="relative z-10">Register Now</span>
                      
                      {/* Pulsing glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/50 via-indigo-500/50 to-violet-500/50 
                        blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Testimonials Section */}
            <div className={`w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 ${isMobile ? 'mb-16' : 'mb-28'}`}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex-1">
                  <StyledText 
                    text="What Industry Leaders Say"
                    className={`${isMobile ? "text-xl" : "text-2xl"} font-bold tracking-wide`}
                    size={isMobile ? "2xl" : "3xl"}
                  />
                </div>
                {!isMobile && (
                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={goToPrevTestimonial}
                      className="rounded-full"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={goToNextTestimonial}
                      className="rounded-full"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>

              <div className="relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTestimonial}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col md:flex-row items-center gap-6"
                  >
                    <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                      <Image
                        src={testimonials[currentTestimonial]?.image || "/placeholder.jpg"}
                        alt={testimonials[currentTestimonial]?.name || "Testimonial"}
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                    <div className="flex-1">
                      <Quote className="h-8 w-8 text-primary/20 mb-2" />
                      <p className="text-gray-900 font-medium italic mb-4 text-lg leading-relaxed">
                        {testimonials[currentTestimonial]?.quote}
                      </p>
                      <div>
                        <p className="font-bold text-gray-900 text-lg">
                          {testimonials[currentTestimonial]?.name}
                        </p>
                        <p className="text-base font-semibold text-gray-700">
                          {testimonials[currentTestimonial]?.role}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {isMobile && (
                <div className="flex justify-center gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={goToPrevTestimonial}
                    className="rounded-full"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={goToNextTestimonial}
                    className="rounded-full"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background shapes - only render when mounted and on desktop */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
          {/* Larger soft cloud-like shapes with subtle animations */}
          <motion.div
            className="absolute rounded-full bg-blue-200/50 backdrop-blur-3xl"
            style={{ width: "50%", height: "50%", left: "-15%", top: "-15%" }}
            animate={{
              x: [0, 15, 0],
              y: [0, 10, 0],
              scale: [1, 1.05, 1],
              opacity: [0.5, 0.6, 0.5],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />

          {/* Top right cloud */}
          <motion.div
            className="absolute rounded-full bg-indigo-200/40 backdrop-blur-3xl"
            style={{ width: "45%", height: "45%", right: "-10%", top: "0%" }}
            animate={{
              x: [0, -20, 0],
              y: [0, 15, 0],
              scale: [1, 1.05, 1],
              opacity: [0.4, 0.5, 0.4],
            }}
            transition={{
              duration: 25,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />

          {/* Bottom left cloud */}
          <motion.div
            className="absolute rounded-full bg-purple-200/35 backdrop-blur-3xl"
            style={{ width: "55%", height: "55%", left: "-20%", bottom: "-10%" }}
            animate={{
              x: [0, 25, 0],
              y: [0, -15, 0],
              scale: [1, 1.08, 1],
              opacity: [0.35, 0.45, 0.35],
            }}
            transition={{
              duration: 30,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />

          {/* Bottom right cloud */}
          <motion.div
            className="absolute rounded-full bg-blue-200/45 backdrop-blur-3xl"
            style={{ width: "50%", height: "50%", right: "-15%", bottom: "-5%" }}
            animate={{
              x: [0, -15, 0],
              y: [0, -10, 0],
              scale: [1, 1.05, 1],
              opacity: [0.45, 0.55, 0.45],
            }}
            transition={{
              duration: 22,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />

          {/* Center cloud */}
          <motion.div
            className="absolute rounded-full bg-indigo-200/30 backdrop-blur-3xl"
            style={{ width: "60%", height: "60%", left: "20%", top: "20%" }}
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.3, 0.4, 0.3],
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />

          {/* Subtle color accent areas */}
          <motion.div
            className="absolute rounded-full bg-blue-300/20 backdrop-blur-xl"
            style={{ width: "40%", height: "40%", left: "15%", top: "5%" }}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 18,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute rounded-full bg-purple-300/20 backdrop-blur-xl"
            style={{ width: "35%", height: "35%", right: "10%", bottom: "15%" }}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        </div>
      )}
    </div>
  )
}

