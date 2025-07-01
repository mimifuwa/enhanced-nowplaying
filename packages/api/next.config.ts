import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    turbo: {
      root: "../..",
    },
  },
};

export default nextConfig;
