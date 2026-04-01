"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@heroui/styles";

const NAV_LINKS = [
  { title: "Home", href: "/" },
  { title: "Projects", href: "/projects" },
  { title: "About", href: "/about" },
  { title: "Blog", href: "/blog" },
  { title: "Contact", href: "/contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close the drawer if the route changes smoothly
  useEffect(() => {
    const timeoutId = setTimeout(() => setIsOpen(false), 0);
    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return (
    <>
      {/* Global Header */}
      <header className="fixed top-0 left-0 w-full p-6 md:p-10 flex justify-between items-center z-100 mix-blend-difference text-white pointer-events-none">
        <div className="pointer-events-auto">
          <Link href="/">
            <motion.div
              className="font-display font-black text-2xl md:text-3xl tracking-tighter"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              OCTOMINDS.
            </motion.div>
          </Link>
        </div>

        <div className="pointer-events-auto flex items-center gap-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="group relative flex flex-col justify-center items-center w-12 h-12 rounded-full border border-white/20 hover:bg-white transition-colors cursor-pointer z-100"
            aria-label="Toggle navigation menu"
          >
            <motion.span
              className="absolute w-4 h-[1.5px] bg-white group-hover:bg-black"
              animate={{ y: isOpen ? 0 : -3, rotate: isOpen ? 45 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
            <motion.span
              className="absolute w-4 h-[1.5px] bg-white group-hover:bg-black"
              animate={{ y: isOpen ? 0 : 3, rotate: isOpen ? -45 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
          </button>
        </div>
      </header>

      {/* Full-Screen Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-90 bg-background text-foreground overflow-y-auto overflow-x-hidden"
            initial={{ y: "-100%", borderRadius: "0 0 50% 50%" }}
            animate={{ y: 0, borderRadius: "0 0 0% 0%" }}
            exit={{ y: "-100%", borderRadius: "0 0 50% 50%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex flex-col min-h-dvh px-6 md:px-16 pb-8 md:pb-12 pt-32">
              {/* Links Container */}
              <div className="flex flex-col gap-2 md:gap-4 flex-1 justify-center">
                {NAV_LINKS.map((link, i) => {
                  const isActive = pathname === link.href;
                  return (
                    <div key={link.title} className="overflow-hidden py-1">
                      <motion.div
                        initial={{ y: "100%", rotate: 5 }}
                        animate={{ y: 0, rotate: 0 }}
                        exit={{ y: "-100%" }}
                        transition={{
                          duration: 0.8,
                          ease: [0.76, 0, 0.24, 1],
                          delay: 0.1 + i * 0.05,
                        }}
                      >
                        <Link href={link.href} className="inline-block">
                          <span
                            className={cn(
                              "group relative font-display text-[11vw] sm:text-[9vw] md:text-[min(8vw,12vh)] leading-[0.85] tracking-tight font-black uppercase inline-block cursor-pointer transition-colors hover:text-primary active:scale-95",
                              isActive ? "text-primary" : "text-foreground",
                            )}
                          >
                            {link.title}
                          </span>
                        </Link>
                      </motion.div>
                    </div>
                  );
                })}
              </div>

              {/* Footer details in Drawer */}
              <motion.div
                className="mt-12 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 border-t border-border pt-6 font-sans text-xs md:text-sm text-muted-foreground uppercase tracking-widest shrink-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 1 }}
              >
                <div>
                  <p>Octominds Studio</p>
                  <p>© 2026</p>
                </div>
                <div className="flex flex-col items-start sm:items-end gap-2 text-foreground">
                  <a
                    href="mailto:hello@octomindsstudio.com"
                    className="hover:text-primary transition-colors"
                  >
                    hello@octomindsstudio.com
                  </a>
                  <a href="#" className="hover:text-primary transition-colors">
                    Twitter / X
                  </a>
                  <a href="#" className="hover:text-primary transition-colors">
                    LinkedIn
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
