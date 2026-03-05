"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import PageHero from "@/components/ui/PageHero";
import { FadeUp, SlideLeft, SlideRight } from "@/components/ui/Reveal";
import { EASE_OUT_EXPO } from "@/lib/motion";

const TIMELINE = [
  {
    year: "1999",
    event: "Founded",
    desc: "Architect Elise Harmon and investor James Aurum open the hotel's doors, introducing Manhattan to a new paradigm of intimate luxury.",
  },
  {
    year: "2003",
    event: "First Michelin Star",
    desc: "Le Sommet earns its first Michelin star within 18 months of opening, putting Aurum firmly on the world culinary map.",
  },
  {
    year: "2008",
    event: "The Spa Expansion",
    desc: "The Penthouse floors and Aurum Spa are added, bringing the property to 180 suites and establishing our world-class wellness programme.",
  },
  {
    year: "2014",
    event: "Second Star",
    desc: "Le Sommet is awarded a second Michelin star under Chef Pierre Dubois, cementing our place among the world's finest hotels.",
  },
  {
    year: "2019",
    event: "Forbes Five-Star ×7",
    desc: "Aurum becomes one of only 14 hotels globally to achieve Forbes Five-Star status for a seventh consecutive year.",
  },
  {
    year: "2024",
    event: "25th Anniversary",
    desc: "New suites, a reimagined spa garden, and the opening of Cellar 52 — our private underground wine dining room.",
  },
];

const TEAM = [
  {
    name: "Isabella Harmon",
    role: "Managing Director",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    bio: "Third-generation hotelier. École hôtelière de Lausanne. Leads Aurum's vision of understated perfection.",
  },
  {
    name: "Pierre Dubois",
    role: "Executive Chef",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    bio: "Two Michelin stars. Formerly of Le Bernardin and Noma. His cuisine is a dialogue between memory and discovery.",
  },
  {
    name: "Dr. Naomi Sato",
    role: "Spa Director",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80",
    bio: "Integrative medicine practitioner. Blends clinical science with ancient healing traditions from Japan and Bali.",
  },
  {
    name: "Marcus Cole",
    role: "Head Concierge",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
    bio: "20 years at Aurum. His little black book includes private islands, opera access, and everything in between.",
  },
];

const VALUES = [
  {
    icon: "◈",
    title: "Craftsmanship",
    desc: "Every detail — the weight of our linen, the temperature of the lobby — is considered until it is simply right.",
  },
  {
    icon: "◈",
    title: "Warmth",
    desc: "Luxury without genuine warmth is hollow. Our team remembers your name, your preferences, and your stories.",
  },
  {
    icon: "◈",
    title: "Sustainability",
    desc: "We source within 150 miles, run on 100% renewable energy, and give 2% of revenue to conservation programmes.",
  },
  {
    icon: "◈",
    title: "Curiosity",
    desc: "We challenge ourselves to evolve — in cuisine, design, wellness science, and every dimension of the guest experience.",
  },
];

const AWARDS = [
  "Forbes Five-Star × 7",
  "AAA Five Diamond",
  "Condé Nast Gold List",
  "Travel + Leisure #1 NYC",
  "Wine Spectator Grand Award",
  "Michelin ★★ Le Sommet",
  "World's 50 Best Hotel",
  "LEED Platinum Building",
];

