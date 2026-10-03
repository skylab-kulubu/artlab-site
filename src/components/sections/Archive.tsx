import type { Content } from "@/content";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { sectionArt, type Theme } from "@/themes";
import { Slideshow } from "./Slideshow";
import { EditableRegion } from "inscribed";

export function Archive({ content, theme }: { content: Content; theme: Theme }) {
  const { Motif, Pose } = sectionArt(theme, "arsiv");
  const slides = content.pastEditions.flatMap(({ year, dateLabel, gallery = [] }) =>
    gallery.map((image) => ({ ...image, year, dateLabel })),
  );

  return (
    <Section id="arsiv" motif={Motif && <Motif />}>
      <SectionHeader
        section="arsiv"
        title={<EditableRegion scope="global" blockPath="arsiv.baslik" blockType="ShortText" defaultValue="Geçmiş yıllar" />}
        lead={<EditableRegion scope="global" blockPath="arsiv.aciklama" blockType="LongText" defaultValue="Önceki ARTLAB'lerden kareler." />}
        illustration={Pose && <Pose />}
      />
      <div className="reveal">
        <Slideshow slides={slides} />
      </div>
    </Section>
  );
}
