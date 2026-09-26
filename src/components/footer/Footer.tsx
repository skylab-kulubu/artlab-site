import { formatDateRange } from "@/lib/format";
import type { SectionLink } from "@/lib/sections";
import type { Edition } from "@/lib/types";
import type { Theme } from "@/themes";
import { Signature } from "./Signature";
import { Social } from "./Social";

const club = [
  { label: "yildizskylab.com", href: "https://yildizskylab.com" },
  { label: "İletişim", href: "#iletisim" },
  { label: "KVKK metni", href: "https://skyl.app/kvkk-metni" },
];

const pendingMarks = ["YTÜ", "AIR LAB"];

const heading = "text-xs font-bold tracking-[0.14em] text-ink-3";
const link = "text-ink/80 hover:text-cyan";
const mark = "opacity-80 transition-opacity duration-300 hover:opacity-100";

type Props = { sections: SectionLink[]; theme: Theme; edition: Edition };

export function Footer({ sections, theme, edition }: Props) {
  const Sleep = theme.mascot?.Sleep;
  const event = sections.filter((s) => !["baslangic", "neden", "sss"].includes(s.id));
  const date = edition.startsAt && edition.endsAt ? formatDateRange(edition.startsAt, edition.endsAt) : "Tarih yakında";

  return (
    <footer className="relative flex flex-col gap-12 border-t border-line bg-bg-deep px-5 pt-16 pb-8 lg:px-20 lg:pt-[72px]">
      <a
        href="#baslangic"
        className="group absolute -top-2 left-[33px] hidden items-center gap-3 text-[11px] font-bold tracking-[0.18em] text-cyan hover:text-cyan lg:flex"
      >
        <span className="relative size-4 rotate-45 border-[1.5px] border-cyan bg-bg-deep transition-colors group-hover:bg-cyan/20">
          <span className="absolute inset-[3.5px] bg-cyan" />
        </span>
        <span className="bg-bg-deep pr-2 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          BAŞA DÖN
        </span>
      </a>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-12">
        <div className="flex flex-col items-start gap-5">
          <div className="flex flex-col gap-1">
            <span className="font-display text-[26px] leading-none font-semibold tracking-[0.12em]">ARTLAB</span>
            <span className="text-[11px] font-semibold tracking-[0.22em] text-ink-2">
              YAPAY ZEKA ZİRVESİ · <span className="text-amber">{edition.number}. EDİSYON</span>
            </span>
          </div>
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm">
            <dt className="text-ink-3">Tarih</dt>
            <dd className="text-ink/80">{date}</dd>
            <dt className="text-ink-3">Yer</dt>
            <dd className="text-ink/80">
              {edition.venue.campus} · {edition.venue.name}
            </dd>
          </dl>
          <div className="-ml-3">
            <Social />
          </div>
        </div>
        <nav aria-label="Etkinlik" className="flex flex-col gap-3 text-[15px]">
          <span className={heading}>ETKİNLİK</span>
          {event.map((s) => (
            <a key={s.id} href={`#${s.id}`} className={link}>
              {s.label}
            </a>
          ))}
        </nav>
        <nav aria-label="SKY LAB" className="flex flex-col gap-3 text-[15px]">
          <span className={heading}>SKY LAB</span>
          {club.map((c) => (
            <a
              key={c.href}
              href={c.href}
              className={link}
              {...(c.href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
            >
              {c.label}
            </a>
          ))}
        </nav>
        {Sleep && (
          <div className="group/robot flex flex-col items-start sm:items-end">
            <Sleep />
            <div className="h-px w-full bg-line" />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-6 border-t border-line-2 pt-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <a
            href="https://yildizskylab.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-2.5 text-ink-3 hover:text-ink-2"
          >
            <span className="text-[11px] font-bold tracking-[0.18em]">BİR SKY LAB ETKİNLİĞİ</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/skylab-text-logo.svg"
              alt="SKY LAB · Bilgisayar Bilimleri Kulübü"
              width={253}
              height={44}
              className={`h-11 w-auto ${mark} group-hover:opacity-100`}
            />
          </a>
          <div className="flex items-center gap-3">
            {pendingMarks.map((m) => (
              <span key={m} className="grid h-11 place-items-center border border-line px-4 text-xs font-semibold text-ink-3">
                {m}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-start justify-between gap-4 border-t border-line-2 pt-6 text-[13px] text-ink-3 md:flex-row md:items-center">
          <span>© {edition.year} YTÜ SKY LAB</span>
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/weblablogo.svg" alt="WEB LAB" width={47} height={36} className={`h-9 w-auto ${mark}`} />
            <Signature />
          </div>
        </div>
      </div>
    </footer>
  );
}
