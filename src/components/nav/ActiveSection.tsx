"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import type { SectionId, SectionLink } from "@/lib/sections";

type Value = { sections: SectionLink[]; active: SectionId; index: number };

const ActiveSectionContext = createContext<Value | null>(null);

export function ActiveSectionProvider({ sections, children }: { sections: SectionLink[]; children: ReactNode }) {
  const [active, setActive] = useState<SectionId>(sections[0].id);
  const locked = useRef(false);

  useEffect(() => {
    // A one-pixel band across the viewport at 40% height: whichever section
    // crosses it is the current one, so exactly one wins at any scroll offset.
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit && !locked.current) setActive(hit.target.id as SectionId);
      },
      { rootMargin: "-40% 0px -60% 0px" },
    );
    for (const { id } of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [sections]);

  // In-page links scroll smoothly without writing #id into the address bar. The
  // compass jumps straight to the target and ignores the sections passed on the way.
  useEffect(() => {
    let release: ReturnType<typeof setTimeout> | undefined;
    const unlock = () => {
      locked.current = false;
      clearTimeout(release);
    };

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element).closest?.<HTMLAnchorElement>('a[href^="#"]');
      const id = link && decodeURIComponent(link.getAttribute("href")!.slice(1));
      const target = id && document.getElementById(id);
      if (!target) return;
      e.preventDefault();

      const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
      if (id === sections[0].id) window.scrollTo({ top: 0, behavior });
      else target.scrollIntoView({ behavior, block: "start" });

      const section = sections.find((s) => s.id === id);
      if (section) {
        setActive(section.id);
        locked.current = true;
        clearTimeout(release);
        release = setTimeout(unlock, 1200);
      }
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    };

    document.addEventListener("click", onClick);
    window.addEventListener("scrollend", unlock);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("scrollend", unlock);
      clearTimeout(release);
    };
  }, [sections]);

  const index = Math.max(0, sections.findIndex((s) => s.id === active));

  return <ActiveSectionContext.Provider value={{ sections, active, index }}>{children}</ActiveSectionContext.Provider>;
}

export function useActiveSection() {
  const value = useContext(ActiveSectionContext);
  if (!value) throw new Error("useActiveSection needs an ActiveSectionProvider");
  return value;
}
