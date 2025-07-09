import './globals.css'
import { Inter, Raleway, Molle, Montserrat } from 'next/font/google'
import { Providers } from '@/components/providers'
import metadata from './metadata'
import { Metadata, Viewport } from 'next'
import GoogleAnalytics from '@/components/google-analytics'
import Script from 'next/script'
import DeploymentInfo from '@/components/deployment-info'

const inter = Inter({ subsets: ['latin'] })
const raleway = Raleway({ subsets: ['latin'], variable: '--font-raleway' })
const molle = Molle({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-molle'
})
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat'
})

export { metadata }

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' }
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const courses = [
    {
      '@type': 'Course',
      '@id': 'https://domtechacademy.com/courses/pre-coding',
      'name': 'Pre-Coding',
      'description': 'Introduction to coding concepts for young minds ages 6-10',
      'provider': {
        '@id': 'https://domtechacademy.com/#organization'
      },
      'educationalLevel': 'Entry',
      'audience': {
        '@type': 'EducationalAudience',
        'educationalRole': 'student',
        'audienceType': 'Ages 6-16'
      },
      'offers': {
        '@type': 'Offer',
        'availability': 'https://schema.org/InStock',
        'validFrom': '2025-05-05',
        'category': 'Programming Course'
      },
      'hasCourseInstance': [
        {
          '@type': 'CourseInstance',
          'courseMode': 'onsite',
          'name': 'Pre-Coding Summer 2025',
          'startDate': '2025-05-05',
          'endDate': '2025-06-30',
          'courseSchedule': {
            '@type': 'Schedule',
            'startTime': '15:00',
            'endTime': '19:00',
            'dayOfWeek': ['Monday', 'Wednesday', 'Friday'],
            'repeatCount': '24',
            'repeatFrequency': 'WEEKLY'
          },
          'location': {
            '@type': 'Place',
            'name': 'DOM Tech Academy',
            'address': {
              '@type': 'PostalAddress',
              'streetAddress': '303 Wyman St Suite 300',
              'addressLocality': 'Waltham',
              'addressRegion': 'MA',
              'postalCode': '02451',
              'addressCountry': 'US'
            }
          }
        }
      ]
    },
    {
      '@type': 'Course',
      '@id': 'https://domtechacademy.com/courses/python-ev3',
      'name': 'Python with EV3',
      'description': 'Learn Python programming with LEGO EV3 robotics',
      'provider': {
        '@id': 'https://domtechacademy.com/#organization'
      },
      'educationalLevel': 'Basic',
      'audience': {
        '@type': 'EducationalAudience',
        'educationalRole': 'student',
        'audienceType': 'Ages 6-16'
      },
      'offers': {
        '@type': 'Offer',
        'availability': 'https://schema.org/InStock',
        'validFrom': '2025-05-05',
        'category': 'Programming Course'
      },
      'hasCourseInstance': [
        {
          '@type': 'CourseInstance',
          'courseMode': 'onsite',
          'name': 'Python EV3 Summer 2025',
          'startDate': '2025-05-05',
          'endDate': '2025-06-30',
          'courseSchedule': {
            '@type': 'Schedule',
            'startTime': '15:00',
            'endTime': '19:00',
            'dayOfWeek': ['Monday', 'Wednesday', 'Friday'],
            'repeatCount': '24',
            'repeatFrequency': 'WEEKLY'
          },
          'location': {
            '@type': 'Place',
            'name': 'DOM Tech Academy',
            'address': {
              '@type': 'PostalAddress',
              'streetAddress': '303 Wyman St Suite 300',
              'addressLocality': 'Waltham',
              'addressRegion': 'MA',
              'postalCode': '02451',
              'addressCountry': 'US'
            }
          }
        }
      ]
    },
    {
      '@type': 'Course',
      '@id': 'https://domtechacademy.com/courses/mid-robotics',
      'name': 'Mid-Robotics',
      'description': 'Advanced robotics and sensor programming for older students',
      'provider': {
        '@id': 'https://domtechacademy.com/#organization'
      },
      'educationalLevel': 'Intermediate',
      'audience': {
        '@type': 'EducationalAudience',
        'educationalRole': 'student',
        'audienceType': 'Ages 6-16'
      },
      'offers': {
        '@type': 'Offer',
        'availability': 'https://schema.org/InStock',
        'validFrom': '2025-05-12',
        'category': 'Robotics Course'
      },
      'hasCourseInstance': [
        {
          '@type': 'CourseInstance',
          'courseMode': 'onsite',
          'name': 'Mid-Robotics Summer 2025',
          'startDate': '2025-05-12',
          'endDate': '2025-07-07',
          'courseSchedule': {
            '@type': 'Schedule',
            'startTime': '15:00',
            'endTime': '19:00',
            'dayOfWeek': ['Tuesday', 'Thursday'],
            'repeatCount': '16',
            'repeatFrequency': 'WEEKLY'
          },
          'location': {
            '@type': 'Place',
            'name': 'DOM Tech Academy',
            'address': {
              '@type': 'PostalAddress',
              'streetAddress': '303 Wyman St Suite 300',
              'addressLocality': 'Waltham',
              'addressRegion': 'MA',
              'postalCode': '02451',
              'addressCountry': 'US'
            }
          }
        }
      ]
    },
    {
      '@type': 'Course',
      '@id': 'https://domtechacademy.com/courses/arduino',
      'name': 'Arduino Coding',
      'description': 'IoT and hardware programming with Arduino',
      'provider': {
        '@id': 'https://domtechacademy.com/#organization'
      },
      'educationalLevel': 'Advanced',
      'audience': {
        '@type': 'EducationalAudience',
        'educationalRole': 'student',
        'audienceType': 'Ages 6-16'
      },
      'offers': {
        '@type': 'Offer',
        'availability': 'https://schema.org/InStock',
        'validFrom': '2025-05-12',
        'category': 'Hardware Programming Course'
      },
      'hasCourseInstance': [
        {
          '@type': 'CourseInstance',
          'courseMode': 'onsite',
          'name': 'Arduino Summer 2025',
          'startDate': '2025-05-12',
          'endDate': '2025-07-07',
          'courseSchedule': {
            '@type': 'Schedule',
            'startTime': '15:00',
            'endTime': '19:00',
            'dayOfWeek': ['Tuesday', 'Thursday'],
            'repeatCount': '16',
            'repeatFrequency': 'WEEKLY'
          },
          'location': {
            '@type': 'Place',
            'name': 'DOM Tech Academy',
            'address': {
              '@type': 'PostalAddress',
              'streetAddress': '303 Wyman St Suite 300',
              'addressLocality': 'Waltham',
              'addressRegion': 'MA',
              'postalCode': '02451',
              'addressCountry': 'US'
            }
          }
        }
      ]
    }
  ];

  const schemaMarkup = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'LocalBusiness', 'EducationalOrganization'],
        '@id': 'https://domtechacademy.com/#organization',
        'url': 'https://domtechacademy.com',
        'name': 'DOM Tech Academy',
        'telephone': '+1-339-206-8081',
        'alternateName': ['Development of Mindset Tech Academy', 'DOM Tech Kids Coding', 'Waltham Coding School'],
        'description': 'Education of Coding Inspiring young minds ages 6-16 to discover the world of coding, robotics, and computational thinking. Start their tech journey today! We offer coding classes for kids in Waltham, MA area.',
        'keywords': ['coding for kids', 'kids coding classes', 'children programming', 'robotics for kids', 'STEM education', 'Waltham coding school', 'Massachusetts coding academy', 'learn to code', 'kids tech education'],
        'areaServed': {
          '@type': 'GeoCircle',
          'geoMidpoint': {
            '@type': 'GeoCoordinates',
            'latitude': '42.40691475112007',
            'longitude': '-71.25543528877094'
          },
          'geoRadius': '30000'
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': '42.40691475112007',
          'longitude': '-71.25543528877094'
        },
        'location': {
          '@type': 'Place',
          'address': {
            '@type': 'PostalAddress',
            'streetAddress': '303 Wyman St Suite 300',
            'addressLocality': 'Waltham',
            'addressRegion': 'MA',
            'postalCode': '02451',
            'addressCountry': 'US'
          },
          'geo': {
            '@type': 'GeoCoordinates',
            'latitude': '42.40691475112007',
            'longitude': '-71.25543528877094'
          },
          'hasMap': 'https://maps.app.goo.gl/U8dNxh8MLMcUX6mz6'
        },
        'openingHoursSpecification': [
          {
            '@type': 'OpeningHoursSpecification',
            'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            'opens': '15:00',
            'closes': '19:00'
          },
          {
            '@type': 'OpeningHoursSpecification',
            'dayOfWeek': ['Saturday'],
            'opens': '10:00',
            'closes': '15:00'
          }
        ],
        'priceRange': '$$',
        'hasMap': 'https://maps.app.goo.gl/U8dNxh8MLMcUX6mz6',
        'logo': {
          '@type': 'ImageObject',
          '@id': 'https://domtechacademy.com/#logo',
          'inLanguage': 'en-US',
          'url': 'https://domtechacademy.com/images/logo-blue.png',
          'contentUrl': 'https://domtechacademy.com/images/logo-blue.png',
          'width': 630,
          'height': 630,
          'caption': 'DOM Tech Academy Logo'
        },
        'image': {
          '@type': 'ImageObject',
          '@id': 'https://domtechacademy.com/#logo',
          'inLanguage': 'en-US',
          'url': 'https://domtechacademy.com/images/logo-blue.png',
          'contentUrl': 'https://domtechacademy.com/images/logo-blue.png',
          'width': 630,
          'height': 630
        },
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': '303 Wyman St Suite 300',
          'addressLocality': 'Waltham',
          'addressRegion': 'MA',
          'postalCode': '02451',
          'addressCountry': 'US'
        },
        'contactPoint': [
          {
            '@type': 'ContactPoint',
            'contactType': 'customer service',
            'email': 'info@domtechacademy.com',
            'telephone': '+1-339-206-8081',
            'areaServed': 'US',
            'availableLanguage': ['English']
          },
          {
            '@type': 'ContactPoint',
            'contactType': 'enrollment',
            'email': 'enroll@domtechacademy.com',
            'telephone': '+1-339-206-8081',
            'areaServed': 'US',
            'availableLanguage': ['English']
          }
        ],
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': '4.8',
          'ratingCount': '50',
          'bestRating': '5',
          'worstRating': '1'
        },
        'review': [
          {
            '@type': 'Review',
            'reviewRating': {
              '@type': 'Rating',
              'ratingValue': '5',
              'bestRating': '5'
            },
            'author': {
              '@type': 'Person',
              'name': 'Michelle K.'
            },
            'reviewBody': 'Excellent coding program for kids! My son learned so much and enjoyed every class.'
          }
        ],
        'sameAs': [
          'https://www.facebook.com/domtechacademy',
          'https://www.instagram.com/domtechacademy',
          'https://www.linkedin.com/company/domtechacademy',
          'https://www.tiktok.com/@domtechacademy'
        ],
        'additionalType': [
          'https://schema.org/AfterSchoolProgram',
          'https://schema.org/TechnologyEducation',
          'https://schema.org/ChildCare',
          'https://schema.org/LearningCenter',
          'https://schema.org/School'
        ],
        'category': [
          'Education',
          'Technology Education',
          'STEM Education Center',
          'Robotics Training Center',
          'Computer Programming School',
          'After School Program',
          'Youth Program',
          'Summer Camp'
        ],
        'serviceType': [
          'Coding Education',
          'Robotics Training',
          'STEM Education',
          'Technology Education',
          'After School Program',
          'Summer Camp Program'
        ],
        'audience': {
          '@type': 'EducationalAudience',
          'educationalRole': 'student',
          'audienceType': 'children',
          'geographicArea': 'Greater Boston Area',
          'ageRange': '6-16'
        },
        'potentialAction': [
          {
            '@type': 'ReserveAction',
            'target': {
              '@type': 'EntryPoint',
              'urlTemplate': 'https://domtechacademy.com/enroll',
              'actionPlatform': [
                'http://schema.org/DesktopWebPlatform',
                'http://schema.org/MobileWebPlatform'
              ]
            },
            'result': {
              '@type': 'Reservation',
              'name': 'Course Enrollment'
            }
          }
        ],
        'offers': {
          '@type': 'AggregateOffer',
          'priceCurrency': 'USD',
          'lowPrice': '299',
          'highPrice': '599',
          'offerCount': '4',
          'offers': [
            {
              '@type': 'Offer',
              'name': 'Early Bird Special',
              'description': 'Save 15% on any course when enrolling 30 days before start date',
              'priceValidUntil': '2025-04-05'
            },
            {
              '@type': 'Offer',
              'name': 'Sibling Discount',
              'description': '10% off for siblings enrolling together'
            }
          ]
        },
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': 'https://domtechacademy.com',
          'speakable': {
            '@type': 'SpeakableSpecification',
            'cssSelector': ['.hero-title', '.course-description']
          }
        },
        'hasOfferCatalog': {
          '@type': 'OfferCatalog',
          'name': 'DOM Tech Academy Courses',
          'itemListElement': [
            {
              '@type': 'OfferCatalog',
              'name': 'Summer 2025 Programs',
              'itemListElement': courses
            }
          ]
        }
      },
      {
        '@type': 'WebSite',
        '@id': 'https://domtechacademy.com/#website',
        'url': 'https://domtechacademy.com',
        'name': 'DOM Tech Academy',
        'description': 'Education of Coding Inspiring young minds ages 6-16 to discover the world of coding, robotics, and computational thinking. Start their tech journey today!',
        'publisher': {
          '@id': 'https://domtechacademy.com/#organization'
        },
        'inLanguage': 'en-US'
      },
      ...courses
    ]
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#305CDE" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="canonical" href="https://domtechacademy.com" />
        <meta name="theme-color" content="#305CDE" />
        <meta name="msapplication-TileColor" content="#305CDE" />
        <meta property="og:instagram" content="https://www.instagram.com/domtechacademy/" />
        <meta property="og:linkedin" content="https://www.linkedin.com/company/dom-tech-academy/" />
        <meta property="og:tiktok" content="https://www.tiktok.com/@domtechacademy" />
        <meta property="og:facebook" content="https://www.facebook.com/share/1DjueE5PhA/" />
        <link rel="me" href="https://www.instagram.com/domtechacademy/" />
        <link rel="me" href="https://www.linkedin.com/company/dom-tech-academy/" />
        <link rel="me" href="https://www.tiktok.com/@domtechacademy" />
        <link rel="me" href="https://www.facebook.com/share/1DjueE5PhA/" />
        <GoogleAnalytics />
        <DeploymentInfo />
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KD597LCL');
          `}
        </Script>
      </head>
      <body className={`${inter.className} ${raleway.variable} ${molle.variable} ${montserrat.variable}`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KD597LCL"
            height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe>
        </noscript>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}