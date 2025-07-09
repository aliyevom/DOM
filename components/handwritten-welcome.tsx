"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface HandwrittenWelcomeProps {
  text?: string
  className?: string
  delay?: number
  letterDelay?: number
}

export default function HandwrittenWelcome({
  text = "welcome",
  className = "",
  delay = 0.5,
  letterDelay = 0.1,
}: HandwrittenWelcomeProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className={`text-center molle-regular-italic ${className}`}>
      {text.split("").map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + index * letterDelay,
            ease: "easeOut",
          }}
          className="inline-block"
          style={{
            display: "inline-block",
            marginRight: char === " " ? "0.5rem" : "0.05rem",
          }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  )
}

