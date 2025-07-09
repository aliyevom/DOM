import { Metadata } from 'next'
import { getDeploymentTimestamp, getBuildInfo } from '@/lib/deployment-timestamp'

export const metadata: Metadata = {
  metadataBase: new URL('https://domtechacademy.com'),
  title: {
    default: "DOM Tech Academy | Education of Robotics & Coding",
    template: "%s | DOM Tech Academy"
  },
  description: 'Inspiring young minds ages 6-16 to discover the world of coding, robotics, and computational thinking. Start their tech journey today!',
  keywords: [
    'coding for kids',
    'robotics education',
    'STEM learning',
    'children programming',
    'tech education',
    'computational thinking',
    'coding classes',
    'robotics classes',
    'kids technology',
    'learn to code',
    'DOM Tech Academy',
    'after school coding program Waltham',
    'kids robotics class Waltham MA',
    'STEM education Massachusetts',
    'coding classes near me',
    'robotics summer camp Waltham',
    'children coding lessons Boston area',
    'kids programming classes Massachusetts',
    'Waltham STEM education center',
    'Boston area coding school',
    'Massachusetts robotics classes',
    'DOM Tech Academy links',
    'DOM Tech Academy social media',
    'DOM Tech Academy contact',
    'DOM Tech Academy location',
    'DOM Tech Academy reviews',
    'STEM education Waltham MA',
    'robotics classes Boston area',
    'tech education near me',
    'coding school Massachusetts',
    'kids robotics Waltham'
  ],
  authors: [{ name: 'DOM Tech Academy' }],
  publisher: 'DOM Tech Academy',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: "education",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" }
    ],
    shortcut: [
      { url: "/favicon.ico" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ],
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        url: "/favicon/web-app-manifest-192x192.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "512x512",
        url: "/favicon/web-app-manifest-512x512.png",
      },
    ],
  },
  manifest: "/favicon/site.webmanifest",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://domtechacademy.com',
    siteName: 'DOM Tech Academy',
    title: 'DOM Tech Academy | Education of Robotics & Coding',
    description: 'Inspiring young minds ages 6-16 to discover the world of coding, robotics, and computational thinking. Start their tech journey today!',
    images: [
      {
        url: 'https://domtechacademy.com/images/logo-blue.jpeg',
        width: 1200,
        height: 1200,
        alt: 'DOM Tech Academy Logo',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DOM Tech Academy | Education of Robotics & Coding',
    description: 'Inspiring young minds ages 6-16 to discover the world of coding, robotics, and computational thinking. Start their tech journey today!',
    images: ['/images/dom-tech-logo.png'],
    creator: '@domtechacademy',
  },
  other: {
    'instagram:site': '@domtechacademy',
    'instagram:creator': '@domtechacademy',
    'og:instagram': 'https://www.instagram.com/domtechacademy/',
    'social:instagram': 'https://www.instagram.com/domtechacademy/',
    'og:linkedin': 'https://www.linkedin.com/company/dom-tech-academy/',
    'social:linkedin': 'https://www.linkedin.com/company/dom-tech-academy/',
    'og:tiktok': 'https://www.tiktok.com/@domtechacademy',
    'social:tiktok': 'https://www.tiktok.com/@domtechacademy',
    'og:facebook': 'https://www.facebook.com/share/1DjueE5PhA/',
    'social:facebook': 'https://www.facebook.com/share/1DjueE5PhA/',
    'business:contact_data:street_address': '303 Wyman St',
    'business:contact_data:locality': 'Waltham',
    'business:contact_data:region': 'Massachusetts',
    'business:contact_data:postal_code': '02451',
    'business:contact_data:country_name': 'United States',
    'organization:name': 'DOM Tech Academy',
    'organization:type': 'EducationalOrganization',
    'organization:description': 'Leading provider of STEM and coding education for children ages 6-16',
    'education:program': 'Pre-Coding, Python with EV3, Mid-Robotics, Arduino Coding',
    'education:age_range': '6-16',
    'education:instructional_method': 'Hands-on, Project-based learning',
    'education:prerequisites': 'No prior experience needed for beginner courses',
    'education:field_of_study': 'Computer Science, Robotics, IoT, STEM',
    'og:logo': 'https://domtechacademy.com/images/logo-blue.png',
    'schema:organization': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'EducationalOrganization',
      'name': 'DOM Tech Academy',
      'url': 'https://domtechacademy.com',
      'logo': 'https://domtechacademy.com/images/logo-blue.png',
      'image': 'https://domtechacademy.com/images/logo-blue.png',
      'description': 'Inspiring young minds ages 6-16 to discover the world of coding, robotics, and computational thinking. Start their tech journey today!',
      'sameAs': [
        'https://www.facebook.com/domtechacademy',
        'https://www.instagram.com/domtechacademy',
        'https://www.linkedin.com/company/domtechacademy'
      ]
    }),
    'business:type': [
      'Education',
      'After School Program',
      'Technology Education',
      'STEM Education Center',
      'Robotics Training Center',
      'Computer Programming School',
      'Educational Service',
      'Learning Center',
      'Technical School',
      'Youth Program',
      'Summer Camp',
      'Educational Institution',
      'Training Center',
      'Tutoring Service',
      'Children\'s Education Center'
    ],
    'business:category': [
      'Education',
      'Technology',
      'STEM',
      'Children\'s Activities',
      'After School Activities'
    ],
    'business:features': [
      'On-site Training',
      'Small Class Sizes',
      'Hands-on Learning',
      'Project-based Education',
      'Modern Facilities',
      'Professional Instructors',
      'State-of-the-art Equipment',
      'Safe Learning Environment'
    ],
    'business:hours': 'Mo,Tu,We,Th,Fr 15:00-19:00, Sa 10:00-15:00',
    'business:location:region': 'Greater Boston Area',
    'business:target_age': '6-16',
    'link:canonical': 'https://domtechacademy.com/enroll',
    'og:url': 'https://domtechacademy.com/enroll',
    'business:contact_data:website': 'https://domtechacademy.com/enroll',
    'link:alternate:mobile': 'https://domtechacademy.com/enroll',
    'page:type': 'links_landing',
    'page:section': 'social_links',
    'page:published_time': new Date().toISOString(),
    'page:modified_time': new Date().toISOString(),
    'deployment:timestamp': getDeploymentTimestamp(),
    'deployment:build_info': getBuildInfo(),
    'app:last_deployed': getDeploymentTimestamp(),
    'schema:webpage': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      'name': 'DOM Tech Academy Links',
      'description': 'Connect with DOM Tech Academy - Find our location, social media, and reviews all in one place.',
      'url': 'https://domtechacademy.com/enroll',
      'mainEntity': {
        '@type': 'EducationalOrganization',
        'name': 'DOM Tech Academy',
        'url': 'https://domtechacademy.com',
        'location': {
          '@type': 'Place',
          'address': {
            '@type': 'PostalAddress',
            'streetAddress': '303 Wyman St',
            'addressLocality': 'Waltham',
            'addressRegion': 'MA',
            'postalCode': '02451',
            'addressCountry': 'US'
          }
        }
      }
    }),
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default metadata 
