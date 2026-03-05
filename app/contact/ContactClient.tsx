"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import { FadeUp, SlideLeft, SlideRight } from "@/components/ui/Reveal";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { SITE } from "@/lib/constants";

const ENQUIRY_TYPES = [
  "Suite Reservation",
  "Dining Reservation",
  "Spa Booking",
  "Events & Weddings",
  "General Enquiry",
];

const INFO_CARDS = [
  {
    icon: "◈",
    title: "Address",
    lines: ["1 Aurum Plaza", "New York, NY 10001"],
  },
  { icon: "◈", title: "Reservations", lines: [SITE.phone, SITE.email] },
  {
    icon: "◈",
    title: "Concierge",
    lines: ["Available 24/7", "concierge@aurumhotel.com"],
  },
  {
    icon: "◈",
    title: "Hours",
    lines: ["Check-in: from 3:00 PM", "Check-out: until 12:00 PM"],
  },
];

function InputField({
  label,
  type = "text",
  placeholder,
  required,
  as,
  rows,
}: {
  label: string;
  type?: string;
  placeholder: string;
  required?: boolean;
  as?: "textarea";
  rows?: number;
}) {
  const [focused, setFocused] = useState(false);
  const base: React.CSSProperties = {
    width: "100%",
    background: "rgba(201,169,110,0.03)",
    border: "1px solid",
    borderColor: focused ? "rgba(201,169,110,0.45)" : "rgba(201,169,110,0.15)",
    padding: "14px 18px",
    fontFamily: "var(--font-body)",
    fontSize: 13,
    color: "#f8f4ed",
    outline: "none",
    transition: "border-color 0.3s ease",
    resize: as === "textarea" ? "vertical" : undefined,
    minHeight: as === "textarea" ? 120 : undefined,
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <label
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 10,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "rgba(201,169,110,0.65)",
        }}
      >
        {label}
        {required && <span style={{ color: "#c9a96e", marginLeft: 4 }}>*</span>}
      </label>
      {as === "textarea" ? (
        <textarea
          placeholder={placeholder}
          required={required}
          rows={rows ?? 5}
          style={base}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          aria-label={label}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          required={required}
          style={base}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          aria-label={label}
        />
      )}
    </div>
  );
}

