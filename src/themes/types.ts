import type { ComponentType } from "react";

export type ArtProps = { className?: string };

export type HeroMode = "parcacik" | "klasik";

export type FigureProps = { mode: HeroMode };

export type Mascot = {
  Logo: ComponentType<ArtProps>;
};

export type Theme = {
  id: string;
  mascot?: Mascot;
  Figure?: ComponentType<FigureProps>;
  motifs: boolean;
  heroMode: HeroMode;
  morphs: ("koza" | "kelebek")[];
};
