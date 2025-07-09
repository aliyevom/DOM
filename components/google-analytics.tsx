'use client'

import Script from 'next/script'

export default function GoogleAnalytics() {
  const isDevelopment = process.env.NODE_ENV === 'development'

  // Log for local testing
  if (isDevelopment) {
    console.log('Google Analytics initialized in development mode')
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-X06HDSECT8`}
        onLoad={() => {
          console.log('Google Analytics script loaded')
        }}
        onError={(e) => {
          console.error('Error loading Google Analytics:', e)
        }}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-X06HDSECT8', {
              debug_mode: ${isDevelopment},
              send_page_view: true
            });
          `
        }}
      />
    </>
  )
} 