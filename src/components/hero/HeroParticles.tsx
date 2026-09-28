"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { getTheme } from "@/themes";
import { Diffusion, hud, sampleMorph, sampleWordmark, STEPS, type Palette, type Shape } from "./diffusion";
import { EDGE_BAND, type SceneLayout } from "./layouts";

const HAND = { x: 1044, y: 366 };
const MORPH_CENTER = { x: 720, y: 360 };
const FIRST_CYCLE_MS = 6000;
const CYCLE_MS = 14000;
const HOLD_MS = [2400, 3200];
const SPARKS = 18;

type Spark = { t: number; life: number; tx: number; ty: number; wobble: number };

export function HeroParticles({ layout, themeId }: { layout: SceneLayout; themeId: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvas.current;
    const root = el?.closest<HTMLElement>(".hero-sky");
    const stage = el?.closest<HTMLElement>(".hero-stage");
    const text = stage?.querySelector<SVGTextElement>(".hero-letters");
    const media = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
    if (!el || !root || !text || !media.matches) return;

    const g = el.getContext("2d")!;
    const { w, h } = layout;
    const morphs = getTheme(themeId).morphs;
    const map = { s: 1, ox: 0, oy: 0 };
    const palette: Palette = ["#14264a", "#f5b82e", "#3ed6f0"];
    let system: Diffusion | null = null;
    let shapes: Shape[] = [];
    let pointer: { x: number; y: number } | null = null;
    const sparks: Spark[] = [];
    let frame = 0;
    let lastDraw = 0;
    let lastPalette = 0;
    let busy = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let cancelled = false;

    const readPalette = () => {
      const css = getComputedStyle(root);
      palette[0] = css.getPropertyValue("--mark").trim() || palette[0];
      palette[1] = css.getPropertyValue("--color-amber").trim() || palette[1];
      palette[2] = css.getPropertyValue("--color-cyan").trim() || palette[2];
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = el.getBoundingClientRect();
      el.width = Math.round(width * dpr);
      el.height = Math.round(height * dpr);
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      map.s = Math.max(width / w, height / h);
      map.ox = (width - w * map.s) / 2;
      map.oy = height - h * map.s;
      wake();
    };

    const spark = (): Spark => {
      const target = shapes[0];
      const i = Math.floor(Math.random() * target.x.length);
      return { t: 0, life: 1800 + Math.random() * 1400, tx: target.x[i], ty: target.y[i], wobble: Math.random() * Math.PI * 2 };
    };

    // The robot's palm keeps sending a few dots up into the letters, so in
    // particle mode it reads as the one writing the wordmark.
    const drawSparks = (dt: number) => {
      if (!shapes.length || system?.shape !== "artlab") return;
      while (sparks.length < SPARKS) sparks.push({ ...spark(), t: -Math.random() * 2400 });
      g.fillStyle = palette[1];
      for (const p of sparks) {
        p.t += dt;
        if (p.t < 0) continue;
        const k = p.t / p.life;
        if (k >= 1) {
          Object.assign(p, spark());
          continue;
        }
        const ease = k * k * (3 - 2 * k);
        const x = HAND.x + (p.tx - HAND.x) * ease + Math.sin(p.wobble + k * 6) * 10 * (1 - k);
        const y = HAND.y + (p.ty - HAND.y) * ease;
        g.globalAlpha = Math.sin(Math.PI * k) * 0.9;
        g.beginPath();
        g.arc(map.ox + x * map.s, map.oy + y * map.s, 1.3 * map.s, 0, Math.PI * 2);
        g.fill();
      }
      g.globalAlpha = 1;
    };

    const tick = (now: number) => {
      frame = 0;
      if (!system || root.hasAttribute("data-paused")) return;
      if (now - lastPalette > 500) {
        readPalette();
        lastPalette = now;
      }
      const moving = system.update(now, pointer);
      const dt = lastDraw ? Math.min(now - lastDraw, 64) : 16;
      if (moving || now - lastDraw > 33) {
        lastDraw = now;
        g.clearRect(0, 0, el.width, el.height);
        system.draw(g, map, palette);
        drawSparks(dt);
        // The static wordmark only steps aside once the canvas has something on screen.
        if (!root.hasAttribute("data-particles")) root.setAttribute("data-particles", "");
      }
      frame = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (!frame && system) frame = requestAnimationFrame(tick);
    };

    const later = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms));

    const waitSettled = (fn: () => void) => {
      const check = () => (system?.settled ? fn() : later(80, check));
      check();
    };

    // ARTLAB → koza → kelebek → ARTLAB; resting is always the wordmark.
    const cycle = () => {
      if (busy || !system) return;
      busy = true;
      const run = (i: number) => {
        const next = shapes[i] ?? shapes[0];
        system!.morphTo(next);
        wake();
        if (next === shapes[0]) {
          waitSettled(() => (busy = false));
          return;
        }
        waitSettled(() => later(HOLD_MS[i - 1] ?? 2400, () => run(i + 1)));
      };
      run(shapes.length > 1 ? 1 : 0);
    };

    const schedule = (ms: number) => {
      later(ms, () => {
        if (!root.hasAttribute("data-paused")) cycle();
        schedule(CYCLE_MS);
      });
    };

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      pointer = { x: (e.clientX - r.left - map.ox) / map.s, y: (e.clientY - r.top - map.oy) / map.s };
      wake();
    };
    const leave = () => {
      pointer = null;
      wake();
    };
    const click = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button")) return;
      if (shapes.length > 1) cycle();
      else if (system?.settled) {
        system.morphTo(shapes[0]);
        wake();
      }
    };

    const observer = new ResizeObserver(resize);
    const paused = new MutationObserver(wake);

    document.fonts.ready.then(() => {
      if (cancelled) return;
      const rest = sampleWordmark(text, w, h, EDGE_BAND);
      system = new Diffusion(rest);
      shapes = [rest, ...morphs.map((m) => sampleMorph(m, rest.x.length, w, h, MORPH_CENTER.x, MORPH_CENTER.y))];
      readPalette();
      observer.observe(el);
      paused.observe(root, { attributes: true, attributeFilter: ["data-paused"] });
      root.addEventListener("pointermove", move);
      root.addEventListener("pointerleave", leave);
      root.addEventListener("click", click);
      hud.onStep?.(STEPS, 0);
      if (morphs.length) schedule(FIRST_CYCLE_MS);
      wake();
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      timers.forEach(clearTimeout);
      observer.disconnect();
      paused.disconnect();
      root.removeEventListener("pointermove", move);
      root.removeEventListener("pointerleave", leave);
      root.removeEventListener("click", click);
      root.removeAttribute("data-particles");
    };
  }, [layout, themeId]);

  return (
    <div className="hero-layer absolute inset-0" style={{ "--depth": 0.4 } as CSSProperties}>
      <canvas ref={canvas} aria-hidden="true" className="absolute inset-0 size-full" />
    </div>
  );
}

export function DiffusionHud() {
  const step = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const noise = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    hud.onStep = (s, n) => {
      if (step.current) step.current.textContent = `DİFÜZYON · ADIM ${s}/${STEPS}`;
      if (bar.current) bar.current.style.transform = `scaleX(${s / STEPS})`;
      if (noise.current) noise.current.textContent = `GÜRÜLTÜ ${n.toFixed(2)}`;
    };
    return () => {
      hud.onStep = undefined;
    };
  }, []);

  return (
    <div aria-hidden="true" className="flex items-center gap-2.5 text-[11px] font-bold tracking-[0.14em] text-(--hud) tabular">
      <span ref={step}>DİFÜZYON · ADIM 50/50</span>
      <span className="h-[3px] w-[90px] bg-ink/25">
        <span ref={bar} className="block h-full origin-left bg-amber" />
      </span>
      <span ref={noise} className="opacity-80">
        GÜRÜLTÜ 0.00
      </span>
    </div>
  );
}
