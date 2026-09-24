export function ScrollProgress() {
  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-50 h-0.5 lg:hidden">
      <div className="scroll-progress h-full origin-left bg-amber" />
    </div>
  );
}
