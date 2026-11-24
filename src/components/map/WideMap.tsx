import type { CSSProperties } from "react";
import { WIDE_METRO, type Route, type View, type WideLabel } from "./route";

// The horizontal route map for wide screens: public/map/wide.svg holds the streets,
// and the route, stops and labels are drawn here so they use the site's fonts. Each route
// is the campus map's own, turned onto this map (41.5° anticlockwise, ×1.012).
export const WIDE_W = 1360;
export const WIDE_H = 500;
// Its scale bar spanned 81.4 units for 100 m, and north is turned 41.4° clockwise.
export const WIDE_METERS_PER_UNIT = 100 / 81.4;
export const WIDE_NORTH = 41.4;

const FONT = "var(--font-manrope), system-ui, sans-serif";

// Zooms the map onto a route the way MapStack does, keeping the frame covered.
function viewStyle({ x, y, scale }: View): CSSProperties {
  const s = Math.max(scale, 1);
  const cx = Math.min(Math.max(x, WIDE_W / 2 / s), WIDE_W - WIDE_W / 2 / s);
  const cy = Math.min(Math.max(y, WIDE_H / 2 / s), WIDE_H - WIDE_H / 2 / s);
  return {
    transform: `translate(${50 - (cx / WIDE_W) * 100 * s}%, ${50 - (cy / WIDE_H) * 100 * s}%) scale(${s})`,
    transformOrigin: "0 0",
  };
}

function Label({ label, scale }: { label: WideLabel; scale: number }) {
  const [bx, by, bw] = label.box;
  const stop = label.size === 11;
  // Text keeps its size on screen when the map is zoomed, growing from its anchor.
  const ax = stop ? label.x : bx;
  const ay = by + 9;
  return (
    <g transform={`translate(${ax} ${ay}) scale(${1 / scale}) translate(${-ax} ${-ay})`}>
      <rect x={bx} y={by} width={bw} height="18" fill="#0B0E13" fillOpacity="0.88" />
      <text
        x={label.x}
        y={label.y}
        textAnchor={stop ? "middle" : undefined}
        fill={label.accent ? "#F5B82E" : stop ? "#8A95A5" : "#E9EDF2"}
        style={{ fontFamily: FONT, fontSize: `${label.size}px` }}
      >
        {label.text}
      </text>
    </g>
  );
}

