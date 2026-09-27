import type { Content } from "@/content";
import { Footer } from "@/components/footer/Footer";
import { Header } from "@/components/header/Header";
import { EventSchema } from "@/components/EventSchema";
import { Intro } from "@/components/Intro";
import { Hero } from "@/components/hero/Hero";
import { Archive } from "@/components/sections/Archive";
import { Faq } from "@/components/sections/Faq";
import { Foyer } from "@/components/sections/Foyer";
import { Program } from "@/components/sections/Program";
import { Raffle } from "@/components/sections/Raffle";
import { Speakers } from "@/components/sections/Speakers";
import { Sponsors } from "@/components/sections/Sponsors";
import { Why } from "@/components/sections/Why";
import { ActiveSectionProvider } from "@/components/nav/ActiveSection";
import { ScrollProgress } from "@/components/nav/ScrollProgress";
import { visibleSections } from "@/lib/sections";
import type { Theme } from "@/themes";

type Props = { content: Content; theme: Theme; intro?: boolean };

export function Site({ content, theme, intro = true }: Props) {
  const sections = visibleSections(content);
  const shown = new Set(sections.map((s) => s.id));

  return (
    <ActiveSectionProvider sections={sections}>
      <EventSchema content={content} />
      {intro && <Intro theme={theme} />}
      <ScrollProgress />
      <Header edition={content.edition} theme={theme} serverNow={content.fetchedAt} />
      <main>
        <Hero content={content} theme={theme} />
        <Why content={content} theme={theme} />
        {shown.has("cekilis") && <Raffle content={content} theme={theme} />}
        <Program content={content} theme={theme} />
        <Speakers content={content} theme={theme} />
        {shown.has("fuaye") && <Foyer content={content} theme={theme} />}
        {shown.has("arsiv") && <Archive content={content} theme={theme} />}
        {shown.has("destekciler") && <Sponsors content={content} theme={theme} />}
        <Faq content={content} theme={theme} />
      </main>
      <Footer theme={theme} year={content.edition.year} />
    </ActiveSectionProvider>
  );
}
