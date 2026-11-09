const AMBER = "var(--color-amber)";
const CYAN = "var(--color-cyan)";
const BODY = "var(--near)";

/** Where the two worlds float, in scene units; the particles rise from these into the wordmark. */
export const GLOBES = [
  { x: 896, y: 392, color: AMBER },
  { x: 1064, y: 392, color: CYAN },
] as const;
const R = 30;

function Limb({ x1, y1, x2, y2, w }: { x1: number; y1: number; x2: number; y2: number; w: number }) {
  return (
    <>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={AMBER} strokeWidth={w} strokeLinecap="round" />
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={BODY} strokeWidth={w - 4} strokeLinecap="round" />
    </>
  );
}

function Joint({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return <circle cx={cx} cy={cy} r={r} fill={BODY} stroke={AMBER} strokeWidth="2" />;
}

/** An open hand held palm up, its fingers curled towards the world above it. */
function Palm({ x, y, side }: { x: number; y: number; side: -1 | 1 }) {
  const f = (dx: number, dy: number, tx: number, ty: number) => (
    <Limb key={dx} x1={x + side * dx} y1={y + dy} x2={x + side * tx} y2={y + ty} w={6} />
  );
  return (
    <>
      <Limb x1={x - 10} y1={y} x2={x + 10} y2={y} w={10} />
      {f(-9, -3, -12, -12)}
      {f(-3, -4, -4, -15)}
      {f(3, -4, 4, -14)}
      {f(9, -2, 13, -9)}
    </>
  );
}

// Points on the world's face, linked into a small network, as on the poster's globes.
const NODES: [number, number][] = [
  [-14, -12],
  [-4, -18],
  [9, -10],
  [16, 2],
  [4, 6],
  [-10, 4],
  [-2, 17],
  [12, 15],
];
const LINKS: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [2, 4],
  [4, 5],
  [5, 0],
  [4, 6],
  [6, 7],
  [7, 3],
  [5, 6],
];

/**
 * A world of light over an open palm: a grid of parallels and turning meridians, a small
 * network across its face and two tilted orbits, lit from the palm by a narrow beam.
 */
function World({ x, y, color, palm, delay }: { x: number; y: number; color: string; palm: number; delay: number }) {
  return (
    <g>
      <path
        d={`M${x - 7} ${palm} L${x + 7} ${palm} L${x + R * 0.7} ${y + R * 0.75} L${x - R * 0.7} ${y + R * 0.75} Z`}
        fill={color}
        opacity="0.16"
      />
      <circle cx={x} cy={palm} r="5" fill={color} opacity="0.35" />
      <circle cx={x} cy={y} r={R + 14} fill={color} opacity="0.06" />
      <circle cx={x} cy={y} r={R + 5} fill={color} opacity="0.08" />
      <circle cx={x} cy={y} r={R} fill={color} opacity="0.1" stroke={color} strokeWidth="1.6" />

      <g fill="none" stroke={color} strokeWidth="0.9" opacity="0.55">
        {[-0.62, -0.28, 0.28, 0.62].map((k) => {
          const cy = y + k * R;
          const half = Math.sqrt(1 - k * k) * R;
          return <ellipse key={k} cx={x} cy={cy} rx={half} ry={half * 0.16} />;
        })}
        <line x1={x - R} y1={y} x2={x + R} y2={y} />
        {[0, 1, 2].map((i) => (
          <ellipse
            key={i}
            className="globe-meridian"
            style={{ animationDelay: `${delay - i * 2.4}s` }}
            cx={x}
            cy={y}
            rx={R}
            ry={R}
          />
        ))}
      </g>

      <g stroke={color} strokeWidth="0.8" opacity="0.8">
        {LINKS.map(([a, b]) => (
          <line key={`${a}-${b}`} x1={x + NODES[a][0]} y1={y + NODES[a][1]} x2={x + NODES[b][0]} y2={y + NODES[b][1]} />
        ))}
      </g>
      {NODES.map(([dx, dy], i) => (
        <circle
          key={i}
          className="globe-node"
          style={{ animationDelay: `${delay - i * 0.55}s` }}
          cx={x + dx}
          cy={y + dy}
          r={i % 3 === 0 ? 1.9 : 1.3}
          fill="#FFF3D6"
        />
      ))}

      <g className="globe-orbits" style={{ animationDelay: `${delay * 3}s` }} fill="none" stroke={color}>
        <ellipse
          cx={x}
          cy={y}
          rx={R * 1.45}
          ry={R * 0.42}
          transform={`rotate(-18 ${x} ${y})`}
          strokeWidth="1.1"
          opacity="0.7"
        />
        <ellipse
          cx={x}
          cy={y}
          rx={R * 1.3}
          ry={R * 0.36}
          transform={`rotate(24 ${x} ${y})`}
          strokeWidth="0.8"
          opacity="0.45"
        />
        <circle cx={x + R * 1.38} cy={y - R * 0.45} r="2.2" fill={color} stroke="none" />
      </g>
    </g>
  );
}

