import type { ArtProps } from "../../types";
import { PeekHead } from "./PeekHead";

export function Konusmacilar({ className }: ArtProps) {
  return (
    <PeekHead look={[0, 1]} hands={[4, 96]} listening className={className}>
      <path d="M18 36 Q12 46 18 56 M112 36 Q118 46 112 56" fill="none" stroke="var(--color-cyan)" strokeWidth="1.8" />
    </PeekHead>
  );
}
