import type { ReactNode } from "react";

type Props = {
  id?: string;
  children: ReactNode;
  border?: "line" | "amber" | "cyan";
  surface?: "bg" | "surface" | "surface-2" | "none";
  className?: string;
  innerClassName?: string;
};

const borders = { line: "bg-line", amber: "bg-amber", cyan: "bg-cyan" };
const surfaces = { bg: "bg-bg", surface: "bg-surface", "surface-2": "bg-surface-2", none: "" };

export function Chamfer({
  id,
  children,
  border = "line",
  surface = "surface",
  className = "",
  innerClassName = "",
}: Props) {
  return (
    <div id={id} className={`cho p-px ${borders[border]} ${className}`}>
      <div className={`chi h-full ${surfaces[surface]} ${innerClassName}`}>{children}</div>
    </div>
  );
}
