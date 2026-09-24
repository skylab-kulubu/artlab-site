import type { Content } from "@/content";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SoonCard } from "@/components/ui/SoonCard";
import { sectionArt, type Theme } from "@/themes";
import { DayTabs, ProgramDays, SessionList } from "./ProgramDays";

export function Program({ content, theme }: { content: Content; theme: Theme }) {
  const { sessions, speakers, edition, fetchedAt } = content;
  const { Motif, Pose } = sectionArt(theme, "program");
  const instagram = edition.contact.instagram;

  if (!sessions.length) {
    return (
      <Section id="program">
        <SectionHeader section="program" title="Program" illustration={Pose && <Pose />} />
        <SoonCard
          theme={theme}
          title="Program hazırlanıyor"
          text="Oturumlar ve saatler netleştikçe burada görünecek."
          link={instagram ? { href: instagram, label: "Takip et" } : undefined}
        />
      </Section>
    );
  }

  return (
    <Section id="program" motif={Motif && <Motif />}>
      <ProgramDays sessions={sessions} serverNow={fetchedAt}>
        <SectionHeader
          section="program"
          title="Program"
          lead={edition.programNote}
          illustration={Pose && <Pose />}
          aside={<DayTabs />}
        />
        <SessionList speakers={speakers} />
      </ProgramDays>
    </Section>
  );
}
