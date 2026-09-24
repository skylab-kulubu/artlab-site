import type { ReactNode } from "react";

const AMBER = "var(--color-amber)";
const CYAN = "var(--color-cyan)";
const FILL = "var(--color-bg)";

type Props = {
  look?: [number, number];
  hands?: [number, number] | false;
  width?: number;
  className?: string;
  children?: ReactNode;
};

export function PeekHead({ look = [0, 0], hands = [6, 94], width = 130, className, children }: Props) {
  return (
    <svg width={width} height="64" viewBox={`0 0 ${width} 64`} aria-hidden="true" className={className}>
      <line x1="70.9" y1="22.6" x2="77.2" y2="10.1" stroke={AMBER} strokeWidth="1.6" />
      <circle cx="77.2" cy="10.1" r="2.6" fill={CYAN} />
      <circle cx="60" cy="46" r="26" fill={FILL} stroke={AMBER} strokeWidth="2" />
      <path d="M39.7 38.2 Q60 24.7 80.3 38.2" fill="none" stroke={AMBER} strokeWidth="1.4" opacity="0.45" />
      {[35, 85].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="48.1" r="7.8" fill={FILL} stroke={AMBER} strokeWidth="2" />
          <circle cx={cx} cy="48.1" r="3.4" fill="none" stroke={AMBER} strokeWidth="1.2" opacity="0.7" />
        </g>
      ))}
      <circle cx="60" cy="48.6" r="12.2" fill={FILL} stroke={AMBER} strokeWidth="1.5" />
      <circle cx="60" cy="48.6" r="8.8" fill="none" stroke={CYAN} strokeWidth="2" />
      <circle cx="60" cy="48.6" r="5.2" fill="none" stroke={CYAN} strokeWidth="1.2" opacity="0.6" />
      <circle className="motion-safe:animate-blink" cx={60 + look[0]} cy={48.6 + look[1]} r="2.6" fill={CYAN} />
      {children}
      {hands &&
        hands.map((x) => (
          <g key={x}>
            <rect x={x} y="52" width="20" height="12" rx="4" fill={FILL} stroke={AMBER} strokeWidth="2" />
            <path d={`M${x + 6} 55 V60 M${x + 10} 55 V60 M${x + 14} 55 V60`} stroke={AMBER} strokeWidth="1.2" opacity="0.6" />
          </g>
        ))}
    </svg>
  );
}
