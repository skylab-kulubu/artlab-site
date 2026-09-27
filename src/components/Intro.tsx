import type { Theme } from "@/themes";
import { StopGlyph } from "./ui/StopGlyph";

export const INTRO_KEY = "artlab-intro";

// Runs before first paint: a visitor who has seen the intro in this session never sees it again.
export const introScript = `try{if(sessionStorage.getItem("${INTRO_KEY}"))document.documentElement.dataset.introSeen="";else sessionStorage.setItem("${INTRO_KEY}","1")}catch(e){document.documentElement.dataset.introSeen=""}`;

export function Intro({ theme }: { theme: Theme }) {
  const Art = theme.mascot?.Loader;

  return (
    <div aria-hidden="true" className="intro pointer-events-none fixed inset-0 z-[100] grid place-items-center bg-bg">
      {Art ? <Art /> : <StopGlyph size={96} />}
    </div>
  );
}
