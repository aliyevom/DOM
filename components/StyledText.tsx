"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface StyledTextProps {
  text: string;
  className?: string;
  size?: 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
  variant?: 'default' | 'button';
}

export default function StyledText({ 
  text, 
  className, 
  size = '6xl',
  variant = 'default' 
}: StyledTextProps) {
  const words = text.split(" ")
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
  }

  // Scale the 3D effect based on text size
  const getEffectScale = () => {
    const scales = {
      'sm': 0.3,
      'base': 0.4,
      'lg': 0.5,
      'xl': 0.6,
      '2xl': 0.7,
      '3xl': 0.8,
      '4xl': 1,
      '5xl': 1.2,
      '6xl': 1.5,
    }
    return (variant === 'button' ? 0.25 : 1) * (scales[size] || 1)
  }

  const scale = getEffectScale()

  if (variant === 'button') {
    return (
      <motion.div
        className={cn("overflow-hidden flex flex-wrap justify-center relative", className)}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {words.map((word, index) => (
          <motion.div
            variants={child}
            key={index}
            className="relative mr-1 last:mr-0"
            style={{
              display: 'inline-block',
            }}
          >
            <span
              style={{
                display: 'block',
                color: 'white',
                textShadow: `
                  0 ${0.5 * scale}px ${1 * scale}px rgba(0, 0, 0, 0.2),
                  0 ${0.25 * scale}px ${0.5 * scale}px rgba(255, 255, 255, 0.3)
                `,
                fontWeight: '600',
                letterSpacing: '0.01em',
              }}
            >
              {word}
            </span>
          </motion.div>
        ))}
      </motion.div>
    )
  }

  return (
    <motion.div
      className={cn("overflow-hidden flex flex-wrap justify-center relative", className)}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.div
          variants={child}
          key={index}
          className="relative mr-1.5 last:mr-0"
          style={{
            display: 'inline-block',
          }}
        >
          {/* White border effect layer */}
          <span
            className="absolute inset-0"
            style={{
              color: 'white',
              textShadow: `
                ${-1 * scale}px ${-1 * scale}px 0 white,
                ${1 * scale}px ${-1 * scale}px 0 white,
                ${-1 * scale}px ${1 * scale}px 0 white,
                ${1 * scale}px ${1 * scale}px 0 white,
                ${1.5 * scale}px ${1.5 * scale}px 0 white,
                ${2 * scale}px ${2 * scale}px 0 white,
                ${2.5 * scale}px ${2.5 * scale}px 0 white,
                ${3 * scale}px ${3 * scale}px ${5 * scale}px rgba(0, 0, 0, 0.15)
              `,
              filter: `drop-shadow(0 ${1.5 * scale}px ${2 * scale}px rgba(255, 255, 255, 0.25))`,
              WebkitTextStroke: `${0.75 * scale}px white`,
              fontWeight: '900',
              letterSpacing: '0.02em',
            }}
          >
            {word}
          </span>
          
          {/* Blue gradient text layer */}
          <span
            style={{
              position: 'relative',
              display: 'block',
              background: 'linear-gradient(180deg, #E8F7FF 0%, #66B5FF 50%, #0085FF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: `drop-shadow(0 ${1.5 * scale}px ${2 * scale}px rgba(0, 157, 255, 0.2))`,
              fontWeight: '900',
              letterSpacing: '0.02em',
              transform: 'translateZ(1px)',
            }}
          >
            {word}
          </span>
        </motion.div>
      ))}
    </motion.div>
  )
} 