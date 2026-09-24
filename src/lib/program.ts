import type { Session, SessionKind } from "./types";

export const kindLabel: Record<SessionKind, string> = {
  acilis: "Açılış",
  seminer: "Seminer",
  panel: "Panel",
  workshop: "Workshop",
  ara: "Ara",
};

export function speakerSession(sessions: Session[], speakerId: string) {
  return sessions.find((s) => s.speakerIds.includes(speakerId));
}
