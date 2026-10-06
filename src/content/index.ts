import { cache } from "react";
import { unstable_rethrow } from "next/navigation";
import { getCmsSiteContent } from "inscribed/server";
import { cmsConfig } from "@/lib/cms-config";
import { imageRatio } from "@/lib/image-ratio";
import type {
  Asset,
  Condition,
  Edition,
  Faq,
  PastEdition,
  Prize,
  Raffle,
  Session,
  SessionKind,
  Speaker,
  Sponsor,
  SponsorTier,
} from "@/lib/types";

// The venue's position is part of the map, which stays in code.
const VENUE_POSITION = { lat: 41.0275, lng: 28.89 };

// Used while destekciler.kademeler is empty or cannot be read; the ids match the seed.
const DEFAULT_SPONSOR_TIERS: SponsorTier[] = [
  { id: "altin", name: "Altın", order: 1, size: "lg" },
  { id: "gumus", name: "Gümüş", order: 2, size: "md" },
  { id: "fuaye", name: "Fuaye ve ürün", order: 3, size: "sm" },
];

const TIER_SIZES: SponsorTier["size"][] = ["lg", "md", "sm"];

// Categories in their order, the first of a repeated id winning; an empty list keeps the defaults.
function readTiers(value: unknown): SponsorTier[] {
  const seen = new Set<string>();
  const tiers = rows(value).flatMap((r): SponsorTier[] => {
    const id = text(r.kimlik);
    const size = TIER_SIZES.find((s) => s === text(r.boyut)) ?? "md";
    if (!id || !text(r.ad) || seen.has(id)) return [];
    seen.add(id);
    return [{ id, name: text(r.ad), order: number(r.sira) ?? Number.MAX_SAFE_INTEGER, size }];
  });
  if (!tiers.length) return DEFAULT_SPONSOR_TIERS;
  // Stable, so categories sharing a number keep their list order.
  return tiers.sort((a, b) => a.order - b.order);
}

export type WhyItem = { icon: "dinle" | "ag" | "sertifika"; title: string; text: string };
export type SectionSwitches = Record<
  "cekilis" | "program" | "konusmacilar" | "fuaye" | "arsiv" | "destekciler" | "sss",
  boolean
>;

type Row = Record<string, unknown>;

const text = (v: unknown) => (typeof v === "string" ? v.trim() : "");
const optional = (v: unknown) => text(v) || undefined;
const number = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? v : undefined);
const rows = (v: unknown): Row[] => (Array.isArray(v) ? v.filter((r): r is Row => !!r && typeof r === "object") : []);
const image = (v: unknown): Asset | undefined => {
  const src = text((v as { src?: unknown } | null)?.src);
  return src ? { src, alt: text((v as { alt?: unknown }).alt) } : undefined;
};
const list = (v: unknown) =>
  text(v)
    .split(/[,\n]/)
    .map((s) => s.trim())
    .filter(Boolean);

// The date part of an instant in Istanbul, which sits at UTC+3 all year.
function istanbulDay(iso: string, plusDays = 0) {
  const t = new Date(iso).getTime() + 3 * 3_600_000 + plusDays * 86_400_000;
  return new Date(t).toISOString().slice(0, 10);
}

// "10:30" on the edition's nth day, as an instant.
function onDay(startsAt: string | undefined, day: number, time: unknown) {
  const hhmm = /^\d{1,2}[:.]\d{2}$/.test(text(time)) ? text(time).replace(".", ":").padStart(5, "0") : undefined;
  if (!startsAt || !hhmm) return undefined;
  return `${istanbulDay(startsAt, day - 1)}T${hhmm}:00+03:00`;
}

// Published blocks of the site; empty when the CMS cannot be reached, so the page renders its empty states.
const readBlocks = cache(async () => {
  try {
    const site = await getCmsSiteContent(cmsConfig);
    const all = [...(site.pages.find((p) => p.slug === "/")?.blocks ?? []), ...site.global.flatMap((g) => g.blocks)];
    return new Map(all.map((b) => [b.blockPath, b.value as unknown]));
  } catch (error) {
    unstable_rethrow(error);
    console.error("[cms] site content could not be read", error);
    return new Map<string, unknown>();
  }
});

