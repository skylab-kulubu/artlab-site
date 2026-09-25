"use client";

import { useRef, type ReactNode } from "react";
import type { Asset } from "@/lib/types";

type Props = { title: string; images: Asset[]; children: ReactNode; className?: string };

export function Gallery({ title, images, children, className }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => dialog.current?.showModal()}
        aria-label={`${title} galerisini aç`}
        className={`block w-full text-left ${className ?? ""}`}
      >
        {children}
      </button>
      <dialog
        ref={dialog}
        aria-label={title}
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
        className="m-auto max-h-[90dvh] w-[min(1100px,92vw)] bg-transparent p-0 text-ink backdrop:bg-bg/90"
      >
        <div className="flex items-center justify-between gap-4 pb-4">
          <span className="font-display text-xl font-semibold">{title}</span>
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            className="grid size-11 place-items-center border border-line text-ink hover:border-cyan"
            aria-label="Galeriyi kapat"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" stroke="currentColor" strokeWidth="1.6">
              <path d="M2 2 L14 14 M14 2 L2 14" />
            </svg>
          </button>
        </div>
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
          {images.map((img) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={img.src}
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="max-h-[75dvh] w-auto shrink-0 snap-center object-contain"
            />
          ))}
        </div>
      </dialog>
    </>
  );
}
