import type { ComponentProps } from "react";

type Variant = "primary" | "outline";
type Size = "md" | "sm";

const variants: Record<Variant, string> = {
  primary: "cut bg-amber font-bold text-on-amber hover:text-on-amber hover:brightness-110",
  outline: "border border-ink/35 font-semibold text-ink hover:border-cyan hover:text-ink",
};

const sizes: Record<Size, string> = {
  md: "h-13 px-7 text-base",
  sm: "h-11 px-5 text-sm",
};

type Props = ComponentProps<"a"> & { variant?: Variant; size?: Size };

export function Button({ variant = "primary", size = "md", className = "", ...props }: Props) {
  const external = props.href?.startsWith("http");
  return (
    <a
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      {...props}
      className={`inline-flex items-center justify-center gap-2.5 whitespace-nowrap transition-colors ${variants[variant]} ${sizes[size]} ${className}`}
    />
  );
}
