import { NextResponse } from 'next/server'

export const dynamic = "force-static"

// Feature interface
interface Feature {
  id: number
  title: string
  description: string
  icon: string
}

// Mock database
const features: Feature[] = [
  {
    id: 1,
    title: "Age-Appropriate Learning",
    description: "Curriculum designed specifically for different age groups from 6-16",
    icon: "BookOpen",
  },
  {
    id: 2,
    title: "Robotic Coding",
    description: "Hands-on projects building and programming real robots",
    icon: "Code",
  },
  {
    id: 3,
    title: "Small Class Size",
    description: "Maximum attention with 6:1 student to instructor ratio",
    icon: "Users",
  },
  {
    id: 4,
    title: "Expert Instructors",
    description: "Experienced teachers passionate about technology education",
    icon: "Award",
  },
]

export async function GET() {
  try {
    return NextResponse.json({ features }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch features' },
      { status: 500 }
    )
  }
} 