"use client";

import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/gsap";
import { useRef } from "react";

export function ContactHero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!headlineRef.current) return;

    const words = headlineRef.current.querySelectorAll(".word-reveal");

    gsap.fromTo(
      words,
      { y: "100%", opacity: 0, rotateX: 45 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1.4,
        stagger: 0.1,
        ease: "power4.out",
      },
    );
  }, []);

  return (
    <section className="relative pt-40 pb-12 px-6 md:px-12 flex flex-col items-center text-center z-10">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-px w-8 bg-primary/40" />
        <span className="font-sans text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-primary">
          Get in Touch
        </span>
        <div className="h-px w-8 bg-primary/40" />
      </div>

      <h1
        ref={headlineRef}
        className="font-display text-[12vw] sm:text-8xl md:text-9xl font-black tracking-tighter uppercase leading-[0.85] flex flex-col items-center perspective-[1000px]"
      >
        <div className="overflow-hidden">
          <span className="word-reveal inline-block">The Next</span>
        </div>
        <div className="overflow-hidden text-primary italic -mt-[0.1em]">
          <span className="word-reveal inline-block">Evolution</span>
        </div>
      </h1>

      <p className="mt-8 text-sm sm:text-lg md:text-xl text-muted-foreground font-sans max-w-2xl leading-relaxed mx-auto opacity-0 animate-in fade-in duration-1000 delay-500 fill-mode-forwards">
        Whether you have a fully-fledged brief or just the spark of an idea,
        let&apos;s engineer something extraordinary together.
      </p>
    </section>
  );
}
