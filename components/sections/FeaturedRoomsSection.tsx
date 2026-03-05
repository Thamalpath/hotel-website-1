"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/motion";

interface Room {
  id: string;
  name: string;
  tagline: string;
  sqm: string;
  floor: string;
  price: string;
  features: string[];
  img: string;
  alt: string;
}

const ROOMS: Room[] = [
  {
    id: "deluxe-king",
    name: "Deluxe King",
    tagline: "City views, elevated comfort",
    sqm: "48 m²",
    floor: "Floors 8–20",
    price: "from $680 / night",
    features: ["King Bed", "City Panorama", "Marble Bath", "Nespresso"],
    img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
    alt: "Aurum Hotel Deluxe King — king-size bed with panoramic city skyline",
  },
  {
    id: "grand-suite",
    name: "Grand Suite",
    tagline: "Where space meets splendour",
    sqm: "88 m²",
    floor: "Floors 22–35",
    price: "from $1,480 / night",
    features: ["Living Room", "Soaking Tub", "Butler Service", "Bar"],
    img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80",
    alt: "Aurum Hotel Grand Suite — vast living area with floor-to-ceiling windows",
  },
  {
    id: "penthouse",
    name: "Penthouse",
    tagline: "The pinnacle of Manhattan",
    sqm: "220 m²",
    floor: "Floor 52",
    price: "from $6,800 / night",
    features: ["Private Terrace", "360° Views", "Chef Kitchen", "Cinema"],
    img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    alt: "Aurum Hotel Penthouse — sweeping Manhattan skyline from private terrace",
  },
  {
    id: "spa-suite",
    name: "Spa Suite",
    tagline: "Wellness woven into every moment",
    sqm: "115 m²",
    floor: "Floors 18–24",
    price: "from $2,200 / night",
    features: ["Private Pool", "Steam Room", "Garden Terrace", "Yoga Deck"],
    img: "https://images.unsplash.com/photo-1540541338537-1220059ddcf4?auto=format&fit=crop&w=800&q=80",
    alt: "Aurum Hotel Spa Suite — private pool and wellness terrace with garden views",
  },
];

/* ── Single room card ─────────────────────────────────────────────────────── */
function RoomCard({ room, index }: { room: Room; index: number }) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: false, amount: 0.2 });

  return (
    <motion.article
      ref={cardRef}
      aria-label={`${room.name} — ${room.price}`}
      itemScope
      itemType="https://schema.org/HotelRoom"
      initial={{ opacity: 0, y: 56 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 56 }}
      transition={{ duration: 1.0, ease: EASE_OUT_EXPO, delay: index * 0.12 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        flexShrink: 0,
        width: "clamp(275px, 28vw, 370px)",
        background: "#0e0d09",
        border: "1px solid",
        borderColor: hovered
          ? "rgba(201,169,110,0.32)"
          : "rgba(201,169,110,0.1)",
        transition: "border-color 0.45s ease",
        cursor: "pointer",
      }}
    >
      {/* Image */}
      <div
        style={{ position: "relative", aspectRatio: "3/2", overflow: "hidden" }}
      >
        <motion.div
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.85, ease: EASE_OUT_EXPO }}
          style={{ position: "absolute", inset: 0 }}
        >
          <Image
            src={room.img}
            alt={room.alt}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 80vw, 30vw"
          />
        </motion.div>
        {/* Image gradient */}
        <motion.div
          animate={{ opacity: hovered ? 0.55 : 0.28 }}
          transition={{ duration: 0.5 }}
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top,#0a0a0a 0%,transparent 60%)",
          }}
        />
        {/* Floor badge */}
        <div
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            background: "rgba(10,10,10,0.72)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(201,169,110,0.18)",
            padding: "5px 11px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 9,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(232,213,170,0.78)",
            }}
          >
            {room.floor}
          </span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "22px 24px 26px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 5,
          }}
        >
          <h3
            itemProp="name"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(20px, 2vw, 26px)",
              fontWeight: 400,
              color: "#f8f4ed",
              letterSpacing: "-0.01em",
            }}
          >
            {room.name}
          </h3>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 10,
              color: "rgba(201,169,110,0.65)",
              paddingTop: 3,
            }}
          >
            {room.sqm}
          </span>
        </div>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 12,
            color: "rgba(248,244,237,0.38)",
            letterSpacing: "0.07em",
            fontStyle: "italic",
            marginBottom: 18,
          }}
        >
          {room.tagline}
        </p>

        {/* Feature tags */}
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            marginBottom: 20,
          }}
          aria-label={`${room.name} amenities`}
        >
          {room.features.map((f) => (
            <li
              key={f}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 9,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(201,169,110,0.62)",
                background: "rgba(201,169,110,0.055)",
                border: "1px solid rgba(201,169,110,0.12)",
                padding: "4px 10px",
              }}
            >
              {f}
            </li>
          ))}
        </ul>

        {/* Price + CTA */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            itemProp="priceRange"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 15,
              fontWeight: 400,
              color: "#c9a96e",
              letterSpacing: "0.02em",
            }}
          >
            {room.price}
          </span>
          <motion.a
            href={`/rooms#${room.id}`}
            aria-label={`View details for ${room.name}`}
            whileHover={{ gap: "12px" }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontFamily: "var(--font-body)",
              fontSize: 9,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(248,244,237,0.48)",
              textDecoration: "none",
            }}
          >
            View Details
            <svg width="16" height="5" viewBox="0 0 16 5" fill="none">
              <path
                d="M0 2.5H14M11 0.5L14 2.5L11 4.5"
                stroke="currentColor"
                strokeWidth="0.7"
              />
            </svg>
          </motion.a>
        </div>
      </div>

      {/* Bottom gold line reveal on hover */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
        style={{
          height: 1,
          transformOrigin: "center",
          background: "linear-gradient(90deg,transparent,#c9a96e,transparent)",
        }}
      />
    </motion.article>
  );
}

