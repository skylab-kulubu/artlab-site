import type { CSSProperties } from "react";
import { MAP_H, MAP_W, metro, type Route, type View } from "./route";
import "./map.css";

export type { View };

export const FULL: View = { x: MAP_W / 2, y: MAP_H / 2, scale: 1 };

// Keeps the zoomed map covering the frame: the centre can't get closer to an
// edge than half of what the frame shows at this scale.
export function clampView({ x, y, scale }: View): View {
  const s = Math.min(Math.max(scale, 1), 4);
  const hw = MAP_W / 2 / s;
  const hh = MAP_H / 2 / s;
  return {
    x: Math.min(Math.max(x, hw), MAP_W - hw),
    y: Math.min(Math.max(y, hh), MAP_H - hh),
    scale: s,
  };
}

function stackStyle(view: View) {
  const { x, y, scale } = clampView(view);
  const tx = 50 - (x / MAP_W) * 100 * scale;
  const ty = 50 - (y / MAP_H) * 100 * scale;
  return {
    transform: `translate(${tx}%, ${ty}%) scale(${scale})`,
    "--inv": 1 / scale,
  } as CSSProperties;
}

const at = ([x, y]: [number, number]) => ({
  left: `${(x / MAP_W) * 100}%`,
  top: `${(y / MAP_H) * 100}%`,
});

function line(w: number, dim: boolean) {
  return { "--w": `${w}px`, opacity: dim ? 0.3 : 1 } as CSSProperties;
}

export function Diamond({ n, tone, active }: { n: number; tone: "cyan" | "amber"; active?: boolean }) {
  return (
    <span
      className={`grid size-[26px] rotate-45 place-items-center outline-offset-2 transition-[outline-color] ${
        tone === "cyan" ? "bg-cyan" : "bg-amber"
      } ${active ? "outline-2 outline-ink" : "outline-2 outline-transparent"}`}
    >
      <span className="-rotate-45 text-[13px] font-bold text-on-amber tabular">{n}</span>
    </span>
  );
}

export function PinGlyph({ className }: { className?: string }) {
  return (
    <svg width="24" height="36" viewBox="433 190 25 37" aria-hidden="true" className={className}>
      <path
        d="M445.7 226.4C438.7 216.4 433.7 210.4 433.7 202.4A12 12 0 0 1 457.7 202.4C457.7 210.4 452.7 216.4 445.7 226.4Z"
        fill="var(--color-amber)"
        stroke="var(--color-bg-deep)"
        strokeWidth="2"
      />
      <circle cx="445.7" cy="202.4" r="4.5" fill="var(--color-bg-deep)" />
    </svg>
  );
}

type Props = {
  route: Route;
  view?: View;
  active?: number | null;
  dragging?: boolean;
  onStep?: (i: number) => void;
  steps?: boolean;
  venue: string;
};

export function MapStack({ route, view = FULL, active = null, dragging, onStep, steps: numbered = true, venue }: Props) {
  const { steps } = route;
  const focusLeg = active === null ? null : steps[active].leg;
  const dim = (leg: string) => focusLeg !== null && focusLeg !== leg;
  // The building stays lit along the walk that ends at it.
  const lastLeg = route.lines[route.lines.length - 1].id;
  const Marker = onStep ? "button" : "span";

  return (
    <div className="map-stack absolute inset-0" style={stackStyle(view)} data-dragging={dragging || undefined}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/map/base.svg"
        alt=""
        width={MAP_W}
        height={MAP_H}
        draggable={false}
        className="absolute inset-0 size-full select-none"
      />
      <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} aria-hidden="true" className="absolute inset-0 size-full" fill="none">
        <g stroke="var(--color-amber)" strokeLinecap="round" strokeLinejoin="round">
          {route.lines
            .filter((l) => l.kind === "ride")
            .map((l) => (
              <g key={l.id}>
                <path
                  d={l.d}
                  className="map-line"
                  style={{
                    ...line(9, dim(l.id)),
                    opacity: dim(l.id) ? 0.06 : 0.18,
                  }}
                />
                <path d={l.d} className="map-line" style={line(4.5, dim(l.id))} />
              </g>
            ))}
          <path
            d={route.building}
            className="map-line"
            fill="var(--color-amber)"
            fillOpacity="0.35"
            style={line(2, dim("building") && dim(lastLeg))}
          />
        </g>
        <g stroke="var(--color-cyan)" strokeLinecap="round" strokeLinejoin="round">
          {route.lines
            .filter((l) => l.kind === "walk")
            .map((l) => (
              <path key={l.id} d={l.d} className="map-line map-dots" style={line(3.6, dim(l.id))} />
            ))}
        </g>
        {route.stops.map(({ at: [x, y] }) => (
          <circle
            key={x}
            cx={x}
            cy={y}
            r="5"
            fill="var(--color-bg)"
            stroke="var(--color-amber)"
            className="map-line"
            style={line(2, dim("ring"))}
          />
        ))}
      </svg>

      {route.stops.map(({ name, at: point }) => (
        <span key={name} className="map-marker absolute size-0" style={at(point)}>
          <span
            className="absolute top-[9px] -translate-x-1/2 bg-bg-deep/88 px-1.5 py-0.5 text-[10px] font-medium whitespace-nowrap text-ink-2 transition-opacity"
            style={{ opacity: focusLeg !== null && focusLeg !== "ring" ? 0.3 : 1 }}
          >
            {name}
          </span>
        </span>
      ))}
      <span className="map-marker absolute size-0" style={at(metro)}>
        <span className="absolute -top-[13px] -left-[13px] grid size-[26px] place-items-center rounded-full border-2 border-ink bg-bg-deep text-[11px] font-extrabold text-ink">
          M
        </span>
      </span>
      <span className="map-marker absolute size-0" style={at(route.pin)}>
        <PinGlyph className="absolute -top-[36px] -left-3 drop-shadow-[0_2px_4px_rgb(0_0_0/0.5)]" />
        <span className="absolute -top-[31px] left-[18px] bg-bg-deep/90 px-2 py-1 text-[12px] font-bold whitespace-nowrap text-ink">
          {venue}
        </span>
      </span>
      {numbered &&
        steps.map((step, i) => {
          // The metro and the venue already have their own glyph, so their numbers sit beside it.
          const offset = i === 0 ? [-30, -20] : i === steps.length - 1 ? [-28, -22] : [0, 0];
          return (
            <span key={step.title} className="map-marker absolute size-0" style={at(step.at)}>
              <Marker
                {...(onStep && {
                  type: "button" as const,
                  onClick: () => onStep(i),
                  "aria-label": `${i + 1}. adım: ${step.title}`,
                })}
                className="absolute -translate-1/2"
                style={{ left: offset[0], top: offset[1] }}
              >
                <Diamond n={i + 1} tone={step.tone} active={active === i} />
              </Marker>
            </span>
          );
        })}
    </div>
  );
}
