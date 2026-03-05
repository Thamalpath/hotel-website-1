import Link from "next/link";
import HotelLogo from "@/components/ui/HotelLogo";
import { NAV_LINKS, SITE } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      style={{
        background: "#0a0a0a",
        borderTop: "1px solid rgba(201,169,110,0.1)",
        padding: "80px 0 40px",
      }}
    >
      <div className="container">
        {/* Top grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 48,
            marginBottom: 64,
          }}
        >
          {/* Brand */}
          <div>
            <HotelLogo size="md" />
            <p
              style={{
                marginTop: 24,
                fontSize: 13,
                fontFamily: "var(--font-body)",
                fontWeight: 300,
                color: "rgba(248,244,237,0.5)",
                lineHeight: 1.8,
                maxWidth: 280,
              }}
            >
              {SITE.description}
            </p>
          </div>

          {/* Links */}
          <div>
            <p
              style={{
                fontSize: 10,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#c9a96e",
                marginBottom: 20,
                fontFamily: "var(--font-body)",
              }}
            >
              Navigation
            </p>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    style={{
                      fontSize: 13,
                      color: "rgba(248,244,237,0.6)",
                      fontFamily: "var(--font-body)",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p
              style={{
                fontSize: 10,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#c9a96e",
                marginBottom: 20,
                fontFamily: "var(--font-body)",
              }}
            >
              Contact
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[SITE.phone, SITE.email, SITE.address].map((item) => (
                <p
                  key={item}
                  style={{
                    fontSize: 13,
                    color: "rgba(248,244,237,0.5)",
                    fontFamily: "var(--font-body)",
                    lineHeight: 1.6,
                  }}
                >
                  {item}
                </p>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <p
              style={{
                fontSize: 10,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#c9a96e",
                marginBottom: 20,
                fontFamily: "var(--font-body)",
              }}
            >
              Follow Us
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {["Instagram", "Twitter", "Facebook", "LinkedIn"].map((s) => (
                <a
                  key={s}
                  href="#"
                  style={{
                    fontSize: 13,
                    color: "rgba(248,244,237,0.6)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(201,169,110,0.2), transparent)",
            marginBottom: 32,
          }}
        />

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <p
            style={{
              fontSize: 11,
              color: "rgba(248,244,237,0.3)",
              fontFamily: "var(--font-body)",
              letterSpacing: "0.06em",
            }}
          >
            © {year} {SITE.name}. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: 24 }}>
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (t) => (
                <a
                  key={t}
                  href="#"
                  style={{
                    fontSize: 11,
                    color: "rgba(248,244,237,0.3)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {t}
                </a>
              ),
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          footer > div > div:first-child { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          footer > div > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
