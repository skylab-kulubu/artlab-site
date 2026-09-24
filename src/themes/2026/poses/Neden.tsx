import type { ArtProps } from "../../types";
import { PeekHead } from "./PeekHead";

export function Neden({ className }: ArtProps) {
  return (
    <PeekHead look={[3, -3]} className={className}>
      <path
        d="M112 7 L113.5 12.5 L119 14 L113.5 15.5 L112 21 L110.5 15.5 L105 14 L110.5 12.5 Z"
        fill="var(--color-amber)"
        opacity="0.9"
      />
      <circle cx="122" cy="24" r="1.4" fill="var(--color-amber)" opacity="0.7" />
      <circle cx="104" cy="6" r="1.1" fill="var(--color-cyan)" opacity="0.8" />
    </PeekHead>
  );
}
