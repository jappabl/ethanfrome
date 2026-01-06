import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/ethanfrome' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/ethanfrome/' : '',
};

export default nextConfig;
