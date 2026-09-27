import type { ComponentType, CSSProperties, ReactNode } from "react";
import { seeded } from "@/lib/random";
import type { FigureProps, Theme } from "@/themes";
import type { SceneLayout } from "./layouts";
import { Sun } from "./Sun";

const STEM = "#2F4A2E";
const SEED_CORE = "#5A3A14";
const MARGIN = 420;
const EDGE = 60;

type Loop = { duration: number; phase?: number; from?: number; to?: number; origin?: string };

// Custom properties are not part of CSSProperties, so the loop inputs go through here.
function loop({ duration, phase = 0, from, to, origin }: Loop): CSSProperties {
  return {
    animationDuration: `${duration}s`,
    "--d": `${(-phase * duration).toFixed(2)}s`,
    ...(from !== undefined && { "--from": `${from}px`, "--to": `${to}px` }),
    ...(origin && { transformOrigin: origin }),
  } as CSSProperties;
}

// Crossing elements travel the scene width plus a shared margin, so bars that
// belong together move at the same speed and stay together; the phase puts
// each one at its drawn position when the clock reads zero.
function crossing(x: number, w: number, duration: number) {
  return loop({ duration, from: -(x + MARGIN), to: w - x, phase: (x + MARGIN) / (w + MARGIN) });
}

function city({ w, horizon, city }: SceneLayout) {
  const rand = seeded(city.seed);
  const pick = <T,>(list: T[]) => list[Math.floor(rand() * list.length)];
  const buildings: { x: number; y: number; w: number; h: number; antenna: boolean }[] = [];
  const windows: { x: number; y: number; opacity: number; lamp?: Loop }[] = [];

  for (let x = -EDGE; x < w + EDGE; ) {
    const bw = pick(city.widths);
    const bh = Math.round(city.minH + rand() ** 1.6 * (city.maxH - city.minH));
    const y = horizon - bh;
    buildings.push({ x, y, w: bw, h: bh, antenna: bh > city.maxH * 0.62 && rand() > 0.4 });
    const lit = Math.floor(rand() * 4);
    for (let i = 0; i < lit; i++) {
      windows.push({
        x: Math.round(x + 2 + rand() * (bw - city.window - 4)),
        y: Math.round(y + 4 + rand() * (bh - city.window - 8)),
        opacity: 0.37 + rand() * 0.41,
        lamp: rand() < 0.3 ? { duration: 24 + rand() * 40, phase: rand() } : undefined,
      });
    }
    x += bw + 4 + Math.floor(rand() * 9);
  }
  return { buildings, windows };
}

function stars({ w, stars }: SceneLayout) {
  const rand = seeded(stars.seed);
  const sizes = [0.8, 0.8, 1, 1.2, 1.6];
  return Array.from({ length: stars.count }, () => ({
    x: Math.round(rand() * w),
    y: Math.round(rand() * stars.maxY),
    r: sizes[Math.floor(rand() * sizes.length)],
    twinkle: { duration: 3 + rand() * 4, phase: rand() },
  }));
}

function Hamam({ x, base, scale }: SceneLayout["hamam"]) {
  return (
    <g transform={`translate(${x} ${base}) scale(${scale})`} fill="var(--far-d)">
      <rect x="0" y="-30" width="124" height="22" />
      <path d="M0 -29 A62 58 0 0 1 124 -29 Z" />
      <rect x="56" y="-96" width="12" height="10" />
      <rect x="142" y="-36" width="64" height="14" />
      <path d="M142 -35 A32 30 0 0 1 206 -35 Z" />
      <g fill="var(--sun)" opacity="0.8">
        <circle cx="38" cy="-52" r="3" />
        <circle cx="62" cy="-62" r="3" />
        <circle cx="86" cy="-52" r="3" />
      </g>
    </g>
  );
}

function Tower({ x, top, h, scale }: SceneLayout["tower"]) {
  return (
    <g>
      <rect x={x - 2 * scale} y={top} width={4 * scale} height={h} fill="var(--far-d)" />
      <rect x={x - 8 * scale} y={top + 38 * scale} width={16 * scale} height={3 * scale} fill="var(--far-d)" />
      <circle className="motion-safe:animate-blink" cx={x} cy={top - 4} r={3.5 * scale} fill="var(--color-cyan)" />
    </g>
  );
}

