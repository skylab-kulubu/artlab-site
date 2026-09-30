import type { Morph } from "@/themes";

export const STEPS = 50;
const STEP_MS = 34;
const GRID = 6;
const REPEL = 70;

export type Shape = { name: string; x: Float32Array; y: Float32Array; tone: Uint8Array };

// Tones: 0 follows the sky's mark colour (the wordmark's inner dots), 1 is amber, 2 is cyan.
export type Palette = [string, string, string];

type Hud = { onStep?: (step: number, noise: number) => void };
export const hud: Hud = {};

function shuffle(n: number) {
  const order = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

// The wordmark is sampled on the same 6-unit grid as the SVG's dot pattern and
// from the glyph positions the SVG itself laid out, so at rest every particle
// sits exactly on a dot of the static wordmark it takes over from.
export function sampleWordmark(text: SVGTextElement, w: number, h: number, band: number): Shape {
  const canvas = new OffscreenCanvas(w, h);
  const g = canvas.getContext("2d")!;
  const style = getComputedStyle(text);
  g.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
  g.fillStyle = "#fff";
  const chars = text.textContent ?? "";
  for (let i = 0; i < chars.length; i++) {
    const p = text.getStartPositionOfChar(i);
    g.fillText(chars[i], p.x, p.y);
  }
  const data = g.getImageData(0, 0, w, h).data;
  const inside = (x: number, y: number) =>
    x >= 0 && y >= 0 && x < w && y < h && data[(Math.floor(y) * w + Math.floor(x)) * 4 + 3] > 127;
  const steps = [-band, -band / 2, 0, band / 2, band];
  // A dot is on the rim when anything within the band around it falls outside the
  // letter, the same square neighbourhood the SVG's erode filter uses for its mask.
  const onRim = (x: number, y: number) => steps.some((dy) => steps.some((dx) => !inside(x + dx, y + dy)));
  const xs: number[] = [];
  const ys: number[] = [];
  const tones: number[] = [];
  for (let y = GRID / 2; y < h; y += GRID) {
    for (let x = GRID / 2; x < w; x += GRID) {
      if (!inside(x, y)) continue;
      xs.push(x);
      ys.push(y);
      tones.push(onRim(x, y) ? 1 : 0);
    }
  }
  return { name: "artlab", x: Float32Array.from(xs), y: Float32Array.from(ys), tone: Uint8Array.from(tones) };
}

export function sampleMorph(morph: Morph, count: number, w: number, h: number, cx: number, cy: number): Shape {
  const canvas = new OffscreenCanvas(w, h);
  const g = canvas.getContext("2d")!;
  morph.draw(g as unknown as CanvasRenderingContext2D, cx, cy, { amber: "#f5b82e", cyan: "#3ed6f0" });
  const data = g.getImageData(0, 0, w, h).data;
  const pts: [number, number, number][] = [];
  for (let y = 0; y < h; y += 3) {
    for (let x = 0; x < w; x += 3) {
      const k = (y * w + x) * 4;
      if (data[k + 3] > 110) pts.push([x, y, data[k + 2] > 200 ? 2 : 1]);
    }
  }
  const order = shuffle(pts.length);
  const shape = { name: morph.name, x: new Float32Array(count), y: new Float32Array(count), tone: new Uint8Array(count) };
  for (let i = 0; i < count; i++) {
    const [x, y, tone] = pts[order[i % pts.length]];
    shape.x[i] = x;
    shape.y[i] = y;
    shape.tone[i] = tone;
  }
  return shape;
}

export class Diffusion {
  readonly n: number;
  private tx: Float32Array;
  private ty: Float32Array;
  private tone: Uint8Array;
  private nx: Float32Array;
  private ny: Float32Array;
  private px: Float32Array;
  private py: Float32Array;
  private step = STEPS;
  private startedAt = -1;
  shape: string;

  constructor(rest: Shape) {
    this.n = rest.x.length;
    this.tx = rest.x.slice();
    this.ty = rest.y.slice();
    this.tone = rest.tone.slice();
    this.nx = new Float32Array(this.n);
    this.ny = new Float32Array(this.n);
    this.px = new Float32Array(this.n);
    this.py = new Float32Array(this.n);
    this.shape = rest.name;
  }

  get settled() {
    return this.step >= STEPS;
  }

  get noise() {
    return (1 - this.step / STEPS) ** 2.2;
  }

  // Each particle's noise starts as its distance from where it is now, so a
  // new shape grows out of the old one instead of snapping to scattered dots.
  morphTo(shape: Shape, instant = false) {
    const s = this.noise;
    for (let i = 0; i < this.n; i++) {
      const cx = this.tx[i] + this.nx[i] * s;
      const cy = this.ty[i] + this.ny[i] * s;
      this.tx[i] = shape.x[i % shape.x.length];
      this.ty[i] = shape.y[i % shape.y.length];
      this.tone[i] = shape.tone[i % shape.tone.length];
      this.nx[i] = cx - this.tx[i] + (Math.random() - 0.5) * 120;
      this.ny[i] = cy - this.ty[i] + (Math.random() - 0.5) * 120;
    }
    this.shape = shape.name;
    this.step = instant ? STEPS : 0;
    this.startedAt = -1;
  }

  // Scatters every particle into noise and holds it there until startAt, so the
  // wordmark can be generated in full view once the intro has lifted.
  emerge(startAt: number) {
    for (let i = 0; i < this.n; i++) {
      this.nx[i] = (Math.random() - 0.5) * 1400;
      this.ny[i] = (Math.random() - 0.5) * 600;
    }
    this.step = 0;
    this.startedAt = startAt;
    hud.onStep?.(0, 1);
  }

  // Advances the denoising schedule; returns true while there is anything left to draw.
  update(now: number, pointer: { x: number; y: number } | null) {
    let moving = false;
    if (this.step < STEPS) {
      if (this.startedAt < 0) this.startedAt = now;
      // Steps follow elapsed time rather than frames, so a slow device finishes on schedule.
      const due = Math.min(STEPS, Math.floor((now - this.startedAt) / STEP_MS));
      if (due > this.step) {
        for (; this.step < due; this.step++) {
          for (let i = 0; i < this.n; i++) {
            this.nx[i] = this.nx[i] * 0.86 + (Math.random() - 0.5) * 14;
            this.ny[i] = this.ny[i] * 0.86 + (Math.random() - 0.5) * 14;
          }
        }
        hud.onStep?.(this.step, this.noise);
      }
    }
    if (this.step < STEPS) moving = true;

    const s = this.noise;
    for (let i = 0; i < this.n; i++) {
      const x = this.tx[i] + this.nx[i] * s;
      const y = this.ty[i] + this.ny[i] * s;
      let fx = 0;
      let fy = 0;
      if (pointer) {
        const dx = x - pointer.x;
        const dy = y - pointer.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < REPEL * REPEL) {
          const d = Math.sqrt(d2) || 1;
          const f = ((REPEL - d) / REPEL) * 14;
          fx = (dx / d) * f;
          fy = (dy / d) * f;
        }
      }
      this.px[i] += (fx - this.px[i]) * 0.2;
      this.py[i] += (fy - this.py[i]) * 0.2;
      if (Math.abs(this.px[i]) + Math.abs(this.py[i]) > 0.05) moving = true;
    }
    return moving;
  }

  draw(g: CanvasRenderingContext2D, map: { s: number; ox: number; oy: number }, palette: Palette) {
    const s = this.noise;
    const r = 1.45 * map.s;
    g.globalAlpha = 0.95 * (0.35 + 0.65 * (1 - s));
    for (let tone = 0; tone < 3; tone++) {
      g.fillStyle = palette[tone];
      g.beginPath();
      for (let i = 0; i < this.n; i++) {
        if (this.tone[i] !== tone) continue;
        const x = map.ox + (this.tx[i] + this.nx[i] * s + this.px[i]) * map.s;
        const y = map.oy + (this.ty[i] + this.ny[i] * s + this.py[i]) * map.s;
        g.moveTo(x + r, y);
        g.arc(x, y, r, 0, Math.PI * 2);
      }
      g.fill();
    }
    g.globalAlpha = 1;
  }
}
