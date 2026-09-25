import type { Edition, Foyer, PastEdition } from "@/lib/types";

export const edition: Edition = {
  year: 2026,
  number: 8,
  slogan: "Kozadan geleceğe.",
  startsAt: "2026-11-25T12:00:00+03:00",
  endsAt: "2026-11-26T18:00:00+03:00",
  venue: {
    name: "Tarihi Hamam",
    campus: "YTÜ Davutpaşa",
    area: "Davutpaşa",
    lat: 41.026,
    lng: 28.89,
    transport: [
      "M1A metrosuyla Davutpaşa-YTÜ durağında in, kampüs ringiyle Tarihi Hamam'a ulaş.",
      "41AT otobüs hattı da kampüse gidiyor.",
    ],
  },
  workshopRoom: "[salon adı]",
  programNote: "Seminerler Tarihi Hamam'da, workshoplar [salon adı]'nda.",
  contact: {
    instagram: "https://www.instagram.com/ytuskylab",
  },
};

export const foyer: Foyer = { standCount: 12 };

export const pastEditions: PastEdition[] = [
  { year: 2022, dateLabel: "14 Kasım", note: "seminer + workshop" },
  { year: 2023, dateLabel: "13 Kasım" },
  { year: 2024, dateLabel: "25–26 Kasım" },
  { year: 2025, dateLabel: "11–12 Aralık" },
];

export const archiveGap = "2019–2021";
