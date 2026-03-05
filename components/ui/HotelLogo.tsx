import Link from "next/link";

interface HotelLogoProps {
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Override colour */
  color?: string;
}

export default function HotelLogo({
  size = "md",
  color = "#c9a96e",
}: HotelLogoProps) {
  const scale = size === "sm" ? 0.75 : size === "lg" ? 1.25 : 1;
  const iconH = Math.round(40 * scale);
  const iconW = Math.round(40 * scale);
  const textSz = Math.round(22 * scale);
  const subSz = Math.round(9 * scale);
  const gap = Math.round(12 * scale);

  return (
    <Link
      href="/"
      aria-label="Aurum Hotel — Home"
      style={{
        display: "flex",
        alignItems: "center",
        gap,
        textDecoration: "none",
      }}
    >
      {/* ── SVG hotel icon ──────────────────────────────────────────── */}
      <svg
        width={iconW}
        height={iconH}
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Crown / arch top */}
        <path
          d="M20 3 L7 12 L7 36 L33 36 L33 12 Z"
          stroke={color}
          strokeWidth="1.2"
          fill="none"
          strokeLinejoin="round"
        />
        {/* Central arch door */}
        <path
          d="M15 36 L15 26 Q15 20 20 20 Q25 20 25 26 L25 36"
          stroke={color}
          strokeWidth="1.2"
          fill="none"
        />
        {/* Left window */}
        <rect
          x="9.5"
          y="16"
          width="5"
          height="5"
          stroke={color}
          strokeWidth="1"
          fill="none"
          rx="0.5"
        />
        {/* Right window */}
        <rect
          x="25.5"
          y="16"
          width="5"
          height="5"
          stroke={color}
          strokeWidth="1"
          fill="none"
          rx="0.5"
        />
        {/* Crown peak diamonds */}
        <path d="M20 3 L17 8 L20 7 L23 8 Z" fill={color} />
        {/* Flagpole */}
        <line x1="20" y1="3" x2="20" y2="0.5" stroke={color} strokeWidth="1" />
        {/* Columns */}
        <line
          x1="12"
          y1="12"
          x2="12"
          y2="36"
          stroke={color}
          strokeWidth="0.8"
          opacity="0.5"
        />
        <line
          x1="28"
          y1="12"
          x2="28"
          y2="36"
          stroke={color}
          strokeWidth="0.8"
          opacity="0.5"
        />
        {/* Ground line */}
        <line x1="4" y1="36" x2="36" y2="36" stroke={color} strokeWidth="1.2" />
        {/* Steps */}
        <line
          x1="5.5"
          y1="38"
          x2="34.5"
          y2="38"
          stroke={color}
          strokeWidth="0.8"
          opacity="0.6"
        />
      </svg>

      {/* ── Wordmark ─────────────────────────────────────────────────── */}
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: textSz,
            fontWeight: 400,
            letterSpacing: "0.18em",
            color,
            textTransform: "uppercase",
          }}
        >
          Aurum
        </span>
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: subSz,
            fontWeight: 400,
            letterSpacing: "0.38em",
            color,
            textTransform: "uppercase",
            opacity: 0.75,
            marginTop: 2,
          }}
        >
          Hotel
        </span>
      </div>
    </Link>
  );
}
