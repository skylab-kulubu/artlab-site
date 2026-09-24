import type { ArtProps } from "../../types";
import { PeekHead } from "./PeekHead";

export function Program({ className }: ArtProps) {
  return (
    <PeekHead look={[4, -3]} width={140} className={className}>
      <g fill="none" stroke="var(--color-cyan)" strokeWidth="1.8">
        <circle cx="122" cy="16" r="10" />
        <path d="M122 16 V10 M122 16 L126 18" />
      </g>
    </PeekHead>
  );
}
