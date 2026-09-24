import type { ArtProps } from "../../types";

const glints: [x: number, y: number, r: number, cyan: boolean, opacity: number][] = [
  [300, 60, 14, false, 0.8],
  [380, 130, 8, true, 0.7],
  [220, 150, 6, false, 0.6],
  [420, 40, 5, false, 0.6],
  [150, 70, 5, true, 0.5],
];

const specks: [x: number, y: number, r: number, cyan: boolean, opacity: number][] = [
  [340, 90, 1.4, false, 0.6],
  [260, 40, 1.2, false, 0.5],
  [400, 170, 1.1, true, 0.5],
  [190, 110, 1.1, false, 0.45],
  [440, 100, 1.3, false, 0.5],
  [320, 180, 1, true, 0.4],
];

const glint = (x: number, y: number, r: number) => {
  const k = r * 0.22;
  return `M${x} ${y - r} L${x + k} ${y - k} L${x + r} ${y} L${x + k} ${y + k} L${x} ${y + r} L${x - k} ${y + k} L${x - r} ${y} L${x - k} ${y - k} Z`;
};

export function Cekilis({ className }: ArtProps) {
  return (
    <svg width="480" height="220" viewBox="0 0 480 220" aria-hidden="true" className={`absolute top-7.5 right-15 ${className ?? ""}`}>
      {glints.map(([x, y, r, cyan, opacity]) => (
        <path key={`${x}-${y}`} d={glint(x, y, r)} fill={cyan ? "var(--color-cyan)" : "var(--color-amber)"} opacity={opacity} />
      ))}
      {specks.map(([x, y, r, cyan, opacity]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill={cyan ? "var(--color-cyan)" : "var(--color-amber)"} opacity={opacity} />
      ))}
    </svg>
  );
}
