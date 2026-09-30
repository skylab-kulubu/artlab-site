import { StopGlyph } from "@/components/ui/StopGlyph";
import type { Edition } from "@/lib/types";
import type { Theme } from "@/themes";
import { CompactCompass, Compass } from "./Compass";
import { HeaderAction } from "./HeaderAction";
import { HeaderShell } from "./HeaderShell";
import { MenuButton } from "./MobileMenu";

type Props = { edition: Edition; theme: Theme; serverNow: number };

export function Header({ edition, theme, serverNow }: Props) {
  const Logo = theme.mascot?.Logo;

  return (
    <HeaderShell>
      <a href="#baslangic" aria-label="ARTLAB" className="flex shrink-0 items-center gap-3 text-ink hover:text-ink xl:min-w-60">
        {Logo ? <Logo className="size-[30px]" /> : <StopGlyph size={30} />}
        <span className="hidden font-display text-[17px] font-semibold tracking-[0.12em] sm:inline">ARTLAB</span>
      </a>
      <Compass />
      <CompactCompass />
      <div className="flex items-center gap-1">
        <HeaderAction edition={edition} serverNow={serverNow} />
        <MenuButton />
      </div>
    </HeaderShell>
  );
}
