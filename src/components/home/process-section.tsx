"use client";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/gsap";
import { cn } from "@heroui/styles";
import { useRef } from "react";

const processes = [
  {
    id: "01",
    title: "Discovery",
    description:
      "We dive deep into your vision, audience, and goals. Through meticulous research and strategy, we define a roadmap that aligns with your business objectives.",
    deliverables: ["Market Research", "User Personas", "Technical Roadmap"],
  },
  {
    id: "02",
    title: "Design",
    description:
      "Where strategy meets aesthetics. We craft intuitive UI/UX and brand identities that don't just look stunning but drive engagement and conversions.",
    deliverables: ["UI/UX Design", "Interactive Prototypes", "Design System"],
  },
  {
    id: "03",
    title: "Development",
    description:
      "Engineering excellence. We build scalable, high-performance applications using cutting-edge technologies, ensuring every line of code serves a purpose.",
    deliverables: ["Next.js/React", "Mobile Apps", "Custom Integrations"],
  },
  {
    id: "04",
    title: "Deployment",
    description:
      "Launching with confidence. We optimize for performance, security, and basic SEO, providing ongoing support to ensure your product scales seamlessly.",
    deliverables: ["Cloud Scaling", "SEO Optimization", "Launch Support"],
  },
];

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current || !leftColumnRef.current) return;

    const mm = gsap.matchMedia(containerRef.current);

    mm.add("(min-width: 1024px)", () => {
      // Pin the left column
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 100px",
        end: "bottom bottom",
        pin: leftColumnRef.current,
        pinSpacing: false,
        scrub: true,
      });

      // Handle step animations and highlights
      const steps = gsap.utils.toArray<HTMLElement>(
        ".process-step",
        containerRef.current,
      );
      steps.forEach((step, i) => {
        const numberId = `#process-number-${i}`;
        const numberEl = containerRef.current?.querySelector(numberId);

        // Highlight number on the left
        ScrollTrigger.create({
          trigger: step,
          start: "top 120px",
          end: i === steps.length - 1 ? "bottom bottom" : "bottom 100px",
          onToggle: (self) => {
            if (self.isActive && numberEl) {
              gsap.to(numberEl, {
                opacity: 1,
                x: 10,
                color: "var(--primary)",
                duration: 0.4,
                overwrite: "auto",
              });
            } else if (numberEl) {
              gsap.to(numberEl, {
                opacity: 0.2,
                x: 0,
                color: "rgba(255, 255, 255, 0.4)",
                duration: 0.4,
                overwrite: "auto",
              });
            }
          },
        });
      });

      ScrollTrigger.refresh();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-24 md:py-32 overflow-hidden"
    >
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-start gap-12 md:gap-24">
        {/* Left Column: Sequential Counter (Sticky) */}
        <div
          ref={leftColumnRef}
          className="w-full md:w-1/3 flex flex-col justify-start"
        >
          <div className="space-y-4">
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-foreground">
              Our <br /> <span className="text-primary italic">Process</span>
            </h2>
            <div className="pt-8 space-y-6">
              {processes.map((p, i) => (
                <div
                  key={p.id}
                  id={`process-number-${i}`}
                  className="flex items-center gap-4 text-2xl font-display font-medium text-foreground/40"
                >
                  <span className="text-primary font-bold">{p.id}</span>
                  <span className="hidden md:inline-block h-px w-8 bg-current opacity-20" />
                  <span className="text-xl opacity-0 md:opacity-100 transition-opacity">
                    {p.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Content (Scrolling) */}
        <div className="w-full md:w-2/3 space-y-24 md:space-y-48 pb-24">
          {processes.map((p, i) => (
            <div
              key={p.id}
              className={cn(
                "process-step",
                `process-step-${i}`,
                "group relative space-y-8 p-8 md:p-12 rounded-3xl border border-white/5 bg-white/2 backdrop-blur-sm transition-all duration-500 hover:border-primary/20",
              )}
            >
              <div className="space-y-4">
                <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest border border-primary/20">
                  Phase {p.id}
                </span>
                <h3 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-foreground">
                  {p.title}
                </h3>
                <p className="font-sans text-lg md:text-xl text-foreground/60 leading-relaxed max-w-2xl">
                  {p.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {p.deliverables.map((d) => (
                  <div
                    key={d}
                    className="flex items-center gap-3 text-foreground/80 font-sans"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>

              {/* Decorative background element */}
              <div className="absolute top-0 right-0 -mr-4 -mt-4 h-24 w-24 bg-primary/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
