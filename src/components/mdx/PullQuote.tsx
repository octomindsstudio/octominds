"use client";

import { Quote } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface PullQuoteProps {
  children: React.ReactNode;
  author?: string;
  role?: string;
}

export function PullQuote({ children, author, role }: PullQuoteProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative my-16 py-12 px-8 flex flex-col items-center text-center group"
    >
      {/* Decorative Background Icon */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 opacity-[0.03] dark:opacity-[0.05] -z-10 select-none pointer-events-none">
        <Quote size={200} strokeWidth={1} className="text-primary" />
      </div>

      <blockquote className="max-w-3xl">
        <p className="font-display text-2xl md:text-4xl font-bold tracking-tight text-foreground leading-[1.2] mb-8">
          {children}
        </p>
      </blockquote>

      {(author || role) && (
        <div className="space-y-1">
          {author && (
            <cite className="not-italic font-display text-lg font-bold text-primary">
              {author}
            </cite>
          )}
          {role && (
            <p className="text-sm font-sans text-foreground/40">{role}</p>
          )}
        </div>
      )}

      {/* Decorative lines */}
      <div className="absolute left-1/2 -bottom-8 -translate-x-1/2 h-16 w-px bg-linear-to-b from-primary/30 to-transparent" />
    </motion.div>
  );
}
