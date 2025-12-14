import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/solid-design-patterns',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
