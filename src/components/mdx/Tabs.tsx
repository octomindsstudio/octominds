"use client";

import {
  useState,
  Children,
  isValidElement,
  ReactNode,
  ReactElement,
  useId,
} from "react";
import { cn } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Tab (content panel) ────────────────────────────────────────
interface TabProps {
  children: ReactNode;
  value: string;
  className?: string;
}

export function Tab({ children, className }: TabProps) {
  return (
    <div
      className={cn(
        "text-foreground/70 leading-7 [&>p]:mb-0! [&>p:last-child]:mb-0",
        className,
      )}
    >
      {children}
    </div>
  );
}

// ─── Tabs (container) ───────────────────────────────────────────
interface TabsProps {
  children: ReactNode;
  items?: string[];
  defaultIndex?: number;
  className?: string;
}

export function Tabs({
  children,
  items,
  defaultIndex = 0,
  className,
}: TabsProps) {
  const layoutId = useId();

  const tabs: { value: string; element: ReactElement }[] = [];
  Children.forEach(children, (child) => {
    if (
      isValidElement(child) &&
      (child as ReactElement<TabProps>).props.value
    ) {
      tabs.push({
        value: (child as ReactElement<TabProps>).props.value,
        element: child as ReactElement,
      });
    }
  });

  const tabLabels = items || tabs.map((t) => t.value);
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const activeValue = tabLabels[activeIndex];

  return (
    <div
      className={cn(
        "my-8 rounded-2xl border border-border/60 overflow-hidden shadow-sm",
        "bg-secondary/30 dark:bg-white/4",
        className,
      )}
    >
      {/* Tab Triggers */}
      <div
        className={cn(
          "flex items-center gap-0.5 px-1.5 py-1.5 border-b border-border/40 overflow-x-auto scrollbar-none",
          "bg-secondary/50 dark:bg-white/3",
        )}
      >
        {tabLabels.map((label, i) => (
          <button
            key={label}
            onClick={() => setActiveIndex(i)}
            className={cn(
              "relative px-5 py-2 text-sm font-semibold rounded-xl transition-colors duration-300 whitespace-nowrap cursor-pointer select-none",
              i === activeIndex
                ? "text-foreground"
                : "text-foreground/40 hover:text-foreground/60",
            )}
          >
            {/* Animated background pill */}
            {i === activeIndex && (
              <motion.div
                layoutId={`tab-pill-${layoutId}`}
                className={cn(
                  "absolute inset-0 rounded-xl shadow-sm border",
                  // Light: white pill | Dark: bright glass pill
                  "bg-background border-border/50 dark:bg-white/8 dark:border-white/10",
                )}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 28,
                }}
              />
            )}
            <span className="relative z-10">{label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="px-6 py-5">
        <AnimatePresence mode="wait">
          {tabs.map(
            (tab) =>
              tab.value === activeValue && (
                <motion.div
                  key={tab.value}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{
                    duration: 0.2,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                >
                  {tab.element}
                </motion.div>
              ),
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