export const getContent = cache(async () => {
  const blocks = await readBlocks();
  const get = (path: string) => blocks.get(path);
  const on = (path: string) => get(path) !== false;

  const startsAt = optional(get("edisyon.baslangic"));
  const endsAt = optional(get("edisyon.bitis"));

  const edition: Edition = {
    year: number(get("edisyon.yil")) ?? new Date().getFullYear(),
    number: number(get("edisyon.numara")) ?? 0,
    slogan: optional(get("hero.slogan")),
    startsAt,
    endsAt,
    venue: {
      name: text(get("mekan.ad")),
      campus: text(get("mekan.kampus")),
      area: text(get("mekan.semt")),
      ...VENUE_POSITION,
      mapUrl: optional(get("mekan.haritaBaglantisi")),
      transport: [],
    },
    registrationUrl: optional(get("edisyon.kayitBaglantisi")),
    certificateUrl: optional(get("edisyon.sertifikaBaglantisi")),
    workshopRoom: optional(get("program.workshopSalonu")),
    programNote: optional(get("program.not")),
    contact: { email: optional(get("iletisim.eposta")), instagram: optional(get("iletisim.instagram")) },
  };

  const why = {
    items: rows(get("neden.maddeler")).flatMap((r): WhyItem[] => {
      const icon = text(r.ikon);
      if (!text(r.baslik) || !["dinle", "ag", "sertifika"].includes(icon)) return [];
      return [{ icon: icon as WhyItem["icon"], title: text(r.baslik), text: text(r.metin) }];
    }),
  };

  const speakers: Speaker[] = rows(get("konusmacilar.liste")).flatMap((r, i) =>
    text(r.ad)
      ? [
          {
            id: text(r.kimlik) || `k${i + 1}`,
            name: text(r.ad),
            title: text(r.unvan),
            company: optional(r.sirket),
            photo: image(r.foto),
            linkedin: optional(r.linkedin),
            visible: true,
            order: i,
          },
        ]
      : [],
  );

  const kinds: SessionKind[] = ["acilis", "seminer", "panel", "workshop", "ara"];
  const sessions: Session[] = rows(get("program.oturumlar"))
    .flatMap((r, i): Session[] => {
      const day = number(r.gun) ?? 1;
      const start = onDay(startsAt, day, r.baslangic);
      const end = onDay(startsAt, day, r.bitis);
      if (!start || !end || !text(r.baslik)) return [];
      const kind = kinds.includes(text(r.tur) as SessionKind) ? (text(r.tur) as SessionKind) : "seminer";
      return [
        {
          id: `o${i + 1}`,
          day,
          startsAt: start,
          endsAt: end,
          title: text(r.baslik),
          kind,
          room: optional(r.salon),
          speakerIds: list(r.konusmacilar),
          byline: optional(r.altSatir),
        },
      ];
    })
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt));

  const sponsorTiers = readTiers(get("destekciler.kademeler"));
  // A supporter whose category is missing or mistyped stays on the page, in the last category.
  const tierOf = (id: string) => (sponsorTiers.some((t) => t.id === id) ? id : sponsorTiers[sponsorTiers.length - 1].id);

  const sponsors: Sponsor[] = (
    await Promise.all(
      rows(get("destekciler.liste")).map(async (r, i): Promise<Sponsor | null> => {
        const tierId = tierOf(text(r.kademe));
        if (!text(r.ad)) return null;
        const logo = image(r.logo);
        return {
          id: text(r.kimlik) || `d${i + 1}`,
          name: text(r.ad),
          tierId,
          logo,
          logoMono: image(r.tekRenkLogo),
          ratio: (logo && (await imageRatio(logo.src))) ?? 2,
          url: optional(r.baglanti),
          foyerNote: optional(r.fuayeNotu),
        };
      }),
    )
  ).filter((s): s is Sponsor => s !== null);

  const prizes: Prize[] = rows(get("cekilis.oduller")).flatMap((r, i): Prize[] => {
    const drawAt = onDay(startsAt, 1, r.cekilisSaati);
    if (!text(r.ad) || !drawAt) return [];
    const rule = text(r.sartTuru);
    const count = Number.parseInt(text(r.sart), 10);
    const condition: Condition | undefined =
      rule === "tum-oturumlar"
        ? { type: "full_day", day: 1 }
        : rule === "en-az-oturum" && count > 0
          ? { type: "min_sessions", count }
          : text(r.sart)
            ? { type: "custom", text: text(r.sart) }
            : undefined;
    return [
      {
        id: `c${i + 1}`,
        name: text(r.ad),
        image: image(r.gorsel),
        sponsorId: optional(r.sponsor),
        featured: r.buyukOdul === true,
        drawAt,
        conditions: condition ? [condition] : [],
      },
    ];
  });

  const sections: SectionSwitches = {
    cekilis: on("bolumler.cekilis"),
    program: on("bolumler.program"),
    konusmacilar: on("bolumler.konusmacilar"),
    fuaye: on("bolumler.fuaye"),
    arsiv: on("bolumler.arsiv"),
    destekciler: on("bolumler.destekciler"),
    sss: on("bolumler.sss"),
  };

  const raffle: Raffle = {
    enabled: sections.cekilis,
    closesAt: optional(get("cekilis.kapanis")),
    baseConditions: list(get("cekilis.temelSartlar")),
    detailsUrl: optional(get("cekilis.ayrintiBaglantisi")),
    prizes,
  };

  const faqs: Faq[] = rows(get("sss.sorular")).flatMap((r, i) =>
    text(r.soru) ? [{ q: text(r.soru), a: text(r.cevap), order: i }] : [],
  );

  // Photos grouped by edition, newest first.
  const editions = new Map<number, PastEdition>();
  for (const r of rows(get("arsiv.kareler"))) {
    const year = number(r.yil);
    const photo = image(r.foto);
    if (!year || !photo) continue;
    const past = editions.get(year) ?? { year, dateLabel: text(r.tarih), gallery: [] };
    if (!past.dateLabel) past.dateLabel = text(r.tarih);
    past.gallery!.push(photo);
    editions.set(year, past);
  }
  const pastEditions = [...editions.values()].sort((a, b) => b.year - a.year);

  return {
    edition,
    theme: optional(get("edisyon.tema")),
    sections,
    why,
    sessions,
    speakers,
    sponsorTiers,
    sponsors,
    raffle,
    faqs,
    foyer: { standCount: number(get("fuaye.standSayisi")), photo: image(get("fuaye.foto")) },
    pastEditions,
    fetchedAt: Date.now(),
  };
});

export type Content = Awaited<ReturnType<typeof getContent>>;
