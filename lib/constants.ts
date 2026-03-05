export const SITE = {
  name: "Aurum Hotel",
  tagline: "Where Luxury Meets Eternity",
  description:
    "Aurum Hotel — an icon of refined luxury nestled in the heart of the city. Experience timeless elegance, world-class dining, and unparalleled service.",
  url: "https://aurumhotel.com",
  phone: "+1 (800) 287-6678",
  email: "reservations@aurumhotel.com",
  address: "1 Aurum Plaza, New York, NY 10001",
  instagram: "https://instagram.com/aurumhotel",
  twitter: "https://twitter.com/aurumhotel",
};

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Rooms & Suites", href: "/rooms" },
  { label: "Dining", href: "/dining" },
  { label: "Spa & Wellness", href: "/spa" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/** Pexels / Unsplash free-use hotel video for hero background */
export const HERO_VIDEO_URL =
  "https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38aad8f922dca9be1&profile_id=165&oauth2_token_id=57447761";

/** Fallback poster image while video loads */
export const HERO_POSTER_URL =
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1920&q=80";
