import { NextResponse } from "next/server"
import { z } from "zod"

// Contact form schema validation
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\+?[1-9]\d{9,14}$/, "Invalid phone number"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    // Validate request body
    const validatedData = contactFormSchema.parse(body)

    // Here we'll send the email using the email service
    const emailContent = `
      New Contact Form Submission
      
      Name: ${validatedData.name}
      Email: ${validatedData.email}
      Phone: ${validatedData.phone}
      Subject: ${validatedData.subject}
      
      Message:
      ${validatedData.message}
    `

    // Send email using the email service
    try {
      await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: "info@domtechacademy.com",
          subject: `Contact Form: ${validatedData.subject}`,
          text: emailContent,
          html: emailContent.replace(/\n/g, "<br>"),
        }),
      })
    } catch (error) {
      console.error("Failed to send email:", error)
      return NextResponse.json(
        { error: "Failed to send contact form submission" },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: "Contact form submitted successfully" },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Failed to submit contact form" },
      { status: 500 }
    )
  }
} 