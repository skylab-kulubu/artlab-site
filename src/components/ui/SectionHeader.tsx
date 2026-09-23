import type { ReactNode } from "react";
import { PathStop, type StopState } from "./PathStop";

type Props = {
  title: string;
  lead?: ReactNode;
  illustration?: ReactNode;
  aside?: ReactNode;
  stop?: StopState;
};

export function SectionHeader({ title, lead, illustration, aside, stop = "upcoming" }: Props) {
  return (
    <div className="flex flex-col">
      {illustration && <div className="ml-2 h-16">{illustration}</div>}
      <div className="relative h-px bg-line">
        <span aria-hidden="true" className="absolute top-0 -left-[34px] hidden h-px w-[34px] bg-line lg:block" />
        <PathStop state={stop} className="-top-1.5 -left-[46px] hidden lg:block" />
      </div>
      <div className="flex flex-wrap items-end justify-between gap-6 pt-7">
        <div>
          <h2 className="font-display text-3xl font-semibold lg:text-[44px]">{title}</h2>
          {lead && <p className="mt-3 max-w-[620px] text-[17px] leading-relaxed text-ink-2">{lead}</p>}
        </div>
        {aside}
      </div>
    </div>
  );
}
