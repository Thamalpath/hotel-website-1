"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import GoldButton from "@/components/ui/GoldButton";
import { HERO_VIDEO_URL, HERO_POSTER_URL, SITE } from "@/lib/constants";
import { EASE_OUT_EXPO } from "@/lib/motion";

/* ── Animated counter ──────────────────────────────────────────────────────── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true);
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * to));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, to]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ── Scroll indicator ──────────────────────────────────────────────────────── */
function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.8, duration: 0.8, ease: EASE_OUT_EXPO }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
      }}
    >
      <span
        style={{
          fontSize: 9,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "rgba(232, 213, 170, 0.6)",
          fontFamily: "var(--font-body)",
        }}
      >
        Scroll
      </span>
      <div
        style={{
          width: 1,
          height: 56,
          background:
            "linear-gradient(to bottom, rgba(201,169,110,0.8), transparent)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "40%",
            background: "linear-gradient(to bottom, #c9a96e, transparent)",
          }}
          animate={{ y: ["0%", "250%"] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  /* ── Parallax on scroll ───────────────────────────────────────────────── */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 0.7]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  /* ── Subtle mouse parallax ───────────────────────────────────────────── */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const w = window.innerWidth;
    const h = window.innerHeight;
    mouseX.set((clientX / w - 0.5) * 24);
    mouseY.set((clientY / h - 0.5) * 16);
  };

  /* ── Video playback ──────────────────────────────────────────────────── */
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = true;
    vid.playsInline = true;
    const play = async () => {
      try {
        await vid.play();
        setVideoLoaded(true);
      } catch {
        setVideoError(true);
      }
    };
    play();
  }, []);

  /* ── Stats ────────────────────────────────────────────────────────────── */
  const stats = [
    { value: 25, suffix: "+", label: "Years of Excellence" },
    { value: 180, suffix: "", label: "Luxury Suites" },
    { value: 98, suffix: "%", label: "Guest Satisfaction" },
    { value: 12, suffix: "", label: "Award Wins" },
  ];

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      aria-label="Hero — Aurum Hotel"
      style={{
        position: "relative",
        height: "100svh",
        minHeight: 600,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      {/* ── Video / poster background ──────────────────────────────────── */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          y: videoY,
          x: springX,
          scale: 1.08,
        }}
      >
        {/* Poster image shown while video loads */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${HERO_POSTER_URL})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition: "opacity 1s ease",
            opacity: videoLoaded ? 0 : 1,
            zIndex: 1,
          }}
          aria-hidden="true"
        />

        {/* Video */}
        {!videoError && (
          <video
            ref={videoRef}
            loop
            muted
            playsInline
            preload="auto"
            poster={HERO_POSTER_URL}
            onLoadedData={() => setVideoLoaded(true)}
            onError={() => setVideoError(true)}
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              opacity: videoLoaded ? 1 : 0,
              transition: "opacity 1.5s ease",
            }}
          >
            {/* Primary: Pexels luxury hotel MP4 (free use) */}
            <source
              src="https://videos.pexels.com/video-files/3163534/3163534-uhd_2560_1440_25fps.mp4"
              type="video/mp4"
            />
            {/* Fallback */}
            <source src={HERO_VIDEO_URL} type="video/mp4" />
          </video>
        )}
      </motion.div>

      {/* ── Gradient overlays ──────────────────────────────────────────── */}
      {/* Atmospheric gradient */}
      <div
        className="video-overlay"
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, zIndex: 2 }}
      />
      {/* Extra scroll-driven overlay */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 3,
          background: "#0a0a0a",
          opacity: overlayOpacity,
        }}
      />
      {/* Left vignette */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 3,
          background:
            "linear-gradient(to right, rgba(10,10,10,0.5) 0%, transparent 50%)",
        }}
      />

      {/* ── Main content ───────────────────────────────────────────────── */}
      <motion.div
        style={{
          y: contentY,
          opacity: contentOpacity,
          position: "relative",
          zIndex: 10,
        }}
      >
        <div
          className="container"
          style={{
            paddingBottom: 80,
            display: "grid",
            gridTemplateRows: "auto auto",
            gap: 48,
          }}
        >
          {/* Headline block */}
          <div style={{ maxWidth: 820 }}>
            {/* Pre-label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.6 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                marginBottom: 24,
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
                  fontSize: 10,
                  fontFamily: "var(--font-body)",
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color: "#c9a96e",
                  fontWeight: 400,
                }}
              >
                Since 1999 · New York
              </span>
            </motion.div>

            {/* H1 — staggered lines */}
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 300,
                fontSize: "clamp(52px, 7vw, 110px)",
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
                color: "#f8f4ed",
                overflow: "hidden",
                marginBottom: 28,
              }}
            >
              {["Where", "Luxury", "Meets", "Eternity"].map((word, i) => (
                <span
                  key={word}
                  style={{
                    display: "block",
                    overflow: "hidden",
                    lineHeight: 1.05,
                  }}
                >
                  <motion.span
                    style={{ display: "block" }}
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{
                      duration: 1.0,
                      ease: EASE_OUT_EXPO,
                      delay: 0.8 + i * 0.14,
                    }}
                  >
                    {i === 1 ? (
                      <span className="gold-shimmer">{word}</span>
                    ) : (
                      word
                    )}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 1.6 }}
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 300,
                fontSize: "clamp(14px, 1.4vw, 17px)",
                lineHeight: 1.7,
                color: "rgba(248, 244, 237, 0.65)",
                maxWidth: 480,
                marginBottom: 44,
              }}
            >
              An icon of refined luxury in the heart of Manhattan. Discover 180
              bespoke suites, Michelin-starred dining, and a world-class spa.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 1.9 }}
              style={{
                display: "flex",
                gap: 20,
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <GoldButton href="/contact" size="lg">
                Reserve Your Suite
              </GoldButton>
              <GoldButton href="/rooms" variant="ghost" size="lg">
                Explore Rooms
              </GoldButton>
            </motion.div>
          </div>

          {/* ── Stats bar ──────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.2 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 0,
              borderTop: "1px solid rgba(201,169,110,0.15)",
              paddingTop: 32,
              maxWidth: 700,
            }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 2.3 + i * 0.1,
                  duration: 0.7,
                  ease: EASE_OUT_EXPO,
                }}
                style={{
                  paddingRight: 24,
                  borderRight:
                    i < stats.length - 1
                      ? "1px solid rgba(201,169,110,0.12)"
                      : "none",
                  paddingLeft: i > 0 ? 24 : 0,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(28px, 2.8vw, 42px)",
                    fontWeight: 300,
                    color: "#c9a96e",
                    lineHeight: 1,
                    marginBottom: 6,
                  }}
                >
                  <Counter to={stat.value} suffix={stat.suffix} />
                </div>
                <div
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "rgba(248,244,237,0.5)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll indicator ───────────────────────────────────────────── */}
      <motion.div
        style={{
          position: "absolute",
          bottom: 40,
          right: 64,
          zIndex: 10,
        }}
      >
        <ScrollIndicator />
      </motion.div>

      {/* ── Year badge ─────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, rotate: -90 }}
        animate={{ opacity: 1, rotate: -90 }}
        transition={{ delay: 2.5, duration: 0.8, ease: EASE_OUT_EXPO }}
        style={{
          position: "absolute",
          right: -68,
          top: "50%",
          translateY: "-50%",
          zIndex: 10,
          fontSize: 9,
          letterSpacing: "0.4em",
          textTransform: "uppercase",
          color: "rgba(201,169,110,0.45)",
          fontFamily: "var(--font-body)",
          whiteSpace: "nowrap",
        }}
      >
        {SITE.address}
      </motion.div>

      {/* ── Responsive styles ──────────────────────────────────────────── */}
      <style>{`
        @media (max-width: 768px) {
          /* Stack stats 2×2 */
          .hero-stats { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          /* Single column stats */
          .hero-stats { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
