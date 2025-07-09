export function generateStaticParams() {
  return [
    { section: 'curriculum' },
    { section: 'curriculum', course: 'python-ev3' },
    { section: 'curriculum', course: 'pre-coding' },
    { section: 'curriculum', course: 'mid-robotics' },
    { section: 'curriculum', course: 'arduino' },
  ]
}

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-24">
      {children}
    </div>
  )
} 