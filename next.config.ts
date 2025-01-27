import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname:'avatars.cloudflare.steamstatic.com',
      },
      {
        protocol: 'https',
        hostname:'avatars.fastly.steamstatic.com',
      }
    ]
  }
};

export default nextConfig;
