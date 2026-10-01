import { MapStack } from "@/components/map/MapStack";
import { Chamfer } from "@/components/ui/Chamfer";

export function MiniMap({ venue }: { venue: string }) {
  return (
    <Chamfer surface="bg" className="h-[168px] w-[250px]" innerClassName="relative overflow-hidden">
      <a href="#konum" aria-label="Harita ve ulaşım" className="group/mini block size-full">
        <span className="absolute inset-x-0 top-1/2 aspect-[1200/1023] -translate-y-1/2 @container">
          <MapStack venue={venue} steps={false} view={{ x: 470, y: 225, scale: 2.4 }} />
        </span>
        <span className="absolute top-0 left-0 bg-bg-deep/85 py-1.5 pr-3 pl-4 text-[11px] font-bold tracking-[0.14em] text-ink group-hover/mini:text-amber">
          HARİTA · ULAŞIM
        </span>
      </a>
    </Chamfer>
  );
}
