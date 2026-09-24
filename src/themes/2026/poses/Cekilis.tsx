import type { ArtProps } from "../../types";
import { PeekHead } from "./PeekHead";

export function Cekilis({ className }: ArtProps) {
  return (
    <PeekHead look={[0, 3]} hands={[22, 78]} className={className}>
      <rect x="42" y="50" width="36" height="14" rx="2" fill="var(--color-bg)" stroke="var(--color-amber)" strokeWidth="2" />
      <g fill="none" stroke="var(--color-cyan)" strokeWidth="1.6">
        <path d="M60 50 V64 M42 56 H78" />
        <path d="M60 50 Q53 42 50 47 Q52 51 60 50 Q67 42 70 47 Q68 51 60 50" />
      </g>
    </PeekHead>
  );
}
