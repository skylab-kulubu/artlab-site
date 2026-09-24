import type { Theme } from "../types";
import { Figure } from "./Figure";
import { Logo } from "./Logo";
import { Neden as NedenMotif } from "./motifs/Neden";
import { Neden } from "./poses/Neden";

export const theme2026: Theme = {
  id: "2026",
  mascot: { Logo, poses: { neden: Neden } },
  Figure,
  motifs: { neden: NedenMotif },
  heroMode: "parcacik",
  morphs: ["koza", "kelebek"],
};
