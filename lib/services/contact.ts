export class ContactServiceError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "ContactServiceError"
  }
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export async function submitContactForm(data: ContactFormData): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new ContactServiceError(errorData.message || "Failed to submit contact form")
    }

    const result = await response.json()
    return result
  } catch (error) {
    if (error instanceof ContactServiceError) {
      throw error
    }
    throw new ContactServiceError("An error occurred while submitting the form")
  }
} 