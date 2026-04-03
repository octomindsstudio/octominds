"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

export function KineticGrid() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 120, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      mouseX.set(x * 30); // Reduced movement for subtlety
      mouseY.set(y * 30);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const gridX = useTransform(springX, (val) => val * -0.8);
  const gridY = useTransform(springY, (val) => val * -0.8);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Subtle Depth Glow */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vh] bg-linear-to-br from-primary/3 via-transparent to-accent/3 blur-[160px] opacity-30 rounded-full"
      />

      {/* Ultra-subtle Grid */}
      <motion.div
        style={{ x: gridX, y: gridY }}
        className="absolute inset-[-5%] opacity-[0.03] dark:opacity-[0.05]"
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, var(--color-primary) 0.5px, transparent 0.5px),
              linear-gradient(to bottom, var(--color-primary) 0.5px, transparent 0.5px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </motion.div>

      {/* Soft Vignette Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, transparent 0%, var(--background) 100%)",
        }}
      />
    </div>
  );
}
