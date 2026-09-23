"use client";

import { useVenueHour } from "@/hooks/useVenueHour";
import { skyAt } from "@/lib/env";
import type { SceneLayout } from "./layouts";

export function Sun({ layout, serverNow }: { layout: SceneLayout["sun"]; serverNow: number }) {
  const { night, arc, lift } = skyAt(useVenueHour(serverNow));
  const [x, y] = night ? layout.moon : [layout.x + arc * layout.dx, layout.y - lift * layout.dy];

  return (
    <circle
      cx={0}
      cy={0}
      r={layout.r}
      fill="var(--sun)"
      style={{ transform: `translate(${Math.round(x)}px, ${Math.round(y)}px)`, transition: "transform 1.6s ease-out" }}
    />
  );
}
