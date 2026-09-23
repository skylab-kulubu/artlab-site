import type { Edition, Session } from "./types";

export type Phase = "yakinda" | "geri-sayim" | "canli" | "bitti";

export function phaseAt(edition: Edition, now: number): Phase {
  if (!edition.startsAt || !edition.endsAt) return "yakinda";
  if (now < Date.parse(edition.startsAt)) return "geri-sayim";
  if (now <= Date.parse(edition.endsAt)) return "canli";
  return "bitti";
}

export function phaseAction(phase: Phase, edition: Edition) {
  switch (phase) {
    case "yakinda":
      return { label: "Haberdar ol", short: "Haberdar ol", href: edition.contact.instagram ?? "#iletisim" };
    case "geri-sayim":
      return { label: "Ücretsiz kayıt ol", short: "Kayıt ol", href: edition.registrationUrl ?? "#kayit" };
    case "canli":
      return { label: "Şu anki oturum", short: "Şu an", href: "#program" };
    case "bitti":
      return { label: "Sertifikanı al", short: "Sertifika", href: edition.certificateUrl ?? "#sertifika" };
  }
}

export function countdown(until: string, now: number) {
  const ms = Math.max(0, Date.parse(until) - now);
  const s = Math.floor(ms / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

export function currentSession(sessions: Session[], now: number) {
  return sessions.find((s) => Date.parse(s.startsAt) <= now && now < Date.parse(s.endsAt));
}

export function nextSession(sessions: Session[], now: number) {
  return sessions.find((s) => Date.parse(s.startsAt) > now);
}
