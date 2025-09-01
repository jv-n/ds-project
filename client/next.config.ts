import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  basePath: '/seloresponsa',
  assetPrefix: '/seloresponsa',
  trailingSlash: true,
  async rewrites() {
    return [
      {
        
        source: "/api/:path*",
        destination: "http://vm-cinboraimpactar2.cin.ufpe.br/seloresponsaback/:path*", 
      },
    ];
  },
  output: `standalone`,
};

export default nextConfig;