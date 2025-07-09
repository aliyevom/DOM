import { z } from "zod"

// Application schema
export const applicationSchema = z.object({
  id: z.string(),
  studentName: z.string().min(2, "Name must be at least 2 characters"),
  parentName: z.string().min(2, "Parent name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
  studentAge: z.number().min(5).max(17),
  course: z.string(),
  preferredTime: z.string(),
  experience: z.enum(["none", "beginner", "intermediate", "advanced"]),
  specialNeeds: z.string().optional(),
  emergencyContact: z.object({
    name: z.string(),
    relation: z.string(),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
  }),
  status: z.enum(["pending", "reviewing", "accepted", "rejected"]),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type Application = z.infer<typeof applicationSchema> 