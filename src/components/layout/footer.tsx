"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { gsap, ScrollTrigger, useIsomorphicLayoutEffect } from "@/lib/gsap";
import { useRef } from "react";
import Link from "next/link";
import { OCTOMINDS_EMAIL, COMPANY_NAME } from "@/config";

export function Footer() {
  const ctaRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);

  // Magnetic Button Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;
    mouseX.set(x * 0.1);
    mouseY.set(y * 0.1);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current || !textRef.current || !underlineRef.current)
      return;

    // Logo tracking effect on scroll - ultra safe values
    gsap.fromTo(
      textRef.current,
      {
        letterSpacing: "0.02em",
        scale: 0.98,
        opacity: 0.2,
      },
      {
        letterSpacing: "-0.04em",
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 98%",
          end: "bottom bottom",
          scrub: 1,
        },
      },
    );

    // Underline expansion on scroll
    gsap.fromTo(
      underlineRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 95%",
          end: "bottom bottom",
          scrub: 1,
        },
      },
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <footer
      ref={containerRef}
      className="relative w-full pt-20 pb-12 px-6 md:px-12 overflow-hidden"
    >

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top: Minimal CTA */}
        <div
          ref={ctaRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="flex flex-col items-center mb-32 text-center text-foreground"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="h-px w-8 bg-primary/40" />
            <span className="font-sans text-[10px] font-black uppercase tracking-[0.4em] text-primary">
              The Horizon
            </span>
            <div className="h-px w-8 bg-primary/40" />
          </motion.div>

          <h2 className="font-display text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none mb-12">
            Let&apos;s innovate.
          </h2>

          <div className="pt-8">
            <Link href="/contact">
              <motion.div
                style={{ x: springX, y: springY }}
                className="relative inline-flex items-center justify-center group cursor-pointer"
              >
                {/* Outer Glow */}
                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Main Button */}
                <div className="relative px-12 py-6 md:px-16 md:py-8 bg-primary rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-105 active:scale-95 shadow-2xl shadow-primary/20">
                  <span className="relative z-10 font-display text-xl md:text-2xl font-black text-black uppercase tracking-widest">
                    Get in Touch
                  </span>

                  {/* Shine effect */}
                  <div className="absolute top-0 -left-full w-full h-full bg-linear-to-r from-transparent via-white/30 to-transparent skew-x-30 group-hover:left-full transition-all duration-1000" />
                </div>
              </motion.div>
            </Link>
          </div>

          <p className="font-sans text-lg text-foreground/40 max-w-md mx-auto pt-8">
            Whether you have a fully-fledged brief or just the spark of an idea,
            let&apos;s start the conversation.
          </p>
        </div>

        {/* Middle: Balanced Metadata (Refined 2-column) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pb-20 border-b border-border/30">
          <div className="space-y-6">
            <h4 className="font-sans text-[10px] uppercase tracking-widest text-primary font-bold">
              Studio Inquiry
            </h4>
            <a
              href={`mailto:${OCTOMINDS_EMAIL}`}
              className="block font-sans text-lg md:text-xl font-bold text-foreground hover:text-primary transition-colors underline-offset-8 decoration-primary/30"
            >
              {OCTOMINDS_EMAIL}
            </a>
          </div>

          <div className="space-y-6 md:text-right flex flex-col md:items-end">
            <h4 className="font-sans text-[10px] uppercase text-primary tracking-widest font-bold">
              Digital Presence
            </h4>
            <div className="flex flex-wrap md:justify-end gap-8 font-sans text-sm font-bold uppercase tracking-widest text-foreground">
              <a href="#" className="hover:text-primary transition-colors">
                LinkedIn
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                X / Twitter
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Instagram
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Behance
              </a>
            </div>
          </div>
        </div>

        {/* Bottom: Stylized Logo (Safely Scaled) */}
        <div className="pt-12 flex flex-col items-center pointer-events-none select-none w-full">
          <div
            ref={textRef}
            className="flex flex-col items-center w-full max-w-full text-center"
          >
            <h1 className="font-display text-[7.8vw] font-black uppercase leading-[0.8] tracking-tighter text-foreground/10 whitespace-nowrap px-4">
              OCTOMINDS.
            </h1>
          </div>
        </div>

        {/* Legal & Version */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 opacity-30 select-none text-foreground">
          <span className="font-sans text-[10px] uppercase font-bold tracking-[0.3em]">
            © 2026 {COMPANY_NAME}
          </span>
        </div>
      </div>
    </footer>
  );
}
