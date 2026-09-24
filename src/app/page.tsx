import { getContent } from "@/content";
import { Header } from "@/components/header/Header";
import { Hero } from "@/components/hero/Hero";
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

  return (
    <ActiveSectionProvider sections={sections}>
      <ScrollProgress />
      <Header edition={content.edition} theme={theme} serverNow={content.fetchedAt} />
      <main>
        <Hero content={content} theme={theme} />
        <Why content={content} theme={theme} />
        {sections
          .filter((s) => s.id !== "baslangic" && s.id !== "neden")
          .map((s) => (
            <Section key={s.id} id={s.id} className="min-h-[80vh]">
              <SectionHeader section={s.id} title={s.label} />
            </Section>
          ))}
      </main>
    </ActiveSectionProvider>
  );
}
