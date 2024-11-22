/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN: process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN,
    NEXT_PUBLIC_MICROCMS_API_KEY: process.env.NEXT_PUBLIC_MICROCMS_API_KEY,
  },
};

module.exports = nextConfig;