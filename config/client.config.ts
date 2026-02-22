/**
 * ┌─────────────────────────────────────────────────┐
 * │  CLIENT CONFIG — Change these values for each   │
 * │  new client site. All other files read from      │
 * │  this single source of truth.                    │
 * └─────────────────────────────────────────────────┘
 *
 * When cloning this template for a new client:
 * 1. Update the values below
 * 2. Run `npm run dev` — the entire site reflects the new client
 *
 * These are hardcoded defaults. At runtime, values are overridden by:
 *   Google Sheet site_config tab → Environment variables → These defaults
 */

export const CLIENT = {
  /** Business name as it appears on the site */
  name: "Wall Works",

  /** Primary phone number */
  phone: "(555) 555-5555",

  /** Primary contact email */
  email: "info@wallworkshardscape.com",

  /** Production domain (with https://) */
  url: "https://wallworkshardscape.com",

  /** Tagline / slogan shown in hero and metadata */
  tagline: "Expert Retaining Walls & Masonry — Westmoreland County",

  /** Industry — drives AI content generation and SXO keyword strategy */
  industry: "Retaining Walls / Masonry",

  /** Primary service area */
  location: "Westmoreland County",

  /** Brand colors */
  colors: {
    /** Main brand color (buttons, headers, links) */
    primary: "#1a1a1a",
    /** Secondary color (hover states, accents) */
    secondary: "#ffffff",
    /** Accent color (CTAs, highlights, gradients) */
    accent: "#dc2626",
  },

  /** Footer description */
  footerText:
    "Expert retaining walls, stone masonry, and hardscape services in Westmoreland County. Quality craftsmanship guaranteed.",

  /** Admin dashboard title */
  adminTitle: "Wall Works",

  /** Admin dashboard subtitle */
  adminSubtitle: "Admin Dashboard",

  /** SEO fallback title (when Google Sheet config isn't connected yet) */
  seoTitle: "Wall Works Hardscape",

  /** SEO fallback description */
  seoDescription:
    "Expert retaining walls & masonry by Wall Works in Westmoreland County. Quality craftsmanship guaranteed.",

  /** localStorage key prefix for setup wizard */
  storagePrefix: "wallworks",
} as const;

export type ClientConfig = typeof CLIENT;