function Flower({ x, y, size }: { x: number; y: number; size: number }) {
  const ry = 3.5 * size;
  const base = y + 15 * size;
  return (
    <g className="sky-loop sky-sway" style={loop({ duration: 5 + (x % 7) / 2, phase: (x % 11) / 11, origin: `${x}px ${base}px` })}>
      <line x1={x} y1={y} x2={x} y2={base} stroke={STEM} strokeWidth="1.6" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <ellipse
          key={deg}
          cx={x}
          cy={y - 4.5 * size}
          rx={ry / 2}
          ry={ry}
          transform={`rotate(${deg} ${x} ${y})`}
          fill="var(--color-amber)"
          opacity="0.85"
        />
      ))}
      <circle cx={x} cy={y} r={2.25 * size} fill={SEED_CORE} />
    </g>
  );
}

function Bird({ x, y, s, flap }: { x: number; y: number; s: number; flap: number }) {
  const wing = (dx: number) => `M${x + dx} ${y} q${s / 4} ${-s * 0.4} ${s / 2} 0`;
  const style = { "--d": `${-flap}s` } as CSSProperties;
  return (
    <g fill="none" stroke="var(--bird)" strokeWidth="1.3" strokeLinecap="round">
      <path className="sky-wing" style={style} d={wing(0)} />
      <path className="sky-wing" style={style} d={wing(s / 2)} />
    </g>
  );
}

function Flock({ y, span, duration, phase, w }: SceneLayout["flocks"][number] & { w: number }) {
  return (
    <g className="sky-loop sky-flock" style={loop({ duration, phase, from: -120, to: w + 60 })}>
      <g opacity="0.65">
        <Bird x={0} y={y} s={span} flap={0} />
        <Bird x={span * 2.2} y={y + span * 1.3} s={span * 0.75} flap={0.3} />
        <Bird x={span * 4.2} y={y - span * 0.6} s={span * 0.85} flap={0.55} />
      </g>
    </g>
  );
}

function Train({ y, length, duration, w }: NonNullable<SceneLayout["train"]> & { w: number }) {
  const cars = Math.floor(length / 24);
  return (
    <g className="sky-loop sky-train" style={loop({ duration, from: -length, to: w })}>
      <rect x="0" y={y - 6} width={length} height="6" rx="2" fill="var(--far-d)" />
      <g fill="var(--win)" opacity="0.8">
        {Array.from({ length: cars * 3 }, (_, i) => (
          <rect key={i} x={4 + i * 8} y={y - 4.5} width="4" height="2" />
        ))}
      </g>
    </g>
  );
}

function Meteor({ x, y, duration, gradient }: NonNullable<SceneLayout["meteor"]> & { gradient: string }) {
  return (
    <g style={{ opacity: "var(--stars)" }}>
      <path
        className="sky-loop sky-meteor"
        style={loop({ duration, phase: 0.2 })}
        d={`M${x} ${y} l70 -32`}
        stroke={`url(#${gradient})`}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </g>
  );
}

type Props = {
  layout: SceneLayout;
  theme: Theme;
  serverNow: number;
  part: "back" | "front";
  className?: string;
};

function Layer({ depth, children }: { depth: number; children: ReactNode }) {
  return (
    <g className="hero-layer" style={{ "--depth": depth } as CSSProperties}>
      {children}
    </g>
  );
}

