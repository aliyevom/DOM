import { NextResponse } from 'next/server'
import { z } from 'zod'

export const dynamic = "force-static"

// Registration schema
const registrationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  childAge: z.number().min(5).max(17),
  course: z.string(),
  preferredTime: z.string(),
})

// Registration interface
interface Registration extends z.infer<typeof registrationSchema> {
  id: string
  status: 'pending' | 'approved' | 'rejected'
  createdAt: Date
}

// Mock database
let registrations: Registration[] = []

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate request body
    const validatedData = registrationSchema.parse(body)
    
    // Create new registration
    const registration: Registration = {
      ...validatedData,
      id: Math.random().toString(36).substring(7),
      status: 'pending',
      createdAt: new Date(),
    }
    
    // Save to mock database
    registrations.push(registration)
    
    return NextResponse.json(
      { 
        message: 'Registration submitted successfully',
        registration 
      }, 
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid registration data', details: error.errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to process registration' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // In a real application, you might want to paginate and filter these results
    return NextResponse.json({ registrations }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch registrations' },
      { status: 500 }
    )
  }
} 