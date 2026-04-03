"use client";

import { useEffect, useRef, useState } from "react";

interface UseIntersectionObserverProps extends IntersectionObserverInit {
  onIntersect?: () => void;
  once?: boolean;
  enabled?: boolean;
}

export function useIntersectionObserver({
  onIntersect,
  once = false,
  enabled = true,
  root = null,
  rootMargin = "0px",
  threshold = 0,
}: UseIntersectionObserverProps = {}) {
  const [isIntersecting, setIntersecting] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;

    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isCurrentlyIntersecting = entry.isIntersecting;
        setIntersecting(isCurrentlyIntersecting);

        if (isCurrentlyIntersecting) {
          onIntersect?.();
          if (once) {
            observer.unobserve(target);
          }
        }
      },
      { root, rootMargin, threshold },
    );

    observer.observe(target);

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [onIntersect, once, enabled, root, rootMargin, threshold]);

  return { targetRef, isIntersecting };
}
