"use client";

import { useEffect, useRef } from "react";
import { desktop, mobile } from "./layouts";

const HALF = 46;
const EYE = { desktop: [980, 400], mobile: [222, 423] } as const;

// Where the robot's eye sits on screen, mapped the same way the covering scene is.
function eyeOnScreen(width: number, height: number) {
  const wide = width >= 768;
  const layout = wide ? desktop : mobile;
  const [ex, ey] = wide ? EYE.desktop : EYE.mobile;
  const s = Math.max(width / layout.w, height / layout.h);
  return [(width - layout.w * s) / 2 + ex * s, height - layout.h * s + ey * s];
}

export function HeroPointer() {
  const frame = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = frame.current;
    const root = el?.closest<HTMLElement>(".hero-sky");
    if (!el || !root) return;

    let confidence = 0.97;
    const show = (x: number, y: number) => {
      el.style.transform = `translate(${x}px, ${y}px)`;
      el.style.opacity = "1";
      if (Math.random() < 0.08) confidence = 0.93 + Math.random() * 0.06;
      if (label.current) label.current.textContent = `ziyaretçi ${confidence.toFixed(2)}`;
    };
    const hide = () => {
      el.style.opacity = "0";
    };
    // The eye is moved directly: an inherited property on the hero would restyle the whole scene.
    const eyes = [...root.querySelectorAll<SVGElement>(".hero-eye")];
    const look = (x: number, y: number, width: number, height: number) => {
      const [ex, ey] = eyeOnScreen(width, height);
      const dx = x - ex;
      const dy = y - ey;
      const d = Math.hypot(dx, dy) || 1;
      const k = Math.min(1, d / 320);
      const transform = `translate(${((dx / d) * k * 3.4).toFixed(2)}px, ${((dy / d) * k * 2.8).toFixed(2)}px)`;
      for (const eye of eyes) eye.style.transform = transform;
    };

    const move = (e: PointerEvent) => {
      const r = root.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      look(x, y, r.width, r.height);
      if (e.pointerType !== "mouse") return;
      if ((e.target as Element).closest("a, button, [role=tab]")) hide();
      else show(x, y);
    };
    // On touch there is no pointer to frame: the robot only glances at the tap, then looks back.
    let rest: ReturnType<typeof setTimeout> | undefined;
    const tap = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      const r = root.getBoundingClientRect();
      look(e.clientX - r.left, e.clientY - r.top, r.width, r.height);
    };
    const leave = (e: PointerEvent) => {
      clearTimeout(rest);
      if (e.pointerType === "mouse") {
        hide();
        for (const eye of eyes) eye.style.removeProperty("transform");
      } else {
        rest = setTimeout(() => {
          for (const eye of eyes) eye.style.removeProperty("transform");
        }, 1200);
      }
    };

    root.addEventListener("pointermove", move);
    root.addEventListener("pointerdown", tap);
    root.addEventListener("pointerleave", leave);
    return () => {
      root.removeEventListener("pointermove", move);
      root.removeEventListener("pointerdown", tap);
      root.removeEventListener("pointerleave", leave);
      clearTimeout(rest);
    };
  }, []);

  return (
    <div
      ref={frame}
      aria-hidden="true"
      className="pointer-events-none absolute top-0 left-0 opacity-0 transition-opacity duration-200 motion-reduce:hidden"
    >
      <svg
        width={HALF * 2}
        height={HALF * 2}
        viewBox={`0 0 ${HALF * 2} ${HALF * 2}`}
        className="absolute -translate-1/2 overflow-visible"
        fill="none"
        stroke="var(--color-cyan)"
        strokeWidth="2"
      >
        <path d="M0 14 V0 H14 M78 0 H92 V14 M92 78 V92 H78 M14 92 H0 V78" />
        <circle cx={HALF} cy={HALF} r="2.5" fill="var(--color-cyan)" stroke="none" />
      </svg>
      <span
        ref={label}
        className="absolute bg-cyan px-1.5 py-0.5 text-xs font-semibold whitespace-nowrap text-bg tabular"
        style={{ left: -HALF, top: -HALF - 22 }}
      >
        ziyaretçi 0.97
      </span>
    </div>
  );
}
