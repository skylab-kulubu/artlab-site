"use client";

import { useState, useSyncExternalStore } from "react";
import { Button, buttonClass } from "@/components/ui/Button";
import "@/error-scenes/error-scene.css";
import "./error-scene-artlab.css";

// A kind's file from src/error-scenes (skylcn-ui's error scenes, copied in).
export type SceneWords = { code: string; title: string; description: string; action: string };
export type SceneData = {
  kind: string;
  variants: string[];
  random: string[];
  text: { tr: Record<string, SceneWords> };
  svg: Record<string, string>;
};

const noSubscription = () => () => {};

// One of the kind's drawings at random on each visit, chosen in the browser, as
// skylcn-ui's ErrorScenePage does. While a server-rendered page hydrates there is no
// pick yet, so the server's HTML and the first browser render agree; the first drawing
// waits hidden meanwhile (skylcn-error-pending in error-scene.css, at most 1.5 s).
function useSceneVariant(scene: SceneData): string | undefined {
  const [random] = useState(() => scene.random[Math.floor(Math.random() * scene.random.length)]);
  const inBrowser = useSyncExternalStore(noSubscription, () => true, () => false);
  return inBrowser ? random : undefined;
}

// A whole-page error: the scene (inline SVG, decoration only) above its words and one
// button, a link with `href` (404) or a button with `onAction` (error boundary). The
// scenes are drawn in ARTLAB's poster colours (error-scene-artlab.css).
export function ScenePage({ scene, href, onAction }: { scene: SceneData; href?: string; onAction?: () => void }) {
  const picked = useSceneVariant(scene);
  const shown = picked && picked in scene.svg ? picked : scene.random[0];
  const words = scene.text.tr[shown];

  return (
    <main className="artlab-error relative flex min-h-dvh flex-col items-start justify-center overflow-hidden px-5 py-24 lg:px-20">
      <span aria-hidden="true" className="absolute inset-y-0 left-10 hidden border-l border-dashed border-path lg:block" />
      <span aria-hidden="true" className="absolute top-1/2 left-[34px] hidden size-3 -translate-y-1/2 rotate-45 border-[1.5px] border-amber bg-[var(--artlab-ground)] lg:block" />
      {/* a new drawing enters afresh once it is picked */}
      <div key={picked ?? "pending"} className={`flex flex-col items-start gap-7 ${picked ? "" : "skylcn-error-pending"}`}>
        <div className="w-full max-w-72" dangerouslySetInnerHTML={{ __html: scene.svg[shown] }} />
        <div className="flex flex-col gap-3">
          <span className="text-xs font-bold tracking-[0.18em] text-cyan">{words.code}</span>
          <h1 className="font-display text-3xl font-semibold lg:text-5xl">{words.title}</h1>
          <p className="max-w-[520px] text-[17px] leading-relaxed text-ink-2">{words.description}</p>
        </div>
        {href ? (
          <Button href={href}>{words.action}</Button>
        ) : onAction ? (
          <button type="button" onClick={onAction} className={buttonClass()}>
            {words.action}
          </button>
        ) : null}
      </div>
    </main>
  );
}
