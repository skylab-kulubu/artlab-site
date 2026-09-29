import type { ArtProps } from "../types";

const draw = { pathLength: 1, className: "loader-draw" };

export function Loader({ className }: ArtProps) {
  return (
    <svg width="160" height="146" viewBox="0 0 120 110" aria-hidden="true" className={className}>
      <g fill="none" stroke="var(--color-amber)" strokeLinecap="round">
        <circle cx="60" cy="48" r="30" strokeWidth="2" {...draw} />
        <path d="M36.6 39 Q60 23.4 83.4 39" strokeWidth="1.4" opacity="0.45" {...draw} />
        <circle cx="31.2" cy="50.4" r="9" strokeWidth="2" {...draw} />
        <circle cx="88.8" cy="50.4" r="9" strokeWidth="2" {...draw} />
        <circle cx="60" cy="51" r="14.1" strokeWidth="1.5" {...draw} />
      </g>
      <g fill="none" stroke="var(--color-cyan)">
        <circle cx="60" cy="51" r="10.2" strokeWidth="2" {...draw} />
      </g>
      <circle cx="60" cy="51" r="4" fill="var(--color-cyan)" className="loader-eye" />
    </svg>
  );
}
