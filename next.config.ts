import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"], // Use the svgr loader for SVGs
    });
    return config;
  },
};

export default nextConfig;
