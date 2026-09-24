import type { ArtProps } from "../../types";

type Wave = { from: number; to: number; y: number; amp: number; period: number; color: string; opacity: number };

const AMBER = "var(--color-amber)";
const CYAN = "var(--color-cyan)";

const waves: Wave[] = [
  { from: 0, to: 420, y: 90, amp: 34, period: 350, color: AMBER, opacity: 0.55 },
  { from: 380, to: 780, y: 90, amp: 34, period: 350, color: CYAN, opacity: 0.55 },
  { from: 0, to: 420, y: 124, amp: 12, period: 260, color: AMBER, opacity: 0.25 },
  { from: 380, to: 780, y: 124, amp: 12, period: 260, color: CYAN, opacity: 0.25 },
  { from: 200, to: 780, y: 72, amp: 16, period: 520, color: CYAN, opacity: 0.18 },
];

const wavePath = ({ from, to, y, amp, period }: Wave) => {
  const points = [];
  for (let x = from; x <= to; x += 7) {
    points.push(`${x.toFixed(1)} ${(y + amp * Math.sin((2 * Math.PI * x) / period)).toFixed(1)}`);
  }
  return `M${points.join(" L")}`;
};

export function Program({ className }: ArtProps) {
  return (
    <svg width="780" height="180" viewBox="0 0 780 180" aria-hidden="true" className={`absolute top-10 right-0 ${className ?? ""}`}>
      {waves.map((w, i) => (
        <path
          key={i}
          d={wavePath(w)}
          fill="none"
          stroke={w.color}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeDasharray="0.5 7"
          opacity={w.opacity}
        />
      ))}
    </svg>
  );
}
