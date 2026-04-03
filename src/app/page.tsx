import { BackgroundMesh } from "@/components/home/background-mesh";
import { HeroSection } from "@/components/home/hero-section";
import { ServicesOffering } from "@/components/home/services-offering";
import { ProjectsOverview } from "@/components/home/projects-overview";
import { ProcessSection } from "@/components/home/process-section";
import { TestimonialsMarquee } from "@/components/home/testimonials-marquee";

export default function Home() {
  return (
    <main className="relative bg-background text-foreground overflow-x-clip">
      <BackgroundMesh />
      <HeroSection />
      <ProjectsOverview />
      <ServicesOffering />
      <ProcessSection />
      <TestimonialsMarquee />
    </main>
  );
}
