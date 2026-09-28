"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { useNow } from "@/hooks/useNow";
import { formatDayMonth, formatTime } from "@/lib/format";
import { kindLabel } from "@/lib/program";
import type { Session, Speaker } from "@/lib/types";

type Value = { sessions: Session[]; days: number[]; day: number; now: number; pick: (day: number) => void };

const ProgramContext = createContext<Value | null>(null);

function useProgram() {
  const value = useContext(ProgramContext);
  if (!value) throw new Error("useProgram needs a ProgramDays provider");
  return value;
}

type ProviderProps = { sessions: Session[]; serverNow: number; children: ReactNode };

export function ProgramDays({ sessions, serverNow, children }: ProviderProps) {
  const now = useNow(30_000, serverNow);
  const days = [...new Set(sessions.map((s) => s.day))].sort((a, b) => a - b);
  const todayLabel = formatDayMonth(new Date(now).toISOString());
  const today = sessions.find((s) => formatDayMonth(s.startsAt) === todayLabel)?.day;
  const [picked, setPicked] = useState<number | null>(null);

  return (
    <ProgramContext.Provider value={{ sessions, days, day: picked ?? today ?? days[0], now, pick: setPicked }}>
      {children}
    </ProgramContext.Provider>
  );
}

export function DayTabs() {
  const { sessions, days, day, pick } = useProgram();

  return (
    <div role="tablist" aria-label="Program günleri" className="flex flex-wrap gap-2.5">
      {days.map((d) => {
        const first = sessions.find((s) => s.day === d);
        const selected = d === day;
        return (
          <button
            key={d}
            type="button"
            role="tab"
            id={`program-sekme-${d}`}
            aria-selected={selected}
            aria-controls="program-listesi"
            onClick={() => pick(d)}
            className={`cut h-11 px-5 text-[15px] transition-colors ${
              selected ? "bg-amber font-bold text-on-amber" : "bg-surface font-semibold text-ink/80 hover:text-ink"
            }`}
          >
            Gün {d}
            {first && ` · ${formatDayMonth(first.startsAt)}`}
          </button>
        );
      })}
    </div>
  );
}

function Tag({ session }: { session: Session }) {
  const workshop = session.kind === "workshop";
  const label =
    session.kind === "ara"
      ? (session.room ?? kindLabel.ara)
      : [kindLabel[session.kind], workshop && session.room].filter(Boolean).join(" · ");
  return (
    <span
      className={`cut px-3 py-[7px] text-[13px] ${
        workshop ? "bg-amber/12 font-bold text-amber" : "bg-surface font-semibold text-ink-2"
      }`}
    >
      {label}
    </span>
  );
}

function Avatar({ speaker, live, stacked }: { speaker: Speaker; live: boolean; stacked: boolean }) {
  const className = `size-8 shrink-0 rounded-full border ${live ? "border-amber" : "border-amber/40"} ${stacked ? "-ml-2.5" : ""}`;
  return speaker.photo ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={speaker.photo.src} alt="" className={`${className} object-cover grayscale`} />
  ) : (
    <span className={`${className} bg-amber/12`} />
  );
}

function People({ session, speakers, live }: { session: Session; speakers: Speaker[]; live: boolean }) {
  const people = session.speakerIds.map((id) => speakers.find((s) => s.id === id)).filter((s) => s !== undefined);
  const line =
    people.length === 1
      ? [people[0].name, people[0].company].filter(Boolean).join(" · ")
      : people.length > 1
        ? people.map((p) => p.name).join(", ")
        : session.byline;

  if (!line) return <span className="text-ink-3 max-lg:hidden">—</span>;

  return (
    <span className="flex min-w-0 items-center gap-3">
      {people.length > 0 && (
        <span className="flex">
          {people.map((p, i) => (
            <Avatar key={p.id} speaker={p} live={live} stacked={i > 0} />
          ))}
        </span>
      )}
      <span className="truncate">{line}</span>
    </span>
  );
}

export function SessionList({ speakers }: { speakers: Speaker[] }) {
  const { sessions, day, now } = useProgram();

  return (
    <div
      id="program-listesi"
      role="tabpanel"
      aria-labelledby={`program-sekme-${day}`}
      className="flex flex-col border-t border-line"
    >
      <div key={day} className="rise-in flex flex-col">
      {sessions
        .filter((s) => s.day === day)
        .map((s) => {
          const live = Date.parse(s.startsAt) <= now && now < Date.parse(s.endsAt);
          const muted = Date.parse(s.endsAt) <= now || s.kind === "ara";
          return (
            <div
              key={s.id}
              className={`grid grid-cols-2 items-center gap-x-6 gap-y-2 border-b border-line py-[22px] lg:grid-cols-[120px_minmax(0,1fr)_320px_170px] ${
                live ? "-mx-4 bg-surface-2 px-4" : ""
              }`}
            >
              <span
                className={`text-base tabular ${
                  live ? "font-bold text-cyan" : muted ? "font-semibold text-ink-2" : "font-semibold text-ink/80"
                }`}
              >
                {formatTime(s.startsAt)}
              </span>
              <span
                className={`order-3 col-span-2 text-lg lg:order-none lg:col-span-1 ${live ? "font-semibold" : ""} ${
                  muted ? "text-ink-2" : "text-ink"
                }`}
              >
                {s.title}
              </span>
              <span className={`order-4 col-span-2 text-[15px] lg:order-none lg:col-span-1 ${muted ? "text-ink-2" : "text-ink/80"}`}>
                <People session={s} speakers={speakers} live={live} />
              </span>
              <span className="order-2 justify-self-end lg:order-none lg:justify-self-start">
                {live ? (
                  <span className="flex items-center gap-2 text-[13px] font-bold text-cyan">
                    <span className="size-2 rounded-full bg-cyan motion-safe:animate-pulse" />
                    Şu an
                  </span>
                ) : (
                  <Tag session={s} />
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
