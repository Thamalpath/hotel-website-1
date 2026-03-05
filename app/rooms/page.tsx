import type { Metadata } from "next";
import RoomsClient from "./RoomsClient";

export const metadata: Metadata = {
  title: "Rooms & Suites — Aurum Hotel",
  description:
    "Discover 180 bespoke suites at Aurum Hotel Manhattan. From Deluxe King rooms to the sky-high Penthouse — every space is a masterpiece of comfort, craftsmanship, and breathtaking city views.",
  keywords: [
    "luxury hotel rooms",
    "Manhattan hotel suites",
    "hotel penthouse New York",
    "5-star hotel rooms NYC",
  ],
  alternates: { canonical: "/rooms" },
  openGraph: {
    title: "Rooms & Suites — Aurum Hotel",
    description:
      "180 bespoke suites in the heart of Manhattan. Discover your perfect space.",
    url: "/rooms",
    images: [
      {
        url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Aurum Hotel Grand Suite",
      },
    ],
  },
};

export default function RoomsPage() {
  return <RoomsClient />;
}
