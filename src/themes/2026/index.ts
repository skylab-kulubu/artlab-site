import type { Theme } from "../types";
import { Figure } from "./Figure";
import { Logo } from "./Logo";
import { Cekilis as CekilisMotif } from "./motifs/Cekilis";
import { Neden as NedenMotif } from "./motifs/Neden";
import { Cekilis } from "./poses/Cekilis";
import { Neden } from "./poses/Neden";

export const theme2026: Theme = {
  id: "2026",
  mascot: { Logo, poses: { neden: Neden, cekilis: Cekilis } },
  Figure,
  motifs: { neden: NedenMotif, cekilis: CekilisMotif },
  heroMode: "parcacik",
  morphs: ["koza", "kelebek"],
};
