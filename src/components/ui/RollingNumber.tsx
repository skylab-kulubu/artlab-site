"use client";

import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";

// Each digit rolls on its own, so only the ones that change move: a countdown reads as ticking, not flashing.
export function RollingNumber({ value, digits = 2, className }: { value: number; digits?: number; className?: string }) {
  const text = String(value).padStart(digits, "0");

  return (
    <span className={`inline-flex overflow-hidden leading-none tabular ${className ?? ""}`}>
      {[...text].map((d, i) => (
        <span key={i} className="relative inline-block">
          <AnimatePresence mode="popLayout" initial={false}>
            <m.span
              key={d}
              className="inline-block"
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              {d}
            </m.span>
          </AnimatePresence>
        </span>
      ))}
    </span>
  );
}
