"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import PageHero from "@/components/ui/PageHero";
import {
  FadeUp,
  SlideLeft,
  SlideRight,
  ScaleIn,
  FadeIn,
} from "@/components/ui/Reveal";
import { EASE_OUT_EXPO } from "@/lib/motion";

const TREATMENTS = [
  {
    name: "Aurum Signature",
    duration: "120 min",
    price: "$380",
    tag: "Best Seller",
    desc: "Full-body ritual combining gold leaf exfoliation, hot stone massage, and a bespoke facial using 24-karat gold serum.",
  },
  {
    name: "Deep Tissue Fusion",
    duration: "90 min",
    price: "$280",
    tag: "Therapeutic",
    desc: "Advanced muscle-release technique blending Swedish and Shiatsu pressure to dissolve tension and restore flow.",
  },
  {
    name: "Alpine Detox Wrap",
    duration: "75 min",
    price: "$240",
    tag: "Purifying",
    desc: "Swiss Alpine herbs, thermal mud, and infrared heat combine to deeply detoxify and nourish the skin.",
  },
  {
    name: "Luminary Facial",
    duration: "60 min",
    price: "$195",
    tag: "Radiance",
    desc: "Clinical-grade vitamin C, retinol, and cryotherapy micro-massage for visible luminosity from the first session.",
  },
  {
    name: "Couples Ritual",
    duration: "150 min",
    price: "$680",
    tag: "Romantic",
    desc: "A private villa for two — champagne arrival, synchronised massage, floral bath, and chocolate fondue finale.",
  },
  {
    name: "Jet Lag Recovery",
    duration: "60 min",
    price: "$175",
    tag: "Rejuvenating",
    desc: "Pressure-point therapy, scalp massage, and chilled eye treatment — engineered to reset your circadian rhythm.",
  },
];

const FACILITIES = [
  {
    icon: "◈",
    name: "Thermal Pool",
    desc: "34°C infinity pool with cityscape views",
  },
  {
    icon: "◈",
    name: "Hammam",
    desc: "Authentic Turkish steam and scrub ritual",
  },
  {
    icon: "◈",
    name: "Cryotherapy Chamber",
    desc: "-110°C whole-body recovery chamber",
  },
  {
    icon: "◈",
    name: "Hydrotherapy Circuit",
    desc: "Seven-station contrast water journey",
  },
  {
    icon: "◈",
    name: "Yoga Studio",
    desc: "Twice-daily classes, meditation sessions",
  },
  {
    icon: "◈",
    name: "Flotation Suite",
    desc: "Zero-gravity sensory deprivation pods",
  },
  {
    icon: "◈",
    name: "Fitness Centre",
    desc: "Technogym Pro, personal training",
  },
  {
    icon: "◈",
    name: "Nutrition Bar",
    desc: "Cold-pressed juices, superfood elixirs",
  },
];

function TreatmentCard({ t, i }: { t: (typeof TREATMENTS)[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.15 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: (i % 3) * 0.08 }}
      itemScope
      itemType="https://schema.org/HealthAndBeautyBusiness"
      style={{
        padding: "clamp(24px,3vw,36px)",
        background: "#0d0c08",
        border: "1px solid rgba(201,169,110,0.1)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 12,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 9,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(201,169,110,0.6)",
            background: "rgba(201,169,110,0.07)",
            border: "1px solid rgba(201,169,110,0.15)",
            padding: "4px 10px",
          }}
        >
          {t.tag}
        </span>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 18,
            fontWeight: 300,
            color: "#c9a96e",
          }}
        >
          {t.price}
        </span>
      </div>
      <h3
        itemProp="name"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(20px,2.2vw,28px)",
          fontWeight: 400,
          color: "#f8f4ed",
          marginBottom: 6,
          lineHeight: 1.1,
        }}
      >
        {t.name}
      </h3>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 10,
          letterSpacing: "0.14em",
          color: "rgba(201,169,110,0.55)",
          marginBottom: 14,
        }}
      >
        {t.duration}
      </p>
      <p
        itemProp="description"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "clamp(12px,1.1vw,13.5px)",
          lineHeight: 1.8,
          color: "rgba(248,244,237,0.48)",
          flex: 1,
          marginBottom: 24,
        }}
      >
        {t.desc}
      </p>
      <Link
        href="/contact"
        aria-label={`Book the ${t.name} treatment`}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          fontFamily: "var(--font-body)",
          fontSize: 10,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(201,169,110,0.7)",
          textDecoration: "none",
          borderBottom: "1px solid rgba(201,169,110,0.2)",
          paddingBottom: 3,
          alignSelf: "flex-start",
        }}
      >
        Book Treatment
      </Link>
    </motion.div>
  );
}