/* ── Timeline item — clean alternating layout ──────────────────────────── */
function TimelineItem({
  item,
  index,
}: {
  item: (typeof TIMELINE)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.3 });
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className="tl-row"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 40px 1fr",
        gap: "clamp(16px,3vw,40px)",
        alignItems: "flex-start",
        marginBottom: "clamp(24px,4vw,44px)",
      }}
    >
      {/* Left cell */}
      <motion.div
        initial={{ opacity: 0, x: -36 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -36 }}
        transition={{ duration: 0.85, ease: EASE_OUT_EXPO, delay: 0.05 }}
        style={{ textAlign: "right" }}
      >
        {isEven ? (
          <>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(26px,3vw,42px)",
                fontWeight: 300,
                color: "#c9a96e",
                display: "block",
                lineHeight: 1,
                marginBottom: 4,
              }}
            >
              {item.year}
            </span>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 9,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "rgba(201,169,110,0.55)",
                display: "block",
                marginBottom: 10,
              }}
            >
              {item.event}
            </span>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 300,
                fontSize: "clamp(12px,1.1vw,14px)",
                lineHeight: 1.85,
                color: "rgba(248,244,237,0.5)",
                maxWidth: 300,
                marginLeft: "auto",
              }}
            >
              {item.desc}
            </p>
          </>
        ) : null}
      </motion.div>

      {/* Centre spine */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 6,
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "#c9a96e",
            flexShrink: 0,
            boxShadow: "0 0 14px rgba(201,169,110,0.45)",
            marginBottom: 8,
          }}
        />
        <motion.div
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 1.0, ease: EASE_OUT_EXPO, delay: 0.12 }}
          style={{
            width: 1,
            height: "clamp(60px,8vw,100px)",
            background:
              "linear-gradient(to bottom,#c9a96e,rgba(201,169,110,0.05))",
            transformOrigin: "top",
          }}
        />
      </div>

      {/* Right cell */}
      <motion.div
        initial={{ opacity: 0, x: 36 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 36 }}
        transition={{ duration: 0.85, ease: EASE_OUT_EXPO, delay: 0.05 }}
      >
        {!isEven ? (
          <>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(26px,3vw,42px)",
                fontWeight: 300,
                color: "#c9a96e",
                display: "block",
                lineHeight: 1,
                marginBottom: 4,
              }}
            >
              {item.year}
            </span>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 9,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "rgba(201,169,110,0.55)",
                display: "block",
                marginBottom: 10,
              }}
            >
              {item.event}
            </span>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 300,
                fontSize: "clamp(12px,1.1vw,14px)",
                lineHeight: 1.85,
                color: "rgba(248,244,237,0.5)",
                maxWidth: 300,
              }}
            >
              {item.desc}
            </p>
          </>
        ) : null}
      </motion.div>
    </div>
  );
}

