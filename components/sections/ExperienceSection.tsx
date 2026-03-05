"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/motion";

function Ornament() {
  return (
    <svg
      width="130"
      height="14"
      viewBox="0 0 130 14"
      fill="none"
      aria-hidden="true"
    >
      <line
        x1="0"
        y1="7"
        x2="46"
        y2="7"
        stroke="#c9a96e"
        strokeWidth="0.5"
        strokeOpacity="0.45"
      />
      <polygon
        points="52,7 58,1 64,7 58,13"
        stroke="#c9a96e"
        strokeWidth="0.75"
        fill="none"
      />
      <polygon
        points="58,7 62,3 66,7 62,11"
        stroke="#c9a96e"
        strokeWidth="0.5"
        fill="rgba(201,169,110,0.12)"
      />
      <line
        x1="72"
        y1="7"
        x2="118"
        y2="7"
        stroke="#c9a96e"
        strokeWidth="0.5"
        strokeOpacity="0.45"
      />
      <circle cx="65" cy="7" r="1.4" fill="#c9a96e" />
    </svg>
  );
}

function StatBadge({
  value,
  label,
  delay,
}: {
  value: string;
  label: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.5 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.92 }}
      animate={
        inView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 20, scale: 0.92 }
      }
      transition={{ duration: 0.85, ease: EASE_OUT_EXPO, delay }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "18px 22px",
        background: "rgba(201,169,110,0.05)",
        border: "1px solid rgba(201,169,110,0.18)",
        backdropFilter: "blur(10px)",
        minWidth: 100,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(24px, 2.6vw, 36px)",
          fontWeight: 300,
          color: "#c9a96e",
          lineHeight: 1,
          letterSpacing: "-0.02em",
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 9,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "rgba(248,244,237,0.42)",
          marginTop: 8,
          textAlign: "center",
          lineHeight: 1.5,
          whiteSpace: "pre-line",
        }}
      >
        {label}
      </span>
    </motion.div>
  );
}

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const textInView = useInView(textRef, { once: false, amount: 0.25 });
  const imageInView = useInView(imageRef, { once: false, amount: 0.2 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const textX = useTransform(scrollYProgress, [0, 1], ["-2%", "2%"]);
  const lineScl = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const pillData = [
    { value: "25+", label: "Years of\nExcellence" },
    { value: "180", label: "Bespoke\nSuites" },
    { value: "5★", label: "Forbes\nRating" },
    { value: "24/7", label: "Concierge\nService" },
  ];

  const bodyParagraphs = [
    "Nestled in the heart of Manhattan, Aurum Hotel has been the sanctuary of discerning travellers since 1999. Every detail — from hand-woven linens to single-origin morning coffee — is curated to transcend expectation.",
    "We don't simply host guests — we compose experiences that linger long after departure, woven from the finest threads of architecture, gastronomy, and genuine human warmth.",
  ];

  return (
    <section
      ref={sectionRef}
      aria-labelledby="experience-heading"
      itemScope
      itemType="https://schema.org/LodgingBusiness"
      style={{
        position: "relative",
        background:
          "linear-gradient(175deg,#0a0a0a 0%,#0f0e09 55%,#0a0a0a 100%)",
        overflow: "hidden",
        padding: "clamp(96px, 11vw, 180px) 0",
      }}
    >
      {/* Scroll-driven top rule */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: "8%",
          right: "8%",
          height: 1,
          background:
            "linear-gradient(90deg,transparent,rgba(201,169,110,0.28),transparent)",
          scaleX: lineScl,
          transformOrigin: "left",
        }}
      />

      {/* Ghost watermark */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          fontSize: "clamp(140px, 20vw, 360px)",
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          color: "rgba(201,169,110,0.017)",
          letterSpacing: "-0.05em",
          lineHeight: 1,
          pointerEvents: "none",
          userSelect: "none",
          whiteSpace: "nowrap",
        }}
      >
        AURUM
      </div>

      <div className="container">
        <div
          className="exp-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(48px, 8vw, 120px)",
            alignItems: "center",
          }}
        >
          {/* ── LEFT: Text ────────────────────────────────────────────── */}
          <motion.div ref={textRef} style={{ x: textX }}>
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              animate={
                textInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -28 }
              }
              transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginBottom: 30,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 1,
                  background: "linear-gradient(to right,#c9a96e,transparent)",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 10,
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color: "#c9a96e",
                }}
              >
                The Aurum Experience
              </span>
            </motion.div>

            <h2
              id="experience-heading"
              itemProp="name"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 300,
                fontSize: "clamp(40px, 5.2vw, 76px)",
                lineHeight: 1.0,
                letterSpacing: "-0.02em",
                color: "#f8f4ed",
                marginBottom: 8,
              }}
            >
              {["A Legacy", "of Timeless", "Refinement"].map((line, i) => (
                <span
                  key={line}
                  style={{ display: "block", overflow: "hidden" }}
                >
                  <motion.span
                    style={{ display: "block" }}
                    initial={{ y: "108%", opacity: 0 }}
                    animate={
                      textInView
                        ? { y: "0%", opacity: 1 }
                        : { y: "108%", opacity: 0 }
                    }
                    transition={{
                      duration: 1.0,
                      ease: EASE_OUT_EXPO,
                      delay: 0.08 + i * 0.13,
                    }}
                  >
                    {i === 1 ? (
                      <em style={{ fontStyle: "italic", color: "#c9a96e" }}>
                        {line}
                      </em>
                    ) : (
                      line
                    )}
                  </motion.span>
                </span>
              ))}
            </h2>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={
                textInView
                  ? { opacity: 1, scaleX: 1 }
                  : { opacity: 0, scaleX: 0 }
              }
              transition={{ duration: 1.1, ease: EASE_OUT_EXPO, delay: 0.46 }}
              style={{
                transformOrigin: "left",
                marginBottom: 34,
                marginTop: 18,
              }}
            >
              <Ornament />
            </motion.div>

            {bodyParagraphs.map((para, i) => (
              <motion.p
                key={i}
                itemProp={i === 0 ? "description" : undefined}
                initial={{ opacity: 0, y: 26 }}
                animate={
                  textInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 }
                }
                transition={{
                  duration: 0.9,
                  ease: EASE_OUT_EXPO,
                  delay: 0.44 + i * 0.14,
                }}
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 300,
                  fontSize: "clamp(13.5px, 1.25vw, 15.5px)",
                  lineHeight: 1.88,
                  color: "rgba(248,244,237,0.56)",
                  marginBottom: i === 0 ? 18 : 44,
                  maxWidth: 460,
                }}
              >
                {para}
              </motion.p>
            ))}

            <motion.a
              href="/about"
              initial={{ opacity: 0, y: 14 }}
              animate={
                textInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }
              }
              transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.72 }}
              aria-label="Discover the story of Aurum Hotel"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 14,
                fontFamily: "var(--font-body)",
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#c9a96e",
                textDecoration: "none",
              }}
            >
              <span>Discover Our Story</span>
              <motion.span
                animate={{ x: [0, 6, 0] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ display: "inline-flex" }}
              >
                <svg width="26" height="8" viewBox="0 0 26 8" fill="none">
                  <path
                    d="M0 4H24M20 1L24 4L20 7"
                    stroke="#c9a96e"
                    strokeWidth="0.75"
                  />
                </svg>
              </motion.span>
            </motion.a>
          </motion.div>

          {/* ── RIGHT: Parallax image + floating badges ───────────────── */}
          <div style={{ position: "relative" }} ref={imageRef}>
            <motion.div
              initial={{ opacity: 0, scale: 1.04 }}
              animate={
                imageInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 1.04 }
              }
              transition={{ duration: 1.4, ease: EASE_OUT_EXPO }}
              style={{
                position: "relative",
                overflow: "hidden",
                aspectRatio: "4/5",
                boxShadow:
                  "0 40px 100px rgba(0,0,0,0.65), 0 0 0 1px rgba(201,169,110,0.1)",
              }}
            >
              <motion.div
                style={{
                  y: imageY,
                  position: "absolute",
                  inset: 0,
                  height: "115%",
                  top: "-7.5%",
                }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=900&q=85"
                  alt="Aurum Hotel — elegantly furnished suite interior with panoramic city views"
                  fill
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  sizes="(max-width: 900px) 100vw, 50vw"
                  priority
                />
              </motion.div>
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 2,
                  background:
                    "linear-gradient(180deg,transparent 55%,rgba(10,10,10,0.55) 100%)",
                }}
              />
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 18,
                  zIndex: 3,
                  border: "1px solid rgba(201,169,110,0.1)",
                  pointerEvents: "none",
                }}
              />
            </motion.div>

            {/* Floating stat badges */}
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              animate={
                imageInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -28 }
              }
              transition={{ duration: 1.0, ease: EASE_OUT_EXPO, delay: 0.52 }}
              className="stat-pills"
              style={{
                position: "absolute",
                bottom: -28,
                left: -32,
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 7,
                zIndex: 10,
              }}
            >
              {pillData.map((p, i) => (
                <StatBadge
                  key={p.label}
                  value={p.value}
                  label={p.label}
                  delay={0.58 + i * 0.1}
                />
              ))}
            </motion.div>

            {/* Decorative vertical rule */}
            <motion.div
              aria-hidden="true"
              initial={{ scaleY: 0 }}
              animate={imageInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1.3, ease: EASE_OUT_EXPO, delay: 0.3 }}
              style={{
                position: "absolute",
                top: "12%",
                right: -18,
                width: 1,
                height: "56%",
                background:
                  "linear-gradient(to bottom,transparent,rgba(201,169,110,0.38),transparent)",
                transformOrigin: "top",
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .exp-grid { grid-template-columns: 1fr !important; }
          .stat-pills { position:relative !important; bottom:auto !important; left:auto !important; margin-top:20px; grid-template-columns:repeat(4,1fr) !important; gap:6px !important; }
        }
        @media (max-width: 560px) {
          .stat-pills { grid-template-columns:repeat(2,1fr) !important; }
        }
      `}</style>
    </section>
  );
}
