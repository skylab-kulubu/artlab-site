import type { Content } from "@/content";
import { Chamfer } from "@/components/ui/Chamfer";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SoonCard } from "@/components/ui/SoonCard";
import { StopGlyph } from "@/components/ui/StopGlyph";
import { formatDayMonth } from "@/lib/format";
import { speakerSession } from "@/lib/program";
import { sectionArt, type Theme } from "@/themes";
import { Numeral, SpeakerCard } from "./SpeakerCard";

function MoreCard({ content, theme, n, remaining }: { content: Content; theme: Theme; n: number; remaining: number }) {
  const { edition } = content;
  const Art = theme.mascot?.Soon;

  return (
    <Chamfer surface="surface-2" innerClassName="flex flex-col">
      <div className="grid aspect-4/5 place-items-center border-b border-dashed border-line">
        {Art ? <Art className="h-auto w-30" /> : <StopGlyph />}
      </div>
      <div className="flex grow flex-col gap-3.5 px-[18px] pt-[18px] pb-3.5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-[5px]">
            <h3 className="font-display text-[19px] leading-tight font-semibold text-ink-2">Açıklanacak</h3>
            <span className="text-[13px] text-ink-3">{remaining} konuşmacı daha</span>
          </div>
          <Numeral n={n} filled="never" />
        </div>
        <div className="mt-auto flex min-h-[55px] items-center justify-between gap-2 border-t border-line pt-2.5">
          <span className="text-[13px] text-ink-2">
            {edition.nextAnnouncementAt && `Sıradaki duyuru ${formatDayMonth(edition.nextAnnouncementAt)}`}
          </span>
          {edition.contact.instagram && (
            <a href={edition.contact.instagram} target="_blank" rel="noopener noreferrer" className="text-[13px] font-bold">
              Takip et
            </a>
          )}
        </div>
      </div>
    </Chamfer>
  );
}

export function Speakers({ content, theme }: { content: Content; theme: Theme }) {
  const { speakers, sessions, edition } = content;
  const { Pose } = sectionArt(theme, "konusmacilar");
  const total = Math.max(edition.speakersTotal ?? 0, speakers.length);
  const remaining = total - speakers.length;
  const instagram = edition.contact.instagram;

  return (
    <Section id="konusmacilar" className="gap-8">
      <SectionHeader
        section="konusmacilar"
        title="Konuşmacılar"
        lead="Yeni isimler duyuruldukça burada açılıyor."
        illustration={Pose && <Pose />}
        aside={
          speakers.length > 0 && remaining > 0 ? (
            <span className="text-sm text-ink-2 tabular">
              {speakers.length} / {total} açıklandı
            </span>
          ) : undefined
        }
      />
      {speakers.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {speakers.map((speaker, i) => (
            <SpeakerCard key={speaker.id} speaker={speaker} n={i + 1} session={speakerSession(sessions, speaker.id)} />
          ))}
          {remaining > 0 && <MoreCard content={content} theme={theme} n={speakers.length + 1} remaining={remaining} />}
        </div>
      ) : (
        <SoonCard
          theme={theme}
          title="Konuşmacılar açıklanacak"
          text="İsimler duyuruldukça burada açılacak."
          link={instagram ? { href: instagram, label: "Takip et" } : undefined}
        />
      )}
    </Section>
  );
}
