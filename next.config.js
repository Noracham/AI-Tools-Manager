/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN: 'aitoolsmanager',
    NEXT_PUBLIC_MICROCMS_API_KEY: 'PsUD5sZDHJJJdkXAW0mDhkXnsDQQlJGmYC5s',
  },
  swcMinify: false,
};

module.exports = nextConfig;