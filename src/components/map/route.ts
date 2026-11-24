// Overlay geometry for public/map/base.svg, in its 1200 × 1023 coordinate space.
export const MAP_W = 1200;
export const MAP_H = 1023;
// The source map's scale bar spans 157 units for 200 m.
export const METERS_PER_UNIT = 200 / 157;

type Point = [number, number];

export type View = { x: number; y: number; scale: number };

export type Line = { id: string; kind: "walk" | "ride"; d: string };

export type Step = {
  title: string;
  text: string;
  at: Point;
  tone: "cyan" | "amber";
  // Where the expanded map zooms when this step is picked: centre and scale.
  focus: View;
  // The line this step starts, or "building" for the last one.
  leg: string;
  // How you get from this step to the next one.
  next?: { kind: "walk" | "ride"; label: string; detail: string };
};

// A label on public/map/wide.svg, which is drawn as an image, so the label boxes are measured by hand.
export type WideLabel = { text: string; x: number; y: number; box: [number, number, number]; size: number; accent?: boolean };

export type Route = {
  // The place the map is drawn for; its name stands in while the venue is unnamed.
  venue: string;
  position: { lat: number; lng: number };
  building: string;
  pin: Point;
  lines: Line[];
  stops: { name: string; at: Point }[];
  steps: Step[];
  // The campus map's framing for the whole route, and the hero's corner map.
  overview: View;
  mini: View;
  wide: {
    view: View;
    lines: Line[];
    building: string;
    pin: Point;
    stops: Point[];
    // Numbered marks for every step but the last, which is the pin.
    marks: Point[];
    labels: WideLabel[];
    stopLabels: WideLabel[];
    notes: { text: string; x: number; y: number }[];
  };
};

export const metro: Point = [1171.6, 860.8];
export const WIDE_METRO: Point = [1202.3, 109];

// Shared by both routes: out of the metro, over the bridge and to the campus gate.
const metroWalk: Line = {
  id: "metroWalk",
  kind: "walk",
  d: "M1147.6 875.2L1146.8 872.3L1146.1 870.1L1142.2 856.5L1141.1 856.8L1139.8 857.2L1136.3 858.3L1134.7 858.8L1128.1 860.9L1126.5 855.2L1123.1 846.2L1118.3 837.1L1112.6 828.4L1105.6 820.9L1100.4 816.4L1098.1 814.4L1089.5 808.3L1080.6 803.2L1071.8 799.7L1063 796.9L1061 796.6L1059.2 796.9L1057.3 797.9L1055.9 799.4L1055.2 801.4L1055.1 803.4L1055.7 805.4L1057 807.1L1058.8 808.2L1060.8 808.6L1062.7 808.4L1064.4 807.6L1065.8 806.3L1066.7 804.6L1067.1 802.7L1066.8 800.9L1065.9 799.1L1064.6 797.8L1062.8 796.6L1060.6 795.7L1057.6 794.9L1053.2 795.2L1051.2 795.7L1049.5 796.8L1047.9 797.7L1045.7 798.1L1036.4 794.4L1034.2 794L1032.1 793.9L1028.4 794.1L1024.6 794.5L1015.8 793.2L1007.3 787.5",
};
const wideMetroWalk: Line = {
  id: "metroWalk",
  kind: "walk",
  d: "M1193.8 136L1191.3 134.3L1189.2 133.1L1177.2 125.4L1176.5 126.4L1175.8 127.6L1173.9 130.8L1173 132.2L1169.4 138.2L1164.4 135L1155.8 130.4L1146 126.8L1135.9 124L1125.5 123L1118.6 123.1L1115.5 123.1L1104.9 124.3L1094.7 126.4L1085.7 129.6L1077.1 133.4L1075.4 134.5L1074.3 136L1073.5 138L1073.4 140.1L1074.2 142.1L1075.5 143.6L1077.3 144.8L1079.4 145.2L1081.5 144.8L1083.3 143.8L1084.6 142.3L1085.4 140.6L1085.6 138.7L1085.1 136.8L1084.1 135.1L1082.7 133.9L1080.8 133.1L1078.9 133L1076.8 133.3L1074.5 134.1L1071.7 135.5L1068.6 138.7L1067.4 140.4L1066.8 142.4L1066.2 144.2L1064.8 145.9L1055.3 149.4L1053.4 150.6L1051.7 151.9L1049 154.5L1046.4 157.4L1038.9 162.3L1028.6 163.7",
};
const gate: Point = [1007.3, 787.5];
const wideGate: Point = [1028.6, 163.7];
const metroStep: Omit<Step, "text" | "next"> = {
  title: "Davutpaşa – YTÜ metrosu",
  at: metro,
  tone: "cyan",
  focus: { x: 1085, y: 830, scale: 3 },
  leg: "metroWalk",
};
const metroLabel: WideLabel = { text: "Metro çıkışı", x: 1248.3, y: 133.5, box: [1242.3, 120.5, 93.6], size: 12 };
const gateLabel: WideLabel = { text: "Davutpaşa Kampüsü", x: 970.8, y: 192.7, box: [964.8, 179.7, 127.6], size: 12 };

