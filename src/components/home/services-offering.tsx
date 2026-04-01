"use client";

import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/gsap";
import { cn } from "@heroui/styles";
import { useRef } from "react";

const offerings = [
  {
    id: "01",
    title: "UI/UX Design",
    description:
      "Crafting intuitive digital interfaces and seamless user journeys that prioritize both beauty and usability.",
    tags: ["Product Design", "Prototyping", "UX Strategy"],
  },
  {
    id: "02",
    title: "App Dev",
    description:
      "Delivering high-performance mobile and desktop applications with a native feel and cross-platform efficiency.",
    tags: ["iOS/Android", "React Native"],
  },
  {
    id: "03",
    title: "Full Stack Web",
    description:
      "Mastering the entire web stack to deliver high-performance, responsive, and SEO-optimized web applications.",
    tags: ["React/Next.js", "Node.js", "Performance"],
  },
  {
    id: "04",
    title: "Enterprise Dev",
    description:
      "Building robust, scalable, and secure systems tailored for high-stakes business requirements and complex workflows.",
    tags: ["Custom ERP", "System Architecture", "Security"],
  },
  {
    id: "05",
    title: "SaaS Solutions",
    description:
      "Developing next-generation software-as-a-service platforms with a focus on multitenancy, performance, and growth.",
    tags: ["Multitenancy", "Cloud-Native", "Analytics"],
  },
  {
    id: "06",
    title: "UX Research",
    description:
      "Leveraging data-driven insights and user testing to inform design decisions and build products people actually need.",
    tags: ["User Testing", "Data Analysis", "Surveys"],
  },
];

const BENTO_PATTERN: Record<number, string> = {
  0: "lg:col-span-1",
  2: "lg:row-span-2",
  3: "lg:col-span-2",
  5: "lg:col-span-2",
};

export function ServicesOffering() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered Cards Entrance
      gsap.fromTo(
        ".service-card",
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        },
      );

      // Centered Section Header Reveal
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current.querySelectorAll(".word-reveal"),
          { y: "100%", opacity: 0, rotateX: 45 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1.4,
            stagger: 0.1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: headlineRef.current,
              start: "top 95%",
            },
          },
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative px-4 sm:px-6 md:px-12 pt-24 md:pt-48 overflow-visible"
    >
      {/* Dynamic Background Glows for the Section */}
      <div className="absolute top-1/4 left-1/4 w-100 h-100 bg-primary/10 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 blur-[100px] rounded-full pointer-events-none z-0" />

      {/* Centered Section Header */}
      <div className="relative mb-16 md:mb-24 z-10 text-center flex flex-col items-center">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px w-8 bg-primary/40" />
          <span className="font-sans text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-primary">
            Our Core Competencies
          </span>
          <div className="h-px w-8 bg-primary/40" />
        </div>

        <h2
          ref={headlineRef}
          className="font-display text-[10vw] sm:text-7xl font-black tracking-tighter uppercase leading-[0.90] flex flex-col items-center perspective-1000"
        >
          <div className="overflow-hidden">
            <span className="word-reveal inline-block">What We</span>
          </div>
          <div className="overflow-hidden text-primary italic -mt-[0.1em]">
            <span className="word-reveal inline-block">Are Offering</span>
          </div>
        </h2>

        <p className="mt-6 text-sm sm:text-lg md:text-xl text-muted-foreground font-sans max-w-2xl leading-relaxed mx-auto opacity-80">
          Tailored technical solutions designed to scale, succeed, and surpass
          the current AI-driven market trends.
        </p>
      </div>

      {/* Asymmetric Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative z-10 max-w-7xl mx-auto">
        {offerings.map((item, i) => (
          <div
            key={item.id}
            className={cn(
              "service-card group relative p-10 md:p-12 rounded-[2.5rem] border border-border bg-foreground/2 backdrop-blur-md transition-all duration-700 hover:border-primary/30 hover:bg-foreground/4 hover:shadow-[0_0_80px_-20px_rgba(var(--primary-rgb),0.1)] flex flex-col overflow-hidden h-full",
              BENTO_PATTERN[i % offerings.length],
            )}
          >
            {/* Local Glow Overlay */}
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            <div className="relative z-10 flex flex-col h-full">
              <div className="w-12 h-px bg-primary/50 mb-8 group-hover:w-20 transition-all duration-700" />

              <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight mb-6 group-hover:text-primary transition-colors duration-500 wrap-break-word hyphens-auto leading-[0.9]">
                {item.title}
              </h3>

              <p className="font-sans text-sm md:text-lg text-muted-foreground/80 mb-10 leading-relaxed max-w-[85%] group-hover:text-foreground/90 transition-colors duration-500">
                {item.description}
              </p>

              <div className="mt-auto flex flex-wrap gap-2 md:gap-3">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border border-border/50 bg-foreground/3 text-muted-foreground/60 transition-colors group-hover:border-primary/20 group-hover:text-primary/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Corner Decorative Element */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          </div>
        ))}
      </div>
    </section>
  );
}
