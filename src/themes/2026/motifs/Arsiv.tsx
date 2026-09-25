import { seeded } from "@/lib/random";
import type { ArtProps } from "../../types";

const pixels = (() => {
  const rand = seeded(2025);
  return [
    [186, 24],
    [226, 52],
  ].flatMap(([x, y]) =>
    Array.from({ length: 14 }, (_, i) => {
      const t = (i + 1) / 14;
      const size = Math.round(6 - t * 3);
      return {
        x: Math.round(x + t * 120 + rand() * 18),
        y: Math.round(y - 18 + t * 30 + (rand() - 0.5) * 40),
        size,
        opacity: (1 - t * 0.85).toFixed(2),
      };
    }),
  );
})();

export function Arsiv({ className }: ArtProps) {
  return (
    <svg
      width="520"
      height="160"
      viewBox="0 0 520 160"
      aria-hidden="true"
      className={`absolute top-7.5 right-20 opacity-55 ${className ?? ""}`}
    >
      <g fill="none" stroke="var(--color-ink)" strokeWidth="1.4" strokeLinejoin="round">
        <path d="M70 124 Q108 104 158 110 Q182 106 198 96 L212 99 L201 110 Q186 128 150 132 Q110 140 70 124 Z" />
        <path d="M118 112 Q128 50 186 24 Q176 64 156 106" />
        <path d="M138 110 Q168 64 226 52 Q202 88 172 112" />
        <path d="M70 124 L38 110 L46 126 L34 138 L72 128" />
      </g>
      <circle cx="202" cy="101" r="1.6" fill="var(--color-ink)" />
      <g fill="var(--color-ink)">
        {pixels.map((p, i) => (
          <rect key={i} x={p.x} y={p.y} width={p.size} height={p.size} opacity={p.opacity} />
        ))}
      </g>
    </svg>
  );
}
