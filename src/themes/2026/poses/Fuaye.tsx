import type { ArtProps } from "../../types";
import { Butterfly } from "../Butterfly";
import { PeekHead } from "./PeekHead";

export function Fuaye({ className }: ArtProps) {
  return (
    <PeekHead look={[4, -4]} hands={[6]} width={150} className={className}>
      <line x1="100" y1="64" x2="104" y2="34" stroke="var(--color-amber)" strokeWidth="10" strokeLinecap="round" />
      <line x1="100" y1="64" x2="104" y2="34" stroke="var(--color-bg)" strokeWidth="6" strokeLinecap="round" />
      <rect x="94" y="20" width="20" height="14" rx="5" fill="var(--color-bg)" stroke="var(--color-amber)" strokeWidth="2" />
      <Butterfly x={128} y={6.6} />
    </PeekHead>
  );
}
