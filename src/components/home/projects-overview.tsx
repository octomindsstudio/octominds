"use client";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/gsap";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProjects } from "@/lib/get-projects";

export function ProjectsOverview() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const { projects } = getProjects({ page: 1, limit: 10 });

  useIsomorphicLayoutEffect(() => {
    if (!sectionRef.current) return;
    const mm = gsap.matchMedia(sectionRef.current);

    mm.add("(min-width: 1024px)", () => {
      // Kinetic Marquee Effect
      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
          xPercent: -15,
        });
      }

      // Split Sticky Projects Reveal
      const projectBlocks = gsap.utils.toArray(".project-info-block");
      const projectVisuals: any[] = gsap.utils.toArray(".project-visual-item");

      projectBlocks.forEach((block: any, i: number) => {
        ScrollTrigger.create({
          trigger: block,
          start: "top 60%",
          end: "bottom 40%",
          onToggle: (self) => {
            if (self.isActive) {
              gsap.to(projectVisuals[i], {
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                autoAlpha: 1,
                pointerEvents: "auto",
                duration: 0.8,
                ease: "power2.out",
              });
            } else {
              gsap.to(projectVisuals[i], {
                opacity: 0,
                scale: 0.95,
                filter: "blur(10px)",
                autoAlpha: 0,
                pointerEvents: "none",
                duration: 0.8,
                ease: "power2.inOut",
              });
            }
          },
        });
      });
    });

    mm.add("(all)", () => {
      // Staggered Word Reveal (Keep for all screens but ensure efficiency)
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll(".word-reveal");
        gsap.fromTo(
          words,
          { y: "100%", opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: headlineRef.current,
              start: "top 90%",
            },
          },
        );
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative px-4 sm:px-6 md:px-12 pt-24 md:pt-52"
    >
      {/* Kinetic Background Text Container (Isolated for overflow) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
        <div
          ref={marqueeRef}
          className="absolute top-40 left-1/2 -translate-x-1/2 whitespace-nowrap"
        >
          <span className="font-display text-[15vw] font-black uppercase text-transparent stroke-[0.5px] stroke-foreground/10 tracking-tighter opacity-50">
            CASE STUDIES • CASE STUDIES • CASE STUDIES
          </span>
        </div>
      </div>

      {/* Section Header */}
      <div className="relative mb-5 md:mb-24 z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-primary" />
              <span className="font-sans text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-primary">
                Explore our work
              </span>
            </div>

            <h2
              ref={headlineRef}
              className="font-display text-[8.5vw] sm:text-6xl md:text-7xl font-black tracking-tighter uppercase leading-[0.95] flex flex-col items-start"
            >
              <div className="overflow-hidden">
                <span className="word-reveal inline-block">Projects</span>
              </div>
              <div className="overflow-hidden text-primary -mt-[0.15em]">
                <span className="word-reveal inline-block">Overview</span>
              </div>
            </h2>

            <p className="mt-6 text-sm sm:text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              High-impact technical solutions and creative explorations crafted
              with precision and purpose.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 relative">
        {/* Left Side: Sticky Visuals Stack */}
        <div className="hidden lg:block sticky top-32 h-[75vh] rounded-3xl overflow-hidden border border-border bg-bg-2">
          {projects.map((project, i) => (
            <div
              key={`visual-${i}`}
              className="project-visual-item absolute inset-0 opacity-0 bg-bg-2 flex flex-col items-center justify-center p-6 xl:p-12 overflow-hidden"
              style={{
                opacity: i === 0 ? 1 : 0,
                pointerEvents: i === 0 ? "auto" : "none",
                visibility: i === 0 ? "visible" : "hidden",
              }}
            >
              {/* Background Glow */}
              <div
                className={`absolute inset-0 bg-linear-to-br from-primary/20 to-primary/40 opacity-30`}
              />

              {/* Project Image */}
              <Link
                href={project.url}
                className="relative w-full aspect-video rounded-2xl border border-border bg-bg-2 backdrop-blur-md shadow-2xl flex items-center justify-center group overflow-hidden transition-transform duration-500 hover:scale-[1.02] transform-gpu will-change-transform"
              >
                {project.thumbnail && (
                  <Image
                    src={project.thumbnail}
                    fill
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    alt={project.title}
                  />
                )}
              </Link>
            </div>
          ))}
        </div>

        {/* Right Side: Scrolling Content Blocks */}
        <div className="flex flex-col">
          {projects.map((project, i) => (
            <div
              key={`info-${i}`}
              className="project-info-block min-h-[70vh] lg:min-h-screen flex flex-col justify-center py-16 lg:py-0 border-b lg:border-none border-border last:border-none"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-2.5 h-2.5 rounded-full bg-primary`} />
                <span className="font-sans text-xs md:text-sm uppercase tracking-[0.25em] text-muted-foreground">
                  {project.category}
                </span>
              </div>

              {project?.shortDescription && (
                <p
                  className={`font-sans text-xs md:text-sm uppercase tracking-[0.3em] text-primary mb-4`}
                >
                  {project?.shortDescription}
                </p>
              )}

              <Link href={project.url} className="group w-fit block">
                <h3 className="font-sans text-4xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase leading-[0.9] mb-8 transition-colors group-hover:text-primary">
                  {project.title}
                </h3>
              </Link>

              <p className="font-sans text-sm md:text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed">
                {project.description}
              </p>

              {project?.tools && project.tools.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-10">
                  {project.tools.map((t) => (
                    <span
                      key={t}
                      className="px-4 py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest border border-border bg-foreground/5 text-muted-foreground transition-colors hover:border-primary/50"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-6 items-center">
                <a
                  href={project.links?.live || project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 font-display text-sm md:text-base font-bold uppercase tracking-widest text-primary hover:text-foreground transition-colors"
                >
                  <span>Launch Website</span>
                  <div className="w-10 h-10 rounded-full border border-primary flex items-center justify-center group-hover:bg-primary group-hover:text-background transition-all">
                    <span className="text-lg">↗</span>
                  </div>
                </a>

                <Link
                  href={project.url}
                  className="font-display text-xs md:text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors underline underline-offset-8"
                >
                  View Case Study
                </Link>
              </div>

              {/* Mobile Visual (visible only on mobile) */}
              <Link
                href={project.url}
                className="lg:hidden mt-12 w-full aspect-video rounded-2xl border border-border bg-bg-2 overflow-hidden relative block group"
              >
                {project.thumbnail ? (
                  <Image
                    src={project.thumbnail}
                    fill
                    className="object-cover w-full h-full opacity-100 transition-transform duration-700 group-hover:scale-110"
                    alt={project.title}
                  />
                ) : (
                  <>
                    <div
                      className={`absolute inset-0 bg-linear-to-br from-primary/20 to-primary/40 opacity-30`}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <span className="font-display text-2xl font-bold uppercase text-foreground/90">
                        {project.title}
                      </span>
                    </div>
                  </>
                )}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
