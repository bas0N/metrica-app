/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
    ],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // publicRuntimeConfig: {
  //   NEXT_PUBLIC_BACKEND_URL: process.env.BACKEND_URL,
  //   NEXT_PUBLIC_APP_URL: process.env.APP_URL,
  // },
};

module.exports = nextConfig;
