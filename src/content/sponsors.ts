import type { Sponsor, SponsorTier } from "@/lib/types";

export const sponsorTiers: SponsorTier[] = [
  { id: "altin", name: "Altın", order: 1, size: "lg" },
  { id: "gumus", name: "Gümüş", order: 2, size: "md" },
  { id: "fuaye", name: "Fuaye ve ürün", order: 3, size: "sm" },
];

const placeholder = (id: string, tierId: string, ratio: number, foyerNote?: string): Sponsor => ({
  id,
  name: `[Sponsor ${id}]`,
  tierId,
  ratio,
  foyerNote,
});

export const sponsors: Sponsor[] = [
  placeholder("a1", "altin", 4, "[stant deneyimi]"),
  placeholder("a2", "altin", 1, "[stant deneyimi]"),
  placeholder("g1", "gumus", 3),
  placeholder("g2", "gumus", 1),
  placeholder("g3", "gumus", 5),
  placeholder("g4", "gumus", 2),
  ...[1, 3, 2, 5, 1, 4, 2, 1, 3, 5, 1.5, 2].map((r, i) => placeholder(`f${i + 1}`, "fuaye", r)),
];
