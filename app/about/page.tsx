import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About — Aurum Hotel",
  description:
    "The story of Aurum Hotel — 25 years of unmatched luxury in Manhattan. Discover our history, philosophy, award-winning team, and the values that define every guest experience.",
  keywords: [
    "about Aurum Hotel",
    "luxury hotel history Manhattan",
    "hotel philosophy",
    "award winning hotel NYC",
  ],
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Aurum Hotel — Our Story",
    description:
      "25 years of luxury, craftsmanship, and genuine hospitality in the heart of Manhattan.",
    url: "/about",
    images: [
      {
        url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=80",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
