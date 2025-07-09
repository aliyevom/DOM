'use client';

import { motion } from 'framer-motion';

export default function BrochureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-[#1a237e]">
      {/* Background Pattern Layer */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 bg-[url('/hi-link/ref.png')] bg-repeat opacity-[0.15]"
          style={{ 
            backgroundSize: '300px 300px',
            transform: 'scale(1)',
            backgroundPosition: 'center'
          }}
        />
        {/* Gradient Overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a237e] via-[#1a237e]/50 to-[#1a237e]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a237e] via-transparent to-[#1a237e]" />
      </div>
      
      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </div>
  );
} 