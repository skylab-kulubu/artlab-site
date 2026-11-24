import type { SponsorTier } from "./types";

export const tierSlot: Record<SponsorTier["size"], { area: number; maxW: number; maxH: number }> = {
  lg: { area: 230 ** 2, maxW: 460, maxH: 160 },
  md: { area: 125 ** 2, maxW: 250, maxH: 90 },
  sm: { area: 90 ** 2, maxW: 200, maxH: 66 },
};

// Sizes a logo by the area it covers rather than its width, so square marks and long wordmarks weigh the same in a tier.
export function logoSize(ratio: number, { area, maxW, maxH }: (typeof tierSlot)[SponsorTier["size"]], scale = 1) {
  const w = Math.sqrt(area * ratio) * scale;
  const h = Math.sqrt(area / ratio) * scale;
  const k = Math.min(1, maxW / w, maxH / h);
  return { width: Math.round(w * k), height: Math.round(h * k) };
}
