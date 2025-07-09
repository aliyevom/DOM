import { NextResponse } from 'next/server'

export const dynamic = "force-static"

// Stats interface
interface Stats {
  totalStudents: number
  averageRating: number
  coursesOffered: number
  successRate: number
  upcomingCourses: {
    id: number
    name: string
    startDate: string
    availableSeats: number
  }[]
}

// Mock database
const stats: Stats = {
  totalStudents: 250,
  averageRating: 4.8,
  coursesOffered: 12,
  successRate: 98,
  upcomingCourses: [
    {
      id: 1,
      name: "Pre-Coding (Ages 6-10)",
      startDate: "2024-05-05",
      availableSeats: 6,
    },
    {
      id: 2,
      name: "Python with EV3 (Ages 11-16)",
      startDate: "2024-05-05",
      availableSeats: 4,
    },
    {
      id: 3,
      name: "Mid-Robotics (Ages 6-10)",
      startDate: "2024-05-12",
      availableSeats: 8,
    },
    {
      id: 4,
      name: "Arduino Coding (Ages 11-16)",
      startDate: "2024-05-12",
      availableSeats: 5,
    },
  ],
}

export async function GET() {
  try {
    return NextResponse.json({ stats }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
} 