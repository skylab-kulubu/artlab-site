import { getContent } from "@/content";
import { Header } from "@/components/header/Header";
import { ActiveSectionProvider } from "@/components/nav/ActiveSection";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { phaseAction, phaseAt } from "@/lib/phase";
import { visibleSections } from "@/lib/sections";
import { getTheme } from "@/themes";

export default async function Home() {
  const content = await getContent();
  const { edition } = content;
  const theme = getTheme();
  const sections = visibleSections(content);
  const action = phaseAction(phaseAt(edition, content.fetchedAt), edition);

  return (
    <ActiveSectionProvider sections={sections}>
      <Header edition={edition} theme={theme} serverNow={content.fetchedAt} />
      <main>
        {sections.map((s, i) => (
          <Section key={s.id} id={s.id} className={i === 0 ? "min-h-dvh justify-end" : "min-h-[80vh]"}>
            <SectionHeader title={s.label} stop={i === 0 ? "passed" : "upcoming"} />
            {i === 0 && (
              <div className="flex flex-wrap gap-3.5">
                <Button href={action.href}>{action.label}</Button>
                <Button href="#program" variant="outline">
                  Programı gör
                </Button>
              </div>
            )}
          </Section>
        ))}
      </main>
    </ActiveSectionProvider>
  );
}
