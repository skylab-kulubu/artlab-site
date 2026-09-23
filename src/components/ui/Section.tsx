import type { ReactNode } from "react";
import type { SectionId } from "@/lib/sections";

type Props = {
  id: SectionId;
  children: ReactNode;
  motif?: ReactNode;
  className?: string;
};

export function Section({ id, children, motif, className = "" }: Props) {
  return (
    <section
      id={id}
      className={`relative isolate flex scroll-mt-24 flex-col gap-12 overflow-hidden px-5 pt-20 pb-16 lg:px-20 lg:pt-24 ${className}`}
    >
      <span aria-hidden="true" className="absolute inset-y-0 left-10 hidden border-l border-dashed border-path lg:block" />
      {motif && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 hidden lg:block">
          {motif}
        </div>
      )}
      {children}
    </section>
  );
}
