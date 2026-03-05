"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import PageHero from "@/components/ui/PageHero";
import {
  FadeUp,
  SlideLeft,
  SlideRight,
  FadeIn,
  ScaleIn,
} from "@/components/ui/Reveal";
import { EASE_OUT_EXPO } from "@/lib/motion";

const VENUES = [
  {
    name: "Le Sommet",
    type: "Fine Dining",
    stars: "★★",
    award: "Michelin Guide",
    desc: "An intimate 36-seat sanctuary on the 48th floor. Executive Chef Pierre Dubois presents a nightly 12-course tasting menu inspired by seasonal luxury ingredients sourced from five continents.",
    hours: "Dinner: Wed–Sun, 6:30 PM – 10:30 PM",
    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=85",
    alt: "Le Sommet — beautifully plated Michelin-starred tasting menu",
    accent: true,
  },
  {
    name: "The Aurum Bar",
    type: "Cocktail Lounge",
    stars: "",
    award: "World's 50 Best Bars",
    desc: "A gilded refuge of rare whiskeys, hand-crafted cocktails, and live jazz from 9 PM. Our bar team curates an ever-changing menu of classic and avant-garde libations.",
    hours: "Daily: 4 PM – 2 AM",
    img: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=900&q=85",
    alt: "The Aurum Bar — warm amber lighting, artisan cocktails and live jazz",
    accent: false,
  },
  {
    name: "Jardin",
    type: "All-Day Dining",
    stars: "★",
    award: "Michelin Guide",
    desc: "Sun-drenched and verdant, Jardin brings the garden indoors. A seasonally shifting menu of light Mediterranean fare — perfect for power breakfasts, leisurely lunches, and early dinners.",
    hours: "Daily: 7 AM – 10 PM",
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=85",
    alt: "Jardin restaurant — light Mediterranean dining with lush botanical interior",
    accent: false,
  },
  {
    name: "Cellar 52",
    type: "Private Dining",
    stars: "",
    award: "Wine Spectator Award",
    desc: "An underground cave of 3,200 labels across six centuries of winemaking. Private dining for 2–18 guests, guided by our Master Sommelier with bespoke wine pairing menus.",
    hours: "By reservation only",
    img: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=900&q=85",
    alt: "Cellar 52 — stone-vaulted private dining room with wine cellar walls",
    accent: false,
  },
];

const MENU_ITEMS = [
  {
    course: "Amuse-Bouche",
    name: "Ossetra Caviar",
    desc: "Crème fraîche, blini, chive",
    price: "—",
  },
  {
    course: "First",
    name: "Hokkaido Scallop",
    desc: "Champagne beurre blanc, sea herbs",
    price: "$68",
  },
  {
    course: "Second",
    name: "Wagyu Tartare",
    desc: "Quail egg, black truffle, brioche",
    price: "$92",
  },
  {
    course: "Main",
    name: "Côte de Boeuf",
    desc: "Dry-aged 60-day, bone marrow jus",
    price: "$148",
  },
  {
    course: "Dessert",
    name: "Valrhona Soufflé",
    desc: "72% dark chocolate, vanilla ice cream",
    price: "$38",
  },
];

