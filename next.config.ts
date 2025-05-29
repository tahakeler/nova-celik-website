// next.config.ts

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // allow all domains (development only; for production, specify actual domains!)
      },
    ],
    formats: ['image/avif', 'image/webp'], // preferred formats for image optimization
    unoptimized: true, // (if you want to disable image optimization completely)
  },
}

export default nextConfig
