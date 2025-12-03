/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.liteapi.travel',
      },
      {
        protocol: 'https',
        hostname: '**.liteapi.travel',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-*'],
  },
};

module.exports = nextConfig;
