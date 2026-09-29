import type { Content } from "@/content";
import { Chamfer } from "@/components/ui/Chamfer";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StopGlyph } from "@/components/ui/StopGlyph";
import { sectionArt, type Theme } from "@/themes";

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

function VenueMap({ venue }: { venue: string }) {
  return (
    <Chamfer surface="surface-2" className="h-[300px]" innerClassName="relative overflow-hidden">
      <svg
        width="100%"
        height="298"
        viewBox="0 0 600 298"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        className="block"
      >
        <g stroke="var(--color-line-2)">
          <path d="M0 210 L600 170" strokeWidth="16" />
          <path d="M170 0 L250 298" strokeWidth="12" />
          <path d="M0 90 L600 120" strokeWidth="8" />
          <path d="M420 0 L380 298" strokeWidth="6" />
        </g>
        <path d="M0 245 L600 205" stroke="var(--color-cyan)" strokeWidth="2" strokeDasharray="7 5" />
        <circle cx="140" cy="236" r="7" fill="var(--color-surface-2)" stroke="var(--color-cyan)" strokeWidth="2" />
        <path
          d="M140 236 Q250 200 330 140"
          fill="none"
          stroke="var(--color-amber)"
          strokeWidth="1.8"
          strokeDasharray="3 5"
        />
        <path
          d="M330 140 C320 127 315 119 315 112 A15 15 0 0 1 345 112 C345 119 340 127 330 140 Z"
          fill="var(--color-amber)"
        />
        <circle cx="330" cy="112" r="5" fill="var(--color-surface-2)" />
        <text x="356" y="118" fill="var(--color-ink)" className="font-sans" fontSize="15" fontWeight="700">
          {venue}
        </text>
        <text x="96" y="266" fill="var(--color-ink-2)" className="font-sans" fontSize="13" fontWeight="600">
          M1A · Davutpaşa-YTÜ
        </text>
      </svg>
    </Chamfer>
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
      <SectionHeader section="sss" title="Sık sorulanlar" illustration={Pose && <Pose />} />
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
        <div id="konum" className="flex scroll-mt-24 flex-col gap-5">
          <VenueMap venue={venue.name} />
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-bold">
              {venue.campus} Kampüsü · {venue.name}
            </h3>
            <p className="text-[15px] leading-relaxed text-ink-2">{venue.transport.join(" ")}</p>
            <a href={directions} target="_blank" rel="noopener noreferrer" className="link-arrow self-start text-[15px] font-bold">
              Yol tarifi al
            </a>
          </div>
        </div>
      </div>
      <Chamfer
        id="iletisim"
        border="amber"
        className="reveal scroll-mt-24"
        innerClassName="flex flex-col gap-6 px-6 py-7 md:flex-row md:items-center md:gap-9 md:px-9"
      >
        {ContactArt ? <ContactArt className="shrink-0" /> : <StopGlyph />}
        <div className="flex grow flex-col gap-1.5">
          <span className="text-[11px] font-bold tracking-[0.18em] text-cyan">İLETİŞİM</span>
          <h3 className="text-[22px] font-bold">Aklına takılan bir şey mi var?</h3>
          <p className="text-[15px] leading-relaxed text-ink-2">
            Etkinlik, kayıt süreci ya da sponsorluk hakkında merak ettiğin her şey için bize yaz.
            {contact.email && " Sponsorluk dosyasını da bu adresten isteyebilirsin."}
          </p>
        </div>
        {contact.email ? (
          <a
            href={`mailto:${contact.email}`}
            className="flex shrink-0 items-center gap-3 self-start border border-line px-5 py-4 font-display text-base font-semibold text-ink hover:border-cyan hover:text-ink md:self-auto"
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
              className="shrink-0 self-start border border-line px-5 py-4 font-display text-base font-semibold text-ink hover:border-cyan hover:text-ink md:self-auto"
            >
              Instagram&apos;dan yaz
            </a>
          )
        )}
      </Chamfer>
    </Section>
  );
}
