"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { BackgroundMesh } from "@/components/home/background-mesh";

export default function BlogComingSoon() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      ".reveal-item",
      { y: 40, opacity: 0, rotateX: 20 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
      },
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[90vh] w-full flex flex-col items-center justify-center bg-background px-6 overflow-hidden pt-32"
    >
      <BackgroundMesh />
      {/* Background Horizon Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[80vh] bg-primary/5 blur-[160px] rounded-full pointer-events-none -z-10" />

      {/* Hero / Coming Soon Typography */}
      <div className="relative text-center z-10 perspective-1000">
        <h1
          ref={textRef}
          className="font-display text-[15vw] md:text-[12vw] font-black uppercase leading-[0.85] tracking-tighter text-foreground reveal-item transform-gpu transition-transform duration-700"
          style={{ transformStyle: "preserve-3d" }}
        >
          COMING
          <br />
          <span className="text-primary italic">SOON</span>
        </h1>

        <p className="mt-12 font-sans text-lg md:text-xl text-foreground/40 max-w-lg mx-auto reveal-item">
          We&apos;re distilling our studio insights into a deep cinematic
          archive. Ready to launch in Q2 2026.
        </p>
      </div>
    </div>
  );
}
