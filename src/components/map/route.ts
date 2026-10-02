// Overlay geometry for public/map/base.svg, in its 1200 × 1023 coordinate space.
export const MAP_W = 1200;
export const MAP_H = 1023;
// The source map's scale bar spans 157 units for 200 m.
export const METERS_PER_UNIT = 200 / 157;

export const legs = {
  metroWalk:
    "M1147.6 875.2L1146.8 872.3L1146.1 870.1L1142.2 856.5L1141.1 856.8L1139.8 857.2L1136.3 858.3L1134.7 858.8L1128.1 860.9L1126.5 855.2L1123.1 846.2L1118.3 837.1L1112.6 828.4L1105.6 820.9L1100.4 816.4L1098.1 814.4L1089.5 808.3L1080.6 803.2L1071.8 799.7L1063 796.9L1061 796.6L1059.2 796.9L1057.3 797.9L1055.9 799.4L1055.2 801.4L1055.1 803.4L1055.7 805.4L1057 807.1L1058.8 808.2L1060.8 808.6L1062.7 808.4L1064.4 807.6L1065.8 806.3L1066.7 804.6L1067.1 802.7L1066.8 800.9L1065.9 799.1L1064.6 797.8L1062.8 796.6L1060.6 795.7L1057.6 794.9L1053.2 795.2L1051.2 795.7L1049.5 796.8L1047.9 797.7L1045.7 798.1L1036.4 794.4L1034.2 794L1032.1 793.9L1028.4 794.1L1024.6 794.5L1015.8 793.2L1007.3 787.5",
  ring: "M1007.3 787.5L990.3 774.2L980.8 762.8L970.7 751.6L919.5 713.5L888.9 688.6L884.6 685.1L877.9 680.4L872.8 679.6L840.1 673.8L788.5 663L753.9 654.1L741.6 651L726.7 647L713.8 641.2L702.2 633.3L693.5 624L684.3 619.8L673.9 620.7L597.5 668.1L592 671.5L586.7 673.5L579.6 674L552.1 671.5L545.9 667.8L531.1 658.8L442 588.1L441.8 588L440.4 586.8L410.7 563.3L395.8 541L315.2 477L277.8 447.4L269.4 439.2L267.8 435.7L269.8 426.3L278.6 415.1L282.7 409.9L346.9 328.9L342 325.1L340.8 324.1L318.8 306.7",
  hamamWalk: "M318.8 306.7L340.8 324.1L359.8 304.3L369.5 312.5L387 289.5L442 218.5",
};

export const hamam =
  "M451.7 215.1L440.7 228.7L414.4 261.4L424.9 269.7L460.9 224.9L462.2 223.3L458.9 220.8L451.7 215.1Z";

export const ringStops: { name: string; at: [number, number] }[] = [
  { name: "Kütüphane", at: [733.4, 645.8] },
  { name: "Yabancı Diller Okulu", at: [559, 672] },
  { name: "İnşaat Fakültesi", at: [401, 549] },
  { name: "Sanat-Tasarım Fakültesi", at: [308, 470] },
];

export const metro: [number, number] = [1171.6, 860.8];
export const pin: [number, number] = [445.7, 202.4];

export type Leg = keyof typeof legs | "hamam";

export type Step = {
  title: string;
  text: string;
  at: [number, number];
  tone: "cyan" | "amber";
  // Where the expanded map zooms when this step is picked: centre and scale.
  focus: { x: number; y: number; scale: number };
  leg: Leg;
  // How you get from this step to the next one.
  next?: { kind: "walk" | "ride"; label: string; detail: string };
};

export const steps: Step[] = [
  {
    title: "Davutpaşa – YTÜ metrosu",
    text: "M1A · buradan çık, durağa yürü",
    at: metro,
    tone: "cyan",
    focus: { x: 1085, y: 830, scale: 3 },
    leg: "metroWalk",
    next: { kind: "walk", label: "Yürüyüş", detail: "~300 m · 4 dk" },
  },
  {
    title: "Davutpaşa Kampüsü durağı",
    text: "41AT veya kampüs ringine bin",
    at: [1007.3, 787.5],
    tone: "amber",
    focus: { x: 640, y: 540, scale: 1.3 },
    leg: "ring",
    next: {
      kind: "ride",
      label: "41AT / kampüs ringi",
      detail: "1,4 km · 5. durakta in",
    },
  },
  {
    title: "Spor Kompleksi durağı",
    text: "Yemekhane önünde in",
    at: [318.8, 306.7],
    tone: "amber",
    focus: { x: 380, y: 262, scale: 3 },
    leg: "hamamWalk",
    next: { kind: "walk", label: "Yürüyüş", detail: "~290 m · 4 dk" },
  },
  {
    title: "Tarihi Hamam",
    text: "ARTLAB burada",
    at: pin,
    tone: "cyan",
    focus: { x: 438, y: 232, scale: 3.6 },
    leg: "hamam",
  },
];
