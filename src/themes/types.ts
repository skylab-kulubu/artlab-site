import type { ComponentType } from "react";
import type { SectionId } from "@/lib/sections";

export type ArtProps = { className?: string };

export type HeroMode = "parcacik" | "klasik";

export type FigureProps = { mode: HeroMode };

export type Mascot = {
  Logo: ComponentType<ArtProps>;
  poses: Partial<Record<SectionId, ComponentType<ArtProps>>>;
  Soon: ComponentType<ArtProps>;
  Contact: ComponentType<ArtProps>;
  Sleep: ComponentType<ArtProps>;
};

export type Theme = {
  id: string;
  mascot?: Mascot;
  Figure?: ComponentType<FigureProps>;
  motifs: Partial<Record<SectionId, ComponentType<ArtProps>>>;
  heroMode: HeroMode;
  morphs: ("koza" | "kelebek")[];
};
