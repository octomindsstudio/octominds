"use client";

import { motion } from "framer-motion";

export function HeroSection() {
  const services = [
    "UI/UX Design",
    "Enterprise Dev",
    "SaaS Solutions",
    "Full Stack Web",
    "App Dev",
    "UX Research",
  ];

  return (
    <section className="relative min-h-dvh flex flex-col items-center px-4 sm:px-6 md:px-12 pb-8 md:pb-12 pt-20 md:pt-48 overflow-hidden">
      {/* Center Massive Title */}
      <div className="flex flex-col items-center justify-center flex-1 w-full z-10">
        <div className="overflow-hidden w-full flex justify-center">
          <motion.h1
            className="font-display text-[8.5vw] md:text-[8vw] leading-none tracking-tight font-black text-foreground uppercase text-center"
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
        className="w-full mt-auto z-10 flex flex-col md:flex-row justify-between items-center md:items-end gap-6 md:gap-12 border-t border-border pt-8 md:pt-12 text-center md:text-left"
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
          {services.map((service, i) => (
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
  );
}
