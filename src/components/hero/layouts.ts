type Band = "--sky-4" | "--sky-5" | "--sky-6";

export type SceneLayout = {
  w: number;
  h: number;
  bands: number[];
  horizon: number;
  city: { widths: number[]; minH: number; maxH: number; window: number; seed: number };
  stars: { count: number; maxY: number; seed: number };
  clouds: { x: number; y: number; w: number; h: number; band: Band; opacity?: number; duration: number }[];
  flocks: { y: number; span: number; duration: number; phase: number }[];
  train?: { y: number; length: number; duration: number };
  meteor?: { x: number; y: number; duration: number };
  beams: { points: string; opacity: number }[];
  hamam: { x: number; base: number; scale: number };
  tower: { x: number; top: number; h: number; scale: number };
  wordmark: { y: number; size: number; spacing: number; stroke: number; outline?: boolean };
  haze?: { y: number; h: number };
  mid: string;
  near: string;
  ground: string;
  flowers: [x: number, y: number, size: number][];
  sparkles: [x: number, y: number, r: number, cyan: boolean, opacity: number][];
  figure: string;
  sun: { x: number; dx: number; y: number; dy: number; r: number; moon: [number, number] };
};

export const desktop: SceneLayout = {
  w: 1440,
  h: 860,
  bands: [230, 330, 405, 455, 492],
  horizon: 530,
  city: { widths: [18, 24, 30, 36, 44], minH: 28, maxH: 167, window: 3, seed: 2026 },
  stars: { count: 48, maxY: 370, seed: 8 },
  clouds: [
    { x: 860, y: 196, w: 380, h: 8, band: "--sky-4", duration: 260 },
    { x: 940, y: 214, w: 220, h: 6, band: "--sky-4", duration: 260 },
    { x: 120, y: 280, w: 300, h: 8, band: "--sky-5", opacity: 0.5, duration: 340 },
    { x: 560, y: 372, w: 420, h: 7, band: "--sky-6", opacity: 0.45, duration: 420 },
    { x: 1240, y: 150, w: 160, h: 5, band: "--sky-4", opacity: 0.7, duration: 220 },
  ],
  flocks: [
    { y: 300, span: 14, duration: 95, phase: 0.45 },
    { y: 250, span: 10, duration: 130, phase: 0.1 },
  ],
  train: { y: 526, length: 96, duration: 70 },
  meteor: { x: 1180, y: 60, duration: 47 },
  beams: [
    { points: "262,0 300,0 312,500 290,500", opacity: 0.07 },
    { points: "330,0 356,0 330,500 318,500", opacity: 0.05 },
  ],
  hamam: { x: 238, base: 530, scale: 1 },
  tower: { x: 1180, top: 382, h: 124, scale: 1 },
  wordmark: { y: 468, size: 206, spacing: 8, stroke: 2 },
  haze: { y: 436, h: 26 },
  mid: "M-60 860 L-60 470 L140 455 L300 478 L460 452 L620 440 L780 432 L940 446 L1100 456 L1260 474 L1500 458 L1500 860 Z",
  near: "M-60 860 L-60 640 L200 620 L420 650 L640 628 L820 600 L980 570 L1120 590 L1300 615 L1500 600 L1500 860 Z",
  ground: "M-60 860 L-60 760 L360 740 L760 770 L1100 745 L1500 760 L1500 860 Z",
  flowers: [
    [900, 598, 1],
    [1100, 596, 1.2],
    [1150, 606, 0.9],
    [860, 612, 0.8],
    [1210, 612, 1],
  ],
  sparkles: [
    [1210, 300, 1.4, false, 0.55],
    [1250, 262, 1.1, false, 0.4],
    [1320, 340, 1.6, false, 0.5],
    [1160, 250, 1, true, 0.5],
    [860, 300, 1.1, false, 0.35],
    [1380, 280, 1.2, false, 0.4],
    [1290, 410, 1, false, 0.5],
    [640, 260, 1, false, 0.3],
    [1120, 210, 1.3, false, 0.45],
    [1350, 210, 1, true, 0.4],
  ],
  figure: "",
  sun: { x: 330, dx: 810, y: 540, dy: 330, r: 72, moon: [300, 230] },
};

export const mobile: SceneLayout = {
  w: 390,
  h: 844,
  bands: [150, 230, 290, 332, 366],
  horizon: 422,
  city: { widths: [12, 16, 25, 30], minH: 14, maxH: 86, window: 2, seed: 390 },
  stars: { count: 30, maxY: 300, seed: 3 },
  clouds: [
    { x: 190, y: 170, w: 170, h: 6, band: "--sky-4", duration: 120 },
    { x: 30, y: 250, w: 140, h: 6, band: "--sky-5", opacity: 0.5, duration: 160 },
  ],
  flocks: [{ y: 230, span: 9, duration: 60, phase: 0.3 }],
  meteor: { x: 360, y: 40, duration: 53 },
  beams: [{ points: "84,0 106,0 104,396 90,396", opacity: 0.07 }],
  hamam: { x: 65, base: 404, scale: 0.5 },
  tower: { x: 331.5, top: 316, h: 80, scale: 0.8 },
  wordmark: { y: 458, size: 60, spacing: 2, stroke: 1.5, outline: true },
  mid: "M-60 844 L-60 452 L90 440 L190 448 L290 438 L450 450 L450 844 Z",
  near: "M-60 844 L-60 574 L120 556 L230 526 L300 540 L450 528 L450 844 Z",
  ground: "M-60 844 L-60 610 L200 598 L450 612 L450 844 Z",
  flowers: [
    [160, 558, 0.8],
    [300, 548, 0.9],
    [340, 556, 0.7],
  ],
  sparkles: [
    [300, 220, 1.2, false, 0.5],
    [340, 260, 1, false, 0.4],
    [250, 190, 1, true, 0.45],
    [360, 340, 1.3, false, 0.5],
    [60, 300, 1, false, 0.3],
  ],
  figure: "translate(222 530) scale(0.62) translate(-980 -572)",
  sun: { x: 110, dx: 200, y: 410, dy: 250, r: 46, moon: [80, 150] },
};
