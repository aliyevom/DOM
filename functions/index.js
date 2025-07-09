const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const emailjs = require('@emailjs/nodejs');

// Initialize Firebase Admin
admin.initializeApp();

const app = express();

// Enable CORS
app.use(cors({ origin: true }));

// EmailJS configuration from environment variables
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
const EMAILJS_PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY;
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const ADMIN_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_ADMIN_TEMPLATE_ID;
const USER_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_USER_TEMPLATE_ID;
const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'info@domtechacademy.com';

// Validate required environment variables
const requiredEnvVars = [
  'NEXT_PUBLIC_EMAILJS_PUBLIC_KEY',
  'EMAILJS_PRIVATE_KEY',
  'NEXT_PUBLIC_EMAILJS_SERVICE_ID',
  'NEXT_PUBLIC_EMAILJS_ADMIN_TEMPLATE_ID',
  'NEXT_PUBLIC_EMAILJS_USER_TEMPLATE_ID'
];

const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
if (missingVars.length > 0) {
  console.error('Missing required environment variables:', missingVars);
}

// Handle application submissions
app.post('/api/application', async (req, res) => {
  try {
    // Check if all required environment variables are present
    if (missingVars.length > 0) {
      return res.status(500).json({
        success: false,
        message: "Server configuration error"
      });
    }

    const applicationData = req.body;
    const applicationId = Math.floor(100000 + Math.random() * 900000).toString();

    // Save application to Firestore
    await admin.firestore()
      .collection('applications')
      .doc(applicationId)
      .set({
        ...applicationData,
        applicationId,
        status: 'pending',
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });

    // Send email to admin
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      ADMIN_TEMPLATE_ID,
      {
        to_email: ADMIN_EMAIL,
        from_name: applicationData.fullName,
        applicant_email: applicationData.email,
        phone: applicationData.phone,
        course: applicationData.course,
        application_id: applicationId,
        message: `New application received from ${applicationData.fullName}`,
      },
      {
        publicKey: EMAILJS_PUBLIC_KEY,
        privateKey: EMAILJS_PRIVATE_KEY,
      }
    );

    // Send confirmation email to applicant
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      USER_TEMPLATE_ID,
      {
        to_email: applicationData.email,
        to_name: applicationData.fullName,
        application_id: applicationId,
        course: applicationData.course,
        from_email: 'noreply@domtechacademy.com',
      },
      {
        publicKey: EMAILJS_PUBLIC_KEY,
        privateKey: EMAILJS_PRIVATE_KEY,
      }
    );

    res.status(200).json({
      success: true,
      message: "Application submitted successfully",
      applicationId
    });
  } catch (error) {
    console.error('Error processing application:', error);
    res.status(500).json({
      success: false,
      message: "Failed to process application"
    });
  }
});

// Export the API function
exports.nextApi = functions.https.onRequest(app); 