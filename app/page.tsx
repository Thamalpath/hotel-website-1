import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.tagline}`,
  description: SITE.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* ── Placeholder for below-the-fold sections (future pages) ──── */}
      {/* These would be: FeaturedRooms, AboutTeaser, DiningTeaser, SpaTeaser, GalleryTeaser, Testimonials, BookingWidget */}
    </>
  );
}
