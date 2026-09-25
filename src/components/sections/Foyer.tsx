import type { Content } from "@/content";
import { Chamfer } from "@/components/ui/Chamfer";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { sectionArt, type Theme } from "@/themes";

function NetworkIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 36 36" aria-hidden="true" fill="none" strokeWidth="1.8">
      <g stroke="var(--color-amber)">
        <circle cx="9" cy="18" r="5" />
        <circle cx="27" cy="9" r="5" />
        <circle cx="27" cy="27" r="5" />
      </g>
      <path d="M13.5 16 L22.5 11 M13.5 20 L22.5 25" stroke="var(--color-cyan)" />
    </svg>
  );
}

function TreatIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 36 36" aria-hidden="true" fill="none" strokeWidth="1.8">
      <path d="M8 14 H28 L26 30 H10 Z" stroke="var(--color-amber)" />
      <path d="M13 14 V10 A5 5 0 0 1 23 10 V14" stroke="var(--color-cyan)" />
    </svg>
  );
}

const small = [
  { title: "Networking", text: "Konuşmacılarla ve sektörden katılımcılarla tanış.", Icon: NetworkIcon },
  { title: "İkram", text: "Ürün sponsorlarımızdan gün boyu fuayede.", Icon: TreatIcon },
];

export function Foyer({ content, theme }: { content: Content; theme: Theme }) {
  const { foyer } = content;
  const { Motif, Pose } = sectionArt(theme, "fuaye");
  const standLine = [foyer.standCount && `${foyer.standCount} stant`, "ürün demoları, staj ve kariyer görüşmeleri"]
    .filter(Boolean)
    .join(" · ");

  return (
    <Section id="fuaye" motif={Motif && <Motif />}>
      <SectionHeader
        section="fuaye"
        title="Fuaye"
        lead="Oturum aralarında stantları gez, demoları dene."
        illustration={Pose && <Pose />}
      />
      <div className="grid gap-6 md:grid-cols-3 md:grid-rows-[210px_210px]">
        <Chamfer className="md:col-span-2 md:row-span-2" innerClassName="relative flex min-h-[300px] flex-col justify-end overflow-hidden p-7 md:p-9">
          {foyer.photo && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={foyer.photo.src} alt={foyer.photo.alt} className="absolute inset-0 size-full object-cover" />
              <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-bg via-bg/60 to-transparent" />
            </>
          )}
          <div className="relative">
            <h3 className="font-display text-2xl font-semibold md:text-[30px]">Sponsor stantları</h3>
            <p className="mt-2.5 text-base text-ink-2 first-letter:uppercase">{standLine}</p>
          </div>
        </Chamfer>
        {small.map(({ title, text, Icon }) => (
          <Chamfer key={title} surface="bg" innerClassName="flex flex-col justify-between gap-6 p-7">
            <Icon />
            <div>
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="mt-2 text-[15px] leading-normal text-ink-2">{text}</p>
            </div>
          </Chamfer>
        ))}
      </div>
    </Section>
  );
}
