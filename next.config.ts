// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.iea.org',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'www.thaienergynews.com',
        pathname: '/assets/**',
      },
      {
        protocol: 'https',
        hostname: 'www.aseanenergy.org',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'www.unescap.org',
        pathname: '/sites/default/files/**',
      },
      {
        protocol: 'https',
        hostname: 'www.meti.go.jp',
        pathname: '/english/images/**',
      },
      {
        protocol: 'https',
        hostname: 'www.imda.gov.sg',
        pathname: '/media-centre/**',
      },
      {
        protocol: 'https',
        hostname: 'www.bangkokpost.com',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'www.nst.com.my',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'www.thai-econ.org',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'e.vnexpress.net',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'aseanenergy.org',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'www.thaitechnews.com',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'www.reuters.com',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'www.energyfund.or.th',
        pathname: '/uploads/images/**',
      },
      {
        protocol: 'https',
        hostname: 'www.phuketgazette.net',
        pathname: '/media/**',
      }
    ]
  }
};

export default nextConfig;
