import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A self-contained server in .next/standalone, which the Docker image runs.
  output: "standalone",
};

export default nextConfig;