export default function SpaClient() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <main style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      <PageHero
        eyebrow="Spa & Wellness"
        title={["Restore.", "Renew.", "Radiate."]}
        accentIdx={1}
        subtitle="12,000 sq ft of pure restoration — thermal pools, ancient rituals, and cutting-edge wellness science."
        image="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1800&q=85"
        imageAlt="Aurum Spa — serene thermal pool with candlelight and steam"
      />

      {/* Intro split */}
      <section style={{ padding: "clamp(72px,9vw,130px) 0" }}>
        <div className="container">
          <div
            className="spa-intro"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(40px,7vw,100px)",
              alignItems: "center",
            }}
          >
            <SlideLeft>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 10,
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color: "#c9a96e",
                  display: "block",
                  marginBottom: 20,
                }}
              >
                The Aurum Spa
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(34px,4.5vw,64px)",
                  fontWeight: 300,
                  color: "#f8f4ed",
                  lineHeight: 1,
                  marginBottom: 28,
                }}
              >
                Ancient Rituals,
                <br />
                <em style={{ fontStyle: "italic", color: "#c9a96e" }}>
                  Modern Science
                </em>
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 300,
                  fontSize: "clamp(13px,1.25vw,15.5px)",
                  lineHeight: 1.9,
                  color: "rgba(248,244,237,0.55)",
                  marginBottom: 20,
                  maxWidth: 440,
                }}
              >
                Our 12,000 sq ft sanctuary draws from millennia of wellness
                traditions — Ayurvedic oils, Nordic cold therapy, Turkish hammam
                ritual — and fuses them with the latest clinical technology.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 300,
                  fontSize: "clamp(13px,1.25vw,15.5px)",
                  lineHeight: 1.9,
                  color: "rgba(248,244,237,0.55)",
                  maxWidth: 440,
                }}
              >
                Each visit begins with a personalised wellness consultation.
                Your therapist creates a bespoke journey, selecting treatments,
                aromas, and pressure techniques matched precisely to your
                body&apos;s needs.
              </p>
            </SlideLeft>
            <SlideRight>
              <div
                style={{
                  position: "relative",
                  aspectRatio: "4/5",
                  overflow: "hidden",
                  boxShadow: "0 40px 100px rgba(0,0,0,0.6)",
                }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=900&q=85"
                  alt="Aurum Spa — hot stone massage treatment in private suite"
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width:900px) 100vw, 50vw"
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg,transparent 60%,rgba(10,10,10,0.45) 100%)",
                  }}
                />
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 18,
                    border: "1px solid rgba(201,169,110,0.1)",
                    pointerEvents: "none",
                  }}
                />
              </div>
            </SlideRight>
          </div>
        </div>
      </section>

      {/* Treatments */}
      <section
        aria-labelledby="treatments-heading"
        style={{
          background: "#080807",
          borderTop: "1px solid rgba(201,169,110,0.1)",
          padding: "clamp(64px,8vw,110px) 0",
        }}
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
              Signature Treatments
            </span>
            <h2
              id="treatments-heading"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px,4vw,56px)",
                fontWeight: 300,
                color: "#f8f4ed",
              }}
            >
              Bespoke{" "}
              <em style={{ fontStyle: "italic", color: "#c9a96e" }}>Rituals</em>
            </h2>
          </FadeUp>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
              gap: "clamp(12px,2vw,20px)",
              marginBottom: "clamp(48px,6vw,72px)",
            }}
          >
            {TREATMENTS.map((t, i) => (
              <TreatmentCard key={t.name} t={t} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section
        aria-labelledby="facilities-heading"
        style={{ padding: "clamp(64px,8vw,110px) 0" }}
      >
        <div className="container">
          <FadeUp style={{ marginBottom: "clamp(40px,5vw,64px)" }}>
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
              Facilities
            </span>
            <h2
              id="facilities-heading"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px,4vw,56px)",
                fontWeight: 300,
                color: "#f8f4ed",
              }}
            >
              Your Private{" "}
              <em style={{ fontStyle: "italic", color: "#c9a96e" }}>
                Sanctuary
              </em>
            </h2>
          </FadeUp>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "clamp(12px,2vw,18px)",
            }}
          >
            {FACILITIES.map((f, i) => (
              <FadeUp key={f.name} delay={i * 0.07}>
                <div
                  style={{
                    padding: "24px",
                    border: "1px solid rgba(201,169,110,0.1)",
                    background: "rgba(201,169,110,0.02)",
                  }}
                >
                  <span
                    style={{
                      color: "#c9a96e",
                      fontSize: 16,
                      display: "block",
                      marginBottom: 12,
                    }}
                  >
                    {f.icon}
                  </span>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 20,
                      fontWeight: 400,
                      color: "#f8f4ed",
                      marginBottom: 6,
                    }}
                  >
                    {f.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 12,
                      color: "rgba(248,244,237,0.42)",
                      lineHeight: 1.6,
                    }}
                  >
                    {f.desc}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section
        style={{
          background: "#080807",
          borderTop: "1px solid rgba(201,169,110,0.1)",
          padding: "clamp(64px,8vw,100px) 0",
          textAlign: "center",
        }}
      >
        <div className="container">
          <FadeUp>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px,4.5vw,64px)",
                fontWeight: 300,
                color: "#f8f4ed",
                marginBottom: 24,
              }}
            >
              Begin Your{" "}
              <em style={{ fontStyle: "italic", color: "#c9a96e" }}>Journey</em>
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(13px,1.2vw,15px)",
                color: "rgba(248,244,237,0.5)",
                maxWidth: 480,
                margin: "0 auto 36px",
              }}
            >
              Spa reservations recommended 48 hours in advance. Hotel guests
              receive 20% off all treatments.
            </p>
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                padding: "14px 44px",
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
              Book Your Treatment
            </Link>
          </FadeUp>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) { .spa-intro { grid-template-columns: 1fr !important; } }
      `}</style>
    </main>
  );
}
