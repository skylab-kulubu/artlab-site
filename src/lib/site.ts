import type { Edition } from "./types";
import { formatDateRange } from "./format";

export const SITE_URL = "https://artlab.yildizskylab.com";

export function siteTitle(edition: Edition) {
  return `ARTLAB ${edition.year} · Yapay Zeka Zirvesi`;
}

export function siteDescription(edition: Edition) {
  const when = edition.startsAt && edition.endsAt ? formatDateRange(edition.startsAt, edition.endsAt) : "Tarih yakında";
  return `YTÜ SKY LAB'in yapay zekâ zirvesi ARTLAB ${edition.year}, ${edition.number}. edisyon: ${when} · ${edition.venue.campus}, ${edition.venue.name}. Sektörden ve akademiden konuşmacılar, workshoplar, fuaye ve çekilişler. Katılım ücretsiz.`;
}