function Mark({ at: [x, y], n, tone, scale }: { at: [number, number]; n: number; tone: string; scale: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${1 / scale})`}>
      <rect x="-10" y="-10" width="20" height="20" transform="rotate(45)" fill={tone} stroke="#0B0E13" strokeWidth="2" />
      <text
        y="4.5"
        textAnchor="middle"
        fill="#0B0E13"
        style={{ fontFamily: "var(--font-unbounded), sans-serif", fontSize: "11px", fontWeight: "700" }}
      >
        {n}
      </text>
    </g>
  );
}

export function WideMap({ route }: { route: Route }) {
  const { wide, steps } = route;
  const k = Math.max(wide.view.scale, 1);
  return (
    <span className="absolute inset-0 block overflow-hidden">
      <span className="absolute inset-0 block" style={viewStyle(wide.view)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/map/wide.svg"
          alt=""
          width={WIDE_W}
          height={WIDE_H}
          draggable={false}
          className="absolute inset-0 size-full select-none"
        />
        <svg viewBox="0 0 1360 500" aria-hidden="true" className="absolute inset-0 size-full">
          <defs>
            <path
              id="wide-rl1"
              d="M805.5 30.6 L828.9 41.2 L860.9 75.5 L885.6 103.2 L910.0 121.6 L925.9 130.0 L950.6 135.6 L1002.4 138.3 L1040.4 136.0 L1079.7 118.7 L1090.4 114.3 L1113.3 103.7"
            />
            <path
              id="wide-rl2"
              d="M1138.7 314.4 L1149.1 302.1 L1151.5 299.2 L1158.0 290.9 L1167.3 276.3 L1171.8 266.7 L1178.9 247.4 L1181.3 234.6 L1181.6 224.4 L1179.8 213.7 L1171.4 189.1 L1167.3 177.0 L1163.9 168.2"
            />
            <path
              id="wide-rl4"
              d="M1103.5 43.7 L1150.7 67.1 L1161.9 72.8 L1174.4 79.6 L1184.9 85.7 L1201.8 96.4 L1210.7 102.0 L1218.8 107.8 L1224.4 112.5 L1233.9 120.9 L1246.7 132.4"
            />
          </defs>
          <text
            dy="-11"
            style={{
              fontFamily: "var(--font-manrope), system-ui, sans-serif",
              fontSize: "12px",
              fontWeight: "600",
              letterSpacing: "0.04em",
            }}
            fill="#6B7788"
          >
            <textPath href="#wide-rl1" startOffset="50%" textAnchor="middle">
              Yıldız Cd.
            </textPath>
          </text>
          <text
            dy="-11"
            style={{
              fontFamily: "var(--font-manrope), system-ui, sans-serif",
              fontSize: "12px",
              fontWeight: "600",
              letterSpacing: "0.04em",
            }}
            fill="#6B7788"
          >
            <textPath href="#wide-rl2" startOffset="50%" textAnchor="middle">
              Eski Londra Asfaltı Cd.
            </textPath>
          </text>
          <text
            dy="-11"
            style={{
              fontFamily: "var(--font-manrope), system-ui, sans-serif",
              fontSize: "12px",
              fontWeight: "600",
              letterSpacing: "0.04em",
            }}
            fill="#6B7788"
          >
            <textPath href="#wide-rl4" startOffset="50%" textAnchor="middle">
              Dumlupınar Cd.
            </textPath>
          </text>
          {wide.lines
            .filter((l) => l.kind === "ride")
            .map((l) => (
              <g key={l.id} fill="none" stroke="#F5B82E" strokeLinecap="round" strokeLinejoin="round">
                <path d={l.d} strokeWidth={10 / k} opacity="0.16" />
                <path d={l.d} strokeWidth={4.5 / k} />
              </g>
            ))}
          {wide.lines
            .filter((l) => l.kind === "walk")
            .map((l) => (
              <path
                key={l.id}
                d={l.d}
                fill="none"
                stroke="#3ED6F0"
                strokeWidth={3.6 / k}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={`0.1 ${8 / k}`}
              />
            ))}
          <path d={wide.building} fill="#F5B82E" fillOpacity="0.35" stroke="#F5B82E" strokeWidth={2 / k} />
          {wide.stops.map(([x, y]) => (
            <circle key={x} cx={x} cy={y} r={5 / k} fill="#0E1218" stroke="#F5B82E" strokeWidth={2 / k} />
          ))}
          {wide.stopLabels.map((l) => (
            <Label key={l.text} label={l} scale={k} />
          ))}
          {wide.notes.map((n) => (
            <text
              key={n.text}
              x={n.x}
              y={n.y}
              textAnchor="middle"
              style={{ fontFamily: FONT, fontSize: `${10 / k}px`, fontWeight: "700", letterSpacing: "0.08em" }}
              fill="#6B7788"
            >
              {n.text}
            </text>
          ))}
          <g transform={`translate(${wide.pin[0]} ${wide.pin[1]}) scale(${1 / k})`}>
            <path
              d="M0 0 C-7 -10 -12 -16 -12 -24 A12 12 0 0 1 12 -24 C12 -16 7 -10 0 0 Z"
              fill="#F5B82E"
              stroke="#0B0E13"
              strokeWidth="2"
            />
            <circle cy="-24" r="4.5" fill="#0B0E13" />
          </g>
          <g transform={`translate(${WIDE_METRO[0]} ${WIDE_METRO[1]}) scale(${1 / k})`}>
            <circle r="12" fill="#0B0E13" stroke="#E9EDF2" strokeWidth="2" />
            <text
              y="4.5"
              textAnchor="middle"
              fill="#E9EDF2"
              style={{ fontFamily: "var(--font-unbounded), sans-serif", fontSize: "12px", fontWeight: "700" }}
            >
              M
            </text>
          </g>
          {wide.marks.map((at, i) => (
            <Mark key={i} at={at} n={i + 1} tone={steps[i].tone === "cyan" ? "#3ED6F0" : "#F5B82E"} scale={k} />
          ))}
          {wide.labels.map((l) => (
            <Label key={l.text} label={l} scale={k} />
          ))}
        </svg>
      </span>
    </span>
  );
}