export default function AboutClient() {
  return (
    <main style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      <PageHero
        eyebrow="Our Story"
        title={["A Legacy", "of Excellence"]}
        accentIdx={1}
        subtitle="Since 1999, Aurum Hotel has set the standard for intimate luxury in Manhattan — one guest, one memory, one perfect moment at a time."
        image="https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1800&q=85"
        imageAlt="Aurum Hotel grand lobby — marble columns and golden architectural grandeur"
      />

      {/* ── Philosophy ─────────────────────────────────────────────────────── */}
      <section style={{ padding: "clamp(80px,10vw,150px) 0" }}>
        <div className="container">
          <div
            className="about-split"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(48px,8vw,120px)",
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
                Our Philosophy
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(32px,4.5vw,62px)",
                  fontWeight: 300,
                  color: "#f8f4ed",
                  lineHeight: 1.0,
                  marginBottom: 28,
                }}
              >
                Hospitality is
                <br />
                <em style={{ fontStyle: "italic", color: "#c9a96e" }}>
                  a Work of Art
                </em>
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 300,
                  fontSize: "clamp(13px,1.2vw,15.5px)",
                  lineHeight: 1.9,
                  color: "rgba(248,244,237,0.55)",
                  marginBottom: 18,
                  maxWidth: 460,
                }}
              >
                We believe a hotel is more than a place to sleep — it is a stage
                for the most important moments of a life. Anniversaries,
                proposals, farewells, first nights in a new city.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 300,
                  fontSize: "clamp(13px,1.2vw,15.5px)",
                  lineHeight: 1.9,
                  color: "rgba(248,244,237,0.55)",
                  maxWidth: 460,
                }}
              >
                Aurum was founded on the conviction that genuine luxury is not
                measured in thread count or square footage, but in the feeling a
                guest carries home: that they were truly seen, truly cared for.
              </p>
            </SlideLeft>
            <SlideRight>
              <div
                style={{
                  position: "relative",
                  aspectRatio: "3/4",
                  overflow: "hidden",
                  boxShadow: "0 40px 100px rgba(0,0,0,0.65)",
                }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=85"
                  alt="Aurum Hotel exterior — golden facade glowing at dusk"
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

      {/* ── Values ─────────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="values-heading"
        style={{
          background: "#080807",
          borderTop: "1px solid rgba(201,169,110,0.08)",
          padding: "clamp(64px,8vw,110px) 0",
        }}
      >
        <div className="container">
          <FadeUp
            style={{
              textAlign: "center",
              marginBottom: "clamp(48px,6vw,72px)",
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
              What We Stand For
            </span>
            <h2
              id="values-heading"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px,4vw,56px)",
                fontWeight: 300,
                color: "#f8f4ed",
              }}
            >
              Our{" "}
              <em style={{ fontStyle: "italic", color: "#c9a96e" }}>Values</em>
            </h2>
          </FadeUp>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(min(100%, 240px), 1fr))",
              gap: "clamp(12px,2vw,22px)",
            }}
          >
            {VALUES.map((v, i) => (
              <FadeUp key={v.title} delay={i * 0.09}>
                <div
                  style={{
                    padding: "clamp(24px,3vw,36px)",
                    border: "1px solid rgba(201,169,110,0.1)",
                    background: "rgba(201,169,110,0.02)",
                    height: "100%",
                  }}
                >
                  <span
                    style={{
                      color: "#c9a96e",
                      fontSize: 16,
                      display: "block",
                      marginBottom: 16,
                    }}
                  >
                    {v.icon}
                  </span>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(20px,2vw,26px)",
                      fontWeight: 400,
                      color: "#f8f4ed",
                      marginBottom: 12,
                    }}
                  >
                    {v.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 13,
                      lineHeight: 1.8,
                      color: "rgba(248,244,237,0.5)",
                    }}
                  >
                    {v.desc}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ───────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="timeline-heading"
        style={{ padding: "clamp(64px,8vw,110px) 0" }}
      >
        <div className="container">
          <FadeUp
            style={{
              textAlign: "center",
              marginBottom: "clamp(56px,7vw,96px)",
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
              Milestones
            </span>
            <h2
              id="timeline-heading"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px,4vw,56px)",
                fontWeight: 300,
                color: "#f8f4ed",
              }}
            >
              25 Years of{" "}
              <em style={{ fontStyle: "italic", color: "#c9a96e" }}>History</em>
            </h2>
          </FadeUp>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            {TIMELINE.map((item, i) => (
              <TimelineItem key={item.year} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ───────────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="team-heading"
        style={{
          background: "#080807",
          borderTop: "1px solid rgba(201,169,110,0.08)",
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
              The People Behind Aurum
            </span>
            <h2
              id="team-heading"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px,4vw,56px)",
                fontWeight: 300,
                color: "#f8f4ed",
              }}
            >
              Meet Our{" "}
              <em style={{ fontStyle: "italic", color: "#c9a96e" }}>Team</em>
            </h2>
          </FadeUp>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(min(100%, 240px), 1fr))",
              gap: "clamp(16px,2.5vw,28px)",
            }}
          >
            {TEAM.map((member, i) => (
              <FadeUp key={member.name} delay={i * 0.1}>
                <div
                  itemScope
                  itemType="https://schema.org/Person"
                  style={{ textAlign: "center" }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: 96,
                      height: 96,
                      borderRadius: "50%",
                      overflow: "hidden",
                      margin: "0 auto 20px",
                      border: "1px solid rgba(201,169,110,0.3)",
                      boxShadow: "0 0 28px rgba(201,169,110,0.1)",
                    }}
                  >
                    <Image
                      src={member.img}
                      alt={`Portrait of ${member.name}`}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="96px"
                    />
                  </div>
                  <h3
                    itemProp="name"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(18px,2vw,24px)",
                      fontWeight: 400,
                      color: "#f8f4ed",
                      marginBottom: 4,
                    }}
                  >
                    {member.name}
                  </h3>
                  <p
                    itemProp="jobTitle"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 10,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "#c9a96e",
                      marginBottom: 12,
                    }}
                  >
                    {member.role}
                  </p>
                  <p
                    itemProp="description"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 12,
                      lineHeight: 1.75,
                      color: "rgba(248,244,237,0.46)",
                    }}
                  >
                    {member.bio}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Awards ─────────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="awards-heading"
        style={{ padding: "clamp(64px,8vw,110px) 0" }}
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
                marginBottom: 14,
              }}
            >
              Recognition
            </span>
            <h2
              id="awards-heading"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px,4vw,56px)",
                fontWeight: 300,
                color: "#f8f4ed",
              }}
            >
              Awards &{" "}
              <em style={{ fontStyle: "italic", color: "#c9a96e" }}>
                Accolades
              </em>
            </h2>
          </FadeUp>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(min(100%, 180px), 1fr))",
              gap: "clamp(10px,1.5vw,16px)",
            }}
          >
            {AWARDS.map((award, i) => (
              <FadeUp key={award} delay={i * 0.07}>
                <div
                  style={{
                    padding: "20px 16px",
                    border: "1px solid rgba(201,169,110,0.12)",
                    textAlign: "center",
                    background: "rgba(201,169,110,0.02)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 11,
                      letterSpacing: "0.1em",
                      color: "rgba(248,244,237,0.58)",
                      lineHeight: 1.6,
                    }}
                  >
                    {award}
                  </span>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 860px)  { .about-split { grid-template-columns: 1fr !important; } }
        @media (max-width: 600px)  {
          .tl-row { grid-template-columns: 1fr !important; }
          .tl-row > div:nth-child(2) { display: none !important; }
        }
      `}</style>
    </main>
  );
}
