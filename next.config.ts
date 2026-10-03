import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A self-contained server in .next/standalone, which the Docker image runs.
  output: "standalone",
  // Core's origin for the CMS image bridge (src/app/api/cms-media). The image build sets
  // API_BASE_URL per environment and the running site has none, so it is fixed at build.
  env: { CORE_API_ORIGIN: process.env.API_BASE_URL ?? "" },
};

export default nextConfig;
