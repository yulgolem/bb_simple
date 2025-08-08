import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Don't fail the production build on ESLint errors (generated code, etc.)
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
