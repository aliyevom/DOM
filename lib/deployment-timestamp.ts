/**
 * Generates a human-readable deployment timestamp
 * Format: "JULY 9 2025 12:52 AM EST"
 */
export function getDeploymentTimestamp(): string {
  const now = new Date();
  
  // Format: MONTH DAY YEAR HOUR:MINUTE AM/PM TIMEZONE
  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric', 
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'America/New_York', // EST/EDT
    timeZoneName: 'short'
  };
  
  const formatted = now.toLocaleDateString('en-US', options);
  
  // Convert to uppercase and format as requested
  return formatted.toUpperCase();
}

/**
 * Generates build timestamp for HTML comments
 */
export function getBuildInfo(): string {
  const timestamp = getDeploymentTimestamp();
  const buildId = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || 
                  process.env.GITHUB_SHA?.slice(0, 7) || 
                  'local';
  
  return `DOM Tech Academy - Deployed: ${timestamp} | Build: ${buildId}`;
} 