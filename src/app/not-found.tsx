import { Button } from "@/components/ui/Button";
import { StopGlyph } from "@/components/ui/StopGlyph";
import { getTheme } from "@/themes";

export default function NotFound() {
  const Art = getTheme().mascot?.Contact;

  return (
    <main className="relative flex min-h-dvh flex-col items-start justify-center gap-7 overflow-hidden px-5 py-24 lg:px-20">
      <span aria-hidden="true" className="absolute inset-y-0 left-10 hidden border-l border-dashed border-path lg:block" />
      <span aria-hidden="true" className="absolute top-1/2 left-[34px] hidden size-3 -translate-y-1/2 rotate-45 border-[1.5px] border-amber bg-bg lg:block" />
      {Art ? <Art className="h-auto w-28" /> : <StopGlyph />}
      <div className="flex flex-col gap-3">
        <span className="text-xs font-bold tracking-[0.18em] text-cyan">404 · SAYFA BULUNAMADI</span>
        <h1 className="font-display text-3xl font-semibold lg:text-5xl">Bu durak patikada yok.</h1>
        <p className="max-w-[520px] text-[17px] leading-relaxed text-ink-2">
          Aradığın sayfa taşınmış ya da hiç var olmamış olabilir. Başlangıca dönüp oradan devam edebilirsin.
        </p>
      </div>
      <Button href="/">Başa dön</Button>
    </main>
  );
}
