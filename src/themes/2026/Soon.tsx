import type { ReactNode } from "react";
import type { ArtProps } from "../types";

const AMBER = "var(--color-amber)";
const CYAN = "var(--color-cyan)";

function BigHead({ className, children }: ArtProps & { children?: ReactNode }) {
  return (
    <svg width="92" height="84" viewBox="0 0 120 110" aria-hidden="true" className={className}>
      <line x1="72.6" y1="21" x2="79.8" y2="6.6" stroke={AMBER} strokeWidth="1.6" />
      <circle cx="79.8" cy="6.6" r="3" fill={CYAN} />
      <g fill="none" stroke={AMBER}>
        <circle cx="60" cy="48" r="30" strokeWidth="2" />
        <path d="M36.6 39 Q60 23.4 83.4 39" strokeWidth="1.4" opacity="0.45" />
        <circle cx="31.2" cy="50.4" r="9" strokeWidth="2" />
        <circle cx="31.2" cy="50.4" r="3.9" strokeWidth="1.2" opacity="0.7" />
        <circle cx="88.8" cy="50.4" r="9" strokeWidth="2" />
        <circle cx="88.8" cy="50.4" r="3.9" strokeWidth="1.2" opacity="0.7" />
      </g>
      <circle cx="60" cy="51" r="14.1" fill="var(--color-bg)" stroke={AMBER} strokeWidth="1.5" />
      <circle cx="60" cy="51" r="10.2" fill="none" stroke={CYAN} strokeWidth="2" />
      <circle cx="60" cy="51" r="6" fill="none" stroke={CYAN} strokeWidth="1.2" opacity="0.6" />
      {children}
    </svg>
  );
}

export function Soon({ className }: ArtProps) {
  return (
    <BigHead className={className}>
      <circle className="motion-safe:animate-blink" cx="60" cy="54" r="3" fill={CYAN} />
      <g stroke={AMBER} strokeLinejoin="round" fill="var(--color-bg)">
        <path d="M58 104 Q48 92 54 80 L58 84 Q54 92 58 104 Z" strokeWidth="1.8" />
        <path d="M62 104 Q72 92 66 80 L62 84 Q66 92 62 104 Z" strokeWidth="1.8" />
      </g>
      <circle cx="60" cy="80" r="3" fill={AMBER} opacity="0.9" />
      <rect x="34" y="96" width="18" height="11" rx="4" fill="var(--color-bg)" stroke={AMBER} strokeWidth="2" />
      <rect x="68" y="96" width="18" height="11" rx="4" fill="var(--color-bg)" stroke={AMBER} strokeWidth="2" />
    </BigHead>
  );
}

export function Contact({ className }: ArtProps) {
  return (
    <BigHead className={className}>
      <circle className="motion-safe:animate-blink" cx="63" cy="49" r="3" fill={CYAN} />
    </BigHead>
  );
}
