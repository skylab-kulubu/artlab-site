import type { Metadata } from "next";
import { Site } from "@/components/Site";
import { getContent } from "@/content";
import { getTheme } from "@/themes";

export const metadata: Metadata = { title: "Boş CMS önizlemesi", robots: { index: false, follow: false } };

// The site before anything is announced, so every empty state can be checked at once.
export default async function EmptyPreview() {
  const content = await getContent();
  const { edition } = content;
  return (
    <Site
      content={{
        ...content,
        edition: { ...edition, startsAt: undefined, endsAt: undefined, registrationUrl: undefined, programNote: undefined },
        sessions: [],
        speakers: [],
        sponsors: [],
        raffle: { ...content.raffle, enabled: false, prizes: [] },
        faqs: [],
        pastEditions: [],
      }}
      theme={getTheme()}
      intro={false}
    />
  );
}
