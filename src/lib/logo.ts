import type { SponsorTier } from "./types";

export const tierSlot: Record<SponsorTier["size"], { area: number; maxW: number; maxH: number }> = {
  lg: { area: 150 ** 2, maxW: 300, maxH: 130 },
  md: { area: 95 ** 2, maxW: 220, maxH: 80 },
  sm: { area: 66 ** 2, maxW: 150, maxH: 58 },
};

// Sizes a logo by the area it covers rather than its width, so square marks and long wordmarks weigh the same in a tier.
export function logoSize(ratio: number, { area, maxW, maxH }: (typeof tierSlot)[SponsorTier["size"]], scale = 1) {
  const w = Math.sqrt(area * ratio) * scale;
  const h = Math.sqrt(area / ratio) * scale;
  const k = Math.min(1, maxW / w, maxH / h);
  return { width: Math.round(w * k), height: Math.round(h * k) };
}
