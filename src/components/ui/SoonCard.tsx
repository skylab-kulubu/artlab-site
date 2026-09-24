import type { Theme } from "@/themes";
import { Chamfer } from "./Chamfer";
import { StopGlyph } from "./StopGlyph";

type Props = {
  theme: Theme;
  title: string;
  text: string;
  link?: { href: string; label: string };
};

export function SoonCard({ theme, title, text, link }: Props) {
  const Art = theme.mascot?.Soon;

  return (
    <Chamfer surface="surface-2" innerClassName="flex flex-col gap-6 px-6 py-8 sm:flex-row sm:items-center sm:gap-9 sm:px-10">
      {Art ? <Art className="shrink-0" /> : <StopGlyph />}
      <div className="flex grow flex-col gap-1.5">
        <span className="text-[11px] font-bold tracking-[0.18em] text-cyan">YAKINDA</span>
        <h3 className="text-[22px] font-bold">{title}</h3>
        <p className="text-[15px] leading-relaxed text-ink-2">{text}</p>
      </div>
      {link && (
        <a href={link.href} target="_blank" rel="noopener noreferrer" className="shrink-0 text-[15px] font-bold">
          {link.label}
        </a>
      )}
    </Chamfer>
  );
}
