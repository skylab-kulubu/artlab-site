import type { Edition, Session } from "./types";

export type Phase = "yakinda" | "geri-sayim" | "canli" | "bitti";

export function phaseAt(edition: Edition, now: Date): Phase {
  if (!edition.startsAt || !edition.endsAt) return "yakinda";
  const t = now.getTime();
  if (t < Date.parse(edition.startsAt)) return "geri-sayim";
  if (t <= Date.parse(edition.endsAt)) return "canli";
  return "bitti";
}

export function currentSession(sessions: Session[], now: Date) {
  const t = now.getTime();
  return sessions.find((s) => Date.parse(s.startsAt) <= t && t < Date.parse(s.endsAt));
}

export function nextSession(sessions: Session[], now: Date) {
  const t = now.getTime();
  return sessions.find((s) => Date.parse(s.startsAt) > t);
}
