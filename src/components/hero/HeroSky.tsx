"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useVenueHour } from "@/hooks/useVenueHour";
import { formatHour, skyAt, skyVars } from "@/lib/env";

export function HeroSky({ serverNow, children }: { serverNow: number; children: ReactNode }) {
  const vars = skyVars(skyAt(useVenueHour(serverNow)));
  const ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let visible = true;
    const update = () => setPaused(!visible || document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    observer.observe(el);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return (
    <div ref={ref} className="hero-sky absolute inset-0" style={vars} data-paused={paused || undefined}>
      {children}
    </div>
  );
}

export function VenueClock({ serverNow }: { serverNow: number }) {
  return <span className="tabular">{formatHour(useVenueHour(serverNow))}</span>;
}
