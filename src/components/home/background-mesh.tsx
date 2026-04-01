"use client";

import { motion } from "framer-motion";

export function BackgroundMesh() {
  return (
    <motion.div
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] md:w-[60vw] md:h-[60vw] bg-linear-to-tr from-primary via-background to-accent rounded-[40%_60%_70%_30%] blur-[80px] md:blur-[120px] opacity-20 dark:opacity-40 pointer-events-none z-0"
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
  );
}
