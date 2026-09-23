"use client";

import { useActiveSection } from "@/components/nav/ActiveSection";

const STEP = 19;
const ticks = Array.from({ length: 61 }, (_, i) => {
  const d = Math.abs(i - 30);
  return { major: i % 5 === 0, opacity: Math.max(0.08, 1 - d / 32) };
});

const labelClass = "text-xs font-semibold tracking-[0.1em] uppercase";

function Needle() {
  return (
    <svg
      width="12"
      height="8"
      viewBox="0 0 12 8"
      aria-hidden="true"
      className="absolute -bottom-[3px] left-1/2 -translate-x-1/2"
    >
      <path d="M0 8 L6 0 L12 8 Z" fill="var(--color-amber)" />
    </svg>
  );
}

export function Compass() {
  const { sections, index } = useActiveSection();

  return (
    <nav aria-label="Bölümler" className="relative hidden h-[50px] w-[640px] shrink-0 overflow-hidden xl:block">
      {sections.map((s, i) => {
        const offset = i - index;
        const distance = Math.abs(offset);
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-current={offset === 0 ? "location" : undefined}
            tabIndex={distance > 2 ? -1 : undefined}
            className={`absolute top-0.5 -translate-x-1/2 transition-[left,opacity,color] duration-500 ease-out ${labelClass} ${
              offset === 0 ? "font-bold text-cyan hover:text-cyan" : "text-ink hover:text-cyan"
            } ${distance > 2 ? "pointer-events-none" : ""}`}
            style={{
              left: `${50 + offset * STEP}%`,
              opacity: offset === 0 ? 1 : distance === 1 ? 0.8 : distance === 2 ? 0.45 : 0,
            }}
          >
            {s.label}
          </a>
        );
      })}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-1.5 flex h-3.5 items-end justify-between">
        {ticks.map((t, i) => (
          <span key={i} className={`w-px bg-ink ${t.major ? "h-3.5" : "h-[7px]"}`} style={{ opacity: t.opacity }} />
        ))}
      </div>
      <Needle />
    </nav>
  );
}

export function CompactCompass() {
  const { sections, index } = useActiveSection();

  return (
    <div className="relative flex h-[50px] min-w-0 flex-1 items-start justify-center pt-2 xl:hidden">
      <span aria-live="polite" className={`truncate font-bold text-cyan ${labelClass}`}>
        {sections[index].label}
      </span>
      <div aria-hidden="true" className="absolute inset-x-6 bottom-1.5 h-px bg-ink/15" />
      <Needle />
    </div>
  );
}
