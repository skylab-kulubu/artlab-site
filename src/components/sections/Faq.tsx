import type { Content } from "@/content";
import { Chamfer } from "@/components/ui/Chamfer";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StopGlyph } from "@/components/ui/StopGlyph";
import { VenueMap } from "@/components/map/VenueMap";
import { sectionArt, type Theme } from "@/themes";
import { EditableRegion } from "inscribed";

function Toggle() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" className="shrink-0" strokeWidth="1.8">
      <path d="M3 9 H15" className="stroke-amber transition-[stroke] duration-300 group-open:stroke-cyan" />
      <path
        d="M9 3 V15"
        className="origin-center stroke-amber transition-[rotate,opacity] duration-300 [transform-box:fill-box] group-open:rotate-90 group-open:opacity-0"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      aria-hidden="true"
      fill="none"
      stroke="var(--color-cyan)"
      strokeWidth="1.6"
    >
      <rect x="2" y="4" width="16" height="12" rx="2" />
      <path d="M2.5 5 L10 11 L17.5 5" />
    </svg>
  );
}

export function Faq({ content, theme }: { content: Content; theme: Theme }) {
  const { faqs, edition } = content;
  const { venue, contact } = edition;
  const { Pose } = sectionArt(theme, "sss");
  const ContactArt = theme.mascot?.Contact;
  const directions =
    venue.mapUrl ??
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${venue.campus} ${venue.name}`)}`;

  return (
    <Section id="sss">
      <SectionHeader section="sss" title={<EditableRegion blockPath="sss.baslik" blockType="ShortText" defaultValue="Sık sorulanlar" />} illustration={Pose && <Pose />} />
      <div className="reveal-group grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col border-t border-line">
          {faqs.length ? (
            faqs.map((faq, i) => (
              <details key={faq.q} open={i === 0} className="faq-item group border-b border-line py-[22px]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold group-open:font-bold [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <Toggle />
                </summary>
                <p className="max-w-[520px] pt-3 text-base leading-relaxed text-ink-2 opacity-0 transition-opacity duration-300 group-open:opacity-100">
                  {faq.a}
                </p>
              </details>
            ))
          ) : (
            <div className="flex flex-col gap-2 py-7">
              <h3 className="text-xl font-bold">Aklına takılan bir şey mi var?</h3>
              <p className="text-[15px] leading-relaxed text-ink-2">Sık sorulan sorular yakında burada.</p>
            </div>
          )}
        </div>
        <Chamfer
          id="iletisim"
          border="amber"
          className="scroll-mt-24 self-start"
          innerClassName="flex flex-col gap-6 px-6 py-7 md:px-9 md:py-9"
        >
          {ContactArt ? <ContactArt className="shrink-0" /> : <StopGlyph />}
          <div className="flex grow flex-col gap-1.5">
            <span className="text-[11px] font-bold tracking-[0.18em] text-cyan">İLETİŞİM</span>
            <h3 className="text-[22px] font-bold">Aklına takılan bir şey mi var?</h3>
            <p className="text-[15px] leading-relaxed text-ink-2">
              Etkinlik, kayıt süreci ya da sponsorluk hakkında merak ettiğin her şey için bize yaz.
            </p>
          </div>
          {contact.email ? (
            <a
              href={`mailto:${contact.email}`}
              className="flex shrink-0 items-center gap-3 self-start border border-line px-5 py-4 font-display text-base font-semibold text-ink hover:border-cyan hover:text-ink"
            >
              <MailIcon />
              {contact.email}
            </a>
          ) : (
            contact.instagram && (
              <a
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 self-start border border-line px-5 py-4 font-display text-base font-semibold text-ink hover:border-cyan hover:text-ink"
              >
                Instagram&apos;dan yaz
              </a>
            )
          )}
        </Chamfer>
      </div>
      <Chamfer id="konum" className="reveal mt-12 scroll-mt-24 lg:mt-16">
        <VenueMap venue={venue.name} place={`${venue.campus} Kampüsü · ${venue.name}`} directions={directions} />
      </Chamfer>
    </Section>
  );
}
