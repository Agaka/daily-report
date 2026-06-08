import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  outputFileTracingIncludes: {
    '/briefing/*': ['./content/**/*'],
  },
};

export default nextConfig;
