"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { useActiveSection } from "@/components/nav/ActiveSection";

type Menu = { open: boolean; setOpen: (open: boolean | ((o: boolean) => boolean)) => void };

const MenuContext = createContext<Menu | null>(null);

function useMenu() {
  const menu = useContext(MenuContext);
  if (!menu) throw new Error("useMenu needs a MenuRoot");
  return menu;
}

const bar = "absolute left-0 h-[1.6px] w-full rounded-full bg-current transition-[translate,rotate,opacity,scale] duration-300 ease-out";

// Holds the menu state for the whole header, so the button can sit inside the
// chamfered box while the panel is drawn outside it, where the box's clip-path
// would otherwise cut it away.
export function MenuRoot({ children, className }: { children: ReactNode; className?: string }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onOutside = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onOutside);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onOutside);
    };
  }, [open]);

  return (
    <MenuContext.Provider value={{ open, setOpen }}>
      <header ref={root} className={className}>
        {children}
      </header>
    </MenuContext.Provider>
  );
}

export function MenuButton() {
  const { open, setOpen } = useMenu();

  return (
    <button
      type="button"
      aria-expanded={open}
      aria-controls="mobil-menu"
      aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
      onClick={() => setOpen((o) => !o)}
      className="grid size-11 shrink-0 place-items-center text-ink xl:hidden"
    >
      <span aria-hidden="true" className="relative block h-3 w-[18px]">
        <span className={`${bar} top-0 ${open ? "translate-y-[5.2px] rotate-45" : ""}`} />
        <span className={`${bar} top-[5.2px] ${open ? "scale-x-0 opacity-0" : ""}`} />
        <span className={`${bar} top-[10.4px] ${open ? "-translate-y-[5.2px] -rotate-45" : "w-[62%]"}`} />
      </span>
    </button>
  );
}

export function MenuPanel() {
  const { sections, active } = useActiveSection();
  const { open, setOpen } = useMenu();

  return (
    <nav
      id="mobil-menu"
      aria-label="Bölümler"
      inert={!open}
      className={`cho absolute inset-x-0 top-full mt-2 bg-ink/18 p-px transition-[opacity,translate,visibility] duration-300 ease-out xl:hidden ${
        open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
      }`}
    >
      <ul className="chi flex flex-col bg-surface-2/95 py-2 backdrop-blur-md">
        {sections.map((s, i) => (
          <li
            key={s.id}
            className={`transition-[opacity,translate] duration-300 ease-out ${open ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"}`}
            style={{ transitionDelay: open ? `${60 + i * 30}ms` : "0ms" }}
          >
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
  );
}
