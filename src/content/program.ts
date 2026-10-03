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
  { id: "kapi", day: 1, startsAt: "2026-11-27T10:00:00+03:00", endsAt: "2026-11-27T10:30:00+03:00", title: "Kapı açılışı ve kayıt", kind: "ara", room: "Fuaye", speakerIds: [] },
  { id: "acilis", day: 1, startsAt: "2026-11-27T10:30:00+03:00", endsAt: "2026-11-27T11:00:00+03:00", title: "Açılış konuşması", kind: "acilis", speakerIds: [], byline: "[Konuşmacı]" },
  { id: "s1", day: 1, startsAt: "2026-11-27T11:00:00+03:00", endsAt: "2026-11-27T11:45:00+03:00", title: "[Oturum başlığı]", kind: "seminer", speakerIds: ["s1"] },
  { id: "s2", day: 1, startsAt: "2026-11-27T11:45:00+03:00", endsAt: "2026-11-27T12:30:00+03:00", title: "[Oturum başlığı]", kind: "seminer", speakerIds: ["s2"] },
  { id: "ogle", day: 1, startsAt: "2026-11-27T12:30:00+03:00", endsAt: "2026-11-27T13:30:00+03:00", title: "Öğle arası", kind: "ara", room: "Fuaye", speakerIds: [] },
  { id: "panel", day: 1, startsAt: "2026-11-27T13:30:00+03:00", endsAt: "2026-11-27T14:15:00+03:00", title: "[Panel başlığı]", kind: "panel", speakerIds: ["s3"] },
  { id: "s3", day: 1, startsAt: "2026-11-27T14:15:00+03:00", endsAt: "2026-11-27T15:00:00+03:00", title: "[Oturum başlığı]", kind: "seminer", speakerIds: ["s4"] },
  { id: "s4", day: 1, startsAt: "2026-11-27T15:00:00+03:00", endsAt: "2026-11-27T15:45:00+03:00", title: "[Oturum başlığı]", kind: "seminer", speakerIds: ["s5"] },
  { id: "s5", day: 1, startsAt: "2026-11-27T15:45:00+03:00", endsAt: "2026-11-27T16:30:00+03:00", title: "[Oturum başlığı]", kind: "seminer", speakerIds: ["s6"] },
  { id: "ws", day: 1, startsAt: "2026-11-27T16:30:00+03:00", endsAt: "2026-11-27T18:00:00+03:00", title: "[Workshop başlığı]", kind: "workshop", room: "[Salon]", speakerIds: ["s7"] },
];
