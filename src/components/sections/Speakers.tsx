import type { Content } from "@/content";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SoonCard } from "@/components/ui/SoonCard";
import { speakerSession } from "@/lib/program";
import { sectionArt, type Theme } from "@/themes";
import { SpeakerCard } from "./SpeakerCard";
import { EditableRegion } from "inscribed";

export function Speakers({ content, theme }: { content: Content; theme: Theme }) {
  const { speakers, sessions, edition } = content;
  const { Pose } = sectionArt(theme, "konusmacilar");
  const instagram = edition.contact.instagram;
  const multiDay = new Set(sessions.map((s) => s.day)).size > 1;

  return (
    <Section id="konusmacilar" className="gap-8">
      <SectionHeader section="konusmacilar" title={<EditableRegion blockPath="konusmacilar.baslik" blockType="ShortText" defaultValue="Konuşmacılar" />} illustration={Pose && <Pose />} />
      {speakers.length ? (
        <div className="reveal-group grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 xl:grid-cols-5">
          {speakers.map((speaker, i) => (
            <SpeakerCard key={speaker.id} speaker={speaker} n={i + 1} session={speakerSession(sessions, speaker.id)} multiDay={multiDay} />
          ))}
        </div>
      ) : (
        <SoonCard
          theme={theme}
          title="Konuşmacılar açıklanacak"
          text="Tüm isimler birlikte duyurulacak."
          link={instagram ? { href: instagram, label: "Takip et" } : undefined}
        />
      )}
    </Section>
  );
}
