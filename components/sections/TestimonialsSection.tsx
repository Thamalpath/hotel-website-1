"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/motion";

const TESTIMONIALS = [
  {
    quote:
      "A sanctuary that redefines the meaning of luxury. Every moment at Aurum felt like a scene from a dream — the kind you never want to wake from.",
    author: "Isabella Fontaine",
    role: "Editor-in-Chief, Maison Magazine",
    stays: "4 stays",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    rating: 5,
  },
  {
    quote:
      "From the moment the car pulled up to the portico, I knew this was different. The concierge remembered my tea preference from two years prior. Extraordinary.",
    author: "Dr. Rajan Mehta",
    role: "International Finance, Singapore",
    stays: "12 stays",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5,
  },
  {
    quote:
      "We celebrated our anniversary in the Penthouse. The private chef, the terrace — every detail was choreographed to perfection. Truly unparalleled.",
    author: "Claire & James Harwood",
    role: "London, United Kingdom",
    stays: "7 stays",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
    rating: 5,
  },
];

/* ── Marquee logos strip ─────────────────────────────────────────────────── */
const PRESS = [
  "Condé Nast",
  "Forbes Travel",
  "The Times",
  "Architectural Digest",
  "Vogue Living",
  "Town & Country",
  "Wallpaper*",
  "Harper's Bazaar",
];

