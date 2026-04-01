"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    // Reset scroll when pathname changes
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    function update(time: number) {
      if (typeof window !== "undefined" && ScrollTrigger) {
        ScrollTrigger.update();
      }
    }

    const rafId = requestAnimationFrame(function loop(time) {
      update(time);
      requestAnimationFrame(loop);
    });

    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        lerp: 0.08,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1.2,
      }}
    >
      {children as any}
    </ReactLenis>
  );
}
