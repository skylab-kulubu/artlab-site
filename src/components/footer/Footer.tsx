import type { Theme } from "@/themes";
import { Signature } from "./Signature";
import { Social } from "./Social";

const mark = "opacity-80 transition-opacity duration-300 hover:opacity-100";

function Wordmark() {
  return (
    <svg viewBox="0 0 1170 168" role="img" aria-label="ARTLAB" className="block h-auto w-full max-w-[900px]">
      <defs>
        <pattern id="footer-dots" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.6" fill="var(--color-ink-2)" />
        </pattern>
      </defs>
      <text
        x="0"
        y="150"
        fill="url(#footer-dots)"
        className="font-display font-extrabold"
        style={{ fontSize: 200, letterSpacing: 6 }}
      >
        ARTLAB
      </text>
    </svg>
  );
}

function AirLab() {
  return (
    <a
      href="https://yildizskylab.com"
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-2.5 text-sm font-bold tracking-[0.12em] text-ink/80 hover:text-ink"
    >
      <span className="relative size-11">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/airlab-beyaz.png" alt="" width={44} height={46} className="absolute inset-0 size-full object-contain opacity-80 transition-opacity duration-300 group-hover:opacity-0" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/airlab-renkli.png" alt="" width={44} height={46} className="absolute inset-0 size-full object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </span>
      AIR LAB
    </a>
  );
}

export function Footer({ theme, year }: { theme: Theme; year: number }) {
  const Sleep = theme.mascot?.Sleep;

  return (
    <footer className="relative flex flex-col gap-10 border-t border-line bg-bg-deep px-5 pt-16 pb-8 lg:px-20 lg:pt-20">
      <a
        href="#baslangic"
        aria-label="Başa dön"
        className="absolute -top-2 left-[33px] hidden size-4 rotate-45 border-[1.5px] border-cyan bg-bg-deep transition-colors hover:bg-cyan/20 lg:block"
      >
        <span className="absolute inset-[3.5px] bg-cyan" />
      </a>

      <div className="flex items-end justify-between gap-6 border-b border-line">
        <div className="min-w-0 grow pb-4">
          <Wordmark />
        </div>
        {Sleep && (
          <div className="group/robot hidden shrink-0 sm:block">
            <Sleep className="h-auto w-[200px] lg:w-[260px]" />
          </div>
        )}
      </div>

      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-5">
          <a href="https://yildizskylab.com" target="_blank" rel="noopener noreferrer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/skylab-text-logo.svg" alt="SKY LAB · Bilgisayar Bilimleri Kulübü" width={253} height={44} className={`h-11 w-auto ${mark}`} />
          </a>
          <a href="https://www.yildiz.edu.tr" target="_blank" rel="noopener noreferrer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/ytu-logo.png" alt="Yıldız Teknik Üniversitesi" width={216} height={41} className={`h-10 w-auto ${mark}`} />
          </a>
          <AirLab />
        </div>
        <div className="-mr-3">
          <Social />
        </div>
      </div>

      <div className="flex flex-col items-start justify-between gap-4 border-t border-line-2 pt-6 text-[13px] text-ink-3 md:flex-row md:items-center">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <span>© {year} YTÜ SKY LAB</span>
          <a href="https://skyl.app/kvkk-metni" target="_blank" rel="noopener noreferrer" className="text-ink-2 hover:text-cyan">
            KVKK metni
          </a>
          <a href="#baslangic" className="flex items-center gap-1.5 text-ink-2 hover:text-cyan">
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M2 8 L6 4 L10 8" />
            </svg>
            Başa dön
          </a>
        </div>
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/weblablogo.svg" alt="WEB LAB" width={47} height={36} className={`h-9 w-auto ${mark}`} />
          <Signature />
        </div>
      </div>
    </footer>
  );
}
