import type { Content } from "@/content";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { logoSize, tierSlot } from "@/lib/logo";
import type { Sponsor, SponsorTier } from "@/lib/types";
import { sectionArt, type Theme } from "@/themes";
import { EditableRegion } from "inscribed";

const cells: Record<SponsorTier["size"], string> = {
  lg: "basis-full md:basis-[calc(50%-1px)] h-[200px] md:h-[270px]",
  md: "basis-[calc(50%-1px)] lg:basis-[calc(25%-1px)] h-[130px] md:h-[170px]",
  sm: "basis-[calc(33.333%-1px)] lg:basis-[calc(16.666%-1px)] h-[100px] md:h-[124px]",
};

const labels: Record<SponsorTier["size"], string> = {
  lg: "text-amber",
  md: "text-ink/80",
  sm: "text-ink-2",
};

function Logo({ sponsor, tier }: { sponsor: Sponsor; tier: SponsorTier }) {
  const { width, height } = logoSize(sponsor.ratio, tierSlot[tier.size], sponsor.scale);
  const box = { width, maxWidth: "85%", aspectRatio: sponsor.ratio };

  if (!sponsor.logo) {
    return (
      <span
        style={box}
        className="grid place-items-center overflow-hidden border border-dashed border-path px-1 text-center text-[10px] leading-tight font-semibold text-ink-3"
      >
        {sponsor.name}
      </span>
    );
  }

  return (
    <span style={box} className="relative block">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={(sponsor.logoMono ?? sponsor.logo).src}
        alt={sponsor.name}
        width={width}
        height={height}
        className={`absolute inset-0 size-full object-contain transition-opacity duration-300 group-hover:opacity-0 ${
          sponsor.logoMono ? "" : "brightness-0 invert"
        }`}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={sponsor.logo.src}
        alt=""
        aria-hidden="true"
        width={width}
        height={height}
        className="absolute inset-0 size-full object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
    </span>
  );
}

function Cell({ sponsor, tier, first }: { sponsor: Sponsor; tier: SponsorTier; first: boolean }) {
  const logo = <Logo sponsor={sponsor} tier={tier} />;

  return (
    <div className={`group relative flex grow flex-col bg-bg ${cells[tier.size]}`}>
      {first && (
        <span className={`absolute top-3.5 left-4 text-[11px] font-bold tracking-[0.16em] uppercase ${labels[tier.size]}`}>
          {tier.name}
        </span>
      )}
      {sponsor.url ? (
        <a href={sponsor.url} target="_blank" rel="noopener noreferrer" className="flex grow items-center justify-center">
          {logo}
        </a>
      ) : (
        <div className="flex grow items-center justify-center">{logo}</div>
      )}
      {tier.size === "lg" && sponsor.foyerNote && (
        <div className="flex items-center justify-between gap-4 border-t border-line-2 px-5 py-3.5 text-sm text-ink-2">
          <span>
            <span className="font-bold text-ink">Fuayede:</span> {sponsor.foyerNote}
          </span>
          <a href="#fuaye" className="font-bold">
            Stant
          </a>
        </div>
      )}
    </div>
  );
}

export function Sponsors({ content, theme }: { content: Content; theme: Theme }) {
  const { sponsors, sponsorTiers } = content;
  const { Pose } = sectionArt(theme, "destekciler");
  const tiers = sponsorTiers
    .map((tier) => ({ tier, members: sponsors.filter((s) => s.tierId === tier.id) }))
    .filter((t) => t.members.length);

  return (
    <Section id="destekciler" className="gap-11">
      <SectionHeader
        section="destekciler"
        title={<EditableRegion blockPath="destekciler.baslik" blockType="ShortText" defaultValue="Destekçiler" />}
        lead={<EditableRegion blockPath="destekciler.aciklama" blockType="LongText" defaultValue="ARTLAB'i mümkün kılanlar. Çoğunu fuayede de bulabilirsin." />}
        illustration={Pose && <Pose />}
      />
      <div className="flex flex-col gap-px border border-line bg-line">
        {tiers.map(({ tier, members }) => (
          <div key={tier.id} className="flex flex-wrap gap-px">
            {members.map((sponsor, i) => (
              <Cell key={sponsor.id} sponsor={sponsor} tier={tier} first={i === 0} />
            ))}
          </div>
        ))}
      </div>
    </Section>
  );
}
