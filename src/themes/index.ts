import type { SectionId } from "@/lib/sections";
import { theme2026 } from "./2026";
import { notr } from "./notr";
import type { FigureProps, Morph, Theme } from "./types";

export type { FigureProps, Morph, Theme };

const themes: Record<string, Theme> = { [notr.id]: notr, [theme2026.id]: theme2026 };

export const ACTIVE_THEME = "2026";

export function getTheme(id: string | null | undefined = ACTIVE_THEME): Theme {
  return (id && themes[id]) || notr;
}

export function sectionArt(theme: Theme, id: SectionId) {
  return { Motif: theme.motifs[id], Pose: theme.mascot?.poses[id] };
}
