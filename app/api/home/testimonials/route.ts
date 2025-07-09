import { NextResponse } from 'next/server'

export const dynamic = "force-static"

// Testimonial interface
interface Testimonial {
  id: number
  name: string
  role: string
  quote: string
  image: string
}

// Mock database
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sundar Pichai",
    role: "CEO of Google",
    quote: "Coding is the language of problem-solving. When children learn to code at a young age, they develop critical thinking skills that benefit them throughout life.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Sundar_pichai.png/330px-Sundar_pichai.png",
  },
  {
    id: 2,
    name: "Satya Nadella",
    role: "CEO of Microsoft",
    quote: "Teaching children to code doesn't just prepare them for the future workforce; it teaches them how to think creatively and solve complex problems.",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/78/MS-Exec-Nadella-Satya-2017-08-31-22_%28cropped%29.jpg",
  },
  {
    id: 3,
    name: "Lisa Su",
    role: "CEO of AMD",
    quote: "Robotics education for young minds combines hardware and software learning in a way that makes abstract concepts tangible and exciting for children.",
    image: "https://cdn.wccftech.com/wp-content/uploads/2023/06/AMD-Instinct-MI300-Exascale-APUs.jpeg",
  },
  {
    id: 4,
    name: "Jensen Huang",
    role: "CEO of NVIDIA",
    quote: "The computational thinking skills that children develop through coding are the foundation for advanced reasoning and innovation in any field they choose to pursue.",
    image: "https://api.time.com/wp-content/uploads/2020/09/jensen-huang-time-100-2021.jpg",
  },
]

export async function GET() {
  try {
    return NextResponse.json({ testimonials }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    )
  }
} 