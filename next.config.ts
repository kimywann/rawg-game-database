import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.rawg.io",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    qualities: [25, 50, 75, 80, 90, 100],
  },
};

export default nextConfig;
