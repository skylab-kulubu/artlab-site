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

  // Pointer and scroll parallax, written as transforms on the few layer boxes and the
  // stage rather than as inherited properties, which would restyle every node below.
  useEffect(() => {
    const el = ref.current;
    const media = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
    if (!el || !media.matches) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const stage = el.querySelector<HTMLElement>(".hero-stage");
    const layers = [...el.querySelectorAll<HTMLElement>(".hero-stage .hero-layer")].map((node) => ({
      node,
      depth: Number(node.dataset.depth ?? 0),
    }));

    const target = { x: 0, y: 0 };
    const eased = { x: 0, y: 0 };
    let scroll = 0;
    let frame = 0;

    const apply = () => {
      const { x, y } = eased;
      for (const { node, depth } of layers) {
        node.style.transform = `translate(${(x * depth * -18).toFixed(2)}px, ${(y * depth * -10 + scroll * (1 - depth) * 160).toFixed(2)}px)`;
      }
      if (stage) {
        stage.style.transform = `perspective(1600px) rotateX(${(y * 1).toFixed(3)}deg) rotateY(${(x * -1.4).toFixed(3)}deg) scale(1.03)`;
      }
    };

    // Eases towards the pointer and stops asking for frames once it has arrived.
    const tick = () => {
      frame = 0;
      if (el.hasAttribute("data-lite")) return;
      eased.x += (target.x - eased.x) * 0.08;
      eased.y += (target.y - eased.y) * 0.08;
      apply();
      if (Math.abs(target.x - eased.x) + Math.abs(target.y - eased.y) > 0.001) frame = requestAnimationFrame(tick);
    };
    const wake = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const move = (e: PointerEvent) => {
      if (!fine) return;
      const r = el.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      target.y = ((e.clientY - r.top) / r.height) * 2 - 1;
      wake();
    };
    const leave = () => {
      target.x = 0;
      target.y = 0;
      wake();
    };
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const next = Math.min(1, Math.max(0, -r.top / r.height));
      if (next === scroll) return;
      scroll = next;
      wake();
    };

    onScroll();
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // A frame-time watch over the first seconds the hero is on screen: a device that cannot
  // keep up gets lite mode, the same scene holding still, instead of a page that stutters.
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const SAMPLE_MS = 3000;
    const SLOW_MS = 28;
    // A verdict needs a few frames, and one frame counts for half a second at most, so a single
    // stall while loading cannot put a fast device in lite mode.
    const MIN_FRAMES = 5;
    const MAX_FRAME_MS = 500;
    let frame = 0;
    let last = 0;
    let measured = 0;
    let slow = 0;
    let frames = 0;

    const tick = (now: number) => {
      const dt = last ? now - last : 0;
      last = now;
      // Frames while the hero is off screen say nothing about speed. A long frame is counted:
      // a device taking a second a frame is the one lite mode is for. The gap across a hidden
      // tab is not, since the clock restarts when the page comes back.
      if (dt > 0 && !el.hasAttribute("data-paused")) {
        measured += Math.min(dt, MAX_FRAME_MS);
        frames++;
        if (dt > SLOW_MS) slow++;
      }
      if (measured < SAMPLE_MS || frames < MIN_FRAMES) {
        frame = requestAnimationFrame(tick);
        return;
      }
      if (slow / frames > 0.5) el.setAttribute("data-lite", "");
    };
    const restart = () => {
      last = 0;
    };
    document.addEventListener("visibilitychange", restart);
    // Loading, hydration and the intro are slow everywhere, so the watch starts after them.
    const start = setTimeout(() => (frame = requestAnimationFrame(tick)), 2000);
    return () => {
      clearTimeout(start);
      cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", restart);
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
