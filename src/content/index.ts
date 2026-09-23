import { archiveGap, edition, foyer, pastEditions } from "./edition";
import { faqs } from "./faq";
import { sessions, speakers } from "./program";
import { raffle } from "./raffle";
import { sponsors, sponsorTiers } from "./sponsors";

export async function getContent() {
  return {
    edition,
    sessions: [...sessions].sort((a, b) => a.startsAt.localeCompare(b.startsAt)),
    speakers: speakers.filter((s) => s.visible).sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    sponsorTiers: [...sponsorTiers].sort((a, b) => a.order - b.order),
    sponsors,
    raffle,
    faqs: [...faqs].sort((a, b) => a.order - b.order),
    foyer,
    pastEditions: [...pastEditions].sort((a, b) => a.year - b.year),
    archiveGap,
  };
}

export type Content = Awaited<ReturnType<typeof getContent>>;
