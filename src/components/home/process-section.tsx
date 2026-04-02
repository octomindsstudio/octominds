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
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const numberRefs = useRef<(HTMLDivElement | null)[]>([]);

  useIsomorphicLayoutEffect(() => {
    if (!sectionRef.current || !stickyRef.current) return;

    const mm = gsap.matchMedia(sectionRef.current);

    mm.add("(min-width: 1024px)", () => {
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      const numbers = numberRefs.current.filter(Boolean) as HTMLDivElement[];

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      cards.forEach((card, i) => {
        if (i === 0) {
          gsap.set(card, { opacity: 1, scale: 1, y: 0 });
          gsap.set(numbers[i], { opacity: 1, color: "var(--primary)" });
          return;
        }

        tl.fromTo(
          card,
          {
            y: "100%",
            opacity: 0,
            scale: 0.9,
          },
          {
            y: "0%",
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power2.inOut",
          },
          i - 0.5,
        );

        tl.to(
          cards[i - 1],
          {
            scale: 0.95,
            opacity: 0.2,
            duration: 1,
            ease: "power2.inOut",
          },
          "<",
        );

        tl.to(
          numbers[i - 1],
          {
            opacity: 0.2,
            color: "rgba(255, 255, 255, 0.4)",
            duration: 0.2,
          },
          "<",
        );

        tl.to(
          numbers[i],
          {
            opacity: 1,
            color: "var(--primary)",
            duration: 0.2,
          },
          "<+=0.5",
        );
      });

      return () => {
        tl.kill();
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-auto lg:h-[400vh] py-24 md:py-32 overflow-visible"
    >
      <div
        ref={stickyRef}
        className="relative lg:sticky top-0 h-auto lg:h-screen w-full flex items-start lg:items-center lg:justify-center overflow-visible lg:overflow-hidden"
      >
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-start lg:items-center gap-8 md:gap-24">
          {/* Left Column: Sequential Counter */}
          <div className="w-full md:w-1/3 flex flex-col justify-start relative z-20">
            <div className="space-y-4">
              <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-foreground">
                Our <br /> <span className="text-primary italic">Process</span>
              </h2>
              <div className="pt-8 space-y-6 hidden lg:flex lg:flex-col">
                {processes.map((p, i) => (
                  <div
                    key={p.id}
                    ref={(el) => {
                      numberRefs.current[i] = el;
                    }}
                    className="flex items-center gap-4 text-2xl font-display font-medium text-foreground/40 opacity-[0.2]"
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

          {/* Right Column: Detailed Content (Stacked on Desktop) */}
          <div className="w-full md:w-2/3 relative h-auto lg:h-150 flex flex-col lg:block items-center lg:justify-center gap-8 lg:gap-12">
            {processes.map((p, i) => (
              <div
                key={p.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className={cn(
                  "relative lg:absolute inset-0 m-auto w-full",
                  "group space-y-8 p-8 md:p-12 rounded-3xl border border-white/5 bg-white/2 backdrop-blur-sm transition-colors duration-500 hover:border-primary/20 max-w-full!",
                  "opacity-100 scale-100 translate-y-0 lg:opacity-0 lg:scale-90 lg:translate-y-full",
                )}
                style={{ zIndex: i + 10 }}
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
                <div className="absolute top-0 right-0 -mr-4 -mt-4 h-24 w-24 bg-primary/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
