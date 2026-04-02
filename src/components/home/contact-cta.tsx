"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";

export function ContactCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

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
    setIsHovered(false);
  };

  // Kinetic Text Logic
  const textX = useTransform(springX, (val) => val * 0.5);
  const textY = useTransform(springY, (val) => val * 0.5);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      className="relative w-full h-[80vh] md:h-screen flex flex-col items-center justify-center overflow-hidden bg-background border-t border-white/5"
    >
      {/* Background Glow */}
      <motion.div
        animate={{
          scale: isHovered ? 1.2 : 1,
          opacity: isHovered ? 0.15 : 0.05,
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-150 w-150 bg-primary blur-[160px] rounded-full -z-10 transition-all duration-1000"
      />

      <div className="container mx-auto px-6 text-center space-y-12">
        <div className="relative">
          {/* Main Heading with Kinetic Effect */}
          <motion.h2
            style={{ x: textX, y: textY }}
            className="font-display text-5xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tighter text-foreground leading-[0.9]"
          >
            Ready to <br />
            <span className="text-primary italic">Build</span> the <br />
            Future?
          </motion.h2>

          {/* Decorative floating elements */}
          <motion.div
            style={{
              x: useTransform(springX, (v) => v * -1),
              y: useTransform(springY, (v) => v * -1),
            }}
            className="absolute -top-12 -left-12 md:-top-24 md:-left-24 h-24 w-24 md:h-48 md:w-48 border border-primary/20 rounded-full blur-sm -z-10"
          />
        </div>

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

      {/* Kinetic Grid Pattern Background */}
      <motion.div
        style={{ x: textX, y: textY }}
        className="absolute inset-0 opacity-[0.03] pointer-events-none -z-20"
      >
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "radial-gradient(var(--primary) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </motion.div>
    </section>
  );
}
