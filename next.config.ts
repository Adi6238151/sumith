import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*", // Or specific origin, like "http://localhost:3000"
          },
        ],
      },
    ];
  },
};

export default nextConfig;
