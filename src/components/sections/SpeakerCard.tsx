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

function Numeral({ n }: { n: number }) {
  return (
    <span
      aria-hidden="true"
      className="numeral shrink-0 font-display text-xl leading-none font-extrabold text-transparent transition-colors duration-300 group-hover:text-amber md:text-[32px]"
    >
      {pad(n)}
    </span>
  );
}

type Props = { speaker: Speaker; n: number; session?: Session; multiDay?: boolean };

export function SpeakerCard({ speaker, n, session, multiDay }: Props) {
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
        <div className="flex grow flex-col gap-3 px-3.5 pt-3.5 pb-2.5 md:px-4 md:pt-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 flex-col gap-[5px]">
              <h3 className="font-display text-[15px] leading-tight font-semibold md:text-base">{speaker.name}</h3>
              {role && <span className="text-xs leading-snug text-ink-2 md:text-[13px]">{role}</span>}
            </div>
            <Numeral n={n} />
          </div>
          <div className="mt-auto flex min-h-[52px] items-center justify-between gap-2 border-t border-line pt-2.5">
            {session ? (
              <span className="flex flex-col gap-0.5">
                <span className="text-xs font-semibold text-ink/80 tabular md:text-[13px]">
                  {multiDay && `Gün ${session.day} · `}
                  {formatTime(session.startsAt)}
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
                className="grid size-11 shrink-0 place-items-center border border-line"
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
