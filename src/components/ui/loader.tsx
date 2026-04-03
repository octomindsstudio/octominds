"use client";

import { motion } from "framer-motion";
import { cn } from "@heroui/react";

interface LoaderProps {
  className?: string;
  scale?: number;
}

export function Loader({ className, scale = 1 }: LoaderProps) {
  return (
    <div className={cn("pointer-events-none select-none", className)}>
      {/* ATMOSPHERIC DEPTH: Dynamic Refraction Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-primary/10 rounded-full blur-[140px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100 h-100 bg-accent/5 rounded-full blur-[120px]"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div
        className="relative flex items-center justify-center"
        style={{ transform: `scale(${scale})` }}
      >
        {/* CORE: Shifting Polytope with Chromatic Refraction */}
        <div className="relative w-28 h-28">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 border-[1.5px] rounded-sm backdrop-blur-[2px]"
              style={{
                perspective: "1200px",
                transformStyle: "preserve-3d",
                borderColor:
                  i % 2 === 0
                    ? "oklch(0.65 0.22 45 / 0.5)"
                    : "oklch(0.6 0.18 250 / 0.5)",
              }}
              animate={{
                rotateX: [0, 180, 360],
                rotateY: [0, 180, 360],
                rotateZ: [0, 90, 180, 0],
                scale: [1, 0.7, 1.3, 1],
                borderRadius: ["8%", "50%", "30%", "8%"],
                x: i % 2 === 0 ? [-2, 2, -2] : [2, -2, 2],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: [0.23, 1, 0.32, 1],
              }}
            >
              {/* Internal Fluid Light */}
              <motion.div
                className="absolute inset-0 bg-linear-to-tr from-white/10 via-transparent to-white/5"
                animate={{ opacity: [0.1, 0.4, 0.1] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
              />
            </motion.div>
          ))}

          {/* ATOMIC CENTER: Gravitational Singularity */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full z-50 overflow-hidden"
            animate={{
              scale: [1, 1.8, 0.6, 1],
              boxShadow: [
                "0 0 20px rgba(255,255,255,0.4)",
                "0 0 50px rgba(255,255,255,1)",
                "0 0 15px rgba(255,255,255,0.4)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "anticipate",
            }}
          >
            {/* Core Pulse Flare */}
            <motion.div
              className="absolute inset-x-0 h-full bg-linear-to-r from-primary via-white to-accent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </div>

        {/* ORBIT: Kinetic Fragments and Shimmers */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`frag-${i}`}
            className={`absolute rounded-full ${i % 2 === 0 ? "w-1 h-3 bg-primary/40" : "w-1 h-1 bg-white/60"}`}
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{
              x: [
                Math.cos((i * 30 * Math.PI) / 180) * 40,
                Math.cos((i * 30 * Math.PI) / 180) * 110,
                Math.cos((i * 30 * Math.PI) / 180) * 40,
              ],
              y: [
                Math.sin((i * 30 * Math.PI) / 180) * 40,
                Math.sin((i * 30 * Math.PI) / 180) * 110,
                Math.sin((i * 30 * Math.PI) / 180) * 40,
              ],
              opacity: [0, 1, 0],
              scale: [0, 2, 0.5, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.15,
              ease: [0.4, 0, 0.2, 1],
            }}
          />
        ))}
      </div>
    </div>
  );
}
