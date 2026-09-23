import type { Metadata } from "next";
import { Manrope, Unbounded } from "next/font/google";
import "./globals.css";

const unbounded = Unbounded({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "800"],
  display: "swap",
  variable: "--font-unbounded",
});

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "ARTLAB 2026 · Yapay Zeka Zirvesi",
  description: "YTÜ SKY LAB tarafından düzenlenen ARTLAB Yapay Zeka Zirvesi.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={`${unbounded.variable} ${manrope.variable}`}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
