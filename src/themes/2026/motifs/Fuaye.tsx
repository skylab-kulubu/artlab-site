import type { ArtProps } from "../../types";

const petals = Array.from({ length: 16 }, (_, i) => {
  const deg = 90 + i * 22.5;
  const rad = (deg * Math.PI) / 180;
  return { deg, x: 170 + 60 * Math.sin(rad), y: 140 - 60 * Math.cos(rad) };
});

export function Fuaye({ className }: ArtProps) {
  return (
    <svg
      width="320"
      height="400"
      viewBox="0 0 320 400"
      aria-hidden="true"
      className={`absolute top-2.5 right-10 opacity-20 ${className ?? ""}`}
    >
      <g fill="none" stroke="var(--color-amber)" strokeWidth="1.3">
        {petals.map((p) => (
          <ellipse key={p.deg} cx={p.x.toFixed(1)} cy={p.y.toFixed(1)} rx="11" ry="30" transform={`rotate(${p.deg} ${p.x.toFixed(1)} ${p.y.toFixed(1)})`} />
        ))}
        <circle cx="170" cy="140" r="32" />
        <circle cx="170" cy="140" r="24" strokeWidth="1.6" strokeDasharray="1 4" strokeLinecap="round" />
        <circle cx="170" cy="140" r="14" strokeWidth="1.6" strokeDasharray="1 4" strokeLinecap="round" />
        <path d="M170 174 Q150 280 160 400" />
        <path d="M156 300 Q110 270 92 292 Q120 318 156 300" />
      </g>
    </svg>
  );
}
