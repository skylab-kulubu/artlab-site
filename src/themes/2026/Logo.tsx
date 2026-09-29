import type { ArtProps } from "../types";

export function Logo({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 30 30" aria-hidden="true" className={className}>
      <g fill="none" stroke="var(--color-amber)">
        <circle cx="15" cy="17" r="10" strokeWidth="1.6" />
        <path d="M7.2 14 Q15 8.8 22.8 14" strokeWidth="1.1" opacity="0.45" />
        <circle cx="5.4" cy="17.8" r="3" strokeWidth="1.6" />
        <circle cx="5.4" cy="17.8" r="1.3" strokeWidth="1" opacity="0.7" />
        <circle cx="24.6" cy="17.8" r="3" strokeWidth="1.6" />
        <circle cx="24.6" cy="17.8" r="1.3" strokeWidth="1" opacity="0.7" />
        <circle cx="15" cy="18" r="4.7" fill="var(--color-bg)" strokeWidth="1.2" />
      </g>
      <g fill="none" stroke="var(--color-cyan)">
        <circle cx="15" cy="18" r="3.4" strokeWidth="1.6" />
        <circle cx="15" cy="18" r="2" strokeWidth="1" opacity="0.6" />
      </g>
      <circle cx="15" cy="18" r="1.6" fill="var(--color-cyan)" />
    </svg>
  );
}
