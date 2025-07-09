"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

export default function ContactSection() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (mapRef.current) {
      setMapLoaded(true)
    }
    setMounted(true)
  }, [])

  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      details: "303 Wyman St Suite 300, Waltham, MA 02451",
    },
    {
      icon: Phone,
      title: "Contact Us",
      details: (
        <div className="flex items-center justify-start space-x-4 mt-2">
          <a 
            href={`mailto:${process.env.NEXT_PUBLIC_ADMIN_EMAIL}`}
            className="group"
          >
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300 border-2 border-primary/20 group-hover:border-primary">
              <Mail className="h-5 w-5 text-primary group-hover:text-white" />
            </div>
            <span className="text-sm text-gray-600 block mt-1">Email Us</span>
          </a>
          <a 
            href="tel:+13392068081"
            className="group"
          >
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300 border-2 border-primary/20 group-hover:border-primary">
              <Phone className="h-5 w-5 text-primary group-hover:text-white" />
            </div>
            <span className="text-sm text-gray-600 block mt-1">Call Us</span>
          </a>
        </div>
      ),
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: "Monday - Friday: 3PM - 7PM\nSaturday: 10AM - 3PM\nSunday: Closed",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Background gradient - visible on all screens */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/80 via-indigo-50/40 to-white/60"></div>

      {/* Content wrapper */}
      <div className="w-full max-w-6xl mx-auto relative z-10 px-4 py-6 md:py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Contact Us</h2>
          <p className="text-gray-600 mt-2 text-base md:text-lg">Get in touch with our team</p>
        </div>

        {/* Mobile layout */}
        <div className="md:hidden space-y-4">
          {/* Map for mobile - shown first */}
          <Card className="overflow-hidden shadow-sm">
            <CardContent className="p-0">
              <div className="relative h-[250px]" ref={mapRef}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2946.8966286434856!2d-71.26364492346848!3d42.39561623507597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e39d8dbe45a929%3A0x6f1b36d64c2a6d4!2s303%20Wyman%20St%20%23300%2C%20Waltham%2C%20MA%2002451!5e0!3m2!1sen!2sus!4v1711686000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                ></iframe>
              </div>
            </CardContent>
          </Card>

          {/* Combined Address and Working Hours Card */}
          <Card className="bg-white shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <a 
                  href="https://maps.google.com/?q=303+Wyman+St+Suite+300,+Waltham,+MA+02451"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <div className="bg-blue-100/80 p-3 rounded-full group-hover:bg-blue-200/80 transition-colors">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                </a>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">Address</h3>
                  <a 
                    href="https://maps.google.com/?q=303+Wyman+St+Suite+300,+Waltham,+MA+02451"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 text-sm mt-1 hover:text-primary transition-colors block"
                  >
                    303 Wyman St Suite 300,<br />
                    Waltham, MA 02451
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4 mt-4 pt-4 border-t border-gray-100">
                <a 
                  href="https://maps.google.com/maps?q=DOM+Tech+Academy&hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <div className="bg-blue-100/80 p-3 rounded-full group-hover:bg-blue-200/80 transition-colors">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                </a>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">Working Hours</h3>
                  <a 
                    href="https://maps.google.com/maps?q=DOM+Tech+Academy&hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 text-sm mt-1 hover:text-primary transition-colors block space-y-0.5"
                  >
                    <p>Monday - Friday: 3PM - 7PM</p>
                    <p>Saturday: 10AM - 3PM</p>
                    <p>Sunday: Closed</p>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Methods Card */}
          <Card className="bg-white shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100/80 p-2.5 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                      className="text-primary"
                    >
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="8" y1="13" x2="16" y2="13" />
                      <line x1="8" y1="17" x2="16" y2="17" />
                      <line x1="10" y1="9" x2="14" y2="9" />
                    </svg>
                  </div>
                  <h3 className="font-medium text-gray-900">Contact Methods</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <a 
                  href={`mailto:${process.env.NEXT_PUBLIC_ADMIN_EMAIL}`}
                  className="flex flex-col items-center p-3 rounded-xl bg-blue-50/50 hover:bg-blue-50 transition-colors"
                >
                  <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-2 shadow-sm">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm text-gray-700 font-medium">Email Us</span>
                </a>
                <a 
                  href="tel:+13392068081"
                  className="flex flex-col items-center p-3 rounded-xl bg-blue-50/50 hover:bg-blue-50 transition-colors"
                >
                  <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-2 shadow-sm">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm text-gray-700 font-medium">Call Us</span>
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Connect with us Card */}
          <Card className="bg-white shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="bg-blue-100/80 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-7 w-7 text-primary"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Connect with us</h3>
              <p className="text-gray-600 text-sm mb-3">Follow us on social media for updates and tech insights.</p>
              <div className="flex justify-center space-x-6">
                <a 
                  href="https://www.instagram.com/domtechacademy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.tiktok.com/@domtechacademy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.facebook.com/share/1DjueE5PhA/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Office Location Images for mobile */}
          <div className="overflow-hidden rounded-lg shadow-sm">
            <div className="relative h-[250px] w-full">
              <div className="relative w-full h-full">
                <Image 
                  src="/images/office1.jpeg" 
                  alt="DOM Tech Academy Classroom" 
                  fill 
                  className="object-cover brightness-[1.02]"
                  priority
                />
                {/* Small preview of second image - hidden on very small screens */}
                <div className="hidden sm:block absolute top-4 right-4 w-32 h-24 border-2 border-white/90 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform cursor-pointer">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <Image 
                    src="/images/office2.jpeg" 
                    alt="DOM Tech Academy Computer Lab" 
                    fill 
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end">
                <div className="p-6 text-white w-full">
                  <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 max-w-lg">
                    <h3 className="text-xl font-bold mb-2">Visit Our Campus</h3>
                    <p className="text-white text-sm leading-relaxed">
                      Experience our modern facility equipped with the latest technology to provide an optimal learning environment for our students.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop layout - hidden on mobile */}
        <div className="hidden md:grid grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Left column with contact info */}
          <div className="space-y-8">
            {/* Combined Address and Working Hours Card */}
            <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white/90 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-start space-x-6">
                  <a 
                    href="https://maps.google.com/?q=303+Wyman+St+Suite+300,+Waltham,+MA+02451"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <div className="bg-blue-100/80 p-4 rounded-full group-hover:bg-blue-200/80 transition-colors">
                      <MapPin className="h-8 w-8 text-primary" />
                    </div>
                  </a>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 text-lg">Address</h3>
                    <a 
                      href="https://maps.google.com/?q=303+Wyman+St+Suite+300,+Waltham,+MA+02451"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 text-base mt-2 hover:text-primary transition-colors block"
                    >
                      303 Wyman St Suite 300,<br />
                      Waltham, MA 02451
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-6 mt-6 pt-6 border-t border-gray-100">
                  <a 
                    href="https://maps.google.com/maps?q=DOM+Tech+Academy&hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <div className="bg-blue-100/80 p-4 rounded-full group-hover:bg-blue-200/80 transition-colors">
                      <Clock className="h-8 w-8 text-primary" />
                    </div>
                  </a>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 text-lg">Working Hours</h3>
                    <a 
                      href="https://maps.google.com/maps?q=DOM+Tech+Academy&hl=en"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 text-base mt-2 hover:text-primary transition-colors block space-y-1"
                    >
                      <p>Monday - Friday: 3PM - 7PM</p>
                      <p>Saturday: 10AM - 3PM</p>
                      <p>Sunday: Closed</p>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Methods Card */}
            <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white/90 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="bg-blue-100/80 p-3 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                      className="text-primary"
                    >
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="8" y1="13" x2="16" y2="13" />
                      <line x1="8" y1="17" x2="16" y2="17" />
                      <line x1="10" y1="9" x2="14" y2="9" />
                    </svg>
                  </div>
                  <h3 className="font-medium text-gray-900 text-lg">Contact Methods</h3>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <a 
                    href={`mailto:${process.env.NEXT_PUBLIC_ADMIN_EMAIL}`}
                    className="flex flex-col items-center p-6 rounded-xl bg-blue-50/50 hover:bg-blue-50 transition-all duration-300 group"
                  >
                    <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                      <Mail className="h-8 w-8 text-primary" />
                    </div>
                    <span className="text-base text-gray-700 font-medium">Email Us</span>
                  </a>
                  <a 
                    href="tel:+13392068081"
                    className="flex flex-col items-center p-6 rounded-xl bg-blue-50/50 hover:bg-blue-50 transition-all duration-300 group"
                  >
                    <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                      <Phone className="h-8 w-8 text-primary" />
                    </div>
                    <span className="text-base text-gray-700 font-medium">Call Us</span>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Connect with us Card */}
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <a 
                    href="https://www.linkedin.com/company/dom-tech-academy/?viewAsMember=true" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-light"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-8 w-8 text-primary"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                </div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Connect with us</h3>
                <p className="text-gray-600 mb-4">Follow us on social media for updates and tech insights.</p>
                <div className="flex justify-center space-x-6">
                  {/* Social media icons */}
                  <a 
                    href="https://www.instagram.com/domtechacademy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-dark transition-colors"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.tiktok.com/@domtechacademy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-dark transition-colors"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.facebook.com/share/1DjueE5PhA/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-dark transition-colors"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>

          {/* Right column with map and office image */}
          <div className="space-y-8">
            <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow h-[500px]">
              <CardContent className="p-0 h-full">
                <div className="relative h-full" ref={mapRef}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2946.8966286434856!2d-71.26364492346848!3d42.39561623507597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e39d8dbe45a929%3A0x6f1b36d64c2a6d4!2s303%20Wyman%20St%20%23300%2C%20Waltham%2C%20MA%2002451!5e0!3m2!1sen!2sus!4v1711686000000!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                  ></iframe>
                </div>
              </CardContent>
            </Card>

            {/* Office Location Images for desktop */}
            <div className="overflow-hidden rounded-lg shadow-sm">
              <div className="relative h-[400px] w-full">
            <div className="relative w-full h-full">
                  <Image 
                    src="/images/office1.jpeg" 
                    alt="DOM Tech Academy Classroom" 
                    fill 
                    className="object-cover brightness-[1.02]"
                    priority
                  />
              {/* Small preview of second image */}
                  <div className="absolute top-6 right-6 w-48 h-36 border-2 border-white/90 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform cursor-pointer">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <Image 
                      src="/images/office2.jpeg" 
                      alt="DOM Tech Academy Computer Lab" 
                      fill 
                      className="object-cover"
                    />
              </div>
            </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end">
                  <div className="p-8 text-white w-full">
                    <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 max-w-2xl">
                      <h3 className="text-2xl font-bold mb-3">Visit Our Campus</h3>
                      <p className="text-white text-base leading-relaxed">
                        Experience our modern facility equipped with the latest technology to provide an optimal learning environment for our students.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

