const reveal = "grid grid-cols-[0fr] transition-[grid-template-columns] duration-500 ease-in-out group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr]";
const glyph = "overflow-hidden whitespace-nowrap text-cyan opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100";

export function Signature() {
  return (
    <span className="flex items-center text-[11px] font-semibold tracking-[0.2em] text-ink-3 uppercase">
      <span className="mr-2 select-none">Developed by</span>
      <a
        href="https://github.com/kanekalp"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center text-ink-2 hover:text-ink focus-visible:text-ink"
      >
        <span className={reveal} aria-hidden="true">
          <span className={`${glyph} group-hover:pr-2 group-focus-visible:pr-2`}>✎</span>
        </span>
        <span className="font-bold whitespace-nowrap transition-colors duration-300">Kaan Necip Kalp</span>
        <span className={reveal} aria-hidden="true">
          <span className={`${glyph} group-hover:pl-2 group-focus-visible:pl-2`}>{"</>"}</span>
        </span>
        <span className="absolute -bottom-1 left-0 h-px w-0 bg-cyan transition-[width] duration-300 group-hover:w-full group-focus-visible:w-full" />
      </a>
    </span>
  );
}
