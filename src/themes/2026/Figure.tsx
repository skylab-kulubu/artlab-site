import type { FigureProps } from "../types";

const AMBER = "var(--color-amber)";
const CYAN = "var(--color-cyan)";
const BODY = "var(--near)";

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

function Glow({ y }: { y: number }) {
  return (
    <g>
      <circle cx="1044" cy={y} r="20" fill={AMBER} opacity="0.08" />
      <circle cx="1044" cy={y} r="10" fill={AMBER} opacity="0.18" />
      <ellipse
        cx="1044"
        cy={y}
        rx="30"
        ry="9"
        transform={`rotate(-22 1044 ${y})`}
        fill="none"
        stroke={AMBER}
        strokeWidth="1.2"
        opacity="0.55"
      />
      <path
        d={`M1044 ${y - 15} L1046.4 ${y - 6.4} L1055 ${y - 4} L1046.4 ${y - 1.6} L1044 ${y + 7} L1041.6 ${y - 1.6} L1033 ${y - 4} L1041.6 ${y - 6.4} Z`}
        fill={AMBER}
        opacity="0.95"
      />
      <circle cx="1044" cy={y - 4} r="2.4" fill="#FFF3D6" />
    </g>
  );
}

function Cocoon() {
  return (
    <g stroke={AMBER} strokeLinejoin="round">
      <path d="M1042 388 Q1034 376 1039 364 L1042.5 368 Q1039 376 1042 388 Z" fill={BODY} strokeWidth="1.8" />
      <path d="M1046 388 Q1054 376 1049 364 L1045.5 368 Q1049 376 1046 388 Z" fill={BODY} strokeWidth="1.8" />
      <path d="M1038 374 L1041 378 M1050 372 L1047 376" strokeWidth="1" opacity="0.6" />
    </g>
  );
}

export function Figure({ mode }: FigureProps) {
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

      <Limb x1={947} y1={448} x2={940} y2={484} w={13} />
      <Joint cx={940} cy={485} r={5.5} />
      <Limb x1={940} y1={488} x2={942} y2={518} w={12} />
      <Joint cx={942} cy={526} r={7} />

      <Limb x1={1013} y1={448} x2={1037} y2={434} w={13} />
      <Joint cx={1038} cy={433} r={5.5} />
      <Limb x1={1039} y1={430} x2={1044} y2={396} w={12} />
      <Limb x1={1034} y1={390} x2={1054} y2={390} w={10} />
      <Limb x1={1036} y1={387} x2={1034} y2={377} w={6} />
      <Limb x1={1042} y1={386} x2={1042} y2={374} w={6} />
      <Limb x1={1048} y1={386} x2={1050} y2={376} w={6} />
      <Limb x1={1054} y1={389} x2={1059} y2={382} w={6} />

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

      {mode === "klasik" ? (
        <>
          <Cocoon />
          <Glow y={368} />
        </>
      ) : (
        <Glow y={366} />
      )}
    </g>
  );
}
