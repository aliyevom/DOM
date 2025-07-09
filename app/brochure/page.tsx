'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function BrochurePage() {
  const router = useRouter();

  useEffect(() => {
    // Create a link element
    const link = document.createElement('a');
    link.href = '/brochure/brochure-design.pdf';
    link.download = 'DOM-Tech-Academy-Brochure.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Redirect back to enroll page
    router.push('/enroll');
  }, [router]);

  // Don't render anything as we're just downloading and redirecting
  return null;
} 