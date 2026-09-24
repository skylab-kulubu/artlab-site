import type { Theme } from "../types";
import { Figure } from "./Figure";
import { Logo } from "./Logo";
import { Cekilis as CekilisMotif } from "./motifs/Cekilis";
import { Neden as NedenMotif } from "./motifs/Neden";
import { Program as ProgramMotif } from "./motifs/Program";
import { Cekilis } from "./poses/Cekilis";
import { Neden } from "./poses/Neden";
import { Program } from "./poses/Program";
import { Soon } from "./Soon";

export const theme2026: Theme = {
  id: "2026",
  mascot: { Logo, Soon, poses: { neden: Neden, cekilis: Cekilis, program: Program } },
  Figure,
  motifs: { neden: NedenMotif, cekilis: CekilisMotif, program: ProgramMotif },
  heroMode: "parcacik",
  morphs: ["koza", "kelebek"],
};
