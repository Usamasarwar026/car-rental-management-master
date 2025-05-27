import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      "res.cloudinary.com",
      "via.placeholder.com",
      "platform-lookaside.fbsbx.com",
      "images.ctfassets.net",
    ],
  },
};

export default nextConfig;
