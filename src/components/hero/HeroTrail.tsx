"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { SceneLayout } from "./layouts";

const PATH_X = 40;
const STAGE_SCALE = 1.03;

type Point = [number, number];

// The trail is drawn in screen space rather than in the scene, because the
// scene is scaled to cover the hero while the section path below always sits
// 40px from the left edge; only the robot's feet are mapped from the scene.
function trailPath(layout: SceneLayout, width: number, height: number) {
  const s = Math.max(width / layout.w, height / layout.h);
  const ox = (width - layout.w * s) / 2;
  const oy = height - layout.h * s;
  const zoomed = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
  const map = ([x, y]: Point): Point => {
    const px = ox + x * s;
    const py = oy + y * s;
    if (!zoomed) return [px, py];
    return [width / 2 + (px - width / 2) * STAGE_SCALE, height * 0.6 + (py - height * 0.6) * STAGE_SCALE];
  };
  const feet = map([980, 580]);
  const c1 = map([960, 700]);
  const c2 = map([720, 806]);
  const mid = map([420, 822]);
  // The last curve leaves the low run level and lands on the section path heading
  // straight down, so the trail and the dashed line below read as one stroke.
  const run: Point = [mid[0] - 190 * s, mid[1] + 4 * s];
  const land: Point = [PATH_X, height - 30 * s];
  const end: Point = [PATH_X, height];
  const f = (p: Point) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
  return {
    d: `M${f(feet)} C ${f(c1)}, ${f(c2)}, ${f(mid)} C ${f(run)}, ${f(land)}, ${f(end)}`,
    labelBottom: height - mid[1] + 16,
  };
}

export function HeroTrail({ layout, className }: { layout: SceneLayout; className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const [d, setD] = useState<string | null>(null);
  const mask = `trail-${useId().replace(/:/g, "")}`;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (!width) return setD(null);
      const trail = trailPath(layout, width, height);
      setD(trail.d);
      el.parentElement?.style.setProperty("--kesfet-bottom", `${Math.round(trail.labelBottom)}px`);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [layout]);

  return (
    <svg ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 size-full ${className ?? ""}`}>
      {d && (
        <>
          {/* A solid copy draws itself in the mask, so the dashed trail appears from the robot's feet down to the path. */}
          <mask id={mask} maskUnits="userSpaceOnUse">
            <path d={d} pathLength={1} fill="none" stroke="#fff" strokeWidth="6" className="trail-draw" />
          </mask>
          <path
            d={d}
            fill="none"
            stroke="var(--color-amber)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeDasharray="1.5 7"
            opacity="0.7"
            mask={`url(#${mask})`}
          />
        </>
      )}
    </svg>
  );
}
