import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['profile.line-scdn.net', 'picsum.photos', 'xvwbhjtksdmoakiyitbh.supabase.co'],
  },
  reactStrictMode: true,
  swcMinify: true,
  
};

export default nextConfig;
