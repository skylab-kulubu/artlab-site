"use client";

import { Button } from "@/components/ui/Button";
import { useActiveSection } from "@/components/nav/ActiveSection";
import { useNow } from "@/hooks/useNow";
import { countdown, phaseAction, phaseAt } from "@/lib/phase";
import type { Edition } from "@/lib/types";

const pad = (n: number) => String(n).padStart(2, "0");

function Unit({ value, unit, live }: { value: number; unit: string; live?: boolean }) {
  return (
    <>
      <span className={live ? "text-cyan" : undefined}>{pad(value)}</span>
      <span className="text-[10px] text-ink-2">{unit}</span>
    </>
  );
}

export function HeaderAction({ edition, serverNow }: { edition: Edition; serverNow: number }) {
  const now = useNow(1000, serverNow);
  const { active } = useActiveSection();
  const phase = phaseAt(edition, now);
  const action = phaseAction(phase, edition);
  const showCountdown = phase === "geri-sayim" && active !== "baslangic" && edition.startsAt;
  const left = edition.startsAt ? countdown(edition.startsAt, now) : null;

  return (
    <div className="flex items-center justify-end gap-4 xl:min-w-60">
      {showCountdown && left && (
        <span className="hidden flex-col items-end gap-px sm:flex">
          <span className="text-[10px] font-bold tracking-[0.16em] text-ink-2">KALAN</span>
          <span className="font-display text-sm font-semibold tabular">
            <Unit value={left.days} unit="g" /> <Unit value={left.hours} unit="s" />{" "}
            <Unit value={left.minutes} unit="d" live />
          </span>
        </span>
      )}
      <Button href={action.href} size="sm" className="text-[15px]">
        {action.short}
      </Button>
    </div>
  );
}
