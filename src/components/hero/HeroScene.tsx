import type { ComponentType } from "react";
import { seeded } from "@/lib/random";
import type { FigureProps, Theme } from "@/themes";
import type { SceneLayout } from "./layouts";
import { Sun } from "./Sun";

const STEM = "#2F4A2E";
const SEED_CORE = "#5A3A14";

function city({ w, horizon, city }: SceneLayout) {
  const rand = seeded(city.seed);
  const pick = <T,>(list: T[]) => list[Math.floor(rand() * list.length)];
  const buildings: { x: number; y: number; w: number; h: number; antenna: boolean }[] = [];
  const windows: { x: number; y: number; opacity: number }[] = [];

  for (let x = 0; x < w; ) {
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
  return (
    <g>
      <line x1={x} y1={y} x2={x} y2={y + 15 * size} stroke={STEM} strokeWidth="1.6" />
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

type Props = {
  layout: SceneLayout;
  theme: Theme;
  serverNow: number;
  className?: string;
};

export function HeroScene({ layout, theme, serverNow, className }: Props) {
  const { w, h, wordmark } = layout;
  const { buildings, windows } = city(layout);
  const particle = theme.heroMode === "parcacik" && !wordmark.outline;
  const Figure: ComponentType<FigureProps> | undefined = theme.Figure;
  const dots = `hero-dots-${w}`;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      className={`absolute inset-0 size-full ${className ?? ""}`}
    >
      <defs>
        <pattern id={dots} width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.45" fill="var(--mark)" />
        </pattern>
      </defs>

      <rect width={w} height={h} fill="var(--sky-1)" />
      {layout.bands.map((y, i) => (
        <rect key={y} y={y} width={w} height={h - y} fill={`var(--sky-${i + 2})`} />
      ))}

      <g style={{ opacity: "var(--stars)" }}>
        <g className="motion-safe:animate-twinkle" fill="var(--color-ink)">
          {stars(layout).map((s, i) => (
            <circle key={i} cx={s.x} cy={s.y} r={s.r} />
          ))}
        </g>
      </g>

      {layout.clouds.map((c) => (
        <rect
          key={`${c.x}-${c.y}`}
          className="motion-safe:animate-drift"
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

      {layout.birds.map(([x, y, s]) => (
        <path
          key={`${x}-${y}`}
          className="motion-safe:animate-glide"
          d={`M${x} ${y} q${s / 2} ${-s * 0.4} ${s} 0 q${s / 2} ${-s * 0.4} ${s} 0`}
          fill="none"
          stroke="var(--bird)"
          strokeWidth="1.3"
          opacity="0.6"
        />
      ))}

      {layout.beams.map((b) => (
        <polygon key={b.points} points={b.points} fill="var(--beam)" opacity={b.opacity} />
      ))}

      <rect y={layout.horizon - 2} width={w} height={h - layout.horizon + 2} fill="var(--far)" />
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
            x={win.x}
            y={win.y}
            width={layout.city.window}
            height={layout.city.window}
            opacity={win.opacity.toFixed(2)}
          />
        ))}
      </g>
      <Hamam {...layout.hamam} />
      <Tower {...layout.tower} />

      <text
        x={w / 2}
        y={wordmark.y}
        textAnchor="middle"
        fill={particle ? `url(#${dots})` : "none"}
        stroke={particle ? "none" : "var(--mark)"}
        strokeWidth={wordmark.stroke}
        opacity="0.95"
        className="font-display font-extrabold"
        style={{ fontSize: wordmark.size, letterSpacing: wordmark.spacing }}
      >
        ARTLAB
      </text>
      {layout.haze && <rect y={layout.haze.y} width={w} height={layout.haze.h} fill="var(--far)" opacity="0.45" />}

      <path d={layout.mid} fill="var(--mid)" />
      <path d={layout.near} fill="var(--near)" />
      {layout.flowers.map(([x, y, size]) => (
        <Flower key={x} x={x} y={y} size={size} />
      ))}
      <path d={layout.ground} fill="var(--color-bg)" />

      {layout.sparkles.map(([x, y, r, cyan, opacity]) => (
        <circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r={r}
          fill={cyan ? "var(--color-cyan)" : "var(--color-amber)"}
          opacity={opacity}
        />
      ))}
      {layout.trail && (
        <path
          d={layout.trail}
          fill="none"
          stroke="var(--color-amber)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeDasharray="1.5 7"
          opacity="0.7"
        />
      )}

      {Figure && (
        <g transform={layout.figure || undefined}>
          <g className="motion-safe:animate-breathe">
            <Figure mode={theme.heroMode} />
          </g>
        </g>
      )}
    </svg>
  );
}
