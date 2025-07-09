import { NextResponse } from "next/server"
import { z } from "zod"

// Contact form schema
const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    // Validate the request body
    const validatedData = contactSchema.parse(body)

    // Here you would typically:
    // 1. Save to database
    // 2. Send email notification
    // For now, we'll just return a success response
    
    return NextResponse.json(
      { 
        success: true, 
        message: "Thank you for your message. We will get back to you soon." 
      },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Validation failed", 
          errors: error.errors 
        },
        { status: 400 }
      )
    }

    console.error("Contact form submission error:", error)
    return NextResponse.json(
      { 
        success: false, 
        message: "Something went wrong. Please try again later." 
      },
      { status: 500 }
    )
  }
} 