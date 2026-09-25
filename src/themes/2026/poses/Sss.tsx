import type { ArtProps } from "../../types";
import { PeekHead } from "./PeekHead";

export function Sss({ className }: ArtProps) {
  return (
    <PeekHead look={[2, -3]} tilt={-12} width={120} className={className}>
      <text x="100" y="18" fill="var(--color-cyan)" className="font-display" fontSize="18" fontWeight="600">
        ?
      </text>
    </PeekHead>
  );
}
