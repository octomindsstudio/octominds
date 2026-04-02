"use client";

import { cn } from "@heroui/react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface DeviceFrameProps {
  children: React.ReactNode;
  type?: "phone" | "laptop" | "tablet";
  className?: string;
  priority?: boolean;
}

export function DeviceFrame({
  children,
  type = "laptop",
  className,
  priority = false,
}: DeviceFrameProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const frames = {
    phone:
      "aspect-[9/19.5] w-[280px] md:w-[320px] rounded-[3rem] border-[8px] border-black shadow-2xl",
    laptop:
      "aspect-[16/10] w-full rounded-2xl border-[6px] border-black/80 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] dark:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]",
    tablet:
      "aspect-[3/4] w-[400px] md:w-[500px] rounded-[2.5rem] border-[10px] border-black shadow-2xl",
  };

  return (
    <motion.div
      ref={ref}
      initial={
        priority ? { opacity: 1, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }
      }
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(
        "relative mx-auto my-12 overflow-hidden bg-black/5 dark:bg-white/5",
        frames[type],
        className,
      )}
    >
      {/* Glossy Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-linear-to-tr from-white/5 to-transparent opacity-50" />

      {/* Content */}
      <div className="relative h-full w-full overflow-hidden rounded-[inherit]">
        {children}
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border/40 dark:border-white/5 bg-foreground/2 dark:bg-white/2" />
    </motion.div>
  );
}
