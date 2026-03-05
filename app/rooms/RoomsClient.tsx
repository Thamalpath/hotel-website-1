"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import { FadeUp, SlideLeft, SlideRight, FadeIn } from "@/components/ui/Reveal";
import { EASE_OUT_EXPO } from "@/lib/motion";

const FILTERS = ["All", "Rooms", "Suites", "Penthouse"];

const ROOMS = [
  {
    id: "deluxe-king",
    category: "Rooms",
    name: "Deluxe King",
    tagline: "City views, elevated comfort",
    sqm: "48 m²",
    floor: "Floors 8–20",
    price: "$680",
    features: [
      "King Bed",
      "City Panorama",
      "Marble Bath",
      "Nespresso",
      "Smart TV",
      "Mini Bar",
    ],
    img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=80",
    alt: "Aurum Deluxe King — plush king-size bed with panoramic Manhattan skyline",
  },
  {
    id: "deluxe-twin",
    category: "Rooms",
    name: "Deluxe Twin",
    tagline: "Dual elegance, singular luxury",
    sqm: "44 m²",
    floor: "Floors 8–18",
    price: "$620",
    features: [
      "Twin Beds",
      "City View",
      "Rain Shower",
      "Nespresso",
      "Writing Desk",
      "Bathrobe",
    ],
    img: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=900&q=80",
    alt: "Aurum Deluxe Twin — twin beds with elegant city outlook",
  },
  {
    id: "junior-suite",
    category: "Suites",
    name: "Junior Suite",
    tagline: "Where space becomes sanctuary",
    sqm: "68 m²",
    floor: "Floors 16–28",
    price: "$1,100",
    features: [
      "King Bed",
      "Sitting Area",
      "Soaking Tub",
      "Butler Call",
      "Mini Bar",
      "Walk-in Wardrobe",
    ],
    img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80",
    alt: "Aurum Junior Suite — open-plan living with soaking tub and city views",
  },
  {
    id: "grand-suite",
    category: "Suites",
    name: "Grand Suite",
    tagline: "Lavish living, flawless service",
    sqm: "88 m²",
    floor: "Floors 22–35",
    price: "$1,480",
    features: [
      "Separate Living",
      "Soaking Tub",
      "Butler 24/7",
      "Private Bar",
      "Dining Table",
      "Rain Shower",
    ],
    img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=900&q=80",
    alt: "Aurum Grand Suite — sweeping living area with floor-to-ceiling city windows",
  },
  {
    id: "spa-suite",
    category: "Suites",
    name: "Spa Suite",
    tagline: "Wellness woven into every moment",
    sqm: "115 m²",
    floor: "Floors 18–24",
    price: "$2,200",
    features: [
      "Private Pool",
      "Steam Room",
      "Garden Terrace",
      "Yoga Deck",
      "Butler 24/7",
      "Spa Credits",
    ],
    img: "https://images.unsplash.com/photo-1540541338537-1220059ddcf4?auto=format&fit=crop&w=900&q=80",
    alt: "Aurum Spa Suite — private plunge pool and lush garden terrace",
  },
  {
    id: "penthouse",
    category: "Penthouse",
    name: "Penthouse",
    tagline: "The pinnacle of Manhattan",
    sqm: "220 m²",
    floor: "Floor 52",
    price: "$6,800",
    features: [
      "Private Terrace",
      "360° Views",
      "Chef Kitchen",
      "Cinema Room",
      "Wine Cellar",
      "Dedicated Staff",
    ],
    img: "https://images.unsplash.com/photo-1564078516393-cf04bd966897?auto=format&fit=crop&w=900&q=80",
    alt: "Aurum Penthouse — private rooftop terrace with 360-degree Manhattan views",
  },
];

const AMENITIES = [
  { icon: "◈", label: "24/7 Butler Service" },
  { icon: "◈", label: "Complimentary WiFi" },
  { icon: "◈", label: "In-Room Dining" },
  { icon: "◈", label: "Nightly Turndown" },
  { icon: "◈", label: "Spa Access" },
  { icon: "◈", label: "Press & Shine" },
  { icon: "◈", label: "Welcome Champagne" },
  { icon: "◈", label: "Curated Minibar" },
];

