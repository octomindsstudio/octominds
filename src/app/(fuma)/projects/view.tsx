"use client";

import { QueryProjects } from "@/lib/get-projects";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { gsap, ScrollTrigger, useIsomorphicLayoutEffect } from "@/lib/gsap";
import { useRef, useState, useCallback } from "react";
import { BackgroundMesh } from "@/components/home/background-mesh";
import { Loader } from "@/components/ui/loader";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useLenis } from "@studio-freight/react-lenis";

import { fetchProjectsAction } from "./actions";

const ProjectsView = ({
  initialProjects,
  nextCursor: initialCursor,
}: {
  initialProjects: QueryProjects["projects"];
  nextCursor?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  const [projects, setProjects] = useState(initialProjects);
  const [cursor, setCursor] = useState(initialCursor);
  const [hasMore, setHasMore] = useState(!!initialCursor);
  const [isLoading, setIsLoading] = useState(false);
  const isFetchingRef = useRef(false);
  const lenis = useLenis();

  const fetchMoreProjects = useCallback(async () => {
    if (isLoading || !hasMore || isFetchingRef.current) return;

    isFetchingRef.current = true;
    setIsLoading(true);

    try {
      const data = await fetchProjectsAction({
        cursor: cursor,
        limit: 4,
      });

      // Throttle for DOM/Animation stability
      setTimeout(() => {
        setProjects((prev) => [...prev, ...data.projects]);
        setCursor(data.nextCursor);
        setHasMore(!!data.nextCursor);
        setIsLoading(false);
        isFetchingRef.current = false;

        // CRITICAL: Double-stage sync to catch all layout shifts
        requestAnimationFrame(() => {
          lenis?.resize();
          ScrollTrigger.refresh();

          // Second pass after framer-motion shifts stabilize
          requestAnimationFrame(() => {
            lenis?.resize();
            ScrollTrigger.refresh();
            console.log("[Scroll] Deep sync completed");
          });
        });
      }, 800);
    } catch (error) {
      console.error("Error fetching more projects:", error);
      setIsLoading(false);
      isFetchingRef.current = false;
    }
  }, [cursor, hasMore, isLoading, lenis]);

  const { targetRef } = useIntersectionObserver({
    onIntersect: fetchMoreProjects,
    rootMargin: "200px",
    enabled: hasMore && !isLoading,
  });

  useIsomorphicLayoutEffect(() => {
    if (projects.length > initialProjects.length) {
      ScrollTrigger.refresh();
      console.log("[GSAP] Refreshed ScrollTrigger for new batch");
    }
  }, [projects.length, initialProjects.length]);

  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current) return;
    const mm = gsap.matchMedia(containerRef.current);

    mm.add("(min-width: 1024px)", () => {
      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          xPercent: -20,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }
    });

    return () => mm.revert();
  }, [projects.length]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-background pt-32 md:pt-48 overflow-x-hidden"
    >
      <BackgroundMesh />

      {/* Kinetic Header Background */}
      <div className="absolute top-40 left-0 w-full overflow-hidden pointer-events-none select-none z-0 opacity-10">
        <div
          ref={marqueeRef}
          className="whitespace-nowrap font-display text-[25vw] font-black uppercase text-transparent stroke-1 stroke-foreground/20 italic tracking-tighter"
        >
          GALLERY • GALLERY • GALLERY • GALLERY
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col gap-20">
          <header className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-primary" />
              <span className="font-sans text-xs md:text-sm font-black uppercase tracking-[0.4em] text-primary">
                Case Studies
              </span>
            </div>
            <h1 className="text-[clamp(3rem,14vw,8rem)] md:text-9xl font-display font-black tracking-tighter leading-[0.8] uppercase text-primary drop-shadow-[0_0_40px_rgba(var(--primary-rgb),0.3)] hyphens-none">
              WORKS
            </h1>
            <p className="mt-10 text-lg md:text-2xl text-foreground/50 leading-relaxed font-sans max-w-2xl font-light">
              Crafting high-end digital experiences where technical precision
              meets creative edge. Each project is a journey from initial
              discovery to market-defining deployment.
            </p>
          </header>

          <div className="flex flex-col gap-14 md:gap-28">
            {projects.map((project, i) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="group block relative"
                >
                  <div className="flex flex-col gap-10">
                    {/* Immersive Image Column */}
                    <div className="relative aspect-video md:aspect-21/9 w-full rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl transition-all duration-700 group-hover:border-primary/40 transform-gpu will-change-transform">
                      {project.thumbnail && (
                        <Image
                          src={project.thumbnail}
                          alt={project.title}
                          fill
                          priority={i < 2}
                          className="object-cover transition-transform duration-[2.5s] group-hover:scale-105"
                        />
                      )}

                      {/* Darkening Overlay */}
                      <div className="absolute inset-0 bg-foreground/40 group-hover:bg-foreground/10 transition-colors duration-700" />
                    </div>

                    {/* Content Column */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 px-4 md:px-8">
                      <div className="max-w-2xl">
                      <div className="flex items-center gap-3 mb-6">
                        <div
                          className={`w-2.5 h-2.5 rounded-full bg-primary`}
                        />
                        <span className="font-sans text-xs md:text-sm uppercase tracking-[0.25em] text-muted-foreground">
                          {project.category}
                        </span>
                      </div>
                        <div className="overflow-hidden mb-4">
                          <h3 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tighter text-foreground transition-colors group-hover:text-primary leading-[0.9]">
                            {project.title}
                          </h3>
                        </div>
                        <p className="text-base md:text-xl text-foreground/40 leading-relaxed font-sans italic line-clamp-2 max-w-xl group-hover:text-foreground/60 transition-colors">
                          {project.description}
                        </p>
                      </div>

                      <div className="flex flex-col items-start md:items-end gap-6">
                        {project?.tools && project.tools.length > 0 && (
                          <div className="flex flex-wrap md:justify-end gap-2">
                            {project.tools.slice(0, 3).map((tool: string) => (
                              <span
                                key={tool}
                                className="px-3 py-1 rounded-full border border-white/5 bg-white/2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 group-hover:border-primary/20 group-hover:text-primary transition-all"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center gap-4 group/btn">
                          <span className="text-xs font-black uppercase tracking-[0.3em] text-primary transition-all duration-300 group-hover:tracking-[0.4em]">
                            View Narrative
                          </span>
                          <div className="w-14 h-14 rounded-full border border-primary/20 flex items-center justify-center transition-all duration-500 group-hover:border-primary group-hover:bg-primary group-hover:text-background transform-gpu will-change-transform">
                            <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:-rotate-45" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Section Separator */}
                {(i < projects.length - 1 || hasMore) && (
                  <div className="mt-14 md:mt-28 h-px w-full bg-linear-to-r from-white/10 via-white/5 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>

          {/* Sentinel for Infinite Scroll */}
          <div
            ref={targetRef}
            className="w-full flex justify-center py-12 pointer-events-none"
          >
            {isLoading && <Loader />}
          </div>
        </div>
      </div>
    </div>
  );
};

ProjectsView.displayName = "ProjectsView";

export default ProjectsView;
