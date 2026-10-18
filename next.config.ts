import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  distDir: process.env.NEXT_BUILD_DIR || ".next",
  poweredByHeader: false,
  images: { qualities: [60, 75, 85] },
};
export default nextConfig;
