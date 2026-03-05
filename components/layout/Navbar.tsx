"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValue,
  useSpring,
} from "framer-motion";
import HotelLogo from "@/components/ui/HotelLogo";
import GoldButton from "@/components/ui/GoldButton";
import { NAV_LINKS } from "@/lib/constants";
import { EASE_OUT_EXPO } from "@/lib/motion";

/* ─── Mobile nav item ─────────────────────────────────────────────────────── */
function MobileNavItem({
  label,
  href,
  index,
  isActive,
  onClick,
}: {
  label: string;
  href: string;
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      key={href}
      initial={{ opacity: 0, x: 48 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 32 }}
      transition={{
        duration: 0.45,
        ease: EASE_OUT_EXPO,
        delay: 0.08 + index * 0.07,
      }}
      style={{ position: "relative", overflow: "hidden" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Hover background fill — slides in from left */}
      <motion.div
        aria-hidden="true"
        animate={{ x: hovered ? "0%" : "-100%" }}
        transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(201,169,110,0.07), transparent)",
          pointerEvents: "none",
        }}
      />

      {/* Gold left accent bar */}
      <motion.div
        aria-hidden="true"
        animate={{
          scaleY: hovered || isActive ? 1 : 0,
          opacity: hovered || isActive ? 1 : 0,
        }}
        transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
        style={{
          position: "absolute",
          left: 0,
          top: "20%",
          bottom: "20%",
          width: 2,
          background:
            "linear-gradient(to bottom, transparent, #c9a96e, transparent)",
          transformOrigin: "center",
        }}
      />

      <Link
        href={href}
        onClick={onClick}
        aria-current={isActive ? "page" : undefined}
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 0 16px 20px",
          textDecoration: "none",
        }}
      >
        {/* Index number */}
        <motion.span
          animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -8 }}
          transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 9,
            letterSpacing: "0.2em",
            color: "#c9a96e",
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          0{index + 1}
        </motion.span>

        {/* Label */}
        <motion.span
          animate={{
            color: isActive ? "#c9a96e" : hovered ? "#e8d5aa" : "#f8f4ed",
            x: hovered ? 16 : 0,
          }}
          transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(22px, 4vw, 30px)",
            fontWeight: 300,
            letterSpacing: "0.02em",
            display: "block",
          }}
        >
          {label}
        </motion.span>

        {/* Arrow icon */}
        <motion.span
          animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -12 }}
          transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
          style={{ flexShrink: 0, paddingRight: 4 }}
          aria-hidden="true"
        >
          <svg width="24" height="8" viewBox="0 0 24 8" fill="none">
            <path
              d="M0 4H22M18 1L22 4L18 7"
              stroke="#c9a96e"
              strokeWidth="0.8"
            />
          </svg>
        </motion.span>
      </Link>

      {/* Bottom divider */}
      <div
        style={{
          height: 1,
          background: "rgba(201,169,110,0.08)",
          marginLeft: 20,
        }}
      />
    </motion.div>
  );
}

