import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async rewrites() {
    return [
      {
        
        source: "/api/:path*",
        destination: "http://localhost:3001/:path*", 
      },
    ];
  },
  output: `standalone`,
};

export default nextConfig;