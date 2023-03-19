/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['fragrant-sunset-934.fly.dev', 'localhost:3000'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.vercel.com',
        port: '',
        pathname: '/image/upload/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '',
        pathname: '*',
      },
    ],
  },
}

module.exports = nextConfig
