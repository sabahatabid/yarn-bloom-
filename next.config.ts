import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Allow seeded Unsplash images and Supabase storage hosts used later
    domains: ['images.unsplash.com'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: '*.supabase.co', pathname: '/**' },
      { protocol: 'https', hostname: 'cdn.jsdelivr.net', pathname: '/**' },
    ],
  },
};

export default nextConfig;