// YTÜ Davutpaşa Kongre Merkezi, the venue since 2026: a walk from the metro, through the
// campus gate and up the path beside the ring road. Its outline is the map's own building.
const kongre: Route = {
  venue: "Kongre Merkezi",
  position: { lat: 41.0233, lng: 28.8958 },
  building:
    "M823.9 586.8L827.3 572.7L829.4 573.2L831.8 563.1L828.8 558.1L820.7 556.2L817.7 551.2L821.6 535L826.7 532L842.7 536L845.8 541L843.3 551L875.5 558.9L874.5 562.9L876 565.4L880 566.4L872.1 598.6L882.2 601.1L881.2 605.1L885.2 606.1L881.3 622.3L880.3 626.3L876.3 625.3L860.2 621.4L861.2 617.3L857.1 616.4L859.1 608.3L856.1 603.3L846.1 600.8L845.6 602.8L831.5 599.3L829.4 598.5L827.7 597.4L826.3 596L825.3 594.5L824.5 592.9L824 591.1L823.8 589L823.9 586.8Z",
  pin: [851.5, 578.6],
  lines: [
    metroWalk,
    {
      id: "campusWalk",
      kind: "walk",
      d: "M1007.3 787.5L990.3 774.2L980.8 762.8L970.7 751.6L919.6 713.5L889 688.6L884.6 685.1L885.3 677.9L894.2 633L888.5 631.2",
    },
  ],
  stops: [],
  steps: [
    {
      ...metroStep,
      text: "M1A · buradan çık, üst geçitten kampüse geç",
      next: { kind: "walk", label: "Yürüyüş", detail: "~290 m · 4 dk" },
    },
    {
      title: "Davutpaşa Kampüsü girişi",
      text: "Kapıdan gir, ring yolu boyunca yürü",
      at: gate,
      tone: "cyan",
      focus: { x: 945, y: 705, scale: 2.6 },
      leg: "campusWalk",
      next: { kind: "walk", label: "Yürüyüş", detail: "~280 m · 4 dk" },
    },
    {
      title: "Kongre Merkezi",
      text: "ARTLAB burada",
      at: [851.5, 578.6],
      tone: "cyan",
      focus: { x: 862, y: 600, scale: 3.4 },
      leg: "building",
    },
  ],
  overview: { x: 990, y: 700, scale: 1.7 },
  mini: { x: 880, y: 615, scale: 2.4 },
  wide: {
    view: { x: 995, y: 128, scale: 2 },
    lines: [
      wideMetroWalk,
      {
        id: "campusWalk",
        kind: "walk",
        d: "M1028.6 163.7L1006.8 165L991.9 162.8L976.8 161L912.5 166.5L872.6 168.1L866.9 168.4L862.6 162.5L839.2 122.5L833.7 125",
      },
    ],
    building:
      "M754.9 134.7L748 121.7L749.9 120.7L745 111.4L739.3 109.6L731.9 113.6L726.3 111.9L718.4 97L720.2 91.3L735 83.6L740.8 85.3L745.6 94.5L775.3 78.9L777.2 82.6L780 83.5L783.7 81.6L799.3 111.3L808.7 106.4L810.6 110.1L814.3 108.2L822.2 123.1L824.2 126.8L820.4 128.7L805.6 136.5L803.6 132.8L799.9 134.8L796 127.3L790.4 125.6L781.1 130.4L782.1 132.2L769 139L766.9 139.8L764.9 140.2L762.9 140L761.1 139.6L759.4 138.9L757.9 137.9L756.3 136.4L754.9 134.7Z",
    pin: [770.3, 109.9],
    stops: [],
    marks: [[1224.3, 129.5], wideGate],
    labels: [
      metroLabel,
      gateLabel,
      { text: "Kongre Merkezi", x: 785, y: 101, box: [779, 88, 117], size: 13, accent: true },
    ],
    stopLabels: [],
    notes: [],
  },
};

