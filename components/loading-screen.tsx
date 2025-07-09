"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import StyledText from "./StyledText"

interface LoadingScreenProps {
  isExiting?: boolean
}

export default function LoadingScreen({ isExiting = false }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ 
          opacity: 0,
          scale: 0.95,
          transition: {
            duration: 0.5,
            ease: "easeInOut"
          }
        }}
        className="fixed inset-0 bg-gradient-to-b from-[#4990e2]/10 via-white to-white flex items-center justify-center overflow-hidden"
      >
        {/* Background pattern */}
        <motion.div 
          className="absolute inset-0 opacity-5"
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#4990e2_1px,transparent_0)] bg-[size:40px_40px]"></div>
        </motion.div>

        {/* Animated background shapes */}
        <motion.div
          className="absolute rounded-full bg-[#4990e2]/5 backdrop-blur-3xl"
          style={{ width: "60%", height: "60%", left: "-20%", top: "-20%" }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          exit={{ 
            opacity: 0,
            scale: 1.2,
            transition: { duration: 0.5 }
          }}
        />

        <motion.div
          className="absolute rounded-full bg-[#4990e2]/5 backdrop-blur-3xl"
          style={{ width: "50%", height: "50%", right: "-15%", bottom: "-15%" }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 2,
          }}
          exit={{ 
            opacity: 0,
            scale: 1.2,
            transition: { duration: 0.5 }
          }}
        />

        <div className="text-center relative z-10">
          {/* Logo container with animation */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ 
              scale: 0.8,
              opacity: 0,
              transition: { duration: 0.5 }
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut"
            }}
            className="mb-12 relative w-[320px] h-[160px] sm:w-[420px] sm:h-[210px] mx-auto"
          >
            <Image
              src="/images/dom-tech-logo.png"
              alt="DOM Tech Academy"
              fill
              className="object-contain"
              style={{
                
              }}
              priority
            />
            {/* Logo glow effect */}
            <motion.div
              className="absolute inset-0 bg-[#4990e2]/20 rounded-full blur-2xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              exit={{ 
                opacity: 0,
                scale: 1.5,
                transition: { duration: 0.5 }
              }}
            />
          </motion.div>

          {/* Text animation */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ 
              y: -20,
              opacity: 0,
              transition: { duration: 0.5 }
            }}
            transition={{
              delay: 0.6,
              duration: 0.5,
              ease: "easeOut"
            }}
            className="mb-4 px-6 sm:px-0"
          >
            <StyledText
              text="Tomorrow's Engineers Start Here"
              size="4xl"
              className="text-xl sm:text-4xl font-bold italic text-[#4990e2] tracking-wide font-serif 
                leading-tight sm:leading-normal
                [text-shadow:_0_2px_4px_rgba(73,144,226,0.3)]
                break-words sm:break-normal
                max-w-[280px] sm:max-w-none mx-auto
                flex flex-wrap justify-center sm:block
              "
            />
          </motion.div>

          {/* Loading animation */}
          <div className="relative max-w-[240px] mx-auto">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              exit={{ 
                opacity: 0,
                transition: { duration: 0.3 }
              }}
              transition={{
                delay: 1,
                duration: 1.2,
                ease: "easeInOut"
              }}
              className="h-1 bg-[#4990e2] rounded-full"
            />
            <motion.div
              className="absolute inset-0 bg-[#4990e2]/20 rounded-full blur-sm"
              animate={{
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              exit={{ 
                opacity: 0,
                transition: { duration: 0.3 }
              }}
            />
          </div>

          {/* Loading text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              y: 10,
              transition: { duration: 0.5 }
            }}
            transition={{
              delay: 1.5,
              duration: 0.5
            }}
            className="mt-4"
          >
            <StyledText
              text="Welcome to the future of tech education"
              size="xl"
              variant="button"
              className="text-[#4990e2] text-lg font-medium tracking-wide"
            />
          </motion.div>

          {/* Additional decorative elements */}
          <motion.div
            className="mt-6 flex justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              scale: 0.8,
              transition: { duration: 0.5 }
            }}
            transition={{
              delay: 2,
              duration: 0.5
            }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-[#4990e2]/30"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
                exit={{ 
                  opacity: 0,
                  scale: 0,
                  transition: { duration: 0.3, delay: i * 0.1 }
                }}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
} 