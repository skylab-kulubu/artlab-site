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

// Runs before first paint so the hero's ambient loops start at the wall clock's phase.
const clockScript = `document.documentElement.style.setProperty("--clock",(Date.now()/1e3%86400).toFixed(2)+"s")`;

export const metadata: Metadata = {
  title: "ARTLAB 2026 · Yapay Zeka Zirvesi",
  description: "YTÜ SKY LAB tarafından düzenlenen ARTLAB Yapay Zeka Zirvesi.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={`${unbounded.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: clockScript }} />
      </head>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