function VenueCard({
  venue,
  index,
}: {
  venue: (typeof VENUES)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.15 });
  const isEven = index % 2 === 0;

  return (
    <motion.article
      ref={ref}
      itemScope
      itemType="https://schema.org/FoodEstablishment"
      aria-labelledby={`venue-${index}`}
      initial={{ opacity: 0, y: 56 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 56 }}
      transition={{ duration: 1.0, ease: EASE_OUT_EXPO, delay: 0.05 }}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "clamp(0px,0px,0px)",
        direction: isEven ? "ltr" : "rtl",
        overflow: "hidden",
        border: "1px solid rgba(201,169,110,0.1)",
        background: "#0d0c08",
      }}
      className="venue-card"
    >
      {/* Image */}
      <div
        style={{
          position: "relative",
          aspectRatio: "4/3",
          overflow: "hidden",
          direction: "ltr",
        }}
      >
        <Image
          src={venue.img}
          alt={venue.alt}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width:768px) 100vw, 50vw"
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: isEven
              ? "linear-gradient(to right,transparent 60%,#0d0c08 100%)"
              : "linear-gradient(to left,transparent 60%,#0d0c08 100%)",
          }}
        />
        {venue.accent && (
          <div
            style={{
              position: "absolute",
              top: 20,
              left: 20,
              background: "rgba(10,10,10,0.8)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(201,169,110,0.3)",
              padding: "6px 14px",
              display: "flex",
              gap: 8,
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                color: "#c9a96e",
              }}
            >
              ★★
            </span>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 9,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(248,244,237,0.6)",
              }}
            >
              Michelin Guide
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div
        style={{
          padding: "clamp(32px,5vw,64px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          direction: "ltr",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 16,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 9,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#c9a96e",
            }}
          >
            {venue.type}
          </span>
          {venue.award && (
            <>
              <span style={{ color: "rgba(201,169,110,0.3)" }}>·</span>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 9,
                  letterSpacing: "0.16em",
                  color: "rgba(248,244,237,0.35)",
                }}
              >
                {venue.award}
              </span>
            </>
          )}
        </div>

        <h2
          id={`venue-${index}`}
          itemProp="name"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px,4vw,52px)",
            fontWeight: 300,
            color: "#f8f4ed",
            letterSpacing: "-0.02em",
            lineHeight: 1,
            marginBottom: 20,
          }}
        >
          {venue.name}
        </h2>
        <p
          itemProp="description"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(13px,1.2vw,15px)",
            lineHeight: 1.8,
            color: "rgba(248,244,237,0.55)",
            marginBottom: 20,
            maxWidth: 380,
          }}
        >
          {venue.desc}
        </p>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 11,
            letterSpacing: "0.1em",
            color: "rgba(201,169,110,0.55)",
            marginBottom: 28,
          }}
        >
          {venue.hours}
        </p>

        <Link
          href="/contact"
          aria-label={`Reserve a table at ${venue.name}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            fontFamily: "var(--font-body)",
            fontSize: 10,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#c9a96e",
            textDecoration: "none",
            borderBottom: "1px solid rgba(201,169,110,0.25)",
            paddingBottom: 4,
            alignSelf: "flex-start",
          }}
        >
          Reserve a Table
          <svg width="18" height="6" viewBox="0 0 18 6" fill="none">
            <path
              d="M0 3H16M13 1L16 3L13 5"
              stroke="currentColor"
              strokeWidth="0.8"
            />
          </svg>
        </Link>
      </div>
    </motion.article>
  );
}

export default function DiningClient() {
  return (
    <main style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      <PageHero
        eyebrow="Fine Dining"
        title={["Taste the", "Extraordinary"]}
        accentIdx={1}
        subtitle="Four exceptional venues — from Michelin-starred tasting menus to sun-lit all-day dining and rare wine cellars."
        image="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1800&q=85"
        imageAlt="Le Sommet — Michelin-starred fine dining at Aurum Hotel"
      />

      {/* Venues */}
      <section
        aria-labelledby="venues-heading"
        style={{ padding: "clamp(64px,8vw,110px) 0" }}
      >
        <div className="container">
          <FadeUp style={{ marginBottom: "clamp(48px,6vw,72px)" }}>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 10,
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "#c9a96e",
                display: "block",
                marginBottom: 14,
              }}
            >
              Our Venues
            </span>
            <h2
              id="venues-heading"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(34px,4.5vw,64px)",
                fontWeight: 300,
                color: "#f8f4ed",
                lineHeight: 1,
              }}
            >
              Four Worlds,
              <br />
              <em style={{ fontStyle: "italic", color: "#c9a96e" }}>
                One Address
              </em>
            </h2>
          </FadeUp>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(16px,2vw,24px)",
            }}
          >
            {VENUES.map((v, i) => (
              <VenueCard key={v.name} venue={v} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Tasting menu */}
      <section
        aria-labelledby="menu-heading"
        style={{
          background: "#080807",
          padding: "clamp(64px,8vw,110px) 0",
          borderTop: "1px solid rgba(201,169,110,0.1)",
        }}
      >
        <div className="container" style={{ maxWidth: 780 }}>
          <FadeUp
            style={{
              textAlign: "center",
              marginBottom: "clamp(48px,5vw,64px)",
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
                marginBottom: 14,
              }}
            >
              Le Sommet Signature
            </span>
            <h2
              id="menu-heading"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px,4vw,56px)",
                fontWeight: 300,
                color: "#f8f4ed",
              }}
            >
              Tonight&apos;s{" "}
              <em style={{ fontStyle: "italic", color: "#c9a96e" }}>Menu</em>
            </h2>
          </FadeUp>

          <div itemScope itemType="https://schema.org/Menu">
            {MENU_ITEMS.map((item, i) => (
              <FadeUp key={item.name} delay={i * 0.09}>
                <div
                  itemScope
                  itemType="https://schema.org/MenuItem"
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: 20,
                    padding: "22px 0",
                    borderBottom: "1px solid rgba(201,169,110,0.08)",
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        marginBottom: 5,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: 9,
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          color: "rgba(201,169,110,0.45)",
                        }}
                      >
                        {item.course}
                      </span>
                      <h3
                        itemProp="name"
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "clamp(18px,2vw,24px)",
                          fontWeight: 400,
                          color: "#f8f4ed",
                        }}
                      >
                        {item.name}
                      </h3>
                    </div>
                    <p
                      itemProp="description"
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 12,
                        color: "rgba(248,244,237,0.4)",
                        lineHeight: 1.6,
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(16px,1.8vw,22px)",
                      fontWeight: 300,
                      color: "rgba(201,169,110,0.75)",
                      whiteSpace: "nowrap",
                      paddingTop: 2,
                    }}
                  >
                    {item.price}
                  </span>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.5} style={{ textAlign: "center", marginTop: 48 }}>
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                padding: "14px 40px",
                background:
                  "linear-gradient(105deg,#9a7a4a,#c9a96e 45%,#e8d5aa 60%,#c9a96e 80%,#9a7a4a)",
                backgroundSize: "200% auto",
                fontFamily: "var(--font-body)",
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#0a0a0a",
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              Reserve at Le Sommet
            </Link>
          </FadeUp>
        </div>
      </section>

      <style>{`
        .venue-card { grid-template-columns: 1fr 1fr; }
        @media (max-width: 860px) {
          .venue-card { grid-template-columns: 1fr !important; direction: ltr !important; }
          .venue-card > div:first-child { aspect-ratio: 16/9 !important; }
        }
      `}</style>
    </main>
  );
}
