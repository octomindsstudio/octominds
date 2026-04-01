"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show on desktop
    const timer = setTimeout(() => {
      if (!window.matchMedia("(hover: none)").matches) {
        setIsVisible(true);
      }
    }, 10);

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    const handleMouseUp = () => setClicked(false);
    const handleMouseDown = () => setClicked(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setLinkHovered(true);
      } else {
        setLinkHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      clearTimeout(timer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer subtle ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full border-[1.5px] border-primary pointer-events-none z-9999"
        animate={{
          x: position.x - 20,
          y: position.y - 20,
          scale: clicked ? 0.8 : linkHovered ? 1.5 : 1,
          backgroundColor: linkHovered ? "var(--color-primary)" : "transparent",
          opacity: linkHovered ? 0.2 : 0.6,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      />
      {/* Inner sharp dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent pointer-events-none z-9999"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: clicked ? 0 : linkHovered ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 800, damping: 25, mass: 0.1 }}
      />
    </>
  );
}
