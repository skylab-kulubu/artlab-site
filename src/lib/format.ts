const TZ = "Europe/Istanbul";

const time = new Intl.DateTimeFormat("tr-TR", { timeZone: TZ, hour: "2-digit", minute: "2-digit" });
const dayMonth = new Intl.DateTimeFormat("tr-TR", { timeZone: TZ, day: "numeric", month: "long" });
const day = new Intl.DateTimeFormat("tr-TR", { timeZone: TZ, day: "numeric" });
const month = new Intl.DateTimeFormat("tr-TR", { timeZone: TZ, month: "long", year: "numeric" });

export const formatTime = (iso: string) => time.format(new Date(iso));

export const formatDayMonth = (iso: string) => dayMonth.format(new Date(iso));

export function formatDateRange(startsAt: string, endsAt: string) {
  const a = new Date(startsAt);
  const b = new Date(endsAt);
  const first = day.format(a);
  const last = day.format(b);
  return first === last ? `${first} ${month.format(b)}` : `${first}–${last} ${month.format(b)}`;
}
