import type { Morph } from "../types";

type Pt = [number, number];

const UPPER: Pt[] = [[6, -6], [18, -58], [62, -104], [118, -118], [160, -100], [166, -66], [138, -30], [90, -6], [40, 4]];
const LOWER: Pt[] = [[6, 6], [40, 12], [88, 28], [116, 62], [108, 104], [80, 128], [46, 120], [22, 84], [10, 40]];
const SCALE = 1.15;

// Closed Catmull-Rom through the outline points, so the designer only draws the wing's silhouette.
function spline(pts: Pt[], n: number) {
  const out: Pt[] = [];
  const L = pts.length;
  for (let i = 0; i < L; i++) {
    const [p0, p1, p2, p3] = [pts[(i - 1 + L) % L], pts[i], pts[(i + 1) % L], pts[(i + 2) % L]];
    for (let j = 0; j < n; j++) {
      const t = j / n;
      const t2 = t * t;
      const t3 = t2 * t;
      out.push(
        [0, 1].map(
          (k) =>
            0.5 *
            (2 * p1[k] + (-p0[k] + p2[k]) * t + (2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k]) * t2 + (-p0[k] + 3 * p1[k] - 3 * p2[k] + p3[k]) * t3),
        ) as Pt,
      );
    }
  }
  return out;
}

// The wing's veins are a layered network: each vein runs from a root near the
// body to an outline point with nodes at every layer, and neighbouring veins
// link on the same and on the next layer, input at the body, output at the edge.
function wing(
  g: CanvasRenderingContext2D,
  [cx, cy]: Pt,
  outline: Pt[],
  ends: number[],
  root: Pt,
  layers: number,
  side: number,
  { amber, cyan }: { amber: string; cyan: string },
) {
  const place = ([x, y]: Pt): Pt => [cx + side * x * SCALE, cy + y * SCALE];
  const R = place(root);
  const nodes = ends.map((i) => {
    const v = place(outline[i]);
    return Array.from({ length: layers }, (_, l) => {
      const t = ((l + 1) / layers) ** 0.85;
      return [R[0] + (v[0] - R[0]) * t, R[1] + (v[1] - R[1]) * t] as Pt;
    });
  });
  const line = (a: Pt, b: Pt) => {
    g.beginPath();
    g.moveTo(...a);
    g.lineTo(...b);
    g.stroke();
  };

  g.strokeStyle = amber;
  g.lineWidth = 2;
  nodes.forEach((row, k) => {
    line(R, row[0]);
    for (let l = 0; l < layers - 1; l++) line(row[l], row[l + 1]);
    if (k < nodes.length - 1) {
      for (let l = 0; l < layers; l++) {
        line(row[l], nodes[k + 1][l]);
        if (l < layers - 1) line(row[l], nodes[k + 1][l + 1]);
      }
    }
  });
  g.lineWidth = 3.4;
  g.beginPath();
  spline(outline.map(place), 12).forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y)));
  g.closePath();
  g.stroke();
  g.fillStyle = cyan;
  nodes.flat().forEach(([x, y]) => {
    g.beginPath();
    g.arc(x, y, 4.6, 0, Math.PI * 2);
    g.fill();
  });
}

export const koza: Morph = {
  name: "koza",
  draw(g, cx, cy, { amber, cyan }) {
    g.fillStyle = amber;
    g.beginPath();
    g.ellipse(cx, cy, 52, 100, 0, 0, Math.PI * 2);
    g.fill();
    g.globalCompositeOperation = "destination-out";
    g.lineWidth = 6;
    for (let k = -3; k <= 3; k++) {
      g.beginPath();
      g.ellipse(cx, cy + k * 26, 54, 11, 0, 0, Math.PI);
      g.stroke();
    }
    g.globalCompositeOperation = "source-over";
    g.fillStyle = cyan;
    g.fillRect(cx - 2, cy - 136, 4, 36);
  },
};

export const kelebek: Morph = {
  name: "kelebek",
  draw(g, cx, cy, colors) {
    for (const side of [-1, 1]) {
      wing(g, [cx, cy], UPPER, [1, 2, 3, 4, 5, 6, 7], [10, -10], 4, side, colors);
      wing(g, [cx, cy], LOWER, [2, 3, 4, 5, 6, 7], [10, 10], 3, side, colors);
    }
    g.fillStyle = colors.cyan;
    g.fillRect(cx - 3, cy - 62 * SCALE, 6, 134 * SCALE);
    g.strokeStyle = colors.cyan;
    g.lineWidth = 2.4;
    for (const side of [-1, 1]) {
      g.beginPath();
      g.moveTo(cx, cy - 62 * SCALE);
      g.quadraticCurveTo(cx + side * 8 * SCALE, cy - 92 * SCALE, cx + side * 26 * SCALE, cy - 104 * SCALE);
      g.stroke();
      g.beginPath();
      g.arc(cx + side * 26 * SCALE, cy - 104 * SCALE, 3.5, 0, Math.PI * 2);
      g.fill();
    }
  },
};
