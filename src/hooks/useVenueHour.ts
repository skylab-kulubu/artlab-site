"use client";

import { useSyncExternalStore } from "react";
import { parseForcedHour, venueHour } from "@/lib/env";
import { useNow } from "./useNow";

const noSubscribe = () => () => {};

export function useVenueHour(serverNow: number) {
  const now = useNow(60_000, serverNow);
  const search = useSyncExternalStore(
    noSubscribe,
    () => window.location.search,
    () => "",
  );
  return parseForcedHour(new URLSearchParams(search).get("saat")) ?? venueHour(new Date(now));
}
