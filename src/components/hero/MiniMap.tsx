import { Chamfer } from "@/components/ui/Chamfer";

export function MiniMap({ venue }: { venue: string }) {
  return (
    <Chamfer surface="surface-2" className="h-[168px] w-[250px]" innerClassName="relative">
      <svg width="248" height="166" viewBox="0 0 248 166" aria-hidden="true" className="block">
        <g stroke="var(--color-line-2)">
          <path d="M0 118 L248 96" strokeWidth="10" />
          <path d="M70 0 L110 166" strokeWidth="8" />
          <path d="M0 50 L248 70" strokeWidth="5" />
        </g>
        <path d="M0 138 L248 116" stroke="var(--color-cyan)" strokeWidth="1.5" strokeDasharray="5 4" />
        <path d="M158 76 C151 67 148 62 148 57 A10 10 0 0 1 168 57 C168 62 165 67 158 76 Z" fill="var(--color-amber)" />
        <g className="font-sans font-bold" fontSize="11">
          <text x="176" y="62" fill="var(--color-ink)">
            {venue}
          </text>
          <text x="68" y="154" fill="var(--color-ink-2)" fontSize="10" fontWeight="600">
            M1A Davutpaşa-YTÜ
          </text>
          <text x="226" y="20" fill="var(--color-ink-2)">
            K
          </text>
        </g>
      </svg>
      <a href="#konum" className="absolute top-2.5 left-3.5 text-[11px] font-bold tracking-[0.14em]">
        HARİTA · ULAŞIM
      </a>
    </Chamfer>
  );
}
