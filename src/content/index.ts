import { edition, foyer, pastEditions } from "./edition";
import { faqs } from "./faq";
import { sessions, speakers } from "./program";
import { raffle } from "./raffle";
import { sponsors, sponsorTiers } from "./sponsors";
import { why } from "./why";

export async function getContent() {
  return {
    edition,
    why,
    sessions: [...sessions].sort((a, b) => a.startsAt.localeCompare(b.startsAt)),
    speakers: speakers.filter((s) => s.visible).sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    sponsorTiers: [...sponsorTiers].sort((a, b) => a.order - b.order),
    sponsors,
    raffle,
    faqs: [...faqs].sort((a, b) => a.order - b.order),
    foyer,
    pastEditions: [...pastEditions].sort((a, b) => b.year - a.year),
    fetchedAt: Date.now(),
  };
}

export type Content = Awaited<ReturnType<typeof getContent>>;
