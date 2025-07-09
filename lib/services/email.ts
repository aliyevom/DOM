import type { Application } from "@/types/application"
import emailjs from '@emailjs/browser';

export class EmailServiceError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number = 500,
  ) {
    super(message)
    this.name = "EmailServiceError"
  }
}

function formatApplicationData(application: Application) {
  return {
    student_name: application.studentName,
    student_age: application.studentAge,
    course: application.course,
    preferred_time: application.preferredTime,
    experience: application.experience,
    special_needs: application.specialNeeds || "None",
    parent_name: application.parentName,
    parent_email: application.email,
    parent_phone: application.phone,
    emergency_name: application.emergencyContact.name,
    emergency_relation: application.emergencyContact.relation,
    emergency_phone: application.emergencyContact.phone,
    application_id: application.id,
    status: application.status,
    submitted_date: new Date(application.createdAt).toLocaleString()
  };
}

export async function sendApplicationNotification(application: Application): Promise<void> {
  const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
  const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "info@domtechacademy.com";
  const ADMIN_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_ADMIN_TEMPLATE_ID!;
  const USER_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_USER_TEMPLATE_ID!;
  const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

  if (!SERVICE_ID || !ADMIN_TEMPLATE_ID || !USER_TEMPLATE_ID || !PUBLIC_KEY) {
    console.error("Missing EmailJS configuration:", {
      SERVICE_ID,
      ADMIN_TEMPLATE_ID,
      USER_TEMPLATE_ID,
      PUBLIC_KEY: PUBLIC_KEY ? "present" : "missing",
      ADMIN_EMAIL
    });
    throw new EmailServiceError("EmailJS configuration is incomplete");
  }

  try {
    // Initialize EmailJS with the public key
    emailjs.init(PUBLIC_KEY);

    // Send email to admin
    const adminEmailParams = {
      to_email: ADMIN_EMAIL,
      ...formatApplicationData(application),
      from_name: process.env.NEXT_PUBLIC_ORG_NAME || 'DOM Tech Academy',
      reply_to: ADMIN_EMAIL
    };

    const userEmailParams = {
      to_email: application.email,
      to_name: application.parentName,
      student_name: application.studentName,
      course: application.course,
      application_id: application.id,
      from_name: process.env.NEXT_PUBLIC_ORG_NAME || 'DOM Tech Academy',
      reply_to: ADMIN_EMAIL
    };

    // Send admin notification
    const adminResponse = await emailjs.send(
      SERVICE_ID,
      ADMIN_TEMPLATE_ID,
      adminEmailParams
    );

    console.log('Admin email sent:', adminResponse);

    // Send user confirmation
    const userResponse = await emailjs.send(
      SERVICE_ID,
      USER_TEMPLATE_ID,
      userEmailParams
    );

    console.log('User email sent:', userResponse);
    console.log(`Application notification sent successfully to ${ADMIN_EMAIL} and ${application.email}`);
  } catch (error: any) {
    console.error("Error sending email notification:", error);
    throw new EmailServiceError(
      error.text || error.message || "Failed to send email notification"
    );
  }
} 