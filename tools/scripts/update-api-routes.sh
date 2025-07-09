#!/bin/bash

# Find all route.ts files in the api directory
find app/api -name "route.ts" -type f | while read -r file; do
  # Add export const dynamic = 'force-static' if it doesn't exist
  if ! grep -q "export const dynamic = 'force-static'" "$file"; then
    # Create a temporary file
    awk '/^import/ {if (!added) {print; print "\nexport const dynamic = '\''force-static'\''"; added=1; next}} 1' "$file" > "$file.tmp"
    # Replace the original file
    mv "$file.tmp" "$file"
  fi
done 