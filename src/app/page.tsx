import { getContent } from "@/content";
import { envHour, palettes, skyAt, type EnvName } from "@/lib/env";
import { formatDateRange } from "@/lib/format";
import { phaseAt } from "@/lib/phase";
import { visibleSections } from "@/lib/sections";
import { getTheme } from "@/themes";

export default async function Home() {
  const content = await getContent();
  const { edition } = content;
  const theme = getTheme();

  return (
    <main className="flex min-h-dvh flex-col items-start justify-center gap-8 px-10 py-16">
      <h1 className="font-display text-5xl font-extrabold tracking-tight">ARTLAB {edition.year}</h1>
      <p className="text-xs font-semibold tracking-[0.18em] text-amber uppercase">
        {edition.number}. edisyon · {edition.slogan ?? "Yapay Zeka Zirvesi"}
      </p>
      <div className="cho bg-line p-px">
        <div className="chi flex flex-col gap-1 bg-surface px-6 py-5 text-ink-2">
          <span>
            {edition.startsAt && edition.endsAt ? formatDateRange(edition.startsAt, edition.endsAt) : "Tarih yakında"}{" "}
            · {edition.venue.campus} · {edition.venue.name}
          </span>
          <span>
            Evre <span className="text-cyan">{phaseAt(edition, new Date())}</span> · tema {theme.id}
          </span>
          <span>{visibleSections(content).map((s) => s.label).join(" · ")}</span>
        </div>
      </div>
      <div className="flex gap-3">
        {(Object.keys(palettes) as EnvName[]).map((name) => {
          const sky = skyAt(envHour[name]);
          return (
            <div
              key={name}
              className="cut flex h-24 w-32 items-end p-3 text-xs font-semibold"
              style={{ background: `linear-gradient(${sky.sky1}, ${sky.sky4}, ${sky.sky6})`, color: sky.mark }}
            >
              {name}
            </div>
          );
        })}
      </div>
    </main>
  );
}
