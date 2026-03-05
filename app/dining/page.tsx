import type { Metadata } from "next";
import DiningClient from "./DiningClient";

export const metadata: Metadata = {
  title: "Dining — Aurum Hotel",
  description:
    "Michelin-starred cuisine, intimate wine bars, and all-day dining experiences curated by world-renowned chefs. Discover Le Sommet and three other exceptional restaurants at Aurum Hotel.",
  keywords: [
    "Michelin star restaurant NYC",
    "fine dining Manhattan",
    "hotel restaurant New York",
    "luxury dining experience",
  ],
  alternates: { canonical: "/dining" },
  openGraph: {
    title: "Fine Dining — Aurum Hotel",
    description:
      "Michelin-starred cuisine in the heart of Manhattan. Reserve your table at Le Sommet.",
    url: "/dining",
    images: [
      {
        url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Le Sommet fine dining",
      },
    ],
  },
};

export default function DiningPage() {
  return <DiningClient />;
}
