import { NextResponse } from 'next/server'
import { type Application, applicationSchema } from '@/types/application'
import { z } from "zod"

// Function to generate a 6-digit application ID
function generateApplicationId(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Create a schema for the initial application submission
const createApplicationSchema = applicationSchema.omit({
  id: true,
  status: true,
  createdAt: true,
  updatedAt: true,
})

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const body = createApplicationSchema.parse(json)
    
    // Create a full application with generated fields
    const newApplication: Application = {
      ...body,
      id: generateApplicationId(),
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    // Here you would store the application in your database
    return NextResponse.json({ 
      success: true,
      message: 'Application stored successfully',
      application: newApplication
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid application data", details: error.errors },
        { status: 400 }
      )
    }
    
    console.error('Error storing application:', error)
    return NextResponse.json(
      { error: 'Failed to store application data' },
      { status: 500 }
    )
  }
}

// Add OPTIONS handler for CORS
export async function OPTIONS(request: Request) {
  return NextResponse.json({}, { status: 200 })
} 