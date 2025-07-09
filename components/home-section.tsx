"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function HomeSection() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 relative overflow-hidden">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-indigo-100 to-blue-100"></div>

      {/* Soft rounded shapes */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-300/30 blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-300/30 blur-3xl"></div>
      <div className="absolute top-1/3 right-1/3 w-64 h-64 rounded-full bg-indigo-400/20 blur-3xl"></div>
      <div className="absolute bottom-1/3 left-1/3 w-72 h-72 rounded-full bg-blue-400/20 blur-3xl"></div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative bg-white/80 backdrop-blur-sm rounded-lg shadow-xl p-8"
          style={{
            boxShadow: "0 10px 30px rgba(106, 137, 231, 0.4), 0 15px 60px rgba(48, 92, 222, 0.2)",
          }}
        >
          <Image
            src="/images/dom-tech-logo.png"
            alt="DOM Tech Academy Logo"
            width={240}
            height={240}
            className="object-contain drop-shadow-lg"
            style={{
              filter: "drop-shadow(0 4px 6px rgba(0, 0, 255, 0.2))",
            }}
          />
        </motion.div>

        <div className="mt-12 text-center">
          <motion.p className="text-xl italic text-primary font-medium fade-in">Welcome to DOM Tech Academy</motion.p>
          <motion.p className="text-lg text-primary-light mt-2 fade-in-delay">Why choose us?</motion.p>
        </div>
      </div>
    </div>
  )
}

