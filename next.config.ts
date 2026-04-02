import type { NextConfig } from "next";
import { createMDX } from "fumadocs-mdx/next";
import { withFrontmatter } from "./plugins/frontmatter";

const withFM = withFrontmatter({
  dir: ["content/**/*"],
  frequency: 10,
});


const withMDX = createMDX({
  // customise the config file path
  configPath: "source.config.ts"
});

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
};

export default withFM(withMDX(nextConfig));