export function Figure() {
  const [left, right] = GLOBES;
  return (
    <g>
      <Limb x1={968} y1={500} x2={966} y2={536} w={14} />
      <Limb x1={992} y1={500} x2={994} y2={536} w={14} />
      <Limb x1={966} y1={538} x2={966} y2={566} w={12} />
      <Limb x1={994} y1={538} x2={996} y2={566} w={12} />
      <Joint cx={967} cy={537} r={6} />
      <Joint cx={994} cy={537} r={6} />
      <Limb x1={956} y1={571} x2={975} y2={571} w={9} />
      <Limb x1={987} y1={571} x2={1006} y2={571} w={9} />

      <rect x="958" y="486" width="44" height="18" rx="7" fill={BODY} stroke={AMBER} strokeWidth="2" />
      <path d="M950 434 Q980 424 1010 434 L1003 486 Q980 494 957 486 Z" fill={BODY} stroke={AMBER} strokeWidth="2" />
      <path d="M962 448 H998 M966 460 H994 M969 471 H991" stroke={AMBER} strokeWidth="1.4" opacity="0.55" />
      <circle cx="980" cy="452" r="4" fill="none" stroke={CYAN} strokeWidth="1.4" opacity="0.8" />

      {/* Both arms open from the shoulders and turn up at the elbow, each palm lifting a world */}
      <Limb x1={947} y1={446} x2={922} y2={470} w={13} />
      <Joint cx={921} cy={471} r={5.5} />
      <Limb x1={919} y1={469} x2={left.x + 2} y2={451} w={12} />
      <Palm x={left.x} y={447} side={-1} />

      <Limb x1={1013} y1={446} x2={1038} y2={470} w={13} />
      <Joint cx={1039} cy={471} r={5.5} />
      <Limb x1={1041} y1={469} x2={right.x - 2} y2={451} w={12} />
      <Palm x={right.x} y={447} side={1} />

      <Joint cx={948} cy={440} r={9} />
      <Joint cx={1012} cy={440} r={9} />
      <path d="M975 416 V430 M985 416 V430" stroke={AMBER} strokeWidth="2.4" />

      <circle cx="980" cy="398" r="22" fill={BODY} stroke={AMBER} strokeWidth="2" />
      <path d="M962.8 391.4 Q980 380 997.2 391.4" fill="none" stroke={AMBER} strokeWidth="1.4" opacity="0.45" />
      <Joint cx={958.9} cy={399.8} r={6.6} />
      <circle cx="958.9" cy="399.8" r="2.9" fill="none" stroke={AMBER} strokeWidth="1.2" opacity="0.7" />
      <Joint cx={1001.1} cy={399.8} r={6.6} />
      <circle cx="1001.1" cy="399.8" r="2.9" fill="none" stroke={AMBER} strokeWidth="1.2" opacity="0.7" />
      <circle cx="980" cy="400.2" r="10.3" fill="var(--color-bg)" stroke={AMBER} strokeWidth="1.5" />
      <circle cx="980" cy="400.2" r="7.5" fill="none" stroke={CYAN} strokeWidth="2" />
      <circle cx="980" cy="400.2" r="4.4" fill="none" stroke={CYAN} strokeWidth="1.2" opacity="0.6" />
      <circle className="hero-eye motion-safe:animate-blink" cx="980" cy="400.2" r="2.2" fill={CYAN} />

      <World x={left.x} y={left.y} color={left.color} palm={438} delay={0} />
      <World x={right.x} y={right.y} color={right.color} palm={438} delay={-3.6} />
    </g>
  );
}
