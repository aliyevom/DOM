import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { type Application } from '@/types/application'

// Update schema
const updateSchema = z.object({
  status: z.enum(["pending", "reviewing", "accepted", "rejected"]).optional(),
  notes: z.string().optional(),
})

// Mock database - we need to access it here too
const applications: Application[] = [
  {
    id: "1",
    studentName: "Alex Johnson",
    parentName: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1234567890",
    studentAge: 12,
    course: "Summer Robotics Camp 2024",
    preferredTime: "Morning",
    experience: "beginner",
    specialNeeds: "",
    emergencyContact: {
      name: "John Johnson",
      relation: "Father",
      phone: "+1234567891",
    },
    status: "pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

// Generate static paths for all applications
export async function generateStaticParams() {
  return applications.map((app) => ({
    id: app.id,
  }))
}

// Static data for GET requests
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const application = applications.find((app) => app.id === params.id)
  
  if (!application) {
    return new NextResponse(
      JSON.stringify({ error: "Application not found" }),
      { status: 404 }
    )
  }

  return new NextResponse(JSON.stringify(application))
}

// Static data for PATCH requests
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { id } = params

    // Find the application
    const applicationIndex = applications.findIndex((app) => app.id === id)
    if (applicationIndex === -1) {
      return new NextResponse(
        JSON.stringify({ error: "Application not found" }),
        { status: 404 }
      )
    }

    // Validate update data
    const validatedData = updateSchema.parse(body)

    // Update the application
    const updatedApplication = {
      ...applications[applicationIndex],
      ...validatedData,
      updatedAt: new Date().toISOString(),
    }

    applications[applicationIndex] = updatedApplication

    return new NextResponse(JSON.stringify(updatedApplication))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(
        JSON.stringify({ error: "Invalid update data", details: error.errors }),
        { status: 400 }
      )
    }

    console.error("Error updating application:", error)
    return new NextResponse(
      JSON.stringify({ error: "Failed to update application" }),
      { status: 500 }
    )
  }
}

// Static data for DELETE requests
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params

  // Find and remove the application
  const applicationIndex = applications.findIndex((app) => app.id === id)
  if (applicationIndex === -1) {
    return new NextResponse(
      JSON.stringify({ error: "Application not found" }),
      { status: 404 }
    )
  }

  applications.splice(applicationIndex, 1)

  return new NextResponse(
    JSON.stringify({ message: "Application deleted successfully" }),
    { status: 200 }
  )
} 