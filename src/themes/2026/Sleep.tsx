import type { ArtProps } from "../types";
import { Butterfly } from "./Butterfly";

const AMBER = "var(--color-amber)";
const CYAN = "var(--color-cyan)";
const FILL = "var(--color-bg-deep)";
const fade = "transition-opacity duration-300";

// Sleeps by default and wakes while an ancestor marked group/robot is hovered.
export function Sleep({ className }: ArtProps) {
  return (
    <svg width="180" height="96" viewBox="0 0 120 64" aria-hidden="true" className={className}>
      <line x1="70.9" y1="22.6" x2="77.2" y2="10.1" stroke={AMBER} strokeWidth="1.3" />
      <circle cx="77.2" cy="10.1" r="2.6" fill={CYAN} />
      <circle cx="60" cy="46" r="26" fill={FILL} stroke={AMBER} strokeWidth="1.6" />
      <path d="M39.7 38.2 Q60 24.7 80.3 38.2" fill="none" stroke={AMBER} strokeWidth="1.1" opacity="0.45" />
      {[35, 85].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="48.1" r="7.8" fill={FILL} stroke={AMBER} strokeWidth="1.6" />
          <circle cx={cx} cy="48.1" r="3.4" fill="none" stroke={AMBER} strokeWidth="1" opacity="0.7" />
        </g>
      ))}
      <circle cx="60" cy="48.6" r="12.2" fill="var(--color-bg)" stroke={AMBER} strokeWidth="1.2" />
      <path
        d="M53.2 48.6 Q60 53.8 66.8 48.6"
        fill="none"
        stroke={CYAN}
        strokeWidth="1.6"
        className={`${fade} group-hover/robot:opacity-0`}
      />
      <g className={`${fade} opacity-0 group-hover/robot:opacity-100`} fill="none" stroke={CYAN}>
        <circle cx="60" cy="48.6" r="8.8" strokeWidth="1.6" />
        <circle cx="60" cy="48.6" r="5.2" strokeWidth="1" opacity="0.6" />
        <circle cx="61.5" cy="47" r="2.2" fill={CYAN} stroke="none" />
      </g>
      <g className="transition-transform duration-700 ease-out group-hover/robot:translate-x-[-10px] group-hover/robot:translate-y-[-8px]">
        <Butterfly x={42} y={9.5} scale={0.82} />
      </g>
      <g className={`${fade} font-display group-hover/robot:opacity-0`}>
        <text x="94" y="16" fill="var(--color-ink-2)" fontSize="9">
          z
        </text>
        <text x="102" y="8" fill="var(--color-ink-3)" fontSize="7">
          z
        </text>
      </g>
      {[6, 94].map((x) => (
        <g key={x}>
          <rect x={x} y="52" width="20" height="12" rx="4" fill={FILL} stroke={AMBER} strokeWidth="2" />
          <path d={`M${x + 6} 55 V60 M${x + 10} 55 V60 M${x + 14} 55 V60`} stroke={AMBER} strokeWidth="1.2" opacity="0.6" />
        </g>
      ))}
    </svg>
  );
}
