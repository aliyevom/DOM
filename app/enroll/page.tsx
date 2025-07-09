'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Globe, MapPin, Instagram, Star, ChevronRight, Phone } from 'lucide-react';
import { logEvent, getAnalytics } from 'firebase/analytics';
import { getApp } from 'firebase/app';

// Declare dataLayer for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
  }
}

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="min-h-screen bg-[#1a237e] relative">
    {/* Background Pattern Layer */}
    <div className="absolute inset-0">
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
    
    {/* Spinner */}
    <div className="relative z-10 flex items-center justify-center min-h-screen">
      <div className="relative w-16 h-16">
        <div className="absolute w-full h-full border-4 border-white/20 rounded-full"></div>
        <div className="absolute w-full h-full border-4 border-transparent border-t-white rounded-full animate-spin"></div>
      </div>
    </div>
  </div>
);

const links = [
  {
    title: 'Apply Now',
    url: 'https://domtechacademy.com/application',
    icon: ChevronRight,
    color: '#007AFF'
  },
  {
    title: 'Visit Website',
    url: 'https://domtechacademy.com/',
    icon: Globe,
    color: '#00FF94'
  },
  {
    title: 'Call Us',
    url: 'tel:+1-339-206-8081',
    icon: Phone,
    color: '#34C759'
  },
  {
    title: 'Our Location',
    url: 'https://maps.app.goo.gl/rvVgEAqSjD5kzQE77',
    icon: MapPin,
    color: '#FF3B30'
  },
  {
    title: 'Follow Us on Instagram',
    url: 'https://www.instagram.com/domtechacademy?igsh=MTNmOWJrc2xuYXUybw%3D%3D&utm_source=qr',
    icon: Instagram,
    color: '#E4405F'
  }
];

const images = [
  '/hi-link/pexels-vanessa-loring-7868892.jpg',
  '/hi-link/happy-kids-programming-electric-toys-and-robots-at-2025-02-22-12-58-44-utc.jpg',
  '/hi-link/group-of-students-in-after-school-computer-coding-2024-10-20-15-45-37-utc.jpg',
  '/hi-link/group-of-kids-working-together-on-project-with-ele-2024-10-20-11-47-13-utc.jpg'
];

