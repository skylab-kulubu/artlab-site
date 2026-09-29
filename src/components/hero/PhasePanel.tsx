"use client";

import { Button } from "@/components/ui/Button";
import { Chamfer } from "@/components/ui/Chamfer";
import { RollingNumber } from "@/components/ui/RollingNumber";
import { useNow } from "@/hooks/useNow";
import { formatTime } from "@/lib/format";
import { countdown, currentSession, nextSession, phaseAt } from "@/lib/phase";
import type { Edition, Session, Speaker } from "@/lib/types";

type Props = {
  edition: Edition;
  sessions: Session[];
  speakers: Speaker[];
  serverNow: number;
};

const eyebrow = "text-[11px] font-bold tracking-[0.18em] uppercase";

function byline(session: Session, speakers: Speaker[]) {
  const names = session.speakerIds
    .map((id) => speakers.find((s) => s.id === id))
    .filter((s) => s !== undefined)
    .map((s) => (s.company ? `${s.name} · ${s.company}` : s.name));
  return names.length ? names.join(", ") : session.byline;
}

function usePanel({ edition, sessions, serverNow }: Props) {
  const now = useNow(1000, serverNow);
  const phase = phaseAt(edition, now);
  const current = currentSession(sessions, now);
  const next = nextSession(sessions, now);
  const left = edition.startsAt ? countdown(edition.startsAt, now) : null;
  const progress = current
    ? (now - Date.parse(current.startsAt)) / (Date.parse(current.endsAt) - Date.parse(current.startsAt))
    : 0;
  return { phase, current, next, left, progress };
}

export function PhasePanel(props: Props) {
  const { edition, speakers } = props;
  const { phase, current, next, left, progress } = usePanel(props);
  const shown = current ?? next;

  return (
    <Chamfer surface="none" className="w-[400px] max-w-full" innerClassName="flex flex-col gap-3.5 bg-bg/80 px-6 pt-5 pb-[22px]">
      {phase === "geri-sayim" && left && (
        <>
          <div className="flex items-center justify-between">
            <span className={`${eyebrow} text-amber`}>Etkinliğe kalan</span>
            {edition.registrationUrl && (
              <span className="flex items-center gap-1.5 text-xs font-semibold text-cyan">
                <span className="size-1.5 rounded-full bg-cyan" />
                Kayıtlar açık
              </span>
            )}
          </div>
          <div className="grid grid-cols-4 gap-2">
            {(
              [
                [left.days, "Gün"],
                [left.hours, "Saat"],
                [left.minutes, "Dakika"],
                [left.seconds, "Saniye"],
              ] as const
            ).map(([value, unit], i) => (
              <div key={unit} className="flex flex-col gap-1">
                <span className={`font-display text-[34px] font-semibold tabular ${i === 3 ? "text-cyan" : ""}`}>
                  <RollingNumber value={value} />
                </span>
                <span className="text-[11px] font-semibold tracking-[0.14em] text-ink-2 uppercase">{unit}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {phase === "canli" && (
        <>
          <div className="flex items-center justify-between">
            <span className={`${eyebrow} flex items-center gap-2 text-cyan`}>
              <span className="size-2 rounded-full bg-cyan motion-safe:animate-pulse" />
              Canlı · Gün {shown?.day ?? 1}
            </span>
            {shown && (
              <span className="text-[13px] font-semibold text-ink-2 tabular">
                {formatTime(shown.startsAt)}–{formatTime(shown.endsAt)}
              </span>
            )}
          </div>
          {shown ? (
            <div className="flex flex-col gap-1">
              <span className="text-xl font-bold">{current ? shown.title : `Birazdan: ${shown.title}`}</span>
              <span className="text-sm text-ink-2">
                {[byline(shown, speakers), shown.room ?? edition.venue.name].filter(Boolean).join(" · ")}
              </span>
            </div>
          ) : (
            <span className="text-xl font-bold">Günün oturumları tamamlandı</span>
          )}
          <div className="h-[3px] bg-line">
            <div className="h-[3px] bg-cyan" style={{ width: `${Math.round(progress * 100)}%` }} />
          </div>
          <div className="flex items-center justify-between gap-4 text-[13px]">
            <span className="truncate text-ink-2">
              {current && next && `Sıradaki · ${formatTime(next.startsAt)} ${next.title}`}
            </span>
            <a href="#program" className="link-arrow font-bold">
              Program
            </a>
          </div>
        </>
      )}

      {phase === "bitti" && (
        <>
          <span className={`${eyebrow} text-amber`}>ARTLAB {edition.year} tamamlandı</span>
          <p className="text-[15px] leading-relaxed text-ink/80">
            Katıldığın için teşekkürler. Fotoğraflar ve sunumlar yakında burada.
          </p>
          <div className="flex items-center gap-4">
            <Button href={edition.certificateUrl ?? "#sertifika"} size="sm">
              Sertifikanı al
            </Button>
            <a href="#arsiv" className="link-arrow text-sm font-bold">
              Geçmiş yıllar
            </a>
          </div>
        </>
      )}

      {phase === "yakinda" && (
        <>
          <span className={`${eyebrow} text-amber`}>Tarih yakında</span>
          <p className="text-[15px] leading-relaxed text-ink/80">Tarih ve kayıtlar çok yakında açıklanacak.</p>
          {edition.contact.instagram && (
            <a href={edition.contact.instagram} target="_blank" rel="noopener noreferrer" className="link-arrow text-sm font-bold">
              Instagram&apos;da takip et
            </a>
          )}
        </>
      )}
    </Chamfer>
  );
}

export function PhaseStrip(props: Props) {
  const { edition } = props;
  const { phase, current, next, left } = usePanel(props);
  const shown = current ?? next;

  return (
    <div className="flex h-[50px] items-center justify-between gap-3 border border-line bg-bg/80 px-4">
      {phase === "geri-sayim" && left && (
        <>
          <span className={`${eyebrow} text-amber`}>Kalan</span>
          <span className="font-display text-base font-semibold tabular">
            <RollingNumber value={left.days} />
            <span className="text-[10px] text-ink-2">g</span> <RollingNumber value={left.hours} />
            <span className="text-[10px] text-ink-2">s</span> <RollingNumber value={left.minutes} />
            <span className="text-[10px] text-ink-2">d</span> <span className="text-cyan"><RollingNumber value={left.seconds} /></span>
            <span className="text-[10px] text-ink-2">sn</span>
          </span>
        </>
      )}
      {phase === "canli" && (
        <>
          <span className={`${eyebrow} flex shrink-0 items-center gap-1.5 text-cyan`}>
            <span className="size-[7px] rounded-full bg-cyan motion-safe:animate-pulse" />
            Canlı
          </span>
          <span className="truncate text-sm font-bold">{shown?.title ?? "Program"}</span>
          {shown && <span className="shrink-0 text-xs text-ink-2">{formatTime(shown.startsAt)}</span>}
        </>
      )}
      {phase === "bitti" && (
        <>
          <span className={`${eyebrow} text-amber`}>Tamamlandı</span>
          <a href={edition.certificateUrl ?? "#sertifika"} className="text-sm font-bold">
            Sertifikanı al
          </a>
        </>
      )}
      {phase === "yakinda" && (
        <>
          <span className={`${eyebrow} text-amber`}>Tarih yakında</span>
          <a href={edition.contact.instagram} target="_blank" rel="noopener noreferrer" className="text-sm font-bold">
            Takip et
          </a>
        </>
      )}
    </div>
  );
}
