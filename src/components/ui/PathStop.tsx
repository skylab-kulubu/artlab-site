"use client";

import { useActiveSection } from "@/components/nav/ActiveSection";
import type { SectionId } from "@/lib/sections";

export type StopState = "passed" | "current" | "upcoming";

const states: Record<StopState, string> = {
  passed: "bg-amber",
  current: "bg-cyan",
  upcoming: "border-[1.5px] border-amber bg-bg",
};

export function PathStop({ section, className = "" }: { section: SectionId; className?: string }) {
  const { sections, index } = useActiveSection();
  const own = sections.findIndex((s) => s.id === section);
  const state: StopState = own < index ? "passed" : own === index ? "current" : "upcoming";

  return (
    <span aria-hidden="true" className={`absolute size-3 ${className}`}>
      {state === "current" && (
        <span className="absolute -inset-[5px] rotate-45 border border-cyan motion-safe:animate-pulse" />
      )}
      <span className={`absolute inset-0 rotate-45 transition-colors duration-500 ${states[state]}`} />
    </span>
  );
}
