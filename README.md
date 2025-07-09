# DOM Tech Academy

A modern learning management system built with Next.js, Firebase, and Tailwind CSS.

## Getting Started

### Prerequisites
- Node.js (>=18.0.0)
- pnpm (preferred package manager)

### Installation
```bash
# Install pnpm if you haven't already
npm install -g pnpm

# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

### Environment Variables
Create a `.env.local` file in the root directory with the following variables:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## User Management Guide

### Adding New Users

1. **Firebase Authentication Setup** (Common for all users)
   - Log in to Firebase Console
   - Navigate to Authentication > Users
   - Click "Add User"
   - Enter user's email
   - Set a temporary password
   - Click "Add user" to create the account

2. **Firestore Database Setup**

   a) **For Students**
   ```javascript
   {
     email: "student@domtech.com",  // Must match Authentication email
     name: "Student Name",
     role: "student",
     status: "active"
   }
   ```

   b) **For Teachers**
   ```javascript
   {
     email: "teacher@domtech.com",  // Must match Authentication email
     name: "Teacher Name",
     role: "teacher",
     status: "active",
     subjects: ["Math", "Coding"],  // Optional: List of teaching subjects
     department: "Computer Science"  // Optional: Department information
   }
   ```

   c) **For Administrators**
   ```javascript
   {
     email: "admin@domtech.com",  // Must match Authentication email
     name: "Admin Name",
     role: "admin",
     status: "active",
     adminLevel: "full",  // Optional: Access level specification
     department: "Administration"  // Optional: Department information
   }
   ```

3. **User Credentials Communication**

   a) **For Students**
   - Login URL: https://domtechacademy.com/login
   - Portal access: Student dashboard
   - Features: Access to courses, assignments, and progress tracking
   - Default landing page: /portal/profile

   b) **For Teachers**
   - Login URL: https://domtechacademy.com/login
   - Portal access: Teacher dashboard
   - Features: Course management, grading, and student progress monitoring
   - Default landing page: /portal/teacher

   c) **For Administrators**
   - Login URL: https://domtechacademy.com/login
   - Portal access: Admin dashboard
   - Features: Full system management and user administration
   - Default landing page: /portal/main

### User Roles and Access Levels

1. **Student Access**
   - View and participate in enrolled courses
   - Submit assignments
   - Track personal progress
   - Communicate with teachers
   - Access learning materials

2. **Teacher Access**
   - Create and manage courses
   - Grade assignments
   - Monitor student progress
   - Create and edit course content
   - Communicate with students
   - Access teaching resources

3. **Administrator Access**
   - Full user management
   - System configuration
   - Course oversight
   - User activity monitoring
   - Analytics and reporting
   - Security management

### Important Security Notes
- Verify email domains before adding users
- Implement proper role-based access control
- Monitor user activity logs
- Regular security audits
- Password policies:
  - Minimum 8 characters
  - Must contain numbers and special characters
  - Regular password changes recommended

### Password Reset Process
1. Users can click "Forgot Password?" on the login page
2. They will be prompted to send an email with their details:
   ```
   Subject: Password Reset Request - DOM Tech Academy
   
   Dear DOM Tech Academy Support,
   
   I would like to request a password reset for my account. Below are my details:
   
   • Email: 
   • Full Name: 
   • Role: (Student/Teacher/Admin)
   • Student/Employee ID: 
   
   Please assist me in resetting my password.
   
   Best regards,
   ```
3. Support team verifies identity and processes reset

## Project Structure
```
/app                 # Next.js app directory
  /components        # Reusable UI components
  /hooks            # Custom React hooks
  /lib              # Utility functions and configurations
  /public           # Static assets
  /types            # TypeScript type definitions
```

## Available Scripts
```bash
pnpm dev           # Start development server
pnpm build         # Build for production
pnpm start         # Start production server
pnpm clean         # Clean build artifacts
pnpm fresh         # Clean install dependencies
```

## Support
For technical support or questions, contact:
- Email: info@domtechacademy.com
- Hours: Monday - Friday, 3PM - 7PM EST, Saturday 10AM - 3PM EST

## License
Copyright © 2024 DOM Tech Academy. All rights reserved. 
------------
rm -rf .next out && npm run build && firebase deploy --only hosting

pnpm build && firebase deploy --only hosting

rm -rf node_modules .next out && pnpm install
---------

let's deploy the current version to both domains:
firebase deploy --only hosting


-------
 let's verify the domain settings in Firebase:
firebase hosting:channel:list
pnpm add react-qr-code
--------

rm -rf node_modules .next out && pnpm install && pnpm build  && firebase deploy --only hosting

pnpm build

firebase deploy --only hosting

-------

python generate_qr.py "https://domtechacademy.com" "dom_qr_circle"
pnpm store prune

pnpm store clear && pnpm install --force


pnpm install --force