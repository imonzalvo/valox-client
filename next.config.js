/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  rewrites: { source: "/", destination: "/[business]" },
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["valox-admin-test.fly.dev", "mitienda-prod.fly.dev", "localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.vercel.com",
        port: "",
        pathname: "/image/upload/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "",
        pathname: "*",
      },
    ],
  },
};

module.exports = nextConfig;
