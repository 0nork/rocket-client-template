export interface SiteConfig {
  name: string;
  phone: string;
  email: string;
  url: string;
  tagline?: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  crmTrackingId?: string;
  cro9Key?: string;
}

export function getSiteConfig(): SiteConfig {
  return {
    name: process.env.NEXT_PUBLIC_SITE_NAME || "Business Name",
    phone: process.env.NEXT_PUBLIC_SITE_PHONE || "(555) 555-5555",
    email: process.env.NEXT_PUBLIC_SITE_EMAIL || "info@example.com",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
    tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || "Professional Services You Can Trust",
    colors: {
      primary: process.env.NEXT_PUBLIC_COLOR_PRIMARY || "#2563eb",
      secondary: process.env.NEXT_PUBLIC_COLOR_SECONDARY || "#1e40af",
      accent: process.env.NEXT_PUBLIC_COLOR_ACCENT || "#f59e0b",
    },
    crmTrackingId: process.env.NEXT_PUBLIC_CRM_TRACKING_ID,
    cro9Key: process.env.NEXT_PUBLIC_CRO9_KEY,
  };
}
