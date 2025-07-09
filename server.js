const express = require('express');
const next = require('next');
const cors = require('cors');
const admin = require('firebase-admin');
const emailjs = require('@emailjs/nodejs');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Initialize Firebase Admin
admin.initializeApp();

const server = express();
server.use(cors());
server.use(express.json());

// EmailJS configuration from environment variables
const EMAILJS_PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY;
const EMAILJS_PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY;
const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
const ADMIN_TEMPLATE_ID = process.env.ADMIN_TEMPLATE_ID;
const USER_TEMPLATE_ID = process.env.USER_TEMPLATE_ID;

app.prepare().then(() => {
  // Handle application submissions
  server.post('/api/application', async (req, res) => {
    try {
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
          to_email: 'info@domtechacademy.com',
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

  // Handle all other routes with Next.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  const port = process.env.PORT || 3000;
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
}); 