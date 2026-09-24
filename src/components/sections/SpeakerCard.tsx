import { Chamfer } from "@/components/ui/Chamfer";
import { formatTime } from "@/lib/format";
import { kindLabel } from "@/lib/program";
import type { Session, Speaker } from "@/lib/types";

const pad = (n: number) => String(n).padStart(2, "0");

function Silhouette() {
  return (
    <svg viewBox="0 0 300 375" preserveAspectRatio="xMidYMax meet" aria-hidden="true" className="absolute inset-0 size-full">
      <g fill="var(--color-amber)" opacity="0.12">
        <circle cx="150" cy="150" r="56" />
        <path d="M52 375 Q52 250 150 246 Q248 250 248 375 Z" />
      </g>
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="1.5" y="1.5" width="15" height="15" rx="3" />
      <path d="M5.5 8 V13 M5.5 5.2 V5.3 M8.5 13 V8 M8.5 10 Q8.5 8 10.5 8 Q12.5 8 12.5 10 V13" />
    </svg>
  );
}

export function Numeral({ n, filled }: { n: number; filled?: "hover" | "never" }) {
  return (
    <svg width="64" height="44" viewBox="0 0 64 44" aria-hidden="true" className="shrink-0">
      <text
        x="64"
        y="38"
        textAnchor="end"
        strokeWidth="1.3"
        className={`font-display text-[40px] font-extrabold transition-[fill] duration-300 ${
          filled === "never" ? "fill-transparent stroke-line" : "fill-transparent stroke-amber group-hover:fill-amber"
        }`}
      >
        {pad(n)}
      </text>
    </svg>
  );
}

type Props = { speaker: Speaker; n: number; session?: Session };

export function SpeakerCard({ speaker, n, session }: Props) {
  const role = [speaker.title, speaker.company].filter(Boolean).join(" · ");

  return (
    <Chamfer className="group" innerClassName="flex flex-col">
      <article className="flex h-full flex-col">
        <div className="relative aspect-4/5 overflow-hidden bg-amber">
          {speaker.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={speaker.photo.src}
              alt={speaker.photo.alt || speaker.name}
              className="size-full object-cover mix-blend-multiply grayscale transition duration-500 group-hover:mix-blend-normal group-hover:grayscale-0"
            />
          ) : (
            <div className="absolute inset-0 bg-bg/85">
              <Silhouette />
            </div>
          )}
        </div>
        <div className="flex grow flex-col gap-3.5 px-[18px] pt-[18px] pb-3.5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 flex-col gap-[5px]">
              <h3 className="font-display text-[19px] leading-tight font-semibold">{speaker.name}</h3>
              {role && <span className="text-[13px] leading-snug text-ink-2">{role}</span>}
            </div>
            <Numeral n={n} />
          </div>
          <div className="mt-auto flex min-h-[55px] items-center justify-between gap-2 border-t border-line pt-2.5">
            {session ? (
              <span className="flex flex-col gap-0.5">
                <span className="text-[13px] font-semibold text-ink/80 tabular">
                  Gün {session.day} · {formatTime(session.startsAt)}
                </span>
                <span className="text-[10px] font-bold tracking-[0.16em] text-ink-2 uppercase">{kindLabel[session.kind]}</span>
              </span>
            ) : (
              <span />
            )}
            {speaker.linkedin && (
              <a
                href={speaker.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${speaker.name} LinkedIn profili`}
                className="grid size-11 place-items-center border border-line"
              >
                <LinkedInIcon />
              </a>
            )}
          </div>
        </div>
      </article>
    </Chamfer>
  );
}
