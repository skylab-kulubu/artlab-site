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

  useEffect(() => {
    const el = ref.current;
    const media = window.matchMedia("(min-width: 768px) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!el || !media.matches) return;

    const target = { x: 0, y: 0 };
    const eased = { x: 0, y: 0 };
    let frame = 0;

    // Eases towards the pointer and stops asking for frames once it has arrived.
    const tick = () => {
      eased.x += (target.x - eased.x) * 0.08;
      eased.y += (target.y - eased.y) * 0.08;
      el.style.setProperty("--px", eased.x.toFixed(4));
      el.style.setProperty("--py", eased.y.toFixed(4));
      frame = Math.abs(target.x - eased.x) + Math.abs(target.y - eased.y) > 0.001 ? requestAnimationFrame(tick) : 0;
    };
    const aim = (x: number, y: number) => {
      target.x = x;
      target.y = y;
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      aim(((e.clientX - r.left) / r.width) * 2 - 1, ((e.clientY - r.top) / r.height) * 2 - 1);
    };
    const leave = () => aim(0, 0);

    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(frame);
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
