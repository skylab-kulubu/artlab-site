export type EnvName = "gece" | "safak" | "gunduz" | "alacakaranlik";

export type EnvPalette = {
  sky1: string;
  sky2: string;
  sky3: string;
  sky4: string;
  sky5: string;
  sky6: string;
  sun: string;
  beam: string;
  far: string;
  farD: string;
  mid: string;
  near: string;
  win: string;
  mark: string;
  bird: string;
  hud: string;
};

export const palettes: Record<EnvName, EnvPalette> = {
  safak: {
    sky1: "#2A6FC4", sky2: "#4A8FD8", sky3: "#7DB3E6", sky4: "#BCD6EE", sky5: "#FFD3A3", sky6: "#FFE08A",
    sun: "#FFF6D2", beam: "#FFFFFF", far: "#A8BEDB", farD: "#86A0C6", mid: "#3F5476", near: "#1C2538",
    win: "#FFF6D2", mark: "#14264A", bird: "#14264A", hud: "#F2F6FB",
  },
  gunduz: {
    sky1: "#1E6FD9", sky2: "#3E88E3", sky3: "#69A6EC", sky4: "#9CC6F2", sky5: "#C9E0F6", sky6: "#E6F0F8",
    sun: "#FFFBEA", beam: "#FFFFFF", far: "#9DB3D0", farD: "#7F97BA", mid: "#3E5577", near: "#1C2538",
    win: "#DCE6F2", mark: "#14264A", bird: "#14264A", hud: "#F2F6FB",
  },
  alacakaranlik: {
    sky1: "#0B1524", sky2: "#112036", sky3: "#1C2D48", sky4: "#34405A", sky5: "#76606A", sky6: "#C98A5C",
    sun: "#F5B82E", beam: "#F5B82E", far: "#34405A", farD: "#27314A", mid: "#1A2130", near: "#12161F",
    win: "#F5B82E", mark: "#E9EDF2", bird: "#E9EDF2", hud: "#8A95A5",
  },
  gece: {
    sky1: "#05070B", sky2: "#080C13", sky3: "#0B121B", sky4: "#0E1A24", sky5: "#12272F", sky6: "#18393F",
    sun: "#BFEFF5", beam: "#3ED6F0", far: "#15303A", farD: "#0F2530", mid: "#0D1B24", near: "#0B141B",
    win: "#3ED6F0", mark: "#E9EDF2", bird: "#E9EDF2", hud: "#8A95A5",
  },
};

export const envHour: Record<EnvName, number> = { safak: 6.5, gunduz: 12.5, alacakaranlik: 18.5, gece: 23 };

const stops: [number, EnvName][] = [
  [0, "gece"],
  [5, "gece"],
  [6.5, "safak"],
  [9, "gunduz"],
  [16.5, "gunduz"],
  [18.5, "alacakaranlik"],
  [20, "gece"],
  [24, "gece"],
];

// Blending dark navy into light ink passes through unreadable grey, so these snap to the nearer palette.
const snapped = new Set<keyof EnvPalette>(["mark", "bird", "hud"]);

const toRgb = (c: string) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));

function mix(a: string, b: string, t: number) {
  const x = toRgb(a);
  const y = toRgb(b);
  return "#" + x.map((v, i) => Math.round(v + (y[i] - v) * t).toString(16).padStart(2, "0")).join("");
}

export type Sky = EnvPalette & {
  night: boolean;
  arc: number;
  lift: number;
  starOpacity: number;
};

export function skyAt(hour: number): Sky {
  let i = stops.findIndex(([h], k) => k < stops.length - 1 && hour >= h && hour <= stops[k + 1][0]);
  if (i < 0) i = 0;
  const [ha, na] = stops[i];
  const [hb, nb] = stops[i + 1];
  const t = hb === ha ? 0 : (hour - ha) / (hb - ha);
  const pa = palettes[na];
  const pb = palettes[nb];

  const palette = {} as EnvPalette;
  for (const key of Object.keys(pa) as (keyof EnvPalette)[]) {
    palette[key] = snapped.has(key) ? (t < 0.5 ? pa[key] : pb[key]) : mix(pa[key], pb[key], t);
  }

  const night = hour >= 19.5 || hour < 5.5;
  const arc = Math.max(0, Math.min(1, (hour - 6) / 12.5));
  const stars =
    hour >= 20 || hour < 5 ? 1 : hour < 6.5 ? (6.5 - hour) / 1.5 : hour > 18.5 ? (hour - 18.5) / 1.5 : 0;

  return {
    ...palette,
    night,
    arc,
    lift: Math.sin(Math.PI * arc),
    starOpacity: Math.max(0, Math.min(1, stars)),
  };
}

const varNames: Record<keyof EnvPalette, string> = {
  sky1: "--sky-1", sky2: "--sky-2", sky3: "--sky-3", sky4: "--sky-4", sky5: "--sky-5", sky6: "--sky-6",
  sun: "--sun", beam: "--beam", far: "--far", farD: "--far-d", mid: "--mid", near: "--near",
  win: "--win", mark: "--mark", bird: "--bird", hud: "--hud",
};

export function skyVars(sky: Sky) {
  const vars: Record<string, string> = { "--stars": sky.starOpacity.toFixed(2) };
  for (const key of Object.keys(varNames) as (keyof EnvPalette)[]) vars[varNames[key]] = sky[key];
  return vars;
}

export function venueHour(now: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Istanbul",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const h = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const m = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  return h + m / 60;
}

export function formatHour(hour: number) {
  const h = Math.floor(hour) % 24;
  const m = Math.floor((hour - Math.floor(hour)) * 60);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function parseForcedHour(value: string | null | undefined) {
  if (value == null || value === "") return undefined;
  const n = Number(value.replace(",", "."));
  return Number.isFinite(n) && n >= 0 && n < 24 ? n : undefined;
}
