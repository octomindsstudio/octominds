"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@heroui/react";

interface FeatureGridProps {
  children: React.ReactNode;
  className?: string;
  cols?: 1 | 2 | 3;
}

export function FeatureGrid({
  children,
  className,
  cols = 2,
}: FeatureGridProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
  }[cols];

  return (
    <div className={cn("grid gap-4 my-8", gridCols, className)}>{children}</div>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
}

export function FeatureCard({
  title,
  description,
  icon,
  className,
}: FeatureCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "relative overflow-hidden p-6 rounded-2xl border border-border/40 dark:border-white/5 bg-foreground/1 dark:bg-white/2 backdrop-blur-sm hover:border-primary/20 hover:bg-foreground/3 dark:hover:bg-white/4 transition-all duration-300",
        className,
      )}
    >
      {/* Glossy Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-linear-to-tr from-white/5 to-transparent opacity-50" />
      {icon && <div className="mb-4 text-primary">{icon}</div>}
      <h4 className="font-display text-lg font-bold text-foreground mb-2">
        {title}
      </h4>
      <p className="text-sm text-foreground/50 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
