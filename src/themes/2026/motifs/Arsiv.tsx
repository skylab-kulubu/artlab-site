import type { ArtProps } from "../../types";
import { DOVE_BOX, DOVE_PATH, DOVE_PIXELS, DOVE_TIPS } from "./dove";

const PAD = 26;
const [bx, by, bw, bh] = DOVE_BOX;
const box = { x: bx - PAD, y: by - PAD, width: bw + 2 * PAD, height: bh + 2 * PAD };

export function Arsiv({ className }: ArtProps) {
  return (
    <svg
      width="250"
      height={Math.round((250 * box.height) / box.width)}
      viewBox={`${box.x} ${box.y} ${box.width} ${box.height}`}
      aria-hidden="true"
      className={`absolute top-4 right-24 opacity-55 ${className ?? ""}`}
    >
      <defs>
        {DOVE_TIPS.map(([cx, cy], i) => (
          <radialGradient key={i} id={`dove-tip-${i}`} gradientUnits="userSpaceOnUse" cx={cx} cy={cy} r="17">
            <stop offset="0" stopColor="#000" />
            <stop offset="1" stopColor="#fff" />
          </radialGradient>
        ))}
        {/* The outline fades out towards each wing tip, where the pixels take over. */}
        <mask id="dove-fade" maskUnits="userSpaceOnUse" {...box}>
          <rect {...box} fill="#fff" />
          {DOVE_TIPS.map((_, i) => (
            <rect key={i} {...box} fill={`url(#dove-tip-${i})`} style={{ mixBlendMode: "multiply" }} />
          ))}
        </mask>
      </defs>
      <path
        d={DOVE_PATH}
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="1.3"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        mask="url(#dove-fade)"
      />
      <g fill="var(--color-ink)">
        {DOVE_PIXELS.map(([x, y, size, opacity], i) => (
          <rect key={i} x={x} y={y} width={size} height={size} opacity={opacity} />
        ))}
      </g>
    </svg>
  );
}
