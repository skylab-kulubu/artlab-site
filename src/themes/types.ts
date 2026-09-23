import type { ComponentType } from "react";

export type ArtProps = { className?: string };

export type Mascot = {
  Logo: ComponentType<ArtProps>;
};

export type Theme = {
  id: string;
  mascot?: Mascot;
  figure: boolean;
  motifs: boolean;
  heroMode: "parcacik" | "klasik";
  morphs: ("koza" | "kelebek")[];
};
