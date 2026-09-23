import type { Raffle } from "@/lib/types";

export const raffle: Raffle = {
  enabled: true,
  baseConditions: ["Etkinliğe kayıtlı olman gerekiyor."],
  prizes: [
    {
      id: "p1",
      name: "[Ödül adı]",
      sponsorId: "a1",
      featured: true,
      drawAt: "2026-11-25T17:30:00+03:00",
      conditions: [{ type: "full_day", day: 1 }],
    },
    {
      id: "p2",
      name: "[Ödül adı]",
      sponsorId: "a2",
      drawAt: "2026-11-26T17:30:00+03:00",
      conditions: [{ type: "full_day", day: 2 }],
    },
    {
      id: "p3",
      name: "[Ödül adı]",
      sponsorId: "g1",
      drawAt: "2026-11-26T17:45:00+03:00",
      conditions: [{ type: "min_sessions", count: 4 }],
    },
  ],
};
