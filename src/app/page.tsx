import { getContent } from "@/content";
import { Header } from "@/components/header/Header";
import { Hero } from "@/components/hero/Hero";
import { Program } from "@/components/sections/Program";
import { Raffle } from "@/components/sections/Raffle";
import { Speakers } from "@/components/sections/Speakers";
import { Why } from "@/components/sections/Why";
import { ActiveSectionProvider } from "@/components/nav/ActiveSection";
import { ScrollProgress } from "@/components/nav/ScrollProgress";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { visibleSections } from "@/lib/sections";
import { getTheme } from "@/themes";

export const revalidate = 3600;

export default async function Home() {
  const content = await getContent();
  const theme = getTheme();
  const sections = visibleSections(content);
  const shown = new Set(sections.map((s) => s.id));
  const built = new Set(["baslangic", "neden", "cekilis", "program", "konusmacilar"]);

  return (
    <ActiveSectionProvider sections={sections}>
      <ScrollProgress />
      <Header edition={content.edition} theme={theme} serverNow={content.fetchedAt} />
      <main>
        <Hero content={content} theme={theme} />
        <Why content={content} theme={theme} />
        {shown.has("cekilis") && <Raffle content={content} theme={theme} />}
        <Program content={content} theme={theme} />
        <Speakers content={content} theme={theme} />
        {sections
          .filter((s) => !built.has(s.id))
          .map((s) => (
            <Section key={s.id} id={s.id} className="min-h-[80vh]">
              <SectionHeader section={s.id} title={s.label} />
            </Section>
          ))}
      </main>
    </ActiveSectionProvider>
  );
}
