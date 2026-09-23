import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  border?: "line" | "amber" | "cyan";
  surface?: "bg" | "surface" | "surface-2";
  className?: string;
  innerClassName?: string;
};

const borders = { line: "bg-line", amber: "bg-amber", cyan: "bg-cyan" };
const surfaces = { bg: "bg-bg", surface: "bg-surface", "surface-2": "bg-surface-2" };

export function Chamfer({ children, border = "line", surface = "surface", className = "", innerClassName = "" }: Props) {
  return (
    <div className={`cho p-px ${borders[border]} ${className}`}>
      <div className={`chi h-full ${surfaces[surface]} ${innerClassName}`}>{children}</div>
    </div>
  );
}
