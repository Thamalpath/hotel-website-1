"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { fadeUp } from "@/lib/motion";

interface ScrollRevealProps {
  children: ReactNode;
  variants?: Variants;
  delay?: number;
  className?: string;
  once?: boolean;
  threshold?: number;
}

export default function ScrollReveal({
  children,
  variants = fadeUp,
  delay = 0,
  className,
  once = true,
  threshold = 0.15,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount: threshold });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      custom={delay}
      className={className}
    >
      {children}
    </motion.div>
  );
}
