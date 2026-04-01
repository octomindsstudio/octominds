"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/gsap";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the central text section and scale it up heavily
      if (textRef.current && pinRef.current) {
        gsap.to(textRef.current, {
          scrollTrigger: {
            trigger: pinRef.current,
            start: "top top",
            end: "+=1500",
            pin: true,
            scrub: 1,
          },
          scale: 6,
          opacity: 0,
          filter: "blur(20px)",
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={containerRef}
      className="relative bg-background text-foreground overflow-x-hidden"
    >
      {/* Hero Section */}
      <section className="relative min-h-dvh flex flex-col items-center px-4 sm:px-6 md:px-12 pb-8 md:pb-12 pt-20 md:pt-48 overflow-hidden bg-bg-1">
        {/* Massive Animated Blob Background */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] md:w-[60vw] md:h-[60vw] bg-gradient-to-tr from-primary via-background to-accent rounded-[40%_60%_70%_30%] blur-[80px] md:blur-[120px] opacity-20 dark:opacity-40 pointer-events-none"
          animate={{
            rotate: [0, 90, 180, 270, 360],
            borderRadius: [
              "40% 60% 70% 30%",
              "60% 40% 30% 70%",
              "50% 50% 60% 40%",
              "40% 60% 70% 30%",
            ],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />

        {/* Center Massive Title */}
        <div className="flex flex-col items-center justify-center flex-1 w-full z-10">
          <div className="overflow-hidden w-full flex justify-center">
            <motion.h1
              className="font-display text-[7.5vw] sm:text-[8vw] md:text-[8vw] leading-[0.8] tracking-tight font-black text-foreground uppercase text-center"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              OCTOMINDS
            </motion.h1>
          </div>
          <div className="overflow-hidden w-full flex justify-center mt-[-1vw]">
            <motion.h1
              className="font-display text-[7.5vw] sm:text-[8vw] md:text-[8vw] leading-[0.85] tracking-tight font-black text-primary uppercase text-center drop-shadow-2xl"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.1,
              }}
            >
              STUDIO
            </motion.h1>
          </div>
        </div>

        {/* Services & Intro */}
        <motion.div
          className="w-full mt-auto z-10 flex flex-col md:flex-row justify-between items-center md:items-end gap-6 md:gap-12 border-t-[1px] border-border pt-8 md:pt-12 text-center md:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
        >
          <div className="max-w-md xl:max-w-2xl">
            <p className="text-lg sm:text-xl md:text-3xl font-display font-medium text-foreground leading-[1.3] md:leading-[1.2]">
              We bring your ideas to life using AI, designing and building
              experiences better than AI ever could.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 md:gap-3 max-w-xl justify-center md:justify-end">
            {[
              "UI/UX Design",
              "Enterprise Dev",
              "SaaS Solutions",
              "Full Stack Web",
              "App Dev",
              "UX Research",
            ].map((service, i) => (
              <span
                key={i}
                className="px-4 py-2 md:px-5 md:py-2.5 rounded-full border-[1.5px] border-border text-[10px] md:text-xs font-bold uppercase tracking-widest text-muted-foreground hover:bg-foreground hover:text-background hover:border-foreground transition-all cursor-default shadow-sm backdrop-blur-sm"
              >
                {service}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* GSAP Pinned Section */}
      <section
        ref={pinRef}
        className="h-screen w-full flex items-center justify-center bg-foreground text-background relative z-20 overflow-hidden"
      >
        <h2
          ref={textRef}
          className="font-display w-full flex justify-center whitespace-nowrap text-5xl md:text-[8rem] leading-[0.9] font-black text-center text-accent tracking-tighter px-4 !mix-blend-normal"
        >
          SCALE YOUR <br /> VISION
        </h2>
      </section>

      {/* Footer / Outro */}
      <section className="min-h-screen flex items-center justify-center bg-bg-3 px-6 md:px-8 relative z-30">
        <div className="max-w-5xl relative z-10 text-center md:text-left flex flex-col items-center md:items-start">
          <motion.h3
            className="font-display text-4xl sm:text-6xl md:text-8xl lg:text-[7rem] font-bold text-primary mb-8 tracking-tighter leading-[0.9] uppercase"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Ready to <br className="hidden md:block" /> Disrupt?
          </motion.h3>
          <motion.p
            className="text-lg sm:text-xl md:text-3xl text-foreground font-sans max-w-3xl leading-relaxed mb-12 md:mb-16 opacity-80"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            octomindsstudio.com is your technical and creative partner. From
            initial UX research to full-stack implementation.
          </motion.p>
          <motion.button
            className="px-10 py-5 md:px-16 md:py-8 bg-accent text-accent-foreground font-display text-sm md:text-xl font-black uppercase tracking-[0.1em] rounded-full shadow-[0_0_40px_rgba(var(--color-accent),0.5)]"
            whileHover={{
              scale: 1.05,
              backgroundColor: "var(--color-primary)",
              color: "var(--color-primary-foreground)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            Start your project
          </motion.button>
        </div>
      </section>
    </main>
  );
}
