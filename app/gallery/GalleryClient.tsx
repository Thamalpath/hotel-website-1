"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import { FadeUp } from "@/components/ui/Reveal";
import { EASE_OUT_EXPO } from "@/lib/motion";

const CATEGORIES = ["All", "Suites", "Dining", "Spa", "Architecture", "Events"];

const PHOTOS = [
  {
    id: 1,
    cat: "Suites",
    span: "tall",
    src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80",
    alt: "Grand Suite — king bed with panoramic city view",
  },
  {
    id: 2,
    cat: "Architecture",
    span: "wide",
    src: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
    alt: "Aurum Hotel lobby — marble columns and gold accents",
  },
  {
    id: 3,
    cat: "Dining",
    span: "normal",
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80",
    alt: "Le Sommet — plated tasting menu course",
  },
  {
    id: 4,
    cat: "Spa",
    span: "normal",
    src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    alt: "Aurum Spa — thermal pool with candlelight",
  },
  {
    id: 5,
    cat: "Suites",
    span: "normal",
    src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
    alt: "Deluxe King — marble bathroom with freestanding tub",
  },
  {
    id: 6,
    cat: "Architecture",
    span: "tall",
    src: "https://images.unsplash.com/photo-1564078516393-cf04bd966897?auto=format&fit=crop&w=800&q=80",
    alt: "Penthouse terrace — Manhattan skyline at sunset",
  },
  {
    id: 7,
    cat: "Dining",
    span: "normal",
    src: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80",
    alt: "The Aurum Bar — amber lighting and cocktail selection",
  },
  {
    id: 8,
    cat: "Spa",
    span: "wide",
    src: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=80",
    alt: "Hot stone massage in the Aurum Spa private suite",
  },
  {
    id: 9,
    cat: "Events",
    span: "normal",
    src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80",
    alt: "Grand Ballroom — elegant event setup with floral arrangements",
  },
  {
    id: 10,
    cat: "Suites",
    span: "normal",
    src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    alt: "Penthouse — private infinity pool overlooking the city",
  },
  {
    id: 11,
    cat: "Dining",
    span: "normal",
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    alt: "Jardin restaurant — sun-lit dining room with botanical decor",
  },
  {
    id: 12,
    cat: "Architecture",
    span: "normal",
    src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
    alt: "Hotel exterior — golden facade at dusk",
  },
];