// The Tarihi Hamam, kept as the fallback venue: the campus ring from the gate to the
// sports complex, then a short walk to the hamam.
const hamam: Route = {
  venue: "Tarihi Hamam",
  position: { lat: 41.0275, lng: 28.89 },
  building: "M451.7 215.1L440.7 228.7L414.4 261.4L424.9 269.7L460.9 224.9L462.2 223.3L458.9 220.8L451.7 215.1Z",
  pin: [445.7, 202.4],
  lines: [
    {
      id: "ring",
      kind: "ride",
      d: "M1007.3 787.5L990.3 774.2L980.8 762.8L970.7 751.6L919.5 713.5L888.9 688.6L884.6 685.1L877.9 680.4L872.8 679.6L840.1 673.8L788.5 663L753.9 654.1L741.6 651L726.7 647L713.8 641.2L702.2 633.3L693.5 624L684.3 619.8L673.9 620.7L597.5 668.1L592 671.5L586.7 673.5L579.6 674L552.1 671.5L545.9 667.8L531.1 658.8L442 588.1L441.8 588L440.4 586.8L410.7 563.3L395.8 541L315.2 477L277.8 447.4L269.4 439.2L267.8 435.7L269.8 426.3L278.6 415.1L282.7 409.9L346.9 328.9L342 325.1L340.8 324.1L318.8 306.7",
    },
    metroWalk,
    { id: "hamamWalk", kind: "walk", d: "M318.8 306.7L340.8 324.1L359.8 304.3L369.5 312.5L387 289.5L442 218.5" },
  ],
  stops: [
    { name: "Kütüphane", at: [733.4, 645.8] },
    { name: "Yabancı Diller Okulu", at: [559, 672] },
    { name: "İnşaat Fakültesi", at: [401, 549] },
    { name: "Sanat-Tasarım Fakültesi", at: [308, 470] },
  ],
  steps: [
    {
      ...metroStep,
      text: "M1A · buradan çık, durağa yürü",
      next: { kind: "walk", label: "Yürüyüş", detail: "~300 m · 4 dk" },
    },
    {
      title: "Davutpaşa Kampüsü durağı",
      text: "41AT veya kampüs ringine bin",
      at: gate,
      tone: "amber",
      focus: { x: 640, y: 540, scale: 1.3 },
      leg: "ring",
      next: { kind: "ride", label: "41AT / kampüs ringi", detail: "1,4 km · 5. durakta in" },
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
      at: [445.7, 202.4],
      tone: "cyan",
      focus: { x: 438, y: 232, scale: 3.6 },
      leg: "building",
    },
  ],
  overview: { x: MAP_W / 2, y: MAP_H / 2, scale: 1 },
  mini: { x: 470, y: 225, scale: 2.4 },
  wide: {
    view: { x: 680, y: 250, scale: 1 },
    lines: [
      {
        id: "ring",
        kind: "ride",
        d: "M1028.6 163.7L1006.8 165L991.9 162.7L976.8 161L912.4 166.5L872.5 168.2L866.9 168.4L858.7 169.4L854.2 172.2L825.6 189.7L779.2 216.2L747 232.7L735.6 238.6L721.6 245.5L708 249.8L693.9 251.6L681 250.4L671.2 253.4L664 261L637.9 348.2L636 354.5L633.3 359.6L628.3 364.7L605.8 381.3L598.6 382.6L581.3 385.8L466.3 392L466.1 392L464.2 392.1L426 394.2L399.7 387.3L295.7 392.9L247.4 395.5L235.6 395L232 393.4L227.2 384.9L226.4 370.5L226 363.8L220.3 259.4L214 259.8L212.4 259.8L184.1 261.4",
      },
      wideMetroWalk,
      { id: "hamamWalk", kind: "walk", d: "M184.1 261.4L212.4 259.8L213.5 232L226.4 231.8L224.2 202.6L218.3 111.8" },
    ],
    building: "M223.3 102.8L224.1 120.5L226.1 162.9L239.7 162.1L236.9 104L236.8 101.9L232.6 102.2L223.3 102.8Z",
    pin: [226.4, 115.4],
    stops: [
      [725.9, 240.1],
      [611.3, 377],
      [409, 389.9],
      [285.5, 392.4],
    ],
    marks: [[1224.3, 129.5], wideGate, [184.1, 261.4]],
    labels: [
      metroLabel,
      gateLabel,
      { text: "Spor Kompleksi · Yemekhane", x: 95.7, y: 290.4, box: [89.7, 277.4, 188.8], size: 12 },
      { text: "Tarihi Hamam", x: 180.8, y: 68.4, box: [174.8, 55.4, 103.2], size: 13, accent: true },
    ],
    stopLabels: [
      { text: "Kütüphane", x: 725.9, y: 263.1, box: [691.6, 250.1, 68.7], size: 11 },
      { text: "Yabancı Diller Okulu", x: 611.3, y: 400, box: [542.3, 387, 138], size: 11 },
      { text: "İnşaat Fakültesi", x: 409, y: 412.9, box: [352.6, 399.9, 112.8], size: 11 },
      { text: "Sanat-Tasarım Fakültesi", x: 285.5, y: 377.4, box: [217.5, 364.4, 136], size: 11 },
    ],
    notes: [{ text: "YEMEKHANE", x: 165.7, y: 224.4 }],
  },
};

export const DEFAULT_ROUTE = kongre;

// The map follows the venue named in the CMS: the hamam when its name says so, else the
// congress centre. The last step and the wide map's venue label take the CMS's name.
export function routeFor(venue?: string): Route {
  const route = /hamam/i.test(venue ?? "") ? hamam : kongre;
  const name = venue?.trim();
  if (!name || name === route.venue) return route;
  const steps = route.steps.map((step, i) => (i === route.steps.length - 1 ? { ...step, title: name } : step));
  const labels = route.wide.labels.map((label): WideLabel => {
    if (!label.accent) return label;
    // Measured from the hand-set boxes: about 7.6 units a character at 13px, plus the padding.
    return { ...label, text: name, box: [label.box[0], label.box[1], name.length * 7.6 + 12] };
  });
  return { ...route, steps, wide: { ...route.wide, labels } };
}