function Back({ layout, theme, serverNow }: Omit<Props, "part" | "className">) {
  const { w, h, wordmark } = layout;
  const { buildings, windows } = city(layout);
  const particle = theme.heroMode === "parcacik" && !wordmark.outline;
  const dots = `hero-dots-${w}`;
  const meteor = `hero-meteor-${w}`;

  return (
    <>
      <defs>
        <pattern id={dots} width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.45" fill="var(--color-amber)" />
          <circle cx="9" cy="9" r="1.45" fill="var(--color-amber)" />
          <circle cx="9" cy="3" r="1.45" fill="var(--mark)" />
          <circle cx="3" cy="9" r="1.45" fill="var(--mark)" />
        </pattern>
        <linearGradient id={meteor} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="var(--color-ink)" />
          <stop offset="1" stopColor="var(--color-ink)" stopOpacity="0" />
        </linearGradient>
      </defs>

      <Layer depth={0}>
        <rect x={-EDGE} y={-200} width={w + 2 * EDGE} height={h + 200} fill="var(--sky-1)" />
        {layout.bands.map((y, i) => (
          <rect key={y} x={-EDGE} y={y} width={w + 2 * EDGE} height={h - y} fill={`var(--sky-${i + 2})`} />
        ))}
        <g style={{ opacity: "var(--stars)" }} fill="var(--color-ink)">
          {stars(layout).map((s, i) => (
            <circle key={i} className="sky-loop sky-star" style={loop(s.twinkle)} cx={s.x} cy={s.y} r={s.r} />
          ))}
        </g>
        {layout.meteor && <Meteor {...layout.meteor} gradient={meteor} />}
      </Layer>

      <Layer depth={0.15}>
        {layout.clouds.map((c) => (
          <rect
            key={`${c.x}-${c.y}`}
            className="sky-loop sky-cloud"
            style={crossing(c.x, w, c.duration)}
            x={c.x}
            y={c.y}
            width={c.w}
            height={c.h}
            rx={c.h / 2}
            fill={`var(${c.band})`}
            opacity={c.opacity}
          />
        ))}
        <Sun layout={layout.sun} serverNow={serverNow} />
        {layout.flocks.map((f) => (
          <Flock key={f.y} {...f} w={w} />
        ))}
        {layout.beams.map((b, i) => (
          <g key={b.points} opacity={b.opacity}>
            <polygon className="sky-loop sky-beam" style={loop({ duration: 9 + i * 4 })} points={b.points} fill="var(--beam)" />
          </g>
        ))}
      </Layer>

      <Layer depth={0.3}>
        <rect x={-EDGE} y={layout.horizon - 2} width={w + 2 * EDGE} height={h - layout.horizon + 2} fill="var(--far)" />
        <g fill="var(--far-d)">
          {buildings.map((b) => (
            <g key={b.x}>
              <rect x={b.x} y={b.y} width={b.w} height={b.h} />
              {b.antenna && <rect x={b.x + b.w / 2 - 1} y={b.y - 22} width="2" height="22" />}
            </g>
          ))}
        </g>
        <g fill="var(--win)">
          {windows.map((win, i) => (
            <rect
              key={i}
              className={win.lamp ? "sky-loop sky-lamp" : undefined}
              style={win.lamp && ({ ...loop(win.lamp), "--on": win.opacity.toFixed(2) } as CSSProperties)}
              x={win.x}
              y={win.y}
              width={layout.city.window}
              height={layout.city.window}
              opacity={win.lamp ? undefined : win.opacity.toFixed(2)}
            />
          ))}
        </g>
        <Hamam {...layout.hamam} />
        <Tower {...layout.tower} />
        {layout.train && <Train {...layout.train} w={w} />}
      </Layer>

      <Layer depth={0.4}>
        <text
          x={w / 2}
          y={wordmark.y}
          textAnchor="middle"
          fill={particle ? `url(#${dots})` : "none"}
          stroke={particle ? "none" : "var(--mark)"}
          strokeWidth={wordmark.stroke}
          opacity="0.95"
          className="hero-wordmark font-display font-extrabold"
          style={{ fontSize: wordmark.size, letterSpacing: wordmark.spacing }}
        >
          ARTLAB
        </text>
      </Layer>
    </>
  );
}

function Front({ layout, theme }: Omit<Props, "part" | "className" | "serverNow">) {
  const { w, h } = layout;
  const Figure: ComponentType<FigureProps> | undefined = theme.Figure;

  return (
    <>
      <Layer depth={0.4}>
        {layout.haze && <rect x={-EDGE} y={layout.haze.y} width={w + 2 * EDGE} height={layout.haze.h} fill="var(--far)" opacity="0.45" />}
      </Layer>
      <Layer depth={0.55}>
        <path d={layout.mid} fill="var(--mid)" />
      </Layer>
      <Layer depth={0.6}>
        {layout.sparkles.map(([x, y, r, cyan, opacity], i) => (
          <g key={`${x}-${y}`} opacity={opacity}>
            <circle
              className="sky-loop sky-star"
              style={loop({ duration: 4 + (i % 4), phase: i / layout.sparkles.length })}
              cx={x}
              cy={y}
              r={r}
              fill={cyan ? "var(--color-cyan)" : "var(--color-amber)"}
            />
          </g>
        ))}
      </Layer>
      <Layer depth={0.8}>
        <path d={layout.near} fill="var(--near)" />
        {layout.flowers.map(([x, y, size]) => (
          <Flower key={x} x={x} y={y} size={size} />
        ))}
        {Figure && (
          <g transform={layout.figure || undefined}>
            <g className="motion-safe:animate-breathe">
              <Figure mode={theme.heroMode} />
            </g>
          </g>
        )}
      </Layer>
      <Layer depth={1}>
        <rect x={-EDGE} y={h - 20} width={w + 2 * EDGE} height={220} fill="var(--color-bg)" />
        <path d={layout.ground} fill="var(--color-bg)" />
      </Layer>
    </>
  );
}

export function HeroScene({ layout, theme, serverNow, part, className }: Props) {
  return (
    <svg
      viewBox={`0 0 ${layout.w} ${layout.h}`}
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      className={`absolute inset-0 size-full overflow-visible ${className ?? ""}`}
    >
      {part === "back" ? <Back layout={layout} theme={theme} serverNow={serverNow} /> : <Front layout={layout} theme={theme} />}
    </svg>
  );
}
