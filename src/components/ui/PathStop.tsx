export type StopState = "passed" | "current" | "upcoming";

const states: Record<StopState, string> = {
  passed: "bg-amber",
  current: "bg-cyan",
  upcoming: "border-[1.5px] border-amber bg-bg",
};

export function PathStop({ state = "upcoming", className = "" }: { state?: StopState; className?: string }) {
  return (
    <span aria-hidden="true" className={`absolute size-3 rotate-45 ${states[state]} ${className}`}>
      {state === "current" && <span className="absolute -inset-1.5 motion-safe:animate-ping border border-cyan/60" />}
    </span>
  );
}