export default function EnrollPage() {
  const [mounted, setMounted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);
  const { theme } = useTheme();

  useEffect(() => {
    // Push page view event to dataLayer
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'page_view',
        page: {
          title: 'Links Page',
          path: '/enroll',
          hostname: window.location.hostname
        }
      });
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 1000); // Add a minimum loading time of 1 second
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      setSlideDirection(1);
    }, 6000); // Increased to 6 seconds for better viewing

    return () => clearInterval(timer);
  }, []);

  const handleSlideChange = (index: number) => {
    setSlideDirection(index > currentImageIndex ? 1 : -1);
    setCurrentImageIndex(index);
  };

  const handleLinkClick = (linkTitle: string, url: string) => {
    // Push link click event to dataLayer
    if (typeof window !== 'undefined') {
      window.dataLayer.push({
        event: 'link_click',
        link: {
          title: linkTitle,
          url: url,
          source: 'links_page'
        }
      });
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (!mounted) return <LoadingSpinner />;

  return (
    <div className="relative min-h-screen bg-[#1a237e]">
      {/* Background Pattern Layer */}
      <div className="absolute inset-0">
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

      <div className="relative container mx-auto px-4 py-6 md:py-8 max-w-lg min-h-screen flex flex-col">
        {/* Logo and Title */}
        <div className="text-center mb-6 md:mb-8 flex-shrink-0">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-32 h-32 md:w-48 md:h-48 mx-auto mb-4 md:mb-6"
          >
            <div className="absolute inset-0 bg-blue-500 rounded-xl blur-[50px] opacity-10" />
            <Image
              src="/images/logo-link.png"
              alt="DOM Tech Academy"
              fill
              className="p-3 md:p-4 drop-shadow-[0_0_15px_rgba(59,130,246,0.2)]"
              style={{ objectFit: 'contain' }}
              priority
              quality={100}
            />
          </motion.div>
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-3xl md:text-4xl font-bold text-white mb-1 md:mb-2"
          >
            DOM Tech Academy
          </motion.h1>
          <motion.p
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-white font-medium bg-clip-text text-sm md:text-base"
          >
            <span className="text-blue-400 font-bold">#</span>
            <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent animate-pulse">
              Tomorrow&apos;s Engineers Start Here
            </span>
          </motion.p>
        </div>

        {/* Slideshow */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-full aspect-[4/3] mb-6 md:mb-8 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl flex-shrink-0 order-3 md:order-2 bg-[#1a237e]"
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ x: slideDirection * 100 + '%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: slideDirection * -100 + '%', opacity: 0 }}
              transition={{ 
                type: "tween",
                duration: 0.5,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-[#1a237e]"
            >
              <Image
                src={images[currentImageIndex]}
                alt={`DOM Tech Academy - Slide ${currentImageIndex + 1}`}
                fill
                className="object-cover opacity-0 transition-opacity duration-300"
                onLoadingComplete={(image) => {
                  image.classList.remove('opacity-0');
                }}
                priority={currentImageIndex === 0}
                quality={90}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation Arrows */}
          <button 
            onClick={() => handleSlideChange((currentImageIndex - 1 + images.length) % images.length)}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white
                     bg-[#1a237e]/50 hover:bg-[#1a237e]/70 rounded-full w-10 h-10 flex items-center justify-center
                     transition-all duration-300 backdrop-blur-sm"
            aria-label="Previous slide"
          >
            ←
          </button>
          <button 
            onClick={() => handleSlideChange((currentImageIndex + 1) % images.length)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white
                     bg-[#1a237e]/50 hover:bg-[#1a237e]/70 rounded-full w-10 h-10 flex items-center justify-center
                     transition-all duration-300 backdrop-blur-sm"
            aria-label="Next slide"
          >
            →
          </button>
          
          {/* Slideshow Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-[#1a237e]/40 rounded-full px-3 py-2 backdrop-blur-sm">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => handleSlideChange(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentImageIndex 
                    ? 'bg-blue-400 w-6' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Links - Shown first on mobile */}
        <div className="space-y-2 md:space-y-3 flex-grow order-2 md:order-3 mb-6 md:mb-0">
          {links.map((link, index) => (
            <motion.button
              key={link.url}
              onClick={() => handleLinkClick(link.title, link.url)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`w-full flex items-center gap-3 px-4 py-3 ${
                link.title === 'Apply Now'
                ? 'bg-[#4169E1] hover:bg-[#4169E1]/90'
                : link.title === 'Follow Us on Instagram' 
                ? 'bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 hover:from-purple-500/30 hover:via-pink-500/30 hover:to-orange-500/30' 
                : 'bg-[#1a1f3d] hover:bg-[#252a4d]'
              } rounded-lg transition-all duration-200 group`}
            >
              <span className={`p-2 rounded-lg ${
                link.title === 'Apply Now'
                ? 'bg-white/20'
                : link.title === 'Follow Us on Instagram'
                ? 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500'
                : 'bg-[#4169E1]'
              }`}>
                {React.createElement(link.icon, {
                  size: 18,
                  className: "text-white transition-transform duration-300 group-hover:scale-110",
                  strokeWidth: 2
                })}
              </span>
              <span className={`flex-grow text-white font-medium text-left ${
                link.title === 'Apply Now' ? 'font-bold' : ''
              }`}>{link.title}</span>
              <ChevronRight className={`w-5 h-5 ${
                link.title === 'Apply Now'
                ? 'text-white'
                : link.title === 'Follow Us on Instagram'
                ? 'text-pink-400'
                : 'text-[#4169E1] group-hover:translate-x-0.5 transition-transform duration-200'
              }`} />
            </motion.button>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 md:mt-12 border-t border-blue-500/10 pt-6 md:pt-8 flex-shrink-0 order-4"
        >
          <div className="text-center space-y-1 md:space-y-2">
            <p className="text-sm text-blue-400">© 2025 DOM TECH Academy. All Rights Reserved.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 