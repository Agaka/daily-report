import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  outputFileTracingIncludes: {
    '/briefing/*': ['./content/**/*'],
  },
};

export default nextConfig;
