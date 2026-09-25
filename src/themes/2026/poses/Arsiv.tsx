import type { ArtProps } from "../../types";
import { PeekHead } from "./PeekHead";

export function Arsiv({ className }: ArtProps) {
  return <PeekHead look={[-4, 0]} width={120} className={className} />;
}
