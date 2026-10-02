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
    lat: 41.0275,
    lng: 28.89,
    mapUrl:
      "https://www.google.com/maps/place/Y%C4%B1ld%C4%B1z+Teknik+%C3%9Cniversitesi+Tarihi+Hamam/@41.0276248,28.8875133,18z/data=!4m6!3m5!1s0x14cabb133f838f69:0xcb444d1e45bc3b33!8m2!3d41.0275075!4d28.8899995!16s%2Fg%2F11r_tg6rcf",
    transport: [
      "M1A metrosuyla Davutpaşa-YTÜ durağında in, kampüs ringiyle Tarihi Hamam'a ulaş.",
      "41AT otobüs hattı da kampüse gidiyor.",
    ],
  },
  registrationUrl: "https://skyl.app/artlab-katilimci-formu",
  workshopRoom: "[salon adı]",
  programNote: "Seminerler Tarihi Hamam'da, workshoplar [salon adı]'nda.",
  contact: {
    email: "info@yildizskylab.com",
    instagram: "https://www.instagram.com/ytuskylab",
  },
};

export const foyer: Foyer = {
  standCount: 12,
  photo: {
    src: "/img/fuaye.jpg",
    alt: "Tarihi Hamam fuayesinde stantları gezen katılımcılar",
    width: 1600,
    height: 900,
  },
};

export const pastEditions: PastEdition[] = [
  { year: 2022, dateLabel: "14 Kasım", note: "seminer + workshop" },
  { year: 2023, dateLabel: "13 Kasım" },
  {
    year: 2024,
    dateLabel: "25–26 Kasım",
    gallery: [
      {
        src: "/img/arsiv/2024-1.jpg",
        alt: "Katılımcılar bir stantta dizüstü bilgisayarlardaki demoları inceliyor",
        width: 1600,
        height: 1067,
      },
      {
        src: "/img/arsiv/2024-2.jpg",
        alt: "Bir katılımcı sanal gerçeklik gözlüğüyle bir demoyu deniyor",
        width: 1600,
        height: 1067,
      },
      { src: "/img/arsiv/2024-3.jpg", alt: "Katılımcılar fuayede sohbet ediyor", width: 1600, height: 1067 },
      {
        src: "/img/arsiv/2024-4.jpg",
        alt: "Tarihi Hamam fuayesinde stantların arasında sohbet eden katılımcılar",
        width: 1600,
        height: 1067,
      },
    ],
  },
  {
    year: 2025,
    dateLabel: "11–12 Aralık",
    gallery: [
      {
        src: "/img/arsiv/2025-1.jpg",
        alt: "Bir katılımcı sponsor stantında oyun deniyor, çevresinde izleyenler",
        width: 1600,
        height: 1067,
      },
      { src: "/img/arsiv/2025-2.jpg", alt: "Oturum arasında fuayede toplanan katılımcılar", width: 1600, height: 1067 },
    ],
  },
];
