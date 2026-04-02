"use client";

import { ReactNode } from "react";
import {
  Info,
  AlertTriangle,
  AlertCircle,
  Lightbulb,
  CheckCircle2,
  Zap,
} from "lucide-react";
import { cn } from "@heroui/react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type CalloutVariant = "info" | "warning" | "error" | "tip" | "success" | "note";

interface CalloutProps {
  children: ReactNode;
  title?: string;
  type?: CalloutVariant;
  className?: string;
}

const calloutConfig: Record<
  CalloutVariant,
  {
    icon: typeof Info;
    theme: string;
    bg: string;
    border: string;
    accent: string;
    defaultTitle: string;
  }
> = {
  info: {
    icon: Info,
    theme: "text-blue-400",
    bg: "bg-blue-500/[0.03] dark:bg-blue-500/5",
    border: "border-blue-500/10",
    accent: "bg-blue-400/20",
    defaultTitle: "Information",
  },
  warning: {
    icon: AlertTriangle,
    theme: "text-orange-400",
    bg: "bg-orange-500/[0.03] dark:bg-orange-500/5",
    border: "border-orange-500/10",
    accent: "bg-orange-400/20",
    defaultTitle: "Attention",
  },
  error: {
    icon: AlertCircle,
    theme: "text-red-400",
    bg: "bg-red-500/[0.03] dark:bg-red-500/5",
    border: "border-red-500/10",
    accent: "bg-red-400/20",
    defaultTitle: "Critical",
  },
  tip: {
    icon: Lightbulb,
    theme: "text-purple-400",
    bg: "bg-purple-500/[0.03] dark:bg-purple-500/5",
    border: "border-purple-500/10",
    accent: "bg-purple-400/20",
    defaultTitle: "Pro Tip",
  },
  success: {
    icon: CheckCircle2,
    theme: "text-emerald-400",
    bg: "bg-emerald-500/[0.03] dark:bg-emerald-500/5",
    border: "border-emerald-500/10",
    accent: "bg-emerald-400/20",
    defaultTitle: "Success",
  },
  note: {
    icon: Zap,
    theme: "text-primary",
    bg: "bg-primary/[0.03] dark:bg-primary/5",
    border: "border-primary/10",
    accent: "bg-primary/20",
    defaultTitle: "Take Note",
  },
};

export function Callout({
  children,
  title,
  type = "info",
  className,
}: CalloutProps) {
  const config = calloutConfig[type] || calloutConfig.info;
  const Icon = config.icon;
  const displayTitle = title || config.defaultTitle;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "my-10 relative overflow-hidden rounded-2xl border-l-4 border-r border-t border-b p-6 md:p-8 md:py-6 backdrop-blur-md transition-all duration-500",
        config.bg,
        config.border,
        type === "info" && "border-l-blue-400/50",
        type === "warning" && "border-l-orange-400/50",
        type === "error" && "border-l-red-400/50",
        type === "tip" && "border-l-purple-400/50",
        type === "success" && "border-l-emerald-400/50",
        type === "note" && "border-l-primary/50",
        className,
      )}
    >
      {/* Decorative Background Icon */}
      <div className="absolute -right-8 -top-8 opacity-[0.03] dark:opacity-[0.05] pointer-events-none select-none -rotate-12 group-hover:rotate-0 transition-transform duration-700">
        <Icon size={160} strokeWidth={1} />
      </div>

      <div className="relative z-10 flex flex-col sm:flex-row gap-5 items-start sm:items-center"> 
        <div className="flex-1 space-y-1">
          <h4
            className={cn(
              "font-display text-lg font-bold tracking-tight uppercase italic",
              config.theme,
            )}
          >
            {displayTitle}
          </h4>
          <div className="text-foreground/60 dark:text-foreground/50 leading-relaxed font-sans text-[15px] sm:text-base [&>p]:mb-0!">
            {children}
          </div>
        </div>
      </div> 
    </motion.div>
  );
}