function RoomCard({ room, i }: { room: (typeof ROOMS)[0]; i: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.15 });

  return (
    <motion.article
      ref={ref}
      itemScope
      itemType="https://schema.org/HotelRoom"
      aria-label={`${room.name} — ${room.price} per night`}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 1.0, ease: EASE_OUT_EXPO, delay: (i % 3) * 0.1 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        background: "#0f0e09",
        border: "1px solid",
        borderColor: hovered
          ? "rgba(201,169,110,0.35)"
          : "rgba(201,169,110,0.1)",
        transition: "border-color 0.4s ease",
        overflow: "hidden",
      }}
    >
      {/* Image */}
      <div
        style={{
          position: "relative",
          aspectRatio: "16/10",
          overflow: "hidden",
        }}
      >
        <motion.div
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
          style={{ position: "absolute", inset: 0 }}
        >
          <Image
            src={room.img}
            alt={room.alt}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width:768px) 100vw, 50vw"
          />
        </motion.div>
        <motion.div
          animate={{ opacity: hovered ? 0.55 : 0.25 }}
          transition={{ duration: 0.5 }}
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, #0a0a0a, transparent 60%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "rgba(10,10,10,0.75)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(201,169,110,0.2)",
            padding: "4px 12px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 9,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(232,213,170,0.8)",
            }}
          >
            {room.floor}
          </span>
        </div>
        <motion.div
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 2,
            background:
              "linear-gradient(90deg,transparent,#c9a96e,transparent)",
            transformOrigin: "left",
          }}
        />
      </div>

      {/* Body */}
      <div style={{ padding: "24px 26px 28px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 4,
          }}
        >
          <h2
            itemProp="name"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(22px, 2vw, 28px)",
              fontWeight: 400,
              color: "#f8f4ed",
              letterSpacing: "-0.01em",
            }}
          >
            {room.name}
          </h2>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 10,
              color: "rgba(201,169,110,0.65)",
              paddingTop: 4,
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
            fontStyle: "italic",
            marginBottom: 18,
          }}
        >
          {room.tagline}
        </p>

        <ul
          style={{
            listStyle: "none",
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            marginBottom: 22,
          }}
          aria-label="Room amenities"
        >
          {room.features.map((f) => (
            <li
              key={f}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 9,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(201,169,110,0.6)",
                background: "rgba(201,169,110,0.055)",
                border: "1px solid rgba(201,169,110,0.12)",
                padding: "4px 10px",
              }}
            >
              {f}
            </li>
          ))}
        </ul>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 16,
            borderTop: "1px solid rgba(201,169,110,0.08)",
          }}
        >
          <div>
            <span
              itemProp="priceRange"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(20px, 2vw, 26px)",
                fontWeight: 300,
                color: "#c9a96e",
              }}
            >
              {room.price}
            </span>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 10,
                color: "rgba(248,244,237,0.3)",
                marginLeft: 6,
              }}
            >
              / night
            </span>
          </div>
          <Link
            href="/contact"
            aria-label={`Book the ${room.name}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 22px",
              background:
                "linear-gradient(105deg,#9a7a4a,#c9a96e 45%,#e8d5aa 60%,#c9a96e 80%,#9a7a4a)",
              backgroundSize: "200% auto",
              fontFamily: "var(--font-body)",
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#0a0a0a",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Book
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default function RoomsClient() {
  const [activeFilter, setActiveFilter] = useState("All");
  const filtered =
    activeFilter === "All"
      ? ROOMS
      : ROOMS.filter((r) => r.category === activeFilter);

  return (
    <main style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      <PageHero
        eyebrow="Rooms & Suites"
        title={["Spaces Crafted", "for You"]}
        accentIdx={1}
        subtitle="180 bespoke rooms and suites — every one designed to be your personal Manhattan sanctuary."
        image="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1800&q=85"
        imageAlt="Aurum Hotel Grand Suite — panoramic city views from a luxurious living space"
      />

      {/* Filter bar */}
      <section
        aria-label="Filter rooms by category"
        style={{ background: "#0a0a0a", padding: "clamp(40px,5vw,64px) 0 0" }}
      >
        <div className="container">
          <FadeUp>
            <div
              style={{
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
                justifyContent: "center",
                marginBottom: "clamp(48px,6vw,80px)",
              }}
            >
              {FILTERS.map((f) => (
                <motion.button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 10,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    padding: "10px 28px",
                    background:
                      activeFilter === f
                        ? "linear-gradient(105deg,#9a7a4a,#c9a96e 45%,#e8d5aa 60%,#c9a96e 80%,#9a7a4a)"
                        : "transparent",
                    backgroundSize: "200% auto",
                    color:
                      activeFilter === f ? "#0a0a0a" : "rgba(201,169,110,0.65)",
                    border: "1px solid",
                    borderColor:
                      activeFilter === f
                        ? "transparent"
                        : "rgba(201,169,110,0.22)",
                    fontWeight: activeFilter === f ? 500 : 300,
                    transition: "all 0.35s ease",
                  }}
                  aria-pressed={activeFilter === f}
                >
                  {f}
                </motion.button>
              ))}
            </div>
          </FadeUp>

          {/* Room grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(min(100%, 420px), 1fr))",
                gap: "clamp(16px, 2.5vw, 28px)",
                marginBottom: "clamp(80px,10vw,140px)",
              }}
            >
              {filtered.map((room, i) => (
                <RoomCard key={room.id} room={room} i={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Amenities strip */}
      <section
        aria-labelledby="amenities-heading"
        style={{
          borderTop: "1px solid rgba(201,169,110,0.1)",
          padding: "clamp(64px,8vw,112px) 0",
        }}
      >
        <div className="container">
          <FadeUp
            style={{
              textAlign: "center",
              marginBottom: "clamp(40px,5vw,64px)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 10,
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "#c9a96e",
                display: "block",
                marginBottom: 16,
              }}
            >
              Included in Every Stay
            </span>
            <h2
              id="amenities-heading"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px,4vw,56px)",
                fontWeight: 300,
                color: "#f8f4ed",
              }}
            >
              All-Inclusive{" "}
              <em style={{ fontStyle: "italic", color: "#c9a96e" }}>
                Privileges
              </em>
            </h2>
          </FadeUp>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "clamp(12px,2vw,20px)",
            }}
          >
            {AMENITIES.map((a, i) => (
              <FadeUp key={a.label} delay={i * 0.07}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "18px 20px",
                    border: "1px solid rgba(201,169,110,0.1)",
                    background: "rgba(201,169,110,0.025)",
                  }}
                >
                  <span style={{ color: "#c9a96e", fontSize: 14 }}>
                    {a.icon}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 12,
                      letterSpacing: "0.08em",
                      color: "rgba(248,244,237,0.65)",
                    }}
                  >
                    {a.label}
                  </span>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
