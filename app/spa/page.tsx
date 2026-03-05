import type { Metadata } from "next";
import SpaClient from "./SpaClient";

export const metadata: Metadata = {
  title: "Spa & Wellness — Aurum Hotel",
  description:
    "A 12,000 sq ft sanctuary of calm at Aurum Hotel Manhattan. World-class treatments, thermal pools, cryotherapy, and holistic wellness rituals designed to restore body and mind.",
  keywords: [
    "luxury spa NYC",
    "hotel spa Manhattan",
    "wellness retreat New York",
    "5-star spa hotel",
  ],
  alternates: { canonical: "/spa" },
  openGraph: {
    title: "Spa & Wellness — Aurum Hotel",
    description:
      "12,000 sq ft of pure restoration. Discover the Aurum Spa experience.",
    url: "/spa",
    images: [
      {
        url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Aurum Spa serene treatment room",
      },
    ],
  },
};

export default function SpaPage() {
  return <SpaClient />;
}