/* ═════════════════════════════════════════════════════════════════════════ */
export default function FeaturedRoomsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: false, amount: 0.5 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 1, 1, 0],
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="rooms-heading"
      style={{
        position: "relative",
        background: "#0a0a0a",
        padding: "clamp(80px, 10vw, 150px) 0",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "25%",
          left: "-8%",
          width: "50%",
          height: "60%",
          background:
            "radial-gradient(ellipse,rgba(201,169,110,0.04) 0%,transparent 70%)",
          opacity: bgOpacity,
          pointerEvents: "none",
        }}
      />

      {/* ── Heading row ───────────────────────────────────────────────── */}
      <div className="container" ref={headingRef}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "clamp(44px, 6vw, 80px)",
            flexWrap: "wrap",
            gap: 24,
          }}
        >
          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={
                headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }
              }
              transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginBottom: 18,
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
                Rooms & Suites
              </span>
            </motion.div>

            <h2
              id="rooms-heading"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 300,
                fontSize: "clamp(36px, 5vw, 70px)",
                lineHeight: 1.0,
                letterSpacing: "-0.02em",
                color: "#f8f4ed",
              }}
            >
              {["Spaces Crafted", "for You"].map((line, i) => (
                <span
                  key={line}
                  style={{ display: "block", overflow: "hidden" }}
                >
                  <motion.span
                    style={{ display: "block" }}
                    initial={{ y: "108%", opacity: 0 }}
                    animate={
                      headingInView
                        ? { y: "0%", opacity: 1 }
                        : { y: "108%", opacity: 0 }
                    }
                    transition={{
                      duration: 1.0,
                      ease: EASE_OUT_EXPO,
                      delay: 0.08 + i * 0.14,
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

          <motion.a
            href="/rooms"
            initial={{ opacity: 0, x: 18 }}
            animate={
              headingInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 18 }
            }
            transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.38 }}
            aria-label="Browse all rooms and suites at Aurum Hotel"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontFamily: "var(--font-body)",
              fontSize: 10,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "rgba(201,169,110,0.68)",
              textDecoration: "none",
              paddingBottom: 10,
              borderBottom: "1px solid rgba(201,169,110,0.22)",
            }}
          >
            View All Rooms
            <svg width="18" height="6" viewBox="0 0 18 6" fill="none">
              <path
                d="M0 3H16M13 1L16 3L13 5"
                stroke="currentColor"
                strokeWidth="0.8"
              />
            </svg>
          </motion.a>
        </div>
      </div>

      {/* ── Horizontal scroll rail ─────────────────────────────────────── */}
      <div
        role="list"
        aria-label="Featured rooms and suites"
        style={{
          paddingLeft: "max(16px, calc((100vw - 1440px)/2 + 64px))",
          paddingRight: "clamp(16px, 4vw, 64px)",
          overflowX: "auto",
          display: "flex",
          gap: "clamp(14px, 2vw, 24px)",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          paddingBottom: 4,
        }}
        className="rooms-rail"
      >
        {ROOMS.map((room, i) => (
          <div
            key={room.id}
            style={{ scrollSnapAlign: "start" }}
            role="listitem"
          >
            <RoomCard room={room} index={i} />
          </div>
        ))}
      </div>

      {/* Right fade edge */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          width: "clamp(32px, 7vw, 100px)",
          background: "linear-gradient(to left,#0a0a0a,transparent)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      <style>{`
        .rooms-rail::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
