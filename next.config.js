/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    superKey: "admin",
  },
};

module.exports = nextConfig;
