import type { SectionLink } from "@/lib/sections";
import type { Theme } from "@/themes";
import { Signature } from "./Signature";
import { Social } from "./Social";

const club = [
  { label: "yildizskylab.com", href: "https://yildizskylab.com" },
  { label: "YıldızJam", href: "https://yildizjam.yildizskylab.com" },
  { label: "İletişim", href: "#iletisim" },
  { label: "KVKK metni", href: "https://skyl.app/kvkk-metni" },
];

const pendingMarks = ["YTÜ", "AIR LAB"];

const heading = "text-xs font-bold tracking-[0.14em] text-ink-3";
const link = "text-ink/80 hover:text-cyan";
const mark = "opacity-50 grayscale transition duration-700 hover:opacity-100 hover:grayscale-0";

function ClubLink() {
  return (
    <a
      href="https://yildizskylab.com"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-ink-3 uppercase hover:text-ink"
    >
      <span aria-hidden="true" className="text-cyan opacity-60 transition-opacity group-hover:opacity-100">
        ▶
      </span>
      yildizskylab.com
      <span className="absolute -bottom-1 left-0 h-px w-0 bg-cyan transition-[width] duration-300 group-hover:w-full" />
    </a>
  );
}

export function Footer({ sections, theme, year }: { sections: SectionLink[]; theme: Theme; year: number }) {
  const Sleep = theme.mascot?.Sleep;
  const event = sections.filter((s) => !["baslangic", "neden", "sss"].includes(s.id));

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
        <div className="flex flex-col gap-4">
          <span className="font-display text-[22px] font-semibold tracking-[0.12em]">ARTLAB</span>
          <p className="max-w-[320px] text-[15px] leading-relaxed text-ink-2">
            SKY LAB Bilgisayar Bilimleri Kulübü&apos;nün yapay zekâ zirvesi. Yıldız Teknik Üniversitesi.
          </p>
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

      <div className="flex flex-col gap-8 border-t border-line-2 pt-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a href="https://yildizskylab.com" target="_blank" rel="noopener noreferrer" className={mark}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/skylab-text-logo.svg" alt="SKY LAB" width={174} height={30} className="h-[30px] w-auto" />
            </a>
            {pendingMarks.map((m) => (
              <span key={m} className="border border-line px-3.5 py-2.5 text-xs text-ink-3">
                {m}
              </span>
            ))}
          </div>
          <Social />
        </div>
        <div className="grid items-center gap-5 border-t border-line-2 pt-6 text-[13px] text-ink-3 lg:grid-cols-3">
          <span className="text-center lg:text-left">© {year} YTÜ SKY LAB</span>
          <div className="flex justify-center">
            <ClubLink />
          </div>
          <div className="flex items-center justify-center gap-3 lg:justify-end">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/weblablogo.svg" alt="WEB LAB" width={31} height={24} className={`h-6 w-auto ${mark}`} />
            <Signature />
          </div>
        </div>
      </div>
    </footer>
  );
}
