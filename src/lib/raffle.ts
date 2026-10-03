import type { Condition, Prize, Session } from "./types";

export type Dot = "required" | "optional" | "none";

export function conditionText(c: Condition, days: number) {
  switch (c.type) {
    case "full_day":
      return days > 1 ? `${c.day}. günün tüm oturumlarına katıl` : "Tüm oturumlara katıl";
    case "min_sessions":
      return `Etkinlik boyunca en az ${c.count} oturuma katıl`;
    case "custom":
      return c.text;
  }
}

export function conditionNote(c: Condition, days: number) {
  if (c.type !== "min_sessions") return undefined;
  return days > 1 ? `Herhangi ${c.count} oturum, günlerin hangisinden olursa` : `Herhangi ${c.count} oturum`;
}

// Sessions that count towards attendance; breaks and doors-open slots have no check-in.
const counted = (s: Session) => s.kind !== "ara";

export function sessionStrip(prize: Prize, sessions: Session[]) {
  const days = [...new Set(sessions.filter(counted).map((s) => s.day))].sort((a, b) => a - b);
  const hasStrip = prize.conditions.some((c) => c.type !== "custom");

  const dot = (s: Session): Dot => {
    if (prize.conditions.some((c) => c.type === "full_day" && c.day === s.day)) return "required";
    if (prize.conditions.some((c) => c.type === "min_sessions")) return "optional";
    return "none";
  };

  return {
    hasStrip,
    days: days.map((day) => {
      const dots = sessions.filter((s) => counted(s) && s.day === day).map(dot);
      return { day, dots, active: dots.some((d) => d !== "none") };
    }),
  };
}
