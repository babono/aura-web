import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // Short, memorable links for the App Store listing and emails.
    return [{ source: "/contact", destination: "/support#contact", permanent: false }];
  },
};

export default nextConfig;
