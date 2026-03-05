"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/motion";

export default function BookingBannerSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(innerRef, { once: false, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const scale = useTransform(scrollYProgress, [0, 0.4, 1], [1.06, 1, 1.06]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.3, 0.7, 0.7, 0.3],
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="booking-heading"
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "clamp(72px, 9vw, 130px) 0",
        background: "#080807",
      }}
    >
      {/* ── Parallax background image ──────────────────────────────── */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          y: bgY,
          scale,
          backgroundImage:
            "url(https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1800&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center 60%",
          opacity,
        }}
      />

      {/* Overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(8,8,7,0.65) 0%, rgba(8,8,7,0.55) 50%, rgba(8,8,7,0.75) 100%)",
          zIndex: 1,
        }}
      />

      {/* Side vignettes */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(to right, rgba(8,8,7,0.5) 0%, transparent 30%, transparent 70%, rgba(8,8,7,0.5) 100%)",
        }}
      />

      <div
        className="container"
        style={{ position: "relative", zIndex: 2 }}
        ref={innerRef}
      >
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.85, ease: EASE_OUT_EXPO }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                width: 36,
                height: 1,
                background: "linear-gradient(to right,transparent,#c9a96e)",
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
              Reserve Your Stay
            </span>
            <div
              style={{
                width: 36,
                height: 1,
                background: "linear-gradient(to left,transparent,#c9a96e)",
              }}
            />
          </motion.div>

          {/* Headline */}
          <h2
            id="booking-heading"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "clamp(42px, 6vw, 96px)",
              lineHeight: 0.96,
              letterSpacing: "-0.02em",
              color: "#f8f4ed",
              marginBottom: "clamp(36px, 5vw, 56px)",
            }}
          >
            {["Begin Your", "Journey"].map((line, i) => (
              <span key={line} style={{ display: "block", overflow: "hidden" }}>
                <motion.span
                  style={{ display: "block" }}
                  initial={{ y: "110%", opacity: 0 }}
                  animate={
                    inView ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }
                  }
                  transition={{
                    duration: 1.0,
                    ease: EASE_OUT_EXPO,
                    delay: 0.1 + i * 0.14,
                  }}
                >
                  {i === 1 ? (
                    <span className="gold-shimmer">{line}</span>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h2>

          {/* Booking bar */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
            transition={{ duration: 1.0, ease: EASE_OUT_EXPO, delay: 0.38 }}
            style={{
              display: "flex",
              flexWrap: "wrap",
              background: "rgba(10,10,8,0.82)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(201,169,110,0.2)",
              overflow: "hidden",
            }}
            className="booking-bar"
          >
            {[
              {
                label: "Check-In",
                placeholder: "dd / mm / yyyy",
                type: "text",
                icon: "→",
              },
              {
                label: "Check-Out",
                placeholder: "dd / mm / yyyy",
                type: "text",
                icon: "←",
              },
              {
                label: "Guests",
                placeholder: "2 Adults",
                type: "text",
                icon: "◇",
              },
            ].map((field, i) => (
              <div
                key={field.label}
                style={{
                  flex: "1 1 160px",
                  padding: "20px 24px",
                  borderRight:
                    i < 2 ? "1px solid rgba(201,169,110,0.1)" : "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                <label
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 9,
                    letterSpacing: "0.24em",
                    textTransform: "uppercase",
                    color: "rgba(201,169,110,0.65)",
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                  }}
                >
                  <span style={{ fontSize: 11 }}>{field.icon}</span>
                  {field.label}
                </label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  aria-label={field.label}
                  style={{
                    background: "none",
                    border: "none",
                    outline: "none",
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    color: "#f8f4ed",
                    width: "100%",
                  }}
                />
              </div>
            ))}

            {/* CTA button */}
            <motion.button
              whileHover={{
                backgroundPosition: "right center",
                boxShadow: "0 8px 32px rgba(201,169,110,0.32)",
              }}
              transition={{ duration: 0.4 }}
              aria-label="Check room availability"
              style={{
                flex: "0 0 auto",
                padding: "0 40px",
                background:
                  "linear-gradient(105deg,#9a7a4a,#c9a96e 40%,#e8d5aa 60%,#c9a96e 80%,#9a7a4a)",
                backgroundSize: "200% auto",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-body)",
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#0a0a0a",
                fontWeight: 500,
                minHeight: 64,
              }}
            >
              Check Availability
            </motion.button>
          </motion.div>

          {/* Fine print */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 11,
              color: "rgba(248,244,237,0.28)",
              marginTop: 18,
              letterSpacing: "0.06em",
            }}
          >
            Best rate guaranteed · Free cancellation up to 48 hours ·
            Complimentary welcome amenities
          </motion.p>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .booking-bar { flex-direction: column !important; }
          .booking-bar > div { border-right: none !important; border-bottom: 1px solid rgba(201,169,110,0.1); }
          .booking-bar button { min-height: 52px !important; padding: 16px !important; width: 100% !important; }
        }
      `}</style>
    </section>
  );
}
