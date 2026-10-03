import type { Content } from "@/content";
import { Chamfer } from "@/components/ui/Chamfer";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { sectionArt, type Theme } from "@/themes";
import { EditableRegion } from "inscribed";

type Icon = Content["why"]["items"][number]["icon"];

const AMBER = "var(--color-amber)";
const CYAN = "var(--color-cyan)";

function WhyIcon({ icon }: { icon: Icon }) {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true" fill="none" strokeWidth="1.8">
      {icon === "dinle" && (
        <>
          <circle cx="18" cy="18" r="14" stroke={AMBER} />
          <circle cx="18" cy="18" r="5" stroke={CYAN} />
        </>
      )}
      {icon === "ag" && (
        <>
          <circle cx="9" cy="18" r="5" stroke={AMBER} />
          <circle cx="27" cy="9" r="5" stroke={AMBER} />
          <circle cx="27" cy="27" r="5" stroke={AMBER} />
          <path d="M13.5 16 L22.5 11 M13.5 20 L22.5 25" stroke={CYAN} />
        </>
      )}
      {icon === "sertifika" && (
        <>
          <rect x="6" y="5" width="24" height="26" rx="3" stroke={AMBER} />
          <path d="M12 13 H24 M12 19 H20" stroke={AMBER} />
          <circle cx="24" cy="26" r="4" stroke={CYAN} />
        </>
      )}
    </svg>
  );
}

export function Why({ content, theme }: { content: Content; theme: Theme }) {
  const { Motif, Pose } = sectionArt(theme, "neden");

  return (
    <Section id="neden" motif={Motif && <Motif />}>
      <SectionHeader section="neden" title={<EditableRegion blockPath="neden.baslik" blockType="ShortText" defaultValue="Neden ARTLAB" />} lead={<EditableRegion blockPath="neden.aciklama" blockType="LongText" defaultValue="Yapay zekânın bugününü ve yarınını, onu inşa edenlerden dinle." />} illustration={Pose && <Pose />} />
      <div className="reveal-group grid gap-6 md:grid-cols-3">
        {content.why.items.map((item, i) => (
          <Chamfer key={item.icon} border={i === 0 ? "amber" : "line"} surface="bg" innerClassName="flex flex-col gap-3.5 p-8">
            <WhyIcon icon={item.icon} />
            <h3 className="text-[21px] font-bold">{item.title}</h3>
            <p className="text-[15px] leading-relaxed text-ink-2">{item.text}</p>
          </Chamfer>
        ))}
      </div>
    </Section>
  );
}
