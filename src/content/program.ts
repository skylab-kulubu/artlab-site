import type { Session, Speaker } from "@/lib/types";

export const speakers: Speaker[] = [
  { id: "s1", name: "[Ad Soyad]", title: "[Unvan]", company: "[Şirket]", linkedin: "https://www.linkedin.com/", visible: true, order: 1 },
  { id: "s2", name: "[Ad Soyad]", title: "[Unvan]", company: "[Şirket]", linkedin: "https://www.linkedin.com/", visible: true, order: 2 },
  { id: "s3", name: "[Ad Soyad]", title: "[Unvan]", company: "[Şirket]", linkedin: "https://www.linkedin.com/", visible: true, order: 3 },
  { id: "s4", name: "[Ad Soyad]", title: "[Unvan]", company: "[Şirket]", visible: true, order: 4 },
  { id: "s5", name: "[Ad Soyad]", title: "[Unvan]", company: "[Şirket]", visible: true, order: 5 },
  { id: "s6", name: "[Ad Soyad]", title: "[Unvan]", company: "[Şirket]", visible: true, order: 6 },
  { id: "s7", name: "[Ad Soyad]", title: "[Unvan]", company: "[Şirket]", visible: true, order: 7 },
];

export const sessions: Session[] = [
  { id: "d1-kapi", day: 1, startsAt: "2026-11-25T12:00:00+03:00", endsAt: "2026-11-25T12:30:00+03:00", title: "Kapı açılışı ve kayıt", kind: "ara", room: "Fuaye", speakerIds: [] },
  { id: "d1-acilis", day: 1, startsAt: "2026-11-25T12:30:00+03:00", endsAt: "2026-11-25T13:00:00+03:00", title: "Açılış konuşması", kind: "acilis", speakerIds: [], byline: "[Konuşmacı]" },
  { id: "d1-s1", day: 1, startsAt: "2026-11-25T13:00:00+03:00", endsAt: "2026-11-25T13:45:00+03:00", title: "[Oturum başlığı]", kind: "seminer", speakerIds: ["s1"] },
  { id: "d1-s2", day: 1, startsAt: "2026-11-25T13:45:00+03:00", endsAt: "2026-11-25T14:30:00+03:00", title: "[Oturum başlığı]", kind: "seminer", speakerIds: ["s2"] },
  { id: "d1-panel", day: 1, startsAt: "2026-11-25T14:30:00+03:00", endsAt: "2026-11-25T15:15:00+03:00", title: "[Panel başlığı]", kind: "panel", speakerIds: ["s3"] },
  { id: "d1-s3", day: 1, startsAt: "2026-11-25T15:15:00+03:00", endsAt: "2026-11-25T16:00:00+03:00", title: "[Oturum başlığı]", kind: "seminer", speakerIds: ["s4"] },
  { id: "d2-s1", day: 2, startsAt: "2026-11-26T11:00:00+03:00", endsAt: "2026-11-26T11:45:00+03:00", title: "[Oturum başlığı]", kind: "seminer", speakerIds: ["s5"] },
  { id: "d2-s2", day: 2, startsAt: "2026-11-26T11:45:00+03:00", endsAt: "2026-11-26T12:30:00+03:00", title: "[Oturum başlığı]", kind: "seminer", speakerIds: ["s6"] },
  { id: "d2-ws", day: 2, startsAt: "2026-11-26T16:00:00+03:00", endsAt: "2026-11-26T18:00:00+03:00", title: "[Workshop başlığı]", kind: "workshop", room: "[Salon]", speakerIds: ["s7"] },
];
