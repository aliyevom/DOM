// Types
export interface Testimonial {
  id: number
  name: string
  role: string
  quote: string
  image: string
}

export interface Feature {
  id: number
  title: string
  description: string
  icon: string
  images: {
    src: string
    alt: string
  }[]
}

export interface Registration {
  name: string
  email: string
  phone?: string
  childAge: number
  course: string
  preferredTime: string
}

export interface Stats {
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

// Mock data for static export
const testimonials = [
  {
    id: 1,
    name: "Sundar Pichai",
    role: "CEO of Google",
    quote:
      "Coding is the language of problem-solving. When children learn to code at a young age, they develop critical thinking skills that benefit them throughout life.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Sundar_pichai.png/330px-Sundar_pichai.png",
  },
  {
    id: 2,
    name: "Satya Nadella",
    role: "CEO of Microsoft",
    quote:
      "Teaching children to code doesn't just prepare them for the future workforce; it teaches them how to think creatively and solve complex problems.",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/78/MS-Exec-Nadella-Satya-2017-08-31-22_%28cropped%29.jpg",
  },
  {
    id: 3,
    name: "Lisa Su",
    role: "CEO of AMD",
    quote:
      "Robotics education for young minds combines hardware and software learning in a way that makes abstract concepts tangible and exciting for children.",
    image: "https://cdn.wccftech.com/wp-content/uploads/2023/06/AMD-Instinct-MI300-Exascale-APUs.jpeg",
  },
  {
    id: 4,
    name: "Jensen Huang",
    role: "CEO of NVIDIA",
    quote:
      "The computational thinking skills that children develop through coding are the foundation for advanced reasoning and innovation in any field they choose to pursue.",
    image: "https://api.time.com/wp-content/uploads/2020/09/jensen-huang-time-100-2021.jpg",
  },
]

const mockFeatures: Feature[] = [
  {
    id: 1,
    title: "Expert Instructors",
    description: "Learn from industry professionals with years of experience",
    icon: "Users",
    images: [
      { src: "/images/features/instructor-1.webp", alt: "Expert instructor teaching robotics" },
      { src: "/images/features/instructor-2.webp", alt: "Professional instruction session" },
      { src: "/images/features/group-of-happy-youthful-intercultural-schoolkids-a-2025-03-18-01-29-25-utc.webp", alt: "Diverse group of students learning" },
      { src: "/images/features/curious-children-learn-programming-using-laptops-o-2025-03-23-22-28-55-utc.webp", alt: "Children learning programming" }
    ]
  },
  {
    id: 2,
    title: "Modern Curriculum",
    description: "Stay updated with the latest technologies and best practices",
    icon: "BookOpen",
    images: [
      { src: "/images/features/curriculum-1.webp", alt: "Modern learning environment" },
      { src: "/images/features/curriculum-2.webp", alt: "Interactive learning session" },
      { src: "/images/features/group-of-students-in-after-school-computer-coding-2024-10-20-15-45-37-utc.webp", alt: "After-school coding session" }
    ]
  },
  {
    id: 3,
    title: "Hands-on Projects",
    description: "Build real-world applications and gain practical experience",
    icon: "Code",
    images: [
      { src: "/images/features/group-of-kids-working-together-on-project-with-ele-2024-10-20-11-47-13-utc.webp", alt: "Collaborative project work" },
      { src: "/images/features/happy-kids-programming-electric-toys-and-robots-at-2025-02-22-12-58-44-utc.webp", alt: "Programming electric toys" },
      { src: "/images/features/diverse-school-children-students-build-robotic-car-2025-02-11-16-18-30-utc.webp", alt: "Building robotic cars" }
    ]
  },
  {
    id: 4,
    title: "Career Support",
    description: "Get guidance for internships and job opportunities",
    icon: "Award",
    images: [
      { src: "/images/features/career-1.webp", alt: "Career development session" },
      { src: "/images/features/career-2.webp", alt: "Advanced robotics training" },
      { src: "/images/features/young-people-in-the-robotics-classroom-2025-02-22-13-38-02-utc.webp", alt: "Robotics classroom experience" }
    ]
  }
]

const mockStats: Stats = {
  totalStudents: 500,
  averageRating: 4.8,
  coursesOffered: 12,
  successRate: 95,
  upcomingCourses: [
    {
      id: 1,
      name: "Pre-Coding: Ages 6-10 (Entry)",
      startDate: "2024-05-05",
      availableSeats: 8
    },
    {
      id: 2,
      name: "Python with EV3: Ages 6-10 (Basic)",
      startDate: "2024-05-05",
      availableSeats: 6
    },
    {
      id: 3,
      name: "Mid-Robotics: Ages 11-16 (Intermediate)",
      startDate: "2024-05-05",
      availableSeats: 4
    },
    {
      id: 4,
      name: "Arduino Coding: Ages 11-16 (Advanced)",
      startDate: "2024-05-06",
      availableSeats: 10
    }
  ]
}

// API calls with mock data for static export
export async function getTestimonials(): Promise<Testimonial[]> {
  console.log("[HomeService] Returning mock testimonials")
  return Promise.resolve(testimonials)
}

export async function getFeatures(): Promise<Feature[]> {
  console.log("[HomeService] Returning mock features")
  return Promise.resolve(mockFeatures)
}

export async function submitRegistration(registration: Registration): Promise<{ message: string }> {
  console.log("[HomeService] Mock submitting registration:", registration)
  return Promise.resolve({ message: "Registration submitted successfully" })
}

export async function getStats(): Promise<Stats> {
  console.log("[HomeService] Returning mock stats")
  return Promise.resolve(mockStats)
}

// Error handling utility
export class HomeServiceError extends Error {
  constructor(message: string, public statusCode: number = 500) {
    super(message)
    this.name = 'HomeServiceError'
  }
} 