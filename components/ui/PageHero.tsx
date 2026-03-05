"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/motion";

interface PageHeroProps {
  eyebrow: string;
  title: string[]; // each string is one animated line
  accentIdx?: number; // which line gets gold italic treatment
  subtitle?: string;
  image: string;
  imageAlt: string;
}

export default function PageHero({
  eyebrow,
  title,
  accentIdx = 1,
  subtitle,
  image,
  imageAlt,
}: PageHeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const slideUp = useTransform(scrollYProgress, [0, 0.5], ["0%", "-12%"]);

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        height: "clamp(440px, 56vh, 680px)",
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      {/* Parallax background */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          y: imgY,
          height: "130%",
          top: "-15%",
        }}
      >
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center" }}
          sizes="100vw"
        />
      </motion.div>

      {/* Layered overlays */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(10,10,10,0.35) 0%, rgba(10,10,10,0.15) 35%, rgba(10,10,10,0.72) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(10,10,10,0.45) 0%, transparent 60%)",
        }}
      />

      {/* Animated content */}
      <motion.div
        style={{
          y: slideUp,
          opacity: fadeOut,
          position: "relative",
          zIndex: 10,
          width: "100%",
        }}
      >
        <div
          className="container"
          style={{ paddingBottom: "clamp(48px,5vw,72px)" }}
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.2 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                width: 32,
                height: 1,
                background: "linear-gradient(to right, #c9a96e, transparent)",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 10,
                letterSpacing: "0.36em",
                textTransform: "uppercase",
                color: "#c9a96e",
              }}
            >
              {eyebrow}
            </span>
          </motion.div>

          {/* Title lines */}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "clamp(44px, 6.5vw, 100px)",
              lineHeight: 0.96,
              letterSpacing: "-0.02em",
              color: "#f8f4ed",
              marginBottom: subtitle ? 20 : 0,
            }}
          >
            {title.map((line, i) => (
              <span key={i} style={{ display: "block", overflow: "hidden" }}>
                <motion.span
                  style={{ display: "block" }}
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    duration: 1.05,
                    ease: EASE_OUT_EXPO,
                    delay: 0.35 + i * 0.13,
                  }}
                >
                  {i === accentIdx ? (
                    <em style={{ fontStyle: "italic", color: "#c9a96e" }}>
                      {line}
                    </em>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Optional subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.7 }}
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 300,
                fontSize: "clamp(13px, 1.3vw, 16px)",
                color: "rgba(248,244,237,0.58)",
                lineHeight: 1.7,
                maxWidth: 520,
                marginTop: 16,
              }}
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </motion.div>

      {/* Bottom fade into page */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: -1,
          left: 0,
          right: 0,
          height: 80,
          background: "linear-gradient(to bottom, transparent, #0a0a0a)",
          zIndex: 11,
        }}
      />
    </div>
  );
}
