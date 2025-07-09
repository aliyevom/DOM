"use client"

import { Suspense, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, Mail, Phone, MapPin, CalendarDays } from "lucide-react"
import Link from "next/link"

function ApplicationSubmittedContent() {
  const [params, setParams] = useState<{ id: string | null; name: string | null }>({
    id: null,
    name: null
  })

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    setParams({
      id: searchParams.get("id"),
      name: searchParams.get("name")
    })
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="mx-auto h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="h-6 w-6 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
            Application Submitted Successfully!
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Thank you for applying to DOM Tech Academy. We will review your
            application and get back to you within 24 hours.
          </p>
        </div>

        <Card className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Application Details</h2>
          <p className="text-gray-600 mb-4">
            Your application has been received and is being processed
          </p>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-900">Application ID</h3>
              <p className="mt-1 text-2xl font-mono tracking-wider text-blue-600">
                {params.id}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Please save this ID for future reference
              </p>
            </div>

            <div>
              <h3 className="font-medium text-gray-900">Student Name</h3>
              <p className="mt-1 text-gray-600">{params.name}</p>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Next Steps</h2>

          <div className="bg-white shadow rounded-lg p-6 flex items-start space-x-4">
            <CalendarDays className="h-6 w-6 text-blue-500 mt-1" />
            <div>
              <h3 className="font-medium text-gray-900">Review Process</h3>
              <p className="mt-1 text-gray-600">
                Our team will review your application within 24 hours
              </p>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6 flex items-start space-x-4">
            <Mail className="h-6 w-6 text-blue-500 mt-1" />
            <div>
              <h3 className="font-medium text-gray-900">Email Notification</h3>
              <p className="mt-1 text-gray-600">
                You will receive an email confirmation shortly
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/application">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Submit Another Application
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function ApplicationSubmittedPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ApplicationSubmittedContent />
    </Suspense>
  )
} 