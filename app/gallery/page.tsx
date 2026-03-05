import type { Metadata } from "next";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Gallery — Aurum Hotel",
  description:
    "Explore the visual story of Aurum Hotel — iconic architecture, bespoke suites, Michelin-starred cuisine, and the warm golden light that defines every space.",
  keywords: [
    "luxury hotel photos",
    "Aurum Hotel gallery",
    "hotel interior photography",
    "Manhattan luxury hotel images",
  ],
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Gallery — Aurum Hotel",
    description: "A visual journey through Aurum Hotel Manhattan.",
    url: "/gallery",
    images: [
      {
        url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Aurum Hotel lobby",
      },
    ],
  },
};

export default function GalleryPage() {
  return <GalleryClient />;
}
