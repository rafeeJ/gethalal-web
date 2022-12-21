/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    GOOGLE_MAPS_API: process.env.GOOGLE_MAPS_API
  },
  experimental: {
    images: {
      allowFutureImage: true,
    }
  }
}

module.exports = nextConfig
