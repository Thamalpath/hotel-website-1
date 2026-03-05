import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import FeaturedRoomsSection from "@/components/sections/FeaturedRoomsSection";
import DiningSection from "@/components/sections/DiningSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import BookingBannerSection from "@/components/sections/BookingBannerSection";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.tagline}`,
  description: SITE.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    url: "/",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ExperienceSection />
      <FeaturedRoomsSection />
      <DiningSection />
      <TestimonialsSection />
      <BookingBannerSection />
    </>
  );
}
