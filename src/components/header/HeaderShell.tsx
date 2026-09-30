"use client";

import type { ReactNode } from "react";
import { useActiveSection } from "@/components/nav/ActiveSection";
import { MenuPanel, MenuRoot } from "./MobileMenu";

export function HeaderShell({ children }: { children: ReactNode }) {
  const { active } = useActiveSection();
  const onHero = active === "baslangic";

  return (
    <MenuRoot className="enter-down fixed inset-x-3 top-3 z-50 lg:inset-x-6 lg:top-4">
      <div className="cho bg-ink/18 p-px">
        <div
          className={`chi flex h-16 items-center justify-between gap-4 pr-3 pl-4 backdrop-blur-md transition-colors duration-500 lg:gap-8 lg:pl-6 ${
            onHero ? "bg-surface-2/55" : "bg-surface-2/94"
          }`}
        >
          {children}
        </div>
      </div>
      <MenuPanel />
    </MenuRoot>
  );
}
