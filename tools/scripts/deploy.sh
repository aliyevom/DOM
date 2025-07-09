#!/bin/bash

# Enable debug mode
set -x

# Exit on any error
set -e

# Change to the project root directory
cd "$(dirname "$0")/../.."

echo "Starting deployment process..."

# Load environment variables from .env file if it exists
if [ -f .env ]; then
    echo "Loading environment variables from .env file..."
    set -a
    source .env
    set +a
    echo "Environment variables loaded successfully."
else
    echo "Error: .env file not found in $(pwd)!"
    exit 1
fi

# Function to check if a variable is set
check_var() {
    local var_name="$1"
    if [ -z "${!var_name}" ]; then
        echo "Error: Required environment variable $var_name is not set"
        return 1
    else
        echo "✓ $var_name is set"
        return 0
    fi
}

echo "Checking required environment variables..."

# List of required variables
required_vars=(
    "NEXT_PUBLIC_FIREBASE_API_KEY"
    "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"
    "NEXT_PUBLIC_FIREBASE_PROJECT_ID"
    "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"
    "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"
    "NEXT_PUBLIC_FIREBASE_APP_ID"
    "NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID"
    "FIREBASE_CLIENT_EMAIL"
    "FIREBASE_PRIVATE_KEY"
    "NEXT_PUBLIC_EMAILJS_SERVICE_ID"
    "NEXT_PUBLIC_EMAILJS_PUBLIC_KEY"
    "NEXT_PUBLIC_EMAILJS_ADMIN_TEMPLATE_ID"
    "NEXT_PUBLIC_EMAILJS_USER_TEMPLATE_ID"
    "NEXT_PUBLIC_ADMIN_EMAIL"
    "NEXT_PUBLIC_ORG_NAME"
)

# Check all required variables
for var in "${required_vars[@]}"; do
    if ! check_var "$var"; then
        echo "Missing required environment variables. Exiting."
        exit 1
    fi
done

# Function to display usage
usage() {
    echo "Usage: $0 [firebase|cloudrun|both|quick]"
    echo "  firebase  - Deploy to Firebase Hosting"
    echo "  cloudrun  - Deploy to Cloud Run (full build)"
    echo "  both      - Deploy to both platforms"
    echo "  quick     - Quick deploy for small changes"
    exit 1
}

# Deploy to Firebase
deploy_firebase() {
    echo "Deploying to Firebase..."
    rm -rf .next out
    pnpm build
    firebase deploy --only hosting
}

# Full Cloud Run deployment
deploy_cloudrun() {
    echo "Deploying to Cloud Run..."
    
    echo "Building substitutions string..."
    # Initialize substitutions string
    SUBSTITUTIONS=""
    
    # Add each environment variable to substitutions
    for var in "${required_vars[@]}"; do
        value="${!var}"
        # Escape special characters in the value
        value="${value//\"/\\\"}"  # Escape quotes
        value="${value//,/\\,}"    # Escape commas
        value="${value//=/\\=}"    # Escape equals signs
        if [ -n "$SUBSTITUTIONS" ]; then
            SUBSTITUTIONS="${SUBSTITUTIONS},"
        fi
        SUBSTITUTIONS="${SUBSTITUTIONS}_${var}=${value}"
    done
    
    echo "Submitting build to Cloud Build..."
    gcloud builds submit \
        --config=cloudbuild.yaml \
        --substitutions="${SUBSTITUTIONS}" \
        --timeout=30m
}

# Check command line arguments
if [ $# -eq 0 ]; then
    usage
fi

# Process deployment type
case "$1" in
    "firebase")
        deploy_firebase
        ;;
    "cloudrun")
        deploy_cloudrun
        ;;
    "both")
        deploy_firebase
        deploy_cloudrun
        ;;
    "quick")
        echo "Quick deploy option is currently disabled"
        exit 1
        ;;
    *)
        usage
        ;;
esac 