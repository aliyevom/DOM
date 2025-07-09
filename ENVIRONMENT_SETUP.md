# Environment Setup Guide

## Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

### Firebase Configuration
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### Firebase Admin (Server-side)
```bash
FIREBASE_PRIVATE_KEY=your_private_key_here
FIREBASE_CLIENT_EMAIL=your_client_email_here
```

### EmailJS Configuration
```bash
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
EMAILJS_PRIVATE_KEY=your_emailjs_private_key
NEXT_PUBLIC_EMAILJS_ADMIN_TEMPLATE_ID=your_admin_template_id
NEXT_PUBLIC_EMAILJS_USER_TEMPLATE_ID=your_user_template_id
```

### Application Configuration
```bash
NEXT_PUBLIC_ADMIN_EMAIL=admin@yourapp.com
NEXT_PUBLIC_ORG_NAME=Your Organization Name
```

### Deployment Configuration
```bash
DEPLOYMENT_TARGET=firebase
# or DEPLOYMENT_TARGET=cloudrun
```

### Development Configuration
```bash
NODE_ENV=development
NEXT_TELEMETRY_DISABLED=1
```

## Security Notes

**IMPORTANT**: Never commit the `.env.local` file to version control. It contains sensitive information.

**FIXED**: This project previously had hardcoded Firebase API keys in the source code. They have been moved to environment variables for security.

## Deployment Notes

This project supports two deployment targets:
- **Firebase Hosting**: Uses `next.config.js` with `output: 'export'`
- **Cloud Run**: Uses `next.config.mjs` with `output: 'standalone'`

Switch between configurations by changing the `DEPLOYMENT_TARGET` environment variable.

## Project Structure

```
/
├── tools/
│   ├── python/          # Python utilities (QR generation, etc.)
│   └── scripts/         # Shell scripts for deployment
├── components/          # React components
├── hooks/              # Custom React hooks
├── lib/                # Utilities and configurations
├── types/              # TypeScript type definitions
└── public/             # Static assets
```

## Getting Started

1. Copy environment variables from your Firebase project console
2. Create `.env.local` file with the variables above
3. Run `pnpm install` to install dependencies
4. Run `pnpm dev` to start development server

## Tools Directory

### Python Tools (`tools/python/`)
- `generate_qr.py` - QR code generation
- `generate_styled_qr.py` - Styled QR code generation
- `domkill.py` - Build and deployment utility
- `save_robot_logo.py` - Logo processing utility

### Scripts (`tools/scripts/`)
- `deploy.sh` - Deployment script for multiple platforms
- `update-api-routes.sh` - API route maintenance script 