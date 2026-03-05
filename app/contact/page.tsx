import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact & Reservations — Aurum Hotel",
  description:
    "Reserve your suite at Aurum Hotel or connect with our concierge team. Direct line: +1 (800) 287-6678. We respond within two hours, every day of the year.",
  keywords: [
    "book Aurum Hotel",
    "hotel reservation Manhattan",
    "luxury hotel contact NYC",
    "concierge service New York",
  ],
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact & Reservations — Aurum Hotel",
    description:
      "Reserve your suite or connect with our concierge — available 24 hours a day.",
    url: "/contact",
    images: [
      {
        url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=80",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