function PhotoCard({
  photo,
  index,
  onOpen,
}: {
  photo: (typeof PHOTOS)[0];
  index: number;
  onOpen: (id: number) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.1 });

  const aspectRatio =
    photo.span === "tall" ? "3/4" : photo.span === "wide" ? "16/9" : "4/3";
  const gridSpan =
    photo.span === "wide"
      ? "span 2"
      : photo.span === "tall"
        ? "span 1"
        : "span 1";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
      transition={{
        duration: 0.9,
        ease: EASE_OUT_EXPO,
        delay: (index % 4) * 0.08,
      }}
      onClick={() => onOpen(photo.id)}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        gridColumn: gridSpan,
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        aspectRatio,
      }}
      aria-label={`View: ${photo.alt}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onOpen(photo.id)}
    >
      <motion.div
        animate={{ scale: hovered ? 1.06 : 1 }}
        transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
        style={{ position: "absolute", inset: 0 }}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width:600px) 100vw, (max-width:1024px) 50vw, 33vw"
        />
      </motion.div>

      {/* Overlay */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(10,10,10,0.55)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
        }}
      >
        <motion.div
          animate={{ scale: hovered ? 1 : 0.7, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
          style={{
            border: "1px solid rgba(201,169,110,0.7)",
            padding: "10px 20px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 9,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#c9a96e",
            }}
          >
            View
          </span>
        </motion.div>
      </motion.div>

      {/* Category tag */}
      <motion.div
        animate={{ opacity: hovered ? 0 : 1 }}
        style={{
          position: "absolute",
          bottom: 12,
          left: 12,
          zIndex: 3,
          background: "rgba(10,10,10,0.65)",
          backdropFilter: "blur(6px)",
          padding: "4px 10px",
          border: "1px solid rgba(201,169,110,0.15)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 8,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(201,169,110,0.7)",
          }}
        >
          {photo.cat}
        </span>
      </motion.div>
    </motion.div>
  );
}

export default function GalleryClient() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxId, setLightboxId] = useState<number | null>(null);

  const filtered =
    activeFilter === "All"
      ? PHOTOS
      : PHOTOS.filter((p) => p.cat === activeFilter);
  const lightboxPhoto = PHOTOS.find((p) => p.id === lightboxId);

  return (
    <main style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      <PageHero
        eyebrow="Gallery"
        title={["Through the", "Lens of Luxury"]}
        accentIdx={1}
        subtitle="A curated visual journey through Aurum Hotel — architecture, cuisine, wellness, and every golden detail."
        image="https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1800&q=85"
        imageAlt="Aurum Hotel lobby — grand marble atrium with golden accents"
      />

      <section style={{ padding: "clamp(48px,6vw,80px) 0" }}>
        <div className="container">
          {/* Filters */}
          <FadeUp
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              justifyContent: "center",
              marginBottom: "clamp(40px,5vw,64px)",
            }}
          >
            {CATEGORIES.map((c) => (
              <motion.button
                key={c}
                onClick={() => setActiveFilter(c)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 9,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  padding: "9px 24px",
                  background:
                    activeFilter === c
                      ? "rgba(201,169,110,0.12)"
                      : "transparent",
                  color:
                    activeFilter === c ? "#c9a96e" : "rgba(248,244,237,0.45)",
                  border: "1px solid",
                  borderColor:
                    activeFilter === c
                      ? "rgba(201,169,110,0.4)"
                      : "rgba(201,169,110,0.12)",
                  transition: "all 0.3s ease",
                }}
                aria-pressed={activeFilter === c}
              >
                {c}
              </motion.button>
            ))}
          </FadeUp>

          {/* Masonry grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
                gap: "clamp(8px,1.5vw,14px)",
              }}
            >
              {filtered.map((p, i) => (
                <PhotoCard
                  key={p.id}
                  photo={p}
                  index={i}
                  onOpen={setLightboxId}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxPhoto && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxId(null)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9000,
              background: "rgba(10,10,10,0.95)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "clamp(16px,4vw,64px)",
            }}
            aria-modal="true"
            role="dialog"
            aria-label={lightboxPhoto.alt}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                maxWidth: "min(92vw, 1100px)",
                width: "100%",
                aspectRatio:
                  lightboxPhoto.span === "tall"
                    ? "3/4"
                    : lightboxPhoto.span === "wide"
                      ? "16/9"
                      : "4/3",
                boxShadow: "0 40px 120px rgba(0,0,0,0.8)",
              }}
            >
              <Image
                src={lightboxPhoto.src}
                alt={lightboxPhoto.alt}
                fill
                style={{ objectFit: "cover" }}
                sizes="90vw"
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg,transparent 60%,rgba(10,10,10,0.7) 100%)",
                }}
              />
              <p
                style={{
                  position: "absolute",
                  bottom: 20,
                  left: 24,
                  fontFamily: "var(--font-body)",
                  fontSize: 12,
                  color: "rgba(248,244,237,0.7)",
                  letterSpacing: "0.06em",
                }}
              >
                {lightboxPhoto.alt}
              </p>
            </motion.div>
            {/* Close button */}
            <button
              onClick={() => setLightboxId(null)}
              aria-label="Close image"
              style={{
                position: "fixed",
                top: 24,
                right: 24,
                background: "rgba(201,169,110,0.15)",
                border: "1px solid rgba(201,169,110,0.3)",
                color: "#c9a96e",
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
              }}
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