function MarqueeStrip() {
  return (
    <div
      style={{
        overflow: "hidden",
        borderTop: "1px solid rgba(201,169,110,0.1)",
        borderBottom: "1px solid rgba(201,169,110,0.1)",
        padding: "18px 0",
        background: "rgba(201,169,110,0.02)",
      }}
      aria-label="As featured in"
      role="region"
    >
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        style={{ display: "flex", gap: 0, width: "max-content" }}
      >
        {[...PRESS, ...PRESS].map((name, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 0,
              padding: "0 48px",
              borderRight: "1px solid rgba(201,169,110,0.08)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(13px, 1.3vw, 17px)",
                fontWeight: 400,
                color: "rgba(201,169,110,0.38)",
                letterSpacing: "0.08em",
                whiteSpace: "nowrap",
              }}
            >
              {name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ── Star row ─────────────────────────────────────────────────────────────── */
function Stars({ count, inView }: { count: number; inView: boolean }) {
  return (
    <div
      style={{ display: "flex", gap: 4 }}
      aria-label={`${count} out of 5 stars`}
      role="img"
    >
      {Array.from({ length: count }).map((_, i) => (
        <motion.svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          initial={{ opacity: 0, scale: 0, rotate: -30 }}
          animate={
            inView
              ? { opacity: 1, scale: 1, rotate: 0 }
              : { opacity: 0, scale: 0, rotate: -30 }
          }
          transition={{
            duration: 0.5,
            ease: EASE_OUT_EXPO,
            delay: 0.4 + i * 0.07,
          }}
        >
          <path
            d="M7 1l1.545 3.09L12 4.635l-2.5 2.41.59 3.41L7 8.885l-3.09 1.57.59-3.41L2 4.635l3.455-.545L7 1z"
            fill="#c9a96e"
          />
        </motion.svg>
      ))}
    </div>
  );
}

/* ═════════════════════════════════════════════════════════════════════════ */
export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const contentInView = useInView(contentRef, { once: false, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgShift = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);

  const current = TESTIMONIALS[active];

  return (
    <section
      ref={sectionRef}
      aria-labelledby="testimonials-heading"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#0c0b08",
        padding: "clamp(80px, 10vw, 148px) 0 0",
      }}
    >
      {/* Parallax background texture */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          y: bgShift,
          background:
            "radial-gradient(ellipse 80% 60% at 70% 40%, rgba(201,169,110,0.045) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Large italic watermark */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "10%",
          right: "-4%",
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontSize: "clamp(120px, 18vw, 280px)",
          fontWeight: 300,
          color: "rgba(201,169,110,0.022)",
          lineHeight: 1,
          pointerEvents: "none",
          userSelect: "none",
          letterSpacing: "-0.04em",
        }}
      >
        Guests
      </div>

      <div className="container" ref={contentRef}>
        {/* ── Section label + heading ────────────────────────────────── */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "clamp(52px, 7vw, 88px)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={
              contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }
            }
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
                width: 40,
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
              Guest Stories
            </span>
            <div
              style={{
                width: 40,
                height: 1,
                background: "linear-gradient(to left,transparent,#c9a96e)",
              }}
            />
          </motion.div>

          <h2
            id="testimonials-heading"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "clamp(36px, 5vw, 72px)",
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              color: "#f8f4ed",
            }}
          >
            {["Words from", "Our Guests"].map((line, i) => (
              <span key={line} style={{ display: "block", overflow: "hidden" }}>
                <motion.span
                  style={{ display: "block" }}
                  initial={{ y: "108%", opacity: 0 }}
                  animate={
                    contentInView
                      ? { y: "0%", opacity: 1 }
                      : { y: "108%", opacity: 0 }
                  }
                  transition={{
                    duration: 1.0,
                    ease: EASE_OUT_EXPO,
                    delay: 0.1 + i * 0.13,
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
        </div>

        {/* ── Testimonial card ──────────────────────────────────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: "clamp(32px, 5vw, 80px)",
            alignItems: "start",
            maxWidth: 1000,
            margin: "0 auto",
            marginBottom: "clamp(48px, 6vw, 72px)",
          }}
          className="testi-card"
        >
          {/* Avatar */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`avatar-${active}`}
              initial={{ opacity: 0, scale: 0.88, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.92, x: -10 }}
              transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  width: "clamp(72px, 8vw, 96px)",
                  height: "clamp(72px, 8vw, 96px)",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "1px solid rgba(201,169,110,0.3)",
                  flexShrink: 0,
                  position: "relative",
                }}
              >
                <Image
                  src={current.avatar}
                  alt={`Portrait of ${current.author}`}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="96px"
                />
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 9,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "rgba(201,169,110,0.5)",
                }}
              >
                {current.stays}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Quote + byline */}
          <div>
            <Stars count={current.rating} inView={contentInView} />

            <AnimatePresence mode="wait">
              <motion.blockquote
                key={`quote-${active}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
                itemProp="review"
                itemScope
                itemType="https://schema.org/Review"
                style={{ margin: 0 }}
              >
                <p
                  itemProp="reviewBody"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(18px, 2.4vw, 30px)",
                    fontWeight: 300,
                    fontStyle: "italic",
                    lineHeight: 1.55,
                    letterSpacing: "0.005em",
                    color: "rgba(248,244,237,0.88)",
                    marginTop: 16,
                    marginBottom: 24,
                  }}
                >
                  &ldquo;{current.quote}&rdquo;
                </p>
                <footer>
                  <div
                    itemProp="author"
                    itemScope
                    itemType="https://schema.org/Person"
                  >
                    <span
                      itemProp="name"
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 13,
                        fontWeight: 500,
                        color: "#f8f4ed",
                        letterSpacing: "0.05em",
                        display: "block",
                      }}
                    >
                      {current.author}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 11,
                      color: "rgba(248,244,237,0.38)",
                      letterSpacing: "0.07em",
                      display: "block",
                      marginTop: 3,
                    }}
                  >
                    {current.role}
                  </span>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Navigation dots ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={contentInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 10,
            paddingBottom: "clamp(52px, 7vw, 80px)",
          }}
          role="tablist"
          aria-label="Testimonial navigation"
        >
          {TESTIMONIALS.map((t, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={active === i}
              aria-label={`Testimonial from ${t.author}`}
              onClick={() => setActive(i)}
              style={{
                background: "none",
                border: "none",
                padding: 4,
                cursor: "pointer",
              }}
            >
              <motion.div
                animate={{
                  width: active === i ? 28 : 6,
                  background:
                    active === i ? "#c9a96e" : "rgba(201,169,110,0.28)",
                }}
                transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                style={{ height: 1, borderRadius: 99 }}
              />
            </button>
          ))}
        </motion.div>
      </div>

      {/* ── Press marquee ─────────────────────────────────────────────── */}
      <MarqueeStrip />

      <style>{`
        @media (max-width: 640px) {
          .testi-card { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
