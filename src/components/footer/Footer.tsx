import type { SectionLink } from "@/lib/sections";
import type { Theme } from "@/themes";

const club = [
  { label: "yildizskylab.com", href: "https://yildizskylab.com" },
  { label: "YıldızJam", href: "https://yildizjam.yildizskylab.com" },
  { label: "İletişim", href: "#iletisim" },
  { label: "KVKK metni", href: "https://skyl.app/kvkk-metni" },
];

const partners = ["SKY LAB", "YTÜ", "AIR LAB"];

const heading = "text-xs font-bold tracking-[0.14em] text-ink-3";
const link = "text-ink/80 hover:text-cyan";

export function Footer({ sections, theme, year }: { sections: SectionLink[]; theme: Theme; year: number }) {
  const Sleep = theme.mascot?.Sleep;
  const event = sections.filter((s) => !["baslangic", "neden", "sss"].includes(s.id));

  return (
    <footer className="relative flex flex-col gap-12 border-t border-line bg-bg-deep px-5 pt-16 pb-10 lg:px-20 lg:pt-[72px]">
      <span aria-hidden="true" className="absolute -top-2 left-[33px] hidden size-4 rotate-45 border-[1.5px] border-cyan bg-bg-deep lg:block" />
      <span aria-hidden="true" className="absolute -top-[3px] left-[38px] hidden size-1.5 rotate-45 bg-cyan lg:block" />

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
          <div className="flex flex-col items-start sm:items-end">
            <Sleep />
            <div className="h-px w-full bg-line" />
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-6 border-t border-line-2 pt-7 text-[13px] text-ink-3">
        <div className="flex gap-3">
          {partners.map((p) => (
            <span key={p} className="border border-line px-3.5 py-2.5 text-xs">
              {p}
            </span>
          ))}
        </div>
        <span>© {year} SKY LAB</span>
        <span>by ✎ Kaan Necip Kalp &lt;/&gt;</span>
      </div>
    </footer>
  );
}
