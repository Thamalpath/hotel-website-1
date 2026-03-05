"use client";

import { useEffect, type ReactNode } from "react";

interface SmoothScrollProps {
  children: ReactNode;
}

/**
 * Initialises Lenis smooth scroll on mount.
 * We dynamically import Lenis to avoid SSR issues.
 */
export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    let lenis: { raf: (time: number) => void; destroy: () => void } | null =
      null;
    let rafId: number;

    async function init() {
      const LenisModule = await import("@studio-freight/lenis");
      const Lenis = LenisModule.default;

      lenis = new Lenis({
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        smoothWheel: true,
        touchMultiplier: 1.8,
      });

      function raf(time: number) {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      }

      rafId = requestAnimationFrame(raf);
    }

    init();

    return () => {
      cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
