"use client";

import { useEffect, useRef, useState } from "react";
import { MAP_W, METERS_PER_UNIT } from "./route";

const NICE = [10, 20, 25, 50, 100, 200, 250, 500, 1000];

// The compass, scale bar and attribution sit above the zoomed map at a fixed size;
// only the scale bar follows the zoom, snapping to a round distance.
export function MapChrome({ scale = 1 }: { scale?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const pxPerMeter = ((width / MAP_W) * scale) / METERS_PER_UNIT;
  const target = width < 520 ? 64 : 110;
  const meters = NICE.findLast((m) => m * pxPerMeter <= target) ?? NICE[0];
  const label = meters >= 1000 ? `${meters / 1000} km` : `${meters} m`;

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 text-ink-3 select-none">
      <svg
        width="40"
        height="54"
        viewBox="0 0 40 54"
        className="absolute top-2.5 left-3 max-[520px]:scale-75 origin-top-left"
      >
        <text
          x="20"
          y="10"
          textAnchor="middle"
          fill="currentColor"
          fontSize="10"
          fontWeight="600"
          className="font-sans"
        >
          K
        </text>
        <circle cx="20" cy="34" r="19.5" fill="var(--color-bg-deep)" fillOpacity="0.85" stroke="var(--color-line-2)" />
        <path d="M20 21 L26 39 L20 35 L14 39 Z" fill="var(--color-amber)" />
      </svg>
      {width > 0 && (
        <div className="absolute bottom-3 left-3 flex items-end gap-2 text-[11px] leading-none font-semibold">
          <span
            className="h-2.5 border-x border-b border-current transition-[width] duration-500"
            style={{ width: meters * pxPerMeter }}
          />
          <span className="tabular">{label}</span>
        </div>
      )}
      <span className="absolute right-0 bottom-0 bg-bg-deep/75 px-1.5 py-0.5 text-[10px]">
        © OpenStreetMap katkıcıları
      </span>
    </div>
  );
}
