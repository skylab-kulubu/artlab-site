import type { ArtProps } from "../../types";
import { PeekHead } from "./PeekHead";

export function Destekciler({ className }: ArtProps) {
  return (
    <PeekHead look={[0, -1]} hands={[94]} width={120} className={className}>
      <line x1="18" y1="64" x2="16" y2="36" stroke="var(--color-amber)" strokeWidth="10" strokeLinecap="round" />
      <line x1="18" y1="64" x2="16" y2="36" stroke="var(--color-bg)" strokeWidth="6" strokeLinecap="round" />
      <rect x="6" y="22" width="20" height="14" rx="5" fill="var(--color-bg)" stroke="var(--color-amber)" strokeWidth="2" />
      <path d="M2 14 Q-2 22 2 30 M6 10 Q1 22 6 34" fill="none" stroke="var(--color-ink-2)" strokeWidth="1.4" />
    </PeekHead>
  );
}
