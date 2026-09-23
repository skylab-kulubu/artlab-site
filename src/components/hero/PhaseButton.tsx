"use client";

import { Button } from "@/components/ui/Button";
import { useNow } from "@/hooks/useNow";
import { phaseAction, phaseAt } from "@/lib/phase";
import type { Edition } from "@/lib/types";

export function PhaseButton({ edition, serverNow, className }: { edition: Edition; serverNow: number; className?: string }) {
  const now = useNow(60_000, serverNow);
  const action = phaseAction(phaseAt(edition, now), edition);
  return (
    <Button href={action.href} className={className}>
      {action.label}
    </Button>
  );
}
