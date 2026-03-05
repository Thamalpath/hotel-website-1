"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/motion";

const DISHES = [
  {
    name: "Omakase Tasting",
    desc: "12-course journey through seasonal Japanese ingredients",
    tag: "Michelin ★★",
    price: "$320",
  },
  {
    name: "Côte de Boeuf",
    desc: "Dry-aged prime rib, truffle jus, roasted bone marrow",
    tag: "Chef's Table",
    price: "$148",
  },
  {
    name: "Lobster Bisque",
    desc: "Maine lobster, Cognac cream, caviar, chive oil",
    tag: "Signature",
    price: "$62",
  },
  {
    name: "Grand Soufflé",
    desc: "Valrhona 72% dark chocolate, vanilla bean ice cream",
    tag: "Dessert",
    price: "$38",
  },
];

/* ── Menu item row ────────────────────────────────────────────────────────── */
function DishRow({
  dish,
  index,
  inView,
}: {
  dish: (typeof DISHES)[0];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
      transition={{
        duration: 0.9,
        ease: EASE_OUT_EXPO,
        delay: 0.3 + index * 0.11,
      }}
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        padding: "22px 0",
        gap: 16,
        borderBottom: "1px solid rgba(201,169,110,0.09)",
      }}
      itemScope
      itemType="https://schema.org/MenuItem"
    >
      <div style={{ flex: 1 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 7,
          }}
        >
          <h3
            itemProp="name"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(18px, 2vw, 24px)",
              fontWeight: 400,
              color: "#f8f4ed",
              letterSpacing: "-0.01em",
            }}
          >
            {dish.name}
          </h3>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 8,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#c9a96e",
              background: "rgba(201,169,110,0.08)",
              border: "1px solid rgba(201,169,110,0.18)",
              padding: "3px 9px",
              whiteSpace: "nowrap",
            }}
          >
            {dish.tag}
          </span>
        </div>
        <p
          itemProp="description"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 12,
            color: "rgba(248,244,237,0.42)",
            lineHeight: 1.6,
            maxWidth: 340,
          }}
        >
          {dish.desc}
        </p>
      </div>
      <span
        itemProp="offers"
        itemScope
        itemType="https://schema.org/Offer"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(16px, 1.5vw, 20px)",
          fontWeight: 300,
          color: "rgba(201,169,110,0.75)",
          whiteSpace: "nowrap",
          paddingTop: 2,
        }}
      >
        <meta itemProp="price" content={dish.price.replace("$", "")} />
        {dish.price}
      </span>
    </motion.div>
  );
}

/* ═════════════════════════════════════════════════════════════════════════ */
export default function DiningSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const rightInView = useInView(rightRef, { once: false, amount: 0.2 });
  const imageInView = useInView(imageRef, { once: false, amount: 0.15 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const clipReveal = useTransform(
    scrollYProgress,
    [0.05, 0.35],
    ["0%", "100%"],
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="dining-heading"
      itemScope
      itemType="https://schema.org/Restaurant"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#080807",
      }}
    >
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
        className="dining-grid"
      >
        {/* ── LEFT: Full-bleed image ─────────────────────────────────── */}
        <div
          ref={imageRef}
          style={{
            position: "relative",
            overflow: "hidden",
            minHeight: "clamp(480px, 70vh, 900px)",
          }}
          aria-hidden="true"
        >
          {/* Clip reveal from bottom */}
          <motion.div
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={
              imageInView
                ? { clipPath: "inset(0% 0 0 0)" }
                : { clipPath: "inset(100% 0 0 0)" }
            }
            transition={{ duration: 1.4, ease: EASE_OUT_EXPO }}
            style={{ position: "absolute", inset: 0 }}
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
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=85"
                alt="Aurum Hotel fine dining — beautifully plated Michelin-starred cuisine"
                fill
                style={{ objectFit: "cover", objectPosition: "center 30%" }}
                sizes="50vw"
              />
            </motion.div>
            {/* Dark right-side vignette for text legibility */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to right,transparent 60%,#080807 100%)",
                zIndex: 2,
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom,rgba(8,8,7,0.2) 0%,rgba(8,8,7,0.5) 100%)",
                zIndex: 2,
              }}
            />
          </motion.div>

          {/* Floating restaurant label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={imageInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.9 }}
            style={{
              position: "absolute",
              bottom: 40,
              left: 36,
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 9,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "rgba(201,169,110,0.65)",
              }}
            >
              Aurum Hotel
            </span>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 3vw, 40px)",
                fontWeight: 300,
                color: "#f8f4ed",
                letterSpacing: "-0.01em",
              }}
            >
              Le Sommet
            </span>
            <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
              {["★★", "Michelin Guide"].map((t, i) => (
                <span
                  key={t}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 9,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: i === 0 ? "#c9a96e" : "rgba(248,244,237,0.45)",
                    background: "rgba(10,10,10,0.65)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(201,169,110,0.2)",
                    padding: "4px 10px",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── RIGHT: Menu items ──────────────────────────────────────── */}
        <div
          ref={rightRef}
          style={{
            padding: "clamp(56px, 8vw, 110px) clamp(32px, 5vw, 80px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={rightInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 28 }}
            transition={{ duration: 0.85, ease: EASE_OUT_EXPO }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 28,
            }}
          >
            <div style={{ width: 28, height: 1, background: "#c9a96e" }} />
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 10,
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "#c9a96e",
              }}
            >
              Fine Dining
            </span>
          </motion.div>

          <h2
            id="dining-heading"
            itemProp="name"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "clamp(36px, 4.5vw, 68px)",
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              color: "#f8f4ed",
              marginBottom: "clamp(28px, 4vw, 44px)",
            }}
          >
            {["Taste the", "Extraordinary"].map((line, i) => (
              <span key={line} style={{ display: "block", overflow: "hidden" }}>
                <motion.span
                  style={{ display: "block" }}
                  initial={{ y: "108%", opacity: 0 }}
                  animate={
                    rightInView
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

          {/* Dish list */}
          <div role="list" aria-label="Signature dishes">
            {DISHES.map((dish, i) => (
              <DishRow
                key={dish.name}
                dish={dish}
                index={i}
                inView={rightInView}
              />
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={rightInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.78 }}
            style={{
              marginTop: 36,
              display: "flex",
              gap: 20,
              flexWrap: "wrap",
            }}
          >
            <a
              href="/dining"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "13px 32px",
                background:
                  "linear-gradient(105deg,#9a7a4a,#c9a96e 40%,#e8d5aa 60%,#c9a96e 80%,#9a7a4a)",
                backgroundSize: "200% auto",
                fontFamily: "var(--font-body)",
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#0a0a0a",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Reserve a Table
            </a>
            <a
              href="/dining"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                fontFamily: "var(--font-body)",
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(201,169,110,0.65)",
                textDecoration: "none",
                borderBottom: "1px solid rgba(201,169,110,0.22)",
                paddingBottom: 2,
              }}
            >
              View Full Menu
            </a>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .dining-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
