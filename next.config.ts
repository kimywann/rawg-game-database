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
    formats: ["image/webp", "image/avif"],
    qualities: [25, 50, 75, 80, 90, 100],
  },
};

export default nextConfig;
