"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { MapChrome } from "./MapChrome";
import { clampView, Diamond, FULL, MapStack, PinGlyph, type View } from "./MapStack";
import { MAP_H, MAP_W, steps } from "./route";

function LegSample({ kind }: { kind: "walk" | "ride" }) {
  return (
    <svg width="40" height="6" viewBox="0 0 40 6" aria-hidden="true" className="shrink-0">
      {kind === "walk" ? (
        <path d="M3 3 H37" stroke="var(--color-cyan)" strokeWidth="3" strokeLinecap="round" strokeDasharray="0.1 6" />
      ) : (
        <path d="M3 3 H37" stroke="var(--color-amber)" strokeWidth="4" strokeLinecap="round" />
      )}
    </svg>
  );
}

function IconButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid size-10 place-items-center border border-line bg-bg-deep/90 text-ink hover:border-cyan"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        aria-hidden="true"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
      >
        {children}
      </svg>
    </button>
  );
}

function Frame({ venue }: { venue: string }) {
  const [view, setView] = useState<View>(FULL);
  const [active, setActive] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);
  const frame = useRef<HTMLDivElement>(null);
  const drag = useRef<{ id: number; x: number; y: number; view: View } | null>(null);

  const pick = (i: number | null) => {
    setActive(i);
    setView(i === null ? FULL : steps[i].focus);
  };
  const zoom = (by: number) => setView((v) => clampView({ ...v, scale: v.scale * by }));

  // Wheel zoom needs a non-passive listener to keep the dialog from scrolling.
  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setView((v) => clampView({ ...v, scale: v.scale * Math.exp(-e.deltaY * 0.002) }));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const onPointerDown = (e: PointerEvent) => {
    if (view.scale <= 1 || (e.target as Element).closest("button")) return;
    drag.current = {
      id: e.pointerId,
      x: e.clientX,
      y: e.clientY,
      view: clampView(view),
    };
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
  };
  const onPointerMove = (e: PointerEvent) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const { width, height } = e.currentTarget.getBoundingClientRect();
    setView(
      clampView({
        scale: d.view.scale,
        x: d.view.x - ((e.clientX - d.x) / width) * (MAP_W / d.view.scale),
        y: d.view.y - ((e.clientY - d.y) / height) * (MAP_H / d.view.scale),
      }),
    );
  };
  const onPointerUp = () => {
    drag.current = null;
    setDragging(false);
  };

  return (
    <div className="flex flex-col gap-5 lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start lg:gap-8">
      <div className="relative w-full self-center lg:w-[min(100%,calc((100dvh-12rem)*1.173))]">
        <div
          ref={frame}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className={`cho relative aspect-[1200/1023] overflow-hidden bg-bg @container ${
            view.scale > 1 ? (dragging ? "cursor-grabbing touch-none" : "cursor-grab touch-none") : ""
          }`}
        >
          <MapStack view={view} active={active} dragging={dragging} onStep={pick} venue={venue} />
          <MapChrome scale={clampView(view).scale} />
        </div>
        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
          <IconButton label="Yakınlaştır" onClick={() => zoom(1.5)}>
            <path d="M2 7 H12 M7 2 V12" />
          </IconButton>
          <IconButton label="Uzaklaştır" onClick={() => zoom(1 / 1.5)}>
            <path d="M2 7 H12" />
          </IconButton>
          <IconButton label="Tüm haritayı göster" onClick={() => pick(null)}>
            <path d="M1.5 5 V1.5 H5 M9 1.5 H12.5 V5 M12.5 9 V12.5 H9 M5 12.5 H1.5 V9" />
          </IconButton>
        </div>
      </div>

      <ol className="flex flex-col">
        {steps.map((step, i) => (
          <li key={step.title} className="flex flex-col">
            <button
              type="button"
              onClick={() => pick(active === i ? null : i)}
              aria-pressed={active === i}
              className={`flex items-start gap-4 border px-3.5 py-3 text-left transition-colors ${
                active === i ? "border-line-2 bg-surface-2" : "border-transparent hover:bg-surface"
              }`}
            >
              <span className="grid size-[26px] shrink-0 place-items-center">
                {i === steps.length - 1 ? <PinGlyph /> : <Diamond n={i + 1} tone={step.tone} />}
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="font-bold text-ink">{step.title}</span>
                <span className="text-[14px] text-ink-2">{step.text}</span>
              </span>
            </button>
            {step.next && (
              <div className="ml-[26px] flex items-center gap-4 border-l border-dashed border-line-2 py-3 pl-[22px]">
                <LegSample kind={step.next.kind} />
                <span className="flex flex-col text-[13px] leading-snug">
                  <span className="font-semibold text-ink">{step.next.label}</span>
                  <span className="text-ink-3">{step.next.detail}</span>
                </span>
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

type Props = { venue: string; place: string; directions: string };

export function VenueMap({ venue, place, directions }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  const show = () => {
    setOpen(true);
    dialog.current?.showModal();
  };

  return (
    <>
      <div className="grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <button
          type="button"
          onClick={show}
          aria-haspopup="dialog"
          aria-label="Yol tarifini haritada aç"
          className="group/map relative block aspect-[4/3] overflow-hidden bg-bg @container sm:aspect-[3/2]"
        >
          {/* The frame is wider than the map, so the map fills the width and is
              centred on the route's vertical span. */}
          <span className="absolute inset-x-0 top-1/2 block aspect-[1200/1023] -translate-y-[52.1%]">
            <MapStack venue={venue} />
          </span>
          <MapChrome />
          <span className="absolute top-3 right-3 grid size-10 place-items-center border border-line bg-bg-deep/90 text-ink transition-colors group-hover/map:border-cyan">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              aria-hidden="true"
              stroke="currentColor"
              strokeWidth="1.6"
              fill="none"
            >
              <path d="M8.5 1.5 H12.5 V5.5 M12.5 1.5 L8 6 M5.5 12.5 H1.5 V8.5 M1.5 12.5 L6 8" />
            </svg>
          </span>
        </button>
        <div className="flex flex-col gap-5 border-line p-6 max-lg:border-t md:p-8 lg:border-l">
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-bold tracking-[0.18em] text-cyan">KONUM</span>
            <h3 className="text-xl font-bold">{place}</h3>
          </div>
          <ol className="flex flex-col gap-3">
            {steps.map((step, i) => (
              <li key={step.title} className="flex items-start gap-3">
                <span className="grid size-[22px] shrink-0 scale-[0.85] place-items-center">
                  {i === steps.length - 1 ? <PinGlyph /> : <Diamond n={i + 1} tone={step.tone} />}
                </span>
                <span className="text-[15px] leading-snug">
                  <span className="font-semibold text-ink">{step.title}</span>
                  <span className="text-ink-2"> · {step.text}</span>
                </span>
              </li>
            ))}
          </ol>
          <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-1">
            <button
              type="button"
              onClick={show}
              aria-haspopup="dialog"
              className="cut inline-flex h-11 items-center bg-amber px-5 text-sm font-bold text-on-amber hover:brightness-110"
            >
              Yol tarifini aç
            </button>
            <a href={directions} target="_blank" rel="noopener noreferrer" className="link-arrow text-[15px] font-bold">
              Google Haritalar
            </a>
          </div>
        </div>
      </div>

      <dialog
        ref={dialog}
        aria-label="Metrodan Tarihi Hamam'a yol tarifi"
        onClose={() => setOpen(false)}
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
        className="m-auto max-h-dvh w-full max-w-none bg-bg p-0 text-ink backdrop:bg-bg-deep/85 backdrop:backdrop-blur-sm max-lg:h-dvh lg:max-h-[calc(100dvh-2rem)] lg:w-[min(1280px,94vw)] lg:border lg:border-line"
      >
        <div className="p-4 lg:p-7">
          <div className="flex items-start justify-between gap-4 pb-4">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-bold tracking-[0.18em] text-amber">ULAŞIM</span>
              <span className="font-display text-xl font-semibold lg:text-2xl">Metrodan {venue}&apos;a</span>
            </div>
            <div className="flex items-center gap-4">
              <a
                href={directions}
                target="_blank"
                rel="noopener noreferrer"
                className="link-arrow hidden text-[15px] font-bold sm:inline"
              >
                Google Haritalar&apos;da aç
              </a>
              <button
                type="button"
                onClick={() => dialog.current?.close()}
                className="grid size-11 place-items-center border border-line text-ink hover:border-cyan"
                aria-label="Yol tarifini kapat"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path d="M2 2 L14 14 M14 2 L2 14" />
                </svg>
              </button>
            </div>
          </div>
          {open && <Frame venue={venue} />}
          <a
            href={directions}
            target="_blank"
            rel="noopener noreferrer"
            className="link-arrow mt-5 inline-block text-[15px] font-bold sm:hidden"
          >
            Google Haritalar&apos;da aç
          </a>
        </div>
      </dialog>
    </>
  );
}
