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

    // CRITICAL: Robust app-wide scroll recalculation for Next.js navigation
    requestAnimationFrame(() => {
      const lenis = (lenisRef.current as any)?.lenis;
      if (lenis) {
        lenis.resize();
        console.log("[Scroll] Global Reset: Lenis resized for", pathname);
      }

      // Sync GSAP with new page dimensions
      ScrollTrigger.refresh();
      ScrollTrigger.update();
    });
  }, [pathname]);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        lerp: 0.05, // Slightly faster for responsiveness
        duration: 1.2,
        smoothWheel: true,
      }}
    >
      {children as any}
    </ReactLenis>
  );
}
