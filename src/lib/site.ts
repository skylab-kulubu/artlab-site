import type { Metadata } from "next";
import type { Edition } from "./types";
import { formatDateRange } from "./format";

export const SITE_URL = "https://artlab.yildizskylab.com";

// The sandbox deployment answers on a host starting with sandbox (sandbox-artlab.…,
// sandbox.…) and must stay out of search results. NEXTAUTH_URL is set per environment
// at runtime, so it tells the two apart.
export function isSandbox() {
  return /:\/\/sandbox[.-]/.test(process.env.NEXTAUTH_URL ?? "");
}

// Pages are indexed, the photos on them are not: they show attendees' faces.
export function robotsFor(): Metadata["robots"] {
  const index = !isSandbox();
  return { index, follow: index, googleBot: { index, follow: index, noimageindex: true } };
}

// The campus and the venue as one line, leaving out whichever has not been filled in yet.
export function venueLabel(venue: Edition["venue"], campusSuffix = "") {
  return [venue.campus && venue.campus + campusSuffix, venue.name].filter(Boolean).join(" · ");
}

export function siteTitle(edition: Edition) {
  return `ARTLAB ${edition.year} · Yapay Zeka Zirvesi`;
}

export function siteDescription(edition: Edition) {
  const when = edition.startsAt && edition.endsAt ? formatDateRange(edition.startsAt, edition.endsAt) : "Tarih yakında";
  return `YTÜ SKY LAB'in yapay zekâ zirvesi ARTLAB ${edition.year}, ${edition.number}. edisyon: ${[when, venueLabel(edition.venue)].filter(Boolean).join(" · ")}. Sektörden ve akademiden konuşmacılar, workshoplar, fuaye ve çekilişler. Katılım ücretsiz.`;
}
