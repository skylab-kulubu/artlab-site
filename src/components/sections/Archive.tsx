import type { Content } from "@/content";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { formatDateRange } from "@/lib/format";
import type { PastEdition } from "@/lib/types";
import { sectionArt, type Theme } from "@/themes";
import { Gallery } from "./Gallery";

function Cover({ edition }: { edition: PastEdition }) {
  return (
    <div className="cho relative grid h-[300px] place-items-center overflow-hidden bg-surface-2">
      {edition.cover ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={edition.cover.src} alt={edition.cover.alt} className="size-full object-cover" />
      ) : (
        <span aria-hidden="true" className="numeral font-display text-5xl font-extrabold text-transparent opacity-40">
          {edition.year}
        </span>
      )}
    </div>
  );
}

function Stop({ next }: { next?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className={`size-[9px] rounded-full ${next ? "bg-cyan motion-safe:animate-pulse" : "bg-amber"}`} />
      <span className="h-px grow bg-line" />
    </div>
  );
}

export function Archive({ content, theme }: { content: Content; theme: Theme }) {
  const { pastEditions, archiveGap, edition } = content;
  const { Motif, Pose } = sectionArt(theme, "arsiv");
  const upcoming = edition.startsAt && edition.endsAt ? formatDateRange(edition.startsAt, edition.endsAt) : "Tarih yakında";

  return (
    <Section id="arsiv" motif={Motif && <Motif />}>
      <SectionHeader
        section="arsiv"
        title="Geçmiş yıllar"
        lead="Her yıl yeni bir figür, aynı zirve."
        illustration={Pose && <Pose />}
        aside={archiveGap && <span className="text-sm text-ink-3">{archiveGap} · arşiv kaydı yok</span>}
      />
      <ol className="-mx-5 flex snap-x gap-6 overflow-x-auto px-5 pb-2 lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0">
        {pastEditions.map((past) => {
          const images = [past.cover, ...(past.gallery ?? [])].filter((a) => a !== undefined);
          return (
            <li key={past.year} className="flex w-[220px] shrink-0 snap-start flex-col gap-[18px] lg:w-auto">
              {images.length ? (
                <Gallery title={`ARTLAB ${past.year}`} images={images}>
                  <Cover edition={past} />
                </Gallery>
              ) : (
                <Cover edition={past} />
              )}
              <Stop />
              <div>
                <span className="font-display text-[26px] font-semibold">{past.year}</span>
                <p className="mt-1 text-sm text-ink-2">{[past.dateLabel, past.note].filter(Boolean).join(" · ")}</p>
              </div>
            </li>
          );
        })}
        <li className="flex w-[220px] shrink-0 snap-start flex-col gap-[18px] lg:w-auto">
          <div className="flex h-[300px] flex-col items-center justify-center gap-3 border border-dashed border-line">
            <svg width="40" height="56" viewBox="0 0 40 56" aria-hidden="true">
              <ellipse cx="20" cy="28" rx="11" ry="18" fill="none" stroke="var(--color-amber)" strokeWidth="1.8" strokeDasharray="4 3" />
              <circle className="motion-safe:animate-blink" cx="20" cy="28" r="3" fill="var(--color-cyan)" />
            </svg>
            <span className="text-[13px] font-bold tracking-[0.14em] text-cyan">SIRADAKİ</span>
          </div>
          <Stop next />
          <div>
            <span className="font-display text-[26px] font-semibold text-cyan">{edition.year}</span>
            <p className="mt-1 text-sm text-ink-2">{upcoming}</p>
          </div>
        </li>
      </ol>
    </Section>
  );
}
