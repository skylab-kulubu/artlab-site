import type { Content } from "@/content";
import { Chamfer } from "@/components/ui/Chamfer";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { dayNumber, formatDayMonth, formatTime } from "@/lib/format";
import { conditionNote, conditionText, sessionStrip, type Dot } from "@/lib/raffle";
import type { Prize } from "@/lib/types";
import { sectionArt, type Theme } from "@/themes";
import { EditableRegion } from "inscribed";

const dots: Record<Dot, string> = {
  required: "bg-amber",
  optional: "border-[1.5px] border-amber",
  none: "border border-line",
};

function SessionDot({ kind }: { kind: Dot }) {
  return <span className={`size-3 rounded-full ${dots[kind]}`} />;
}

function GiftIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true" fill="none" stroke="var(--color-amber)" strokeWidth="1.6" opacity="0.6">
      <rect x="7" y="18" width="30" height="20" rx="2" />
      <rect x="5" y="12" width="34" height="6" rx="1.5" />
      <path d="M22 12 V38" />
      <path d="M22 12 Q15 3 11 8 Q12 12 22 12 Q29 3 33 8 Q32 12 22 12" stroke="var(--color-cyan)" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" aria-hidden="true" fill="none" stroke="var(--color-amber)" strokeWidth="1.5">
      <rect x="2" y="3.5" width="14" height="12" rx="2" />
      <path d="M2 7.5 H16 M6 1.5 V5 M12 1.5 V5" />
    </svg>
  );
}

function PrizeCard({ prize, content }: { prize: Prize; content: Content }) {
  const sponsor = content.sponsors.find((s) => s.id === prize.sponsorId);
  const strip = sessionStrip(prize, content.sessions);
  const { startsAt, endsAt } = content.edition;
  // Days are only worth naming when the edition spans more than one.
  const firstDay = startsAt && endsAt && dayNumber(startsAt, endsAt) > 1 ? startsAt : undefined;

  return (
    <Chamfer border={prize.featured ? "amber" : "line"} innerClassName="flex flex-col">
      <article className="flex h-full flex-col">
        <div className={`relative grid h-[150px] place-items-center ${prize.featured ? "bg-amber/12" : "bg-surface-2"}`}>
          {prize.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={prize.image.src} alt={prize.image.alt} className="size-full object-cover" />
          ) : (
            <GiftIcon />
          )}
          <span
            className={`cut absolute top-3.5 left-3.5 px-2.5 py-1.5 text-[11px] font-bold tracking-[0.12em] ${
              prize.featured ? "bg-amber text-on-amber" : "bg-bg/85 text-ink"
            }`}
          >
            {prize.featured ? "BÜYÜK ÖDÜL" : "ÖDÜL"}
          </span>
        </div>
        <div className="flex grow flex-col gap-3.5 px-5 pt-5 pb-[18px]">
          <div className="flex flex-col gap-1">
            <h3 className="text-[19px] font-bold">{prize.name}</h3>
            {sponsor && <span className="text-[13px] text-ink-2">{sponsor.name} katkısıyla</span>}
          </div>
          <div className="h-px bg-line" />
          <div className="flex flex-col gap-2.5">
            <span className="text-[10px] font-bold tracking-[0.18em] text-amber">KATILIM ŞARTI</span>
            {prize.conditions.map((c, i) => (
              <span key={i} className="text-base leading-snug font-semibold">
                {conditionText(c, strip.days.length)}
              </span>
            ))}
            {strip.hasStrip && (
              <div className="flex flex-col gap-2 bg-surface-2 px-4 py-3.5">
                {strip.days.map((d) => (
                  <div key={d.day} className="flex items-center gap-3">
                    {strip.days.length > 1 && (
                      <span className={`w-11 text-xs font-bold ${d.active ? "text-ink/80" : "text-ink-3"}`}>Gün {d.day}</span>
                    )}
                    <span className="flex flex-wrap gap-[7px]">
                      {d.dots.map((kind, i) => (
                        <SessionDot key={i} kind={kind} />
                      ))}
                    </span>
                  </div>
                ))}
                {prize.conditions.map((c) => conditionNote(c, strip.days.length)).filter(Boolean).map((note) => (
                  <span key={note} className="text-xs text-ink-2">
                    {note}
                  </span>
                ))}
              </div>
            )}
          </div>
          <span className="mt-auto flex items-center gap-2 pt-1 text-[13px] text-ink-2">
            <CalendarIcon />
            Çekiliş · {firstDay ? `Gün ${dayNumber(firstDay, prize.drawAt)}` : formatDayMonth(prize.drawAt)} ·{" "}
            {formatTime(prize.drawAt)}
          </span>
        </div>
      </article>
    </Chamfer>
  );
}

export function Raffle({ content, theme }: { content: Content; theme: Theme }) {
  const { raffle, edition } = content;
  const { Motif, Pose } = sectionArt(theme, "cekilis");
  const details = raffle.detailsUrl ?? edition.contact.instagram;

  return (
    <Section id="cekilis" motif={Motif && <Motif />}>
      <SectionHeader
        section="cekilis"
        title={<EditableRegion scope="global" blockPath="cekilis.baslik" blockType="ShortText" defaultValue="Çekiliş" />}
        lead={<EditableRegion scope="global" blockPath="cekilis.aciklama" blockType="LongText" defaultValue="Her ödülün kendi katılım şartı var. Hangisine uyuyorsan onun çekilişine girersin." />}
        illustration={Pose && <Pose />}
        aside={
          <span className="cut inline-flex items-center gap-2 bg-surface-2 px-3.5 py-2.5 text-[13px] font-bold text-cyan">
            <span className="size-[7px] rounded-full bg-cyan motion-safe:animate-pulse" />
            Katılım açık{raffle.closesAt && ` · son gün ${formatDayMonth(raffle.closesAt)}`}
          </span>
        }
      />
      <div className="flex flex-col gap-6">
        <div className="cut flex flex-wrap items-center justify-between gap-x-6 gap-y-2 bg-surface-2 px-[22px] py-4">
          <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[15px]">
            <span className="text-[11px] font-bold tracking-[0.16em] text-cyan">TÜM ÇEKİLİŞLER İÇİN</span>
            <span className="text-ink/80">{raffle.baseConditions.join(" ")} Her ödülün kendi şartı var.</span>
          </span>
          {details && (
            <a href={details} target="_blank" rel="noopener noreferrer" className="link-arrow shrink-0 text-sm font-bold">
              Tüm şartlar
            </a>
          )}
        </div>
        <div className="reveal-group grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {raffle.prizes.map((prize) => (
            <PrizeCard key={prize.id} prize={prize} content={content} />
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-5 text-[13px] text-ink-2">
          <span className="flex items-center gap-2">
            <SessionDot kind="required" />
            Katılman gereken oturum
          </span>
          <span className="flex items-center gap-2">
            <SessionDot kind="optional" />
            Seçebileceğin oturum
          </span>
        </div>
      </div>
    </Section>
  );
}
