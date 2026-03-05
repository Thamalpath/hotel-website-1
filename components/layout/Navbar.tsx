"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import HotelLogo from "@/components/ui/HotelLogo";
import GoldButton from "@/components/ui/GoldButton";
import { NAV_LINKS } from "@/lib/constants";
import { mobileMenu, mobileMenuItem, EASE_OUT_EXPO } from "@/lib/motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const pathname = usePathname();

  const { scrollY } = useScroll();

  /* ── Detect scroll ──────────────────────────────────────────────────── */
  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 60));
    return unsub;
  }, [scrollY]);

  /* ── Lock body when menu open ───────────────────────────────────────── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  /* ── Close menu on route change ─────────────────────────────────────── */
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), []);

  /* ── Logo colour: always gold, slightly brighter when transparent ────── */
  const logoColor = "#c9a96e";

  return (
    <>
      {/* ═══ Main navbar ═══════════════════════════════════════════════════ */}
      <motion.header
        role="banner"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.2 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: "var(--nav-height)",
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid",
          transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          // Applied inline so motion can animate
          backgroundColor: scrolled
            ? "rgba(10, 10, 10, 0.78)"
            : "rgba(10, 10, 10, 0)",
          backdropFilter: scrolled ? "blur(28px) saturate(1.4)" : "blur(0px)",
          WebkitBackdropFilter: scrolled
            ? "blur(28px) saturate(1.4)"
            : "blur(0px)",
          borderBottomColor: scrolled
            ? "rgba(201,169,110,0.12)"
            : "rgba(201,169,110,0)",
          boxShadow: scrolled ? "0 8px 40px rgba(0,0,0,0.45)" : "none",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* ── Logo ──────────────────────────────────────────────────── */}
          <HotelLogo color={logoColor} />

          {/* ── Desktop navigation ────────────────────────────────────── */}
          <nav
            role="navigation"
            aria-label="Main navigation"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
            className="desktop-nav"
          >
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <div
                  key={link.href}
                  style={{ position: "relative" }}
                  onMouseEnter={() => setActiveLink(link.href)}
                  onMouseLeave={() => setActiveLink(null)}
                >
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    style={{
                      display: "block",
                      padding: "8px 14px",
                      fontSize: 11,
                      fontWeight: 400,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: isActive ? "#c9a96e" : "#f8f4ed",
                      opacity: isActive ? 1 : 0.82,
                      transition: "color 0.3s ease, opacity 0.3s ease",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {link.label}
                  </Link>
                  {/* Hover underline */}
                  <AnimatePresence>
                    {(activeLink === link.href || isActive) && (
                      <motion.span
                        key="underline"
                        layoutId="nav-underline"
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        exit={{ scaleX: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        style={{
                          position: "absolute",
                          bottom: 2,
                          left: 14,
                          right: 14,
                          height: 1,
                          background:
                            "linear-gradient(90deg, transparent, #c9a96e, transparent)",
                          transformOrigin: "center",
                        }}
                      />
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {/* ── Book Now CTA ───────────────────────────────────────── */}
            <div style={{ marginLeft: 16 }}>
              <GoldButton href="/contact" size="sm">
                Book Now
              </GoldButton>
            </div>
          </nav>

          {/* ── Hamburger (mobile) ────────────────────────────────────── */}
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={toggleMenu}
            className="mobile-menu-btn"
            style={{
              display: "none",
              flexDirection: "column",
              justifyContent: "center",
              gap: 5,
              width: 40,
              height: 40,
              padding: 8,
              background: "none",
              border: "none",
            }}
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                display: "block",
                width: 24,
                height: 1,
                background: "#c9a96e",
                transformOrigin: "center",
              }}
            />
            <motion.span
              animate={
                menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }
              }
              transition={{ duration: 0.2 }}
              style={{
                display: "block",
                width: 24,
                height: 1,
                background: "#c9a96e",
              }}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                display: "block",
                width: 24,
                height: 1,
                background: "#c9a96e",
                transformOrigin: "center",
              }}
            />
          </button>
        </div>
      </motion.header>

      {/* ═══ Mobile menu overlay ════════════════════════════════════════════ */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMenuOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 998,
                background: "rgba(10,10,10,0.6)",
                backdropFilter: "blur(8px)",
              }}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                zIndex: 999,
                width: "min(320px, 85vw)",
                background: "linear-gradient(160deg, #141414, #0a0a0a)",
                borderLeft: "1px solid rgba(201,169,110,0.15)",
                display: "flex",
                flexDirection: "column",
                padding: "100px 40px 60px",
              }}
            >
              {/* Gold accent line */}
              <div
                style={{
                  width: 40,
                  height: 1,
                  background: "linear-gradient(90deg, #c9a96e, transparent)",
                  marginBottom: 48,
                }}
              />

              {/* Nav links */}
              <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{
                      duration: 0.4,
                      ease: EASE_OUT_EXPO,
                      delay: i * 0.06,
                    }}
                  >
                    <Link
                      href={link.href}
                      style={{
                        display: "block",
                        padding: "14px 0",
                        fontSize: 26,
                        fontFamily: "var(--font-display)",
                        fontWeight: 300,
                        letterSpacing: "0.04em",
                        color: pathname === link.href ? "#c9a96e" : "#f8f4ed",
                        borderBottom: "1px solid rgba(201,169,110,0.08)",
                        transition: "color 0.3s ease",
                      }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Book now */}
              <div style={{ marginTop: 48 }}>
                <GoldButton href="/contact" variant="outline" fullWidth>
                  Reserve Your Stay
                </GoldButton>
              </div>

              {/* Phone */}
              <div style={{ marginTop: "auto", paddingTop: 40 }}>
                <p
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    color: "#c9a96e",
                    textTransform: "uppercase",
                    marginBottom: 8,
                    opacity: 0.7,
                  }}
                >
                  Reservations
                </p>
                <a
                  href="tel:+18002876678"
                  style={{
                    fontSize: 18,
                    fontFamily: "var(--font-display)",
                    color: "#f8f4ed",
                  }}
                >
                  +1 (800) 287-6678
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ═══ Responsive styles ══════════════════════════════════════════════ */}
      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
