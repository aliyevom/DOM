/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com'],
    unoptimized: true
  },
  // Use static export
  output: 'export',
  distDir: '.next',
  reactStrictMode: true,
  trailingSlash: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Reduce number of compilations
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Reduce the number of recompilations in development
      config.watchOptions = {
        ignored: ['**/node_modules', '**/.next', '**/out'],
        aggregateTimeout: 300,
        poll: 1000,
      }
    }
    return config
  },
  // Disable source maps in development for faster builds
  productionBrowserSourceMaps: false,
}

module.exports = nextConfig 