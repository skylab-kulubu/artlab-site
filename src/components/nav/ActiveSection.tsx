"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { SectionId, SectionLink } from "@/lib/sections";

type Value = { sections: SectionLink[]; active: SectionId; index: number };

const ActiveSectionContext = createContext<Value | null>(null);

export function ActiveSectionProvider({ sections, children }: { sections: SectionLink[]; children: ReactNode }) {
  const [active, setActive] = useState<SectionId>(sections[0].id);

  useEffect(() => {
    // A one-pixel band across the viewport at 40% height: whichever section
    // crosses it is the current one, so exactly one wins at any scroll offset.
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setActive(hit.target.id as SectionId);
      },
      { rootMargin: "-40% 0px -60% 0px" },
    );
    for (const { id } of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [sections]);

  const index = Math.max(0, sections.findIndex((s) => s.id === active));

  return <ActiveSectionContext.Provider value={{ sections, active, index }}>{children}</ActiveSectionContext.Provider>;
}

export function useActiveSection() {
  const value = useContext(ActiveSectionContext);
  if (!value) throw new Error("useActiveSection needs an ActiveSectionProvider");
  return value;
}
