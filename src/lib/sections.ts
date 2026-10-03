import type { Content } from "@/content";

export type SectionId =
  | "baslangic"
  | "neden"
  | "cekilis"
  | "program"
  | "konusmacilar"
  | "fuaye"
  | "arsiv"
  | "destekciler"
  | "sss";

export type SectionLink = { id: SectionId; label: string };

const all: (SectionLink & { shown: (c: Content) => boolean })[] = [
  { id: "baslangic", label: "Başlangıç", shown: () => true },
  { id: "neden", label: "Neden", shown: () => true },
  { id: "sss", label: "SSS", shown: (c) => c.sections.sss },
  { id: "program", label: "Program", shown: (c) => c.sections.program },
  { id: "konusmacilar", label: "Konuşmacılar", shown: (c) => c.sections.konusmacilar },
  { id: "cekilis", label: "Çekiliş", shown: (c) => c.raffle.enabled && c.raffle.prizes.length > 0 },
  { id: "fuaye", label: "Fuaye", shown: (c) => c.sections.fuaye && c.sponsors.length > 0 },
  { id: "arsiv", label: "Geçmiş yıllar", shown: (c) => c.sections.arsiv && c.pastEditions.some((p) => p.gallery?.length) },
  { id: "destekciler", label: "Destekçiler", shown: (c) => c.sections.destekciler && c.sponsors.length > 0 },
];

export function visibleSections(content: Content): SectionLink[] {
  return all.filter((s) => s.shown(content)).map(({ id, label }) => ({ id, label }));
}
