import type { Variants } from "framer-motion";

/* ─── Easing presets ────────────────────────────────────────────────────────── */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.4, 0, 0.2, 1] as const;
export const EASE_SPRING = [0.34, 1.56, 0.64, 1] as const;

/* ─── Fade up ───────────────────────────────────────────────────────────────── */
export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: EASE_OUT_EXPO,
      delay,
    },
  }),
};

/* ─── Fade in ───────────────────────────────────────────────────────────────── */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.8, ease: EASE_IN_OUT, delay },
  }),
};

/* ─── Slide in from left ────────────────────────────────────────────────────── */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: EASE_OUT_EXPO, delay },
  }),
};

/* ─── Slide in from right ───────────────────────────────────────────────────── */
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: EASE_OUT_EXPO, delay },
  }),
};

/* ─── Scale up ──────────────────────────────────────────────────────────────── */
export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 1.0, ease: EASE_OUT_EXPO, delay },
  }),
};

/* ─── Stagger container ─────────────────────────────────────────────────────── */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

/* ─── Reveal line (text mask) ───────────────────────────────────────────────── */
export const revealLine: Variants = {
  hidden: { y: "110%", opacity: 0 },
  visible: (delay = 0) => ({
    y: "0%",
    opacity: 1,
    transition: { duration: 1.0, ease: EASE_OUT_EXPO, delay },
  }),
};

/* ─── Draw line ─────────────────────────────────────────────────────────────── */
export const drawLine: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: (delay = 0) => ({
    scaleX: 1,
    transition: { duration: 1.2, ease: EASE_OUT_EXPO, delay },
  }),
};

/* ─── Nav glassmorphism ─────────────────────────────────────────────────────── */
export const navGlass = {
  transparent: {
    backgroundColor: "rgba(10, 10, 10, 0)",
    backdropFilter: "blur(0px)",
    borderBottomColor: "rgba(201, 169, 110, 0)",
    boxShadow: "none",
  },
  glass: {
    backgroundColor: "rgba(10, 10, 10, 0.72)",
    backdropFilter: "blur(24px)",
    borderBottomColor: "rgba(201, 169, 110, 0.15)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
  },
};

/* ─── Mobile menu ───────────────────────────────────────────────────────────── */
export const mobileMenu: Variants = {
  closed: {
    opacity: 0,
    y: -20,
    pointerEvents: "none" as const,
    transition: { duration: 0.3, ease: EASE_IN_OUT },
  },
  open: {
    opacity: 1,
    y: 0,
    pointerEvents: "auto" as const,
    transition: { duration: 0.4, ease: EASE_OUT_EXPO },
  },
};

export const mobileMenuItem: Variants = {
  closed: { opacity: 0, x: -20 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: EASE_OUT_EXPO, delay: i * 0.07 },
  }),
};
