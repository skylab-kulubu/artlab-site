"use client";

import { useSyncExternalStore } from "react";

function createClock(interval: number) {
  let now = Date.now();
  let timer: ReturnType<typeof setInterval> | undefined;
  const listeners = new Set<() => void>();

  return {
    subscribe(onChange: () => void) {
      listeners.add(onChange);
      if (!timer) {
        now = Date.now();
        timer = setInterval(() => {
          now = Date.now();
          listeners.forEach((l) => l());
        }, interval);
      }
      return () => {
        listeners.delete(onChange);
        if (!listeners.size) {
          clearInterval(timer);
          timer = undefined;
        }
      };
    },
    getSnapshot: () => now,
  };
}

const clocks = new Map<number, ReturnType<typeof createClock>>();

function clockFor(interval: number) {
  let clock = clocks.get(interval);
  if (!clock) {
    clock = createClock(interval);
    clocks.set(interval, clock);
  }
  return clock;
}

// Components ticking at the same interval share one timer. The server's
// timestamp is used during hydration so the markup matches, then the real
// clock takes over.
export function useNow(interval: number, serverNow: number) {
  const { subscribe, getSnapshot } = clockFor(interval);
  return useSyncExternalStore(subscribe, getSnapshot, () => serverNow);
}
