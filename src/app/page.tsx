"use client";

import { BackgroundMesh } from "@/components/home/background-mesh";
import { HeroSection } from "@/components/home/hero-section";
import { FeaturedProjects } from "@/components/home/featured-projects";

export default function Home() {
  return (
    <main className="relative bg-background text-foreground overflow-x-clip">
      <BackgroundMesh />
      <HeroSection />
      <FeaturedProjects />
    </main>
  );
}
