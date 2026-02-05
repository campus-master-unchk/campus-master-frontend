import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: process.env.NEXT_PUBLIC_API_IMAGE_DOMAINS?.split(',') || [],
  },
};

export default nextConfig;