/* ═════════════════════════════════════════════════════════════════════════ */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  /* Scroll detection */
  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 60));
    return unsub;
  }, [scrollY]);

  /* Body lock when menu open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  /* Auto-close on route change */
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), []);

  return (
    <>
      {/* ═══ Main header ════════════════════════════════════════════════════ */}
      <motion.header
        role="banner"
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.85, ease: EASE_OUT_EXPO, delay: 0.15 }}
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
          transition:
            "background-color 0.55s ease, backdrop-filter 0.55s ease, border-color 0.55s ease, box-shadow 0.55s ease",
          backgroundColor: scrolled
            ? "rgba(10,10,10,0.80)"
            : "rgba(10,10,10,0)",
          backdropFilter: scrolled ? "blur(28px) saturate(1.5)" : "blur(0px)",
          WebkitBackdropFilter: scrolled
            ? "blur(28px) saturate(1.5)"
            : "blur(0px)",
          borderBottomColor: scrolled
            ? "rgba(201,169,110,0.12)"
            : "transparent",
          boxShadow: scrolled ? "0 8px 40px rgba(0,0,0,0.4)" : "none",
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
          {/* Logo */}
          <HotelLogo color="#c9a96e" />

          {/* Desktop nav */}
          <nav
            role="navigation"
            aria-label="Main navigation"
            className="desktop-nav"
            style={{ display: "flex", alignItems: "center", gap: 4 }}
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
                      color: isActive
                        ? "#c9a96e"
                        : activeLink === link.href
                          ? "#e8d5aa"
                          : "rgba(248,244,237,0.82)",
                      transition: "color 0.3s ease",
                      fontFamily: "var(--font-body)",
                      textDecoration: "none",
                    }}
                  >
                    {link.label}
                  </Link>

                  {/* Sliding underline — shared layoutId for magnetic feel */}
                  <AnimatePresence>
                    {(activeLink === link.href || isActive) && (
                      <motion.span
                        key="underline"
                        layoutId="nav-pill"
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        exit={{ scaleX: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
                        style={{
                          position: "absolute",
                          bottom: 2,
                          left: 14,
                          right: 14,
                          height: 1,
                          background:
                            "linear-gradient(90deg, transparent, #c9a96e, transparent)",
                          transformOrigin: "center",
                          pointerEvents: "none",
                        }}
                      />
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            <div style={{ marginLeft: 20 }}>
              <GoldButton href="/contact" size="sm">
                Book Now
              </GoldButton>
            </div>
          </nav>

          {/* Hamburger */}
          <button
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            aria-controls="mobile-drawer"
            onClick={toggleMenu}
            className="mobile-menu-btn"
            style={{
              display: "none",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-end",
              gap: 6,
              width: 44,
              height: 44,
              padding: 10,
              background: "none",
              border: "none",
            }}
          >
            <motion.span
              animate={
                menuOpen
                  ? { rotate: 45, y: 6, width: 24 }
                  : { rotate: 0, y: 0, width: 24 }
              }
              transition={{ duration: 0.32, ease: EASE_OUT_EXPO }}
              style={{
                display: "block",
                height: 1,
                background: "#c9a96e",
                transformOrigin: "center",
                borderRadius: 1,
              }}
            />
            <motion.span
              animate={
                menuOpen
                  ? { opacity: 0, scaleX: 0 }
                  : { opacity: 1, scaleX: 1, width: 16 }
              }
              transition={{ duration: 0.2 }}
              style={{
                display: "block",
                height: 1,
                background: "#c9a96e",
                width: 16,
                borderRadius: 1,
              }}
            />
            <motion.span
              animate={
                menuOpen
                  ? { rotate: -45, y: -6, width: 24 }
                  : { rotate: 0, y: 0, width: 20 }
              }
              transition={{ duration: 0.32, ease: EASE_OUT_EXPO }}
              style={{
                display: "block",
                height: 1,
                background: "#c9a96e",
                transformOrigin: "center",
                borderRadius: 1,
              }}
            />
          </button>
        </div>
      </motion.header>

      {/* ═══ Mobile drawer ══════════════════════════════════════════════════ */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Blurred backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 998,
                background: "rgba(5,5,4,0.72)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
              }}
            />

            {/* Drawer panel */}
            <motion.div
              id="mobile-drawer"
              key="drawer"
              role="dialog"
              aria-label="Navigation menu"
              aria-modal="true"
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.52, ease: EASE_OUT_EXPO }}
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                zIndex: 999,
                width: "min(360px, 88vw)",
                background: "linear-gradient(150deg, #161410 0%, #0a0a08 100%)",
                borderLeft: "1px solid rgba(201,169,110,0.14)",
                display: "flex",
                flexDirection: "column",
                overflowY: "auto",
              }}
            >
              {/* Drawer header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0 clamp(24px,5vw,40px)",
                  height: "var(--nav-height)",
                  borderBottom: "1px solid rgba(201,169,110,0.08)",
                  flexShrink: 0,
                }}
              >
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.45,
                    ease: EASE_OUT_EXPO,
                    delay: 0.1,
                  }}
                >
                  <HotelLogo color="#c9a96e" size="sm" />
                </motion.div>

                {/* Close button */}
                <motion.button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.35,
                    ease: EASE_OUT_EXPO,
                    delay: 0.15,
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    background: "rgba(201,169,110,0.08)",
                    border: "1px solid rgba(201,169,110,0.2)",
                    color: "#c9a96e",
                    width: 36,
                    height: 36,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                    cursor: "pointer",
                  }}
                >
                  ✕
                </motion.button>
              </div>

              {/* Animated gold rule */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.2 }}
                style={{
                  height: 1,
                  background:
                    "linear-gradient(to right, #c9a96e, rgba(201,169,110,0.1), transparent)",
                  transformOrigin: "left",
                  flexShrink: 0,
                }}
              />

              {/* Nav links list */}
              <nav
                aria-label="Mobile navigation"
                style={{
                  padding: "clamp(24px,5vw,36px) clamp(24px,5vw,40px) 0",
                  flex: 1,
                }}
              >
                {NAV_LINKS.map((link, i) => (
                  <MobileNavItem
                    key={link.href}
                    label={link.label}
                    href={link.href}
                    index={i}
                    isActive={pathname === link.href}
                    onClick={() => setMenuOpen(false)}
                  />
                ))}
              </nav>

              {/* Bottom CTA + contact */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  ease: EASE_OUT_EXPO,
                  delay: 0.45,
                }}
                style={{
                  padding:
                    "clamp(24px,5vw,36px) clamp(24px,5vw,40px) clamp(32px,6vw,48px)",
                  borderTop: "1px solid rgba(201,169,110,0.08)",
                  flexShrink: 0,
                }}
              >
                <GoldButton href="/contact" variant="outline" fullWidth>
                  Reserve Your Stay
                </GoldButton>

                <div style={{ marginTop: 28 }}>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 9,
                      letterSpacing: "0.28em",
                      textTransform: "uppercase",
                      color: "rgba(201,169,110,0.5)",
                      marginBottom: 8,
                    }}
                  >
                    Reservations
                  </p>
                  <a
                    href="tel:+18002876678"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 22,
                      fontWeight: 300,
                      color: "#f8f4ed",
                      textDecoration: "none",
                      letterSpacing: "0.02em",
                    }}
                  >
                    +1 (800) 287-6678
                  </a>
                </div>
              </motion.div>

              {/* Decorative vertical gold line */}
              <motion.div
                aria-hidden="true"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1.2, ease: EASE_OUT_EXPO, delay: 0.3 }}
                style={{
                  position: "absolute",
                  top: "12%",
                  left: 0,
                  width: 1,
                  height: "50%",
                  background:
                    "linear-gradient(to bottom, transparent, rgba(201,169,110,0.22), transparent)",
                  transformOrigin: "top",
                  pointerEvents: "none",
                }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav    { display: none !important; }
          .mobile-menu-btn{ display: flex !important; }
        }
      `}</style>
    </>
  );
}
