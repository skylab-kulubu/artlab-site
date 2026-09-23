export function StopGlyph({ size = 72, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" aria-hidden="true" className={`shrink-0 ${className}`}>
      <rect
        x="14.4"
        y="14.4"
        width="43.2"
        height="43.2"
        transform="rotate(45 36 36)"
        fill="none"
        stroke="var(--color-amber)"
        strokeWidth="1.8"
      />
      <circle cx="36" cy="36" r="5.8" fill="var(--color-cyan)" />
    </svg>
  );
}
