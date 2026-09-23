"use client";

import { useEffect, useState } from "react";
import { useActiveSection } from "@/components/nav/ActiveSection";

export function MobileMenu() {
  const { sections, active } = useActiveSection();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobil-menu"
        aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
        onClick={() => setOpen((o) => !o)}
        className="grid size-11 shrink-0 place-items-center text-ink xl:hidden"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" stroke="currentColor" strokeWidth="1.6">
          {open ? <path d="M4 4 L16 16 M16 4 L4 16" /> : <path d="M3 6 H17 M3 10 H17 M3 14 H11" />}
        </svg>
      </button>
      {open && (
        <nav id="mobil-menu" aria-label="Bölümler" className="cho absolute inset-x-0 top-full mt-2 bg-ink/18 p-px xl:hidden">
          <ul className="chi flex flex-col bg-surface-2/95 py-2 backdrop-blur-md">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={s.id === active ? "location" : undefined}
                  className={`flex h-12 items-center px-6 text-sm font-semibold tracking-[0.1em] uppercase ${
                    s.id === active ? "text-cyan" : "text-ink hover:text-cyan"
                  }`}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
}
