import type { Content } from "@/content";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { logoSize, tierSlot } from "@/lib/logo";
import type { CSSProperties } from "react";
import type { Crop } from "@/lib/image-ratio";
import type { Sponsor, SponsorTier } from "@/lib/types";
import { sectionArt, type Theme } from "@/themes";
import { EditableRegion } from "inscribed";

const cells: Record<SponsorTier["size"], string> = {
  lg: "basis-full md:basis-[calc(50%-1px)] h-[200px] md:h-[270px]",
  // On phones the small cells leave the tier label room above the logo, in every cell so a row stays level.
  md: "basis-[calc(50%-1px)] lg:basis-[calc(20%-1px)] h-[130px] md:h-[170px] max-md:pt-6",
  sm: "basis-[calc(33.333%-1px)] lg:basis-[calc(16.666%-1px)] h-[100px] md:h-[124px] max-md:pt-6",
};

const labels: Record<SponsorTier["size"], string> = {
  lg: "text-amber",
  md: "text-ink/80",
  sm: "text-ink-2",
};

function Logo({ sponsor, tier }: { sponsor: Sponsor; tier: SponsorTier }) {
  const { width } = logoSize(sponsor.ratio, tierSlot[tier.size], sponsor.scale);
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

  if (sponsor.logoMono) {
    return (
      <span style={box} className="relative block">
        <Shown
          src={sponsor.logoMono.src}
          alt={sponsor.name}
          crop={sponsor.monoCrop}
          ratio={sponsor.monoRatio ?? sponsor.ratio}
          boxRatio={sponsor.ratio}
          className="transition-opacity duration-500 group-hover:opacity-0"
        />
        <Shown
          src={sponsor.logo.src}
          alt=""
          crop={sponsor.crop}
          ratio={sponsor.ratio}
          boxRatio={sponsor.ratio}
          className="opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      </span>
    );
  }

  return (
    <span style={box} className="relative block">
      <Shown
        src={sponsor.logo.src}
        alt={sponsor.name}
        crop={sponsor.crop}
        ratio={sponsor.ratio}
        boxRatio={sponsor.ratio}
        className="grayscale transition-[filter] duration-500 group-hover:grayscale-0"
      />
    </span>
  );
}

// An image fitted inside its box by the part that shows: a frame of that part's ratio is centred
// in the box, and the image inside it is scaled and shifted so its transparent margins fall outside.
function Shown({
  src,
  alt,
  crop,
  ratio,
  boxRatio,
  className,
}: {
  src: string;
  alt: string;
  crop?: Crop;
  ratio: number;
  boxRatio: number;
  className?: string;
}) {
  const frame: CSSProperties = ratio >= boxRatio ? { width: "100%", aspectRatio: ratio } : { height: "100%", aspectRatio: ratio };
  const image: CSSProperties = crop
    ? {
        width: `${100 / crop.w}%`,
        height: `${100 / crop.h}%`,
        left: `${(-crop.x / crop.w) * 100}%`,
        top: `${(-crop.y / crop.h) * 100}%`,
        maxWidth: "none",
      }
    : { inset: 0, width: "100%", height: "100%" };
  return (
    <span style={frame} className={`absolute inset-0 m-auto block overflow-hidden ${className ?? ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} style={image} className="absolute object-contain" />
    </span>
  );
}

function Cell({ sponsor, tier, first }: { sponsor: Sponsor; tier: SponsorTier; first: boolean }) {
  const logo = <Logo sponsor={sponsor} tier={tier} />;

  return (
    <div className={`group relative flex min-w-0 grow flex-col bg-bg ${cells[tier.size]}`}>
      {first && (
        <span className={`absolute top-3.5 left-4 text-[11px] font-bold tracking-[0.16em] uppercase ${labels[tier.size]}`}>
          {tier.name}
        </span>
      )}
      {sponsor.url ? (
        <a
          href={sponsor.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-0 w-full grow items-center justify-center"
        >
          {logo}
        </a>
      ) : (
        <div className="flex min-h-0 w-full grow items-center justify-center">{logo}</div>
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
