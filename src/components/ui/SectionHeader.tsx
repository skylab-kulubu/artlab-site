import type { ReactNode } from "react";
import type { SectionId } from "@/lib/sections";
import { PathStop } from "./PathStop";

type Props = {
  section: SectionId;
  title: string;
  lead?: ReactNode;
  illustration?: ReactNode;
  aside?: ReactNode;
};

export function SectionHeader({ section, title, lead, illustration, aside }: Props) {
  return (
    <div className="flex flex-col">
      {illustration && <div className="reveal ml-2 h-16">{illustration}</div>}
      <div className="relative h-px">
        <span aria-hidden="true" className="reveal-line absolute inset-0 bg-line" />
        <span aria-hidden="true" className="absolute top-0 -left-[34px] hidden h-px w-[34px] bg-line lg:block" />
        <PathStop section={section} className="-top-1.5 -left-[46px] hidden lg:block" />
      </div>
      <div className="flex flex-wrap items-end justify-between gap-6 pt-7">
        <div className="reveal">
          <h2 className="font-display text-3xl font-semibold lg:text-[44px]">{title}</h2>
          {lead && <p className="mt-3 max-w-[620px] text-[17px] leading-relaxed text-ink-2">{lead}</p>}
        </div>
        {aside && <div className="reveal">{aside}</div>}
      </div>
    </div>
  );
}
