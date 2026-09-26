import type { Content } from "@/content";
import { formatDateRange } from "@/lib/format";
import type { Theme } from "@/themes";
import { Button } from "@/components/ui/Button";
import { HeroScene } from "./HeroScene";
import { HeroSky, VenueClock } from "./HeroSky";
import { DiffusionHud, HeroParticles } from "./HeroParticles";
import { HeroTrail } from "./HeroTrail";
import { desktop, mobile } from "./layouts";
import { MiniMap } from "./MiniMap";
import { PhaseButton } from "./PhaseButton";
import { PhasePanel, PhaseStrip } from "./PhasePanel";
import "./hero.css";

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" stroke="var(--color-amber)" strokeWidth="1.5" fill="none">
      <rect x="2" y="3.5" width="14" height="12" rx="2" />
      <path d="M2 7.5 H16 M6 1.5 V5 M12 1.5 V5" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" stroke="var(--color-amber)" strokeWidth="1.5" fill="none">
      <path d="M9 16 C5 11.5 3.5 9 3.5 6.8 A5.5 5.5 0 0 1 14.5 6.8 C14.5 9 13 11.5 9 16 Z" />
      <circle cx="9" cy="7" r="2" />
    </svg>
  );
}

type Props = { content: Content; theme: Theme };

export function Hero({ content, theme }: Props) {
  const { edition, sessions, speakers, fetchedAt } = content;
  const { venue } = edition;
  const date = edition.startsAt && edition.endsAt ? formatDateRange(edition.startsAt, edition.endsAt) : "Tarih yakında";
  const panel = { edition, sessions, speakers, serverNow: fetchedAt };
  const particles = theme.heroMode === "parcacik";

  return (
    <section id="baslangic" className="relative h-svh max-h-[1000px] min-h-[680px] overflow-hidden md:min-h-[760px]">
      <HeroSky serverNow={fetchedAt}>
        <div className="hero-stage absolute inset-0 hidden md:block">
          <HeroScene layout={desktop} theme={theme} serverNow={fetchedAt} part="back" />
          {particles && <HeroParticles layout={desktop} themeId={theme.id} />}
          <HeroScene layout={desktop} theme={theme} serverNow={fetchedAt} part="front" />
        </div>
        <HeroTrail layout={desktop} className="hidden md:block" />
        <div className="absolute inset-0 md:hidden">
          <HeroScene layout={mobile} theme={theme} serverNow={fetchedAt} part="back" />
          <HeroScene layout={mobile} theme={theme} serverNow={fetchedAt} part="front" />
        </div>

        <p className="absolute top-[100px] left-20 hidden text-xs font-semibold tracking-[0.14em] text-(--hud) md:block">
          {venue.lat.toFixed(3)}°K · {venue.lng.toFixed(3)}°D · {venue.area.toLocaleUpperCase("tr")}{" "}
          <VenueClock serverNow={fetchedAt} />
        </p>
        {particles && (
          <div className="absolute top-[122px] left-20 hidden md:block">
            <DiffusionHud />
          </div>
        )}

        <div className="absolute top-28 right-6 hidden md:block lg:right-20">
          <PhasePanel {...panel} />
        </div>
        <div className="absolute inset-x-4 top-[88px] md:hidden">
          <PhaseStrip {...panel} />
        </div>

        <div className="absolute inset-x-5 bottom-10 flex flex-col gap-3 md:right-auto md:bottom-24 md:left-20 md:w-[560px] md:gap-[18px]">
          <h1 className="sr-only">
            ARTLAB {edition.year} · Yapay Zeka Zirvesi
          </h1>
          <span className="text-[11px] font-bold tracking-[0.18em] text-amber md:text-[13px]">
            {edition.number}. EDİSYON · YAPAY ZEKA ZİRVESİ
          </span>
          <p className="font-display text-[26px] leading-[1.15] font-semibold md:text-[40px] md:leading-[1.1]">
            {edition.slogan ?? "Yapay Zeka Zirvesi"}
          </p>
          <div className="flex flex-wrap gap-x-7 gap-y-2 text-sm text-ink/80 md:text-base">
            <span className="flex items-center gap-2">
              <CalendarIcon />
              {date}
            </span>
            <span className="flex items-center gap-2">
              <PinIcon />
              {venue.campus} · {venue.name}
            </span>
          </div>
          <div className="mt-1.5 flex gap-2.5 md:gap-3.5">
            <PhaseButton edition={edition} serverNow={fetchedAt} className="flex-1 md:flex-none" />
            <Button href="#program" variant="outline">
              Programı gör
            </Button>
          </div>
        </div>

        <div className="absolute right-20 bottom-16 hidden lg:block">
          <MiniMap venue={venue.name} />
        </div>

        <a
          href="#neden"
          className="absolute bottom-[18px] left-14 hidden items-center gap-2 text-[11px] font-bold tracking-[0.18em] text-amber hover:text-amber md:flex"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
            <path d="M2 4 L6 8 L10 4" fill="none" stroke="currentColor" strokeWidth="1.6" />
          </svg>
          KEŞFET
        </a>
      </HeroSky>
    </section>
  );
}
