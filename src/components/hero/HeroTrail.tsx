"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { SceneLayout } from "./layouts";

const STAGE_SCALE = 1.03;

type Point = [number, number];

// The trail is drawn in screen space rather than in the scene, because the
// scene is scaled to cover the hero while the section path below always sits
// at a fixed distance from the left edge; only the scene points are mapped.
function trailPath(layout: SceneLayout, width: number, height: number) {
  const { trail } = layout;
  const s = Math.max(width / layout.w, height / layout.h);
  const ox = (width - layout.w * s) / 2;
  const oy = height - layout.h * s;
  const zoomed = trail.zoom && window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
  const map = ([x, y]: Point): Point => {
    const px = ox + x * s;
    const py = oy + y * s;
    if (!zoomed) return [px, py];
    return [width / 2 + (px - width / 2) * STAGE_SCALE, height * 0.6 + (py - height * 0.6) * STAGE_SCALE];
  };
  const feet = map(trail.feet);
  const c1 = map(trail.c1);
  const c2 = map(trail.c2);
  const mid = map(trail.mid);
  // The last curve leaves the low run level and lands on the section path heading
  // straight down, so the trail and the dashed line below read as one stroke.
  const run: Point = [mid[0] + trail.run[0] * s, mid[1] + trail.run[1] * s];
  const land: Point = [trail.pathX, height - trail.landLift * s];
  const end: Point = [trail.pathX, height];
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
      if (layout.trail.zoom) el.parentElement?.style.setProperty("--kesfet-bottom", `${Math.round(trail.labelBottom)}px`);
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
