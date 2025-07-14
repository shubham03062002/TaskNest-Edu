import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
    typescript: {
      ignoreBuildErrors: true, // ✅ ignores TS errors
    },
    eslint: {
      ignoreDuringBuilds: true, // ✅ skips ESLint during build
    },
};

export default nextConfig;
