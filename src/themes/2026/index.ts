import type { Theme } from "../types";
import { Figure } from "./Figure";
import { Logo } from "./Logo";
import { Arsiv as ArsivMotif } from "./motifs/Arsiv";
import { Cekilis as CekilisMotif } from "./motifs/Cekilis";
import { Neden as NedenMotif } from "./motifs/Neden";
import { Fuaye as FuayeMotif } from "./motifs/Fuaye";
import { Program as ProgramMotif } from "./motifs/Program";
import { Arsiv } from "./poses/Arsiv";
import { Cekilis } from "./poses/Cekilis";
import { Neden } from "./poses/Neden";
import { Fuaye } from "./poses/Fuaye";
import { Konusmacilar } from "./poses/Konusmacilar";
import { Program } from "./poses/Program";
import { Soon } from "./Soon";

export const theme2026: Theme = {
  id: "2026",
  mascot: { Logo, Soon, poses: { neden: Neden, cekilis: Cekilis, program: Program, konusmacilar: Konusmacilar, fuaye: Fuaye, arsiv: Arsiv } },
  Figure,
  motifs: { neden: NedenMotif, cekilis: CekilisMotif, program: ProgramMotif, fuaye: FuayeMotif, arsiv: ArsivMotif },
  heroMode: "parcacik",
  morphs: ["koza", "kelebek"],
};
