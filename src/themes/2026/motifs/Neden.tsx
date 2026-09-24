import { seeded } from "@/lib/random";
import type { ArtProps } from "../../types";

const AMBER = "var(--color-amber)";
const CYAN = "var(--color-cyan)";

const orbits = [
  { rx: 190, ry: 54, rotate: -10, color: AMBER, opacity: 0.22 },
  { rx: 150, ry: 40, rotate: -20, color: AMBER, opacity: 0.3 },
  { rx: 110, ry: 30, rotate: 26, color: CYAN, opacity: 0.28, dashed: true },
  { rx: 70, ry: 20, rotate: -35, color: AMBER, opacity: 0.35 },
];

const specks = (() => {
  const rand = seeded(11);
  return Array.from({ length: 22 }, () => {
    const orbit = orbits[Math.floor(rand() * orbits.length)];
    const angle = rand() * Math.PI * 2;
    const rad = (orbit.rotate * Math.PI) / 180;
    const ex = Math.cos(angle) * orbit.rx;
    const ey = Math.sin(angle) * orbit.ry;
    return {
      x: 250 + ex * Math.cos(rad) - ey * Math.sin(rad),
      y: 150 + ex * Math.sin(rad) + ey * Math.cos(rad),
      r: rand() < 0.35 ? 1.7 : 1.2,
      cyan: rand() < 0.3,
    };
  });
})();

export function Neden({ className }: ArtProps) {
  return (
    <svg width="460" height="320" viewBox="0 0 460 320" aria-hidden="true" className={`absolute top-10 right-15 ${className ?? ""}`}>
      {orbits.map((o) => (
        <ellipse
          key={o.rx}
          cx="250"
          cy="150"
          rx={o.rx}
          ry={o.ry}
          transform={`rotate(${o.rotate} 250 150)`}
          fill="none"
          stroke={o.color}
          strokeWidth="1.1"
          strokeDasharray={o.dashed ? "3 6" : undefined}
          opacity={o.opacity}
        />
      ))}
      {specks.map((s, i) => (
        <circle key={i} cx={s.x.toFixed(1)} cy={s.y.toFixed(1)} r={s.r} fill={s.cyan ? CYAN : AMBER} opacity="0.55" />
      ))}
      <circle cx="250" cy="150" r="22" fill={AMBER} opacity="0.07" />
      <path d="M250 134 L253.5 146.5 L266 150 L253.5 153.5 L250 166 L246.5 153.5 L234 150 L246.5 146.5 Z" fill={AMBER} opacity="0.8" />
      <circle cx="250" cy="150" r="2.6" fill="#FFF3D6" />
      <text x="40" y="300" fill="var(--color-ink-3)" className="font-sans" fontSize="12" fontWeight="700" letterSpacing="0.2em">
        VERİ › BİLGİ › AKIL › GELECEK
      </text>
    </svg>
  );
}
