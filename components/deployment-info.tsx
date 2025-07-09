import { getBuildInfo } from '@/lib/deployment-timestamp'

/**
 * DeploymentInfo component that adds deployment timestamp to HTML source
 * This will be visible when users view the page source
 */
export default function DeploymentInfo() {
  const buildInfo = getBuildInfo()
  
  return (
    <>
      {/* Deployment timestamp - visible in page source */}
      <script
        dangerouslySetInnerHTML={{
          __html: `/* ${buildInfo} */`,
        }}
      />
    </>
  )
} 