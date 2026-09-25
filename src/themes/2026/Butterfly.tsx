export function Butterfly({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g
      transform={`translate(${x} ${y}) scale(${scale})`}
      fill="none"
      stroke="var(--color-cyan)"
      strokeWidth="1.6"
      strokeLinecap="round"
    >
      <ellipse cx="-6.3" cy="2.7" rx="6.3" ry="3.8" transform="rotate(35 -6.3 2.7)" />
      <ellipse cx="-4.5" cy="9" rx="4" ry="2.7" transform="rotate(-30 -4.5 9)" />
      <ellipse cx="6.3" cy="2.7" rx="6.3" ry="3.8" transform="rotate(-35 6.3 2.7)" />
      <ellipse cx="4.5" cy="9" rx="4" ry="2.7" transform="rotate(30 4.5 9)" />
      <path d="M0 0 Q-1.8 -4.5 -4.5 -5.4 M0 0 Q1.8 -4.5 4.5 -5.4" strokeWidth="1.1" />
      <line x1="0" y1="0" x2="0" y2="12.6" />
    </g>
  );
}
