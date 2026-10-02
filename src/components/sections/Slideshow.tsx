"use client";

import { useEffect, useRef, useState } from "react";
import type { Asset } from "@/lib/types";

export type Slide = Asset & { year: number; dateLabel: string };

const INTERVAL = 6000;

function Arrow({ dir }: { dir: -1 | 1 }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d={dir === 1 ? "M6 3 L11 8 L6 13" : "M10 3 L5 8 L10 13"} />
    </svg>
  );
}

export function Slideshow({ slides }: { slides: Slide[] }) {
  const track = useRef<HTMLOListElement>(null);
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [still, setStill] = useState(true);

  const years = [...new Set(slides.map((s) => s.year))];
  const playing = !still && visible && !hovered && !focused;

  const go = (i: number) => {
    const el = track.current;
    const slide = el?.children[(i + slides.length) % slides.length] as HTMLElement | undefined;
    if (!el || !slide) return;
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: slide.offsetLeft - el.offsetLeft, behavior: smooth ? "smooth" : "auto" });
  };

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.4 });
    observer.observe(el);

    // The slide whose left edge is nearest the track's is the current one, however it got there.
    const onScroll = () => {
      const slides = [...el.children] as HTMLElement[];
      const offsets = slides.map((s) => Math.abs(s.offsetLeft - el.offsetLeft - el.scrollLeft));
      setIndex(offsets.indexOf(Math.min(...offsets)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      el.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      role="region"
      aria-roledescription="slayt gösterisi"
      aria-label="Geçmiş yıllardan kareler"
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={(e) => e.target.matches(":focus-visible") && setFocused(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setFocused(false)}
      className="flex flex-col gap-5"
    >
      <ol
        ref={track}
        className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pr-[calc(12%+1.25rem)] [scrollbar-width:none] lg:mx-0 lg:scroll-px-0 lg:gap-6 lg:px-0 lg:pr-[36%]"
      >
        {slides.map((slide, i) => (
          <li
            key={slide.src}
            aria-roledescription="slayt"
            aria-label={`${i + 1} / ${slides.length}`}
            className={`w-[88%] shrink-0 snap-start transition-opacity duration-500 lg:w-[64%] ${
              i === index ? "" : "opacity-45"
            }`}
          >
            <figure className="cho relative aspect-[3/2] overflow-hidden lg:aspect-video bg-surface-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.src}
                alt={slide.alt}
                width={slide.width}
                height={slide.height}
                loading={i === 0 ? undefined : "lazy"}
                decoding="async"
                draggable={false}
                className="size-full object-cover"
              />
              <figcaption className="absolute bottom-0 left-0 flex items-baseline gap-3 bg-bg-deep/85 py-2.5 pr-4 pl-5">
                <span className="font-display text-lg font-semibold">ARTLAB {slide.year}</span>
                <span className="text-[13px] text-ink-2">{slide.dateLabel}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ol>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
        <div className="flex gap-2 lg:order-1">
          {years.map((year) => {
            const first = slides.findIndex((s) => s.year === year);
            const current = slides[index]?.year === year;
            return (
              <button
                key={year}
                type="button"
                onClick={() => go(first)}
                aria-current={current || undefined}
                className={`border px-3.5 py-2 font-display text-[15px] font-semibold transition-colors ${
                  current ? "border-amber text-amber" : "border-line text-ink-2 hover:border-ink-3 hover:text-ink"
                }`}
              >
                {year}
              </button>
            );
          })}
        </div>

        <div className="order-last flex basis-full items-center gap-4 lg:order-2 lg:basis-0 lg:grow">
          <span className="text-sm text-ink-3 tabular" aria-live="polite">
            {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
          {/* Doubles as the timer: when the bar fills, the next slide comes up. */}
          <span className="h-px grow bg-line" aria-hidden="true">
            {!still && (
              <span
                key={index}
                onAnimationEnd={() => go(index + 1)}
                className="block h-full origin-left animate-[slide-timer_linear_forwards] bg-amber"
                style={{ animationDuration: `${INTERVAL}ms`, animationPlayState: playing ? "running" : "paused" }}
              />
            )}
          </span>
        </div>

        <div className="ml-auto flex gap-2 lg:order-3 lg:ml-0">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Önceki kare"
            className="grid size-11 place-items-center border border-line text-ink hover:border-cyan"
          >
            <Arrow dir={-1} />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Sonraki kare"
            className="grid size-11 place-items-center border border-line text-ink hover:border-cyan"
          >
            <Arrow dir={1} />
          </button>
        </div>
      </div>
    </div>
  );
}