export default function ContactClient() {
  const [selectedType, setSelectedType] = useState(ENQUIRY_TYPES[0]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      <PageHero
        eyebrow="Reservations & Contact"
        title={["Begin Your", "Journey"]}
        accentIdx={1}
        subtitle="Our concierge team is available around the clock to craft your perfect Aurum experience."
        image="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1800&q=85"
        imageAlt="Aurum Hotel exterior — golden facade inviting guests to arrive"
      />

      {/* Info cards */}
      <section
        aria-label="Contact information"
        style={{ padding: "clamp(64px,8vw,100px) 0" }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "clamp(12px,2vw,20px)",
              marginBottom: "clamp(72px,9vw,120px)",
            }}
          >
            {INFO_CARDS.map((card, i) => (
              <FadeUp key={card.title} delay={i * 0.09}>
                <div
                  itemScope
                  itemType="https://schema.org/ContactPoint"
                  style={{
                    padding: "clamp(24px,3vw,32px)",
                    border: "1px solid rgba(201,169,110,0.12)",
                    background: "rgba(201,169,110,0.025)",
                    height: "100%",
                  }}
                >
                  <span
                    style={{
                      color: "#c9a96e",
                      fontSize: 16,
                      display: "block",
                      marginBottom: 14,
                    }}
                  >
                    {card.icon}
                  </span>
                  <h3
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 10,
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      color: "#c9a96e",
                      marginBottom: 14,
                    }}
                  >
                    {card.title}
                  </h3>
                  {card.lines.map((l) => (
                    <p
                      key={l}
                      itemProp="contactType"
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 13,
                        color: "rgba(248,244,237,0.6)",
                        lineHeight: 1.7,
                      }}
                    >
                      {l}
                    </p>
                  ))}
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Main form + sidebar */}
          <div
            className="contact-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 380px",
              gap: "clamp(32px,5vw,72px)",
              alignItems: "start",
            }}
          >
            {/* Form */}
            <SlideLeft>
              <div
                style={{
                  background: "#0c0b08",
                  border: "1px solid rgba(201,169,110,0.12)",
                  padding: "clamp(32px,5vw,56px)",
                }}
              >
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(28px,3.5vw,48px)",
                    fontWeight: 300,
                    color: "#f8f4ed",
                    marginBottom: 8,
                  }}
                >
                  Send us a{" "}
                  <em style={{ fontStyle: "italic", color: "#c9a96e" }}>
                    Message
                  </em>
                </h2>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    color: "rgba(248,244,237,0.45)",
                    marginBottom: 36,
                    lineHeight: 1.6,
                  }}
                >
                  We respond within 2 hours, every day of the year.
                </p>

                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.form
                      key="form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -20 }}
                      onSubmit={handleSubmit}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 22,
                      }}
                      itemScope
                      itemType="https://schema.org/ContactPage"
                      noValidate
                    >
                      {/* Enquiry type selector */}
                      <div>
                        <p
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: 10,
                            letterSpacing: "0.22em",
                            textTransform: "uppercase",
                            color: "rgba(201,169,110,0.65)",
                            marginBottom: 10,
                          }}
                        >
                          Enquiry Type
                        </p>
                        <div
                          style={{ display: "flex", flexWrap: "wrap", gap: 8 }}
                        >
                          {ENQUIRY_TYPES.map((t) => (
                            <motion.button
                              key={t}
                              type="button"
                              onClick={() => setSelectedType(t)}
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              style={{
                                fontFamily: "var(--font-body)",
                                fontSize: 9,
                                letterSpacing: "0.16em",
                                textTransform: "uppercase",
                                padding: "8px 16px",
                                background:
                                  selectedType === t
                                    ? "rgba(201,169,110,0.12)"
                                    : "transparent",
                                color:
                                  selectedType === t
                                    ? "#c9a96e"
                                    : "rgba(248,244,237,0.4)",
                                border: "1px solid",
                                borderColor:
                                  selectedType === t
                                    ? "rgba(201,169,110,0.4)"
                                    : "rgba(201,169,110,0.1)",
                                transition: "all 0.3s ease",
                              }}
                            >
                              {t}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      <div
                        className="form-row"
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: 20,
                        }}
                      >
                        <InputField
                          label="First Name"
                          placeholder="James"
                          required
                        />
                        <InputField
                          label="Last Name"
                          placeholder="Harwood"
                          required
                        />
                      </div>
                      <InputField
                        label="Email Address"
                        type="email"
                        placeholder="james@example.com"
                        required
                      />
                      <InputField
                        label="Phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                      />
                      <div
                        className="form-row"
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: 20,
                        }}
                      >
                        <InputField
                          label="Check-In Date"
                          type="date"
                          placeholder=""
                        />
                        <InputField
                          label="Check-Out Date"
                          type="date"
                          placeholder=""
                        />
                      </div>
                      <InputField
                        label="Message"
                        placeholder="Tell us about your stay, special requests, or how we can help..."
                        as="textarea"
                        rows={5}
                      />

                      <motion.button
                        type="submit"
                        whileHover={{
                          scale: 1.02,
                          boxShadow: "0 8px 32px rgba(201,169,110,0.28)",
                        }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                          padding: "15px 40px",
                          alignSelf: "flex-start",
                          background:
                            "linear-gradient(105deg,#9a7a4a,#c9a96e 45%,#e8d5aa 60%,#c9a96e 80%,#9a7a4a)",
                          backgroundSize: "200% auto",
                          fontFamily: "var(--font-body)",
                          fontSize: 11,
                          letterSpacing: "0.22em",
                          textTransform: "uppercase",
                          color: "#0a0a0a",
                          fontWeight: 500,
                          border: "none",
                        }}
                        aria-label="Submit contact form"
                      >
                        Send Enquiry
                      </motion.button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
                      style={{ padding: "40px 0", textAlign: "center" }}
                      role="alert"
                      aria-live="polite"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          duration: 0.6,
                          ease: [0.34, 1.56, 0.64, 1],
                        }}
                        style={{
                          width: 64,
                          height: 64,
                          borderRadius: "50%",
                          border: "1px solid rgba(201,169,110,0.5)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "0 auto 24px",
                          color: "#c9a96e",
                          fontSize: 24,
                        }}
                      >
                        ✓
                      </motion.div>
                      <h3
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "clamp(24px,3vw,36px)",
                          fontWeight: 300,
                          color: "#f8f4ed",
                          marginBottom: 12,
                        }}
                      >
                        Message Received
                      </h3>
                      <p
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: 13,
                          color: "rgba(248,244,237,0.55)",
                          lineHeight: 1.7,
                          maxWidth: 360,
                          margin: "0 auto",
                        }}
                      >
                        Thank you for reaching out. Our concierge team will
                        respond within two hours.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </SlideLeft>

            {/* Sidebar */}
            <SlideRight>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 20 }}
              >
                {/* Direct booking card */}
                <div
                  style={{
                    padding: "clamp(24px,3vw,32px)",
                    background: "linear-gradient(140deg, #111009, #0c0b08)",
                    border: "1px solid rgba(201,169,110,0.2)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 10,
                      letterSpacing: "0.28em",
                      textTransform: "uppercase",
                      color: "#c9a96e",
                      display: "block",
                      marginBottom: 16,
                    }}
                  >
                    Direct Reservations
                  </span>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(22px,2.5vw,32px)",
                      fontWeight: 300,
                      color: "#f8f4ed",
                      marginBottom: 8,
                      lineHeight: 1.1,
                    }}
                  >
                    Call Us
                    <br />
                    Directly
                  </h3>
                  <a
                    href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(18px,2vw,24px)",
                      fontWeight: 300,
                      color: "#c9a96e",
                      display: "block",
                      marginBottom: 20,
                      letterSpacing: "0.02em",
                      textDecoration: "none",
                    }}
                  >
                    {SITE.phone}
                  </a>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 11,
                      color: "rgba(248,244,237,0.4)",
                      marginBottom: 8,
                      lineHeight: 1.6,
                    }}
                  >
                    Best rate guaranteed when booking direct.
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 11,
                      color: "rgba(201,169,110,0.55)",
                    }}
                  >
                    Available 24 hours · 7 days a week
                  </p>
                </div>

                {/* Email card */}
                <div
                  style={{
                    padding: "clamp(20px,3vw,28px)",
                    border: "1px solid rgba(201,169,110,0.1)",
                    background: "rgba(201,169,110,0.02)",
                  }}
                >
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
                    Email
                  </span>
                  <a
                    href={`mailto:${SITE.email}`}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 13,
                      color: "rgba(248,244,237,0.7)",
                      textDecoration: "none",
                      wordBreak: "break-all",
                    }}
                  >
                    {SITE.email}
                  </a>
                </div>

                {/* Social links */}
                <div
                  style={{
                    padding: "clamp(20px,3vw,28px)",
                    border: "1px solid rgba(201,169,110,0.1)",
                    background: "rgba(201,169,110,0.02)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 9,
                      letterSpacing: "0.24em",
                      textTransform: "uppercase",
                      color: "rgba(201,169,110,0.55)",
                      display: "block",
                      marginBottom: 16,
                    }}
                  >
                    Follow Aurum
                  </span>
                  <div style={{ display: "flex", gap: 16 }}>
                    {["Instagram", "Twitter", "Facebook"].map((s) => (
                      <a
                        key={s}
                        href="#"
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: 11,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: "rgba(248,244,237,0.5)",
                          textDecoration: "none",
                        }}
                      >
                        {s}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Address */}
                <div
                  style={{
                    padding: "clamp(20px,3vw,28px)",
                    border: "1px solid rgba(201,169,110,0.1)",
                    background: "rgba(201,169,110,0.02)",
                  }}
                  itemScope
                  itemType="https://schema.org/PostalAddress"
                >
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
                    Address
                  </span>
                  <p
                    itemProp="streetAddress"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 13,
                      color: "rgba(248,244,237,0.65)",
                      lineHeight: 1.7,
                    }}
                  >
                    1 Aurum Plaza
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 13,
                      color: "rgba(248,244,237,0.65)",
                    }}
                  >
                    <span itemProp="addressLocality">New York</span>,{" "}
                    <span itemProp="addressRegion">NY</span>{" "}
                    <span itemProp="postalCode">10001</span>
                  </p>
                </div>
              </div>
            </SlideRight>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 1100px) { .contact-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 560px)  { .form-row { grid-template-columns: 1fr !important; } }
      `}</style>
    </main>
  );
}
