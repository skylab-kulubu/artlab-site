import { getContent } from "@/content";
import { Button } from "@/components/ui/Button";
import { Chamfer } from "@/components/ui/Chamfer";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StopGlyph } from "@/components/ui/StopGlyph";
import { formatDateRange } from "@/lib/format";
import { phaseAt } from "@/lib/phase";
import { visibleSections } from "@/lib/sections";
import { getTheme } from "@/themes";

export default async function Home() {
  const content = await getContent();
  const { edition } = content;
  const theme = getTheme();

  return (
    <main>
      <Section id="baslangic">
        <SectionHeader
          title={`ARTLAB ${edition.year}`}
          lead={`${edition.number}. edisyon · ${edition.slogan ?? "Yapay Zeka Zirvesi"}`}
          stop="passed"
        />
        <div className="flex flex-wrap gap-3.5">
          <Button href="#kayit">Ücretsiz kayıt ol</Button>
          <Button href="#program" variant="outline">
            Programı gör
          </Button>
          <Button href={edition.contact.instagram} variant="outline" size="sm">
            Instagram
          </Button>
        </div>
      </Section>
      <Section id="neden">
        <SectionHeader title="Primitifler" lead="Kesik köşe, durak glifi ve patika durakları." stop="current" />
        <div className="grid gap-6 md:grid-cols-3">
          <Chamfer border="amber" surface="bg" innerClassName="flex flex-col gap-3.5 p-8">
            <h3 className="text-[21px] font-bold">
              {edition.startsAt && edition.endsAt ? formatDateRange(edition.startsAt, edition.endsAt) : "Tarih yakında"}
            </h3>
            <p className="text-[15px] leading-relaxed text-ink-2">
              {edition.venue.campus} · {edition.venue.name}
            </p>
          </Chamfer>
          <Chamfer surface="bg" innerClassName="flex flex-col gap-3.5 p-8">
            <h3 className="text-[21px] font-bold">
              Evre <span className="text-cyan">{phaseAt(edition, new Date())}</span>
            </h3>
            <p className="text-[15px] leading-relaxed text-ink-2">tema {theme.id}</p>
          </Chamfer>
          <Chamfer surface="surface-2" innerClassName="flex items-center gap-6 p-8">
            <StopGlyph size={56} />
            <p className="text-[15px] leading-relaxed text-ink-2">
              {visibleSections(content).map((s) => s.label).join(" · ")}
            </p>
          </Chamfer>
        </div>
      </Section>
      <Section id="program">
        <SectionHeader title="Program" lead="Henüz gelinmemiş durak." />
      </Section>
    </main>
  );
}
