import type { Application } from "@/types/application"
import { sendApplicationNotification } from "./email"

interface ApplicationResponse {
  items: Application[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export class ApplicationServiceError extends Error {
  constructor(
    message: string,
    public status: number = 500
  ) {
    super(message)
    this.name = "ApplicationServiceError"
  }
}

export async function submitApplication(data: Omit<Application, "id" | "status" | "createdAt" | "updatedAt">): Promise<Application> {
  try {
    // Create a new application with generated ID and timestamps
    const newApplication: Application = {
      id: Math.random().toString(36).substring(7),
      ...data,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Send email notifications
    await sendApplicationNotification(newApplication);

    return newApplication;
  } catch (error) {
    console.error("Error submitting application:", error);
    if (error instanceof ApplicationServiceError) {
      throw error;
    }
    throw new ApplicationServiceError("Failed to submit application");
  }
}

export async function getApplications(page = 1, limit = 10): Promise<ApplicationResponse> {
  // Mock data for static export
  const mockApplications: Application[] = [
    {
      id: "1",
      studentName: "John Doe",
      parentName: "Jane Doe",
      email: "john@example.com",
      phone: "+1234567890",
      studentAge: 12,
      course: "Python Programming",
      preferredTime: "After School",
      experience: "beginner",
      specialNeeds: "",
      emergencyContact: {
        name: "Jane Doe",
        relation: "Mother",
        phone: "+1234567890",
      },
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    // Add more mock applications as needed
  ]

  return {
    items: mockApplications,
    total: mockApplications.length,
    page,
    limit,
    totalPages: Math.ceil(mockApplications.length / limit),
  }
}

export async function getApplication(id: string): Promise<Application> {
  try {
    const response = await fetch(`/api/application/${id}`)
    if (!response.ok) {
      const error = await response.json()
      throw new ApplicationServiceError(
        error.error || "Failed to fetch application",
        response.status
      )
    }

    return response.json()
  } catch (error) {
    if (error instanceof ApplicationServiceError) {
      throw error
    }
    throw new ApplicationServiceError("Failed to fetch application")
  }
}

export async function updateApplication(
  id: string,
  data: { status?: Application["status"]; notes?: string }
): Promise<Application> {
  try {
    const response = await fetch(`/api/application/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new ApplicationServiceError(
        error.error || "Failed to update application",
        response.status
      )
    }

    return response.json()
  } catch (error) {
    if (error instanceof ApplicationServiceError) {
      throw error
    }
    throw new ApplicationServiceError("Failed to update application")
  }
}

export async function createApplication(data: Omit<Application, "id" | "createdAt" | "updatedAt">): Promise<Application> {
  // Mock creating an application for static export
  const newApplication: Application = {
    id: Math.random().toString(36).substring(7),
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  return newApplication
}

export async function updateApplicationStatus(id: string, status: Application["status"]): Promise<Application> {
  // Mock updating application status for static export
  return {
    id,
    studentName: "John Doe",
    parentName: "Jane Doe",
    email: "john@example.com",
    phone: "+1234567890",
    studentAge: 12,
    course: "Python Programming",
    preferredTime: "After School",
    experience: "beginner",
    specialNeeds: "",
    emergencyContact: {
      name: "Jane Doe",
      relation: "Mother",
      phone: "+1234567890",
    },
    status,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

export async function deleteApplication(id: string): Promise<void> {
  // Mock deleting an application for static export
  // In a real application, this would make an API call
  return Promise.resolve()
} 