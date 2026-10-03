import type { Metadata } from "next";
import { Manrope, Unbounded } from "next/font/google";
import { introScript } from "@/components/Intro";
import { MotionProvider } from "@/components/MotionProvider";
import { getContent } from "@/content";
import { CmsPage } from "@/lib/cms";
import { SITE_URL, siteDescription, siteTitle } from "@/lib/site";
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

export async function generateMetadata(): Promise<Metadata> {
  const { edition } = await getContent();
  const title = siteTitle(edition);
  const description = siteDescription(edition);

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: `%s · ARTLAB ${edition.year}` },
    description,
    keywords: ["ARTLAB", "yapay zeka", "yapay zeka zirvesi", "SKY LAB", "Yıldız Teknik Üniversitesi", "YTÜ", "etkinlik", "konferans"],
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: "tr_TR",
      url: "/",
      siteName: "ARTLAB",
      title,
      description,
    },
    twitter: { card: "summary_large_image", title, description, site: "@skylabkulubu" },
    robots: { index: true, follow: true },
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={`${unbounded.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: clockScript + ";" + introScript }} />
      </head>
      <body className="min-h-dvh">
        <CmsPage>
          <MotionProvider>{children}</MotionProvider>
        </CmsPage>
      </body>
    </html>
  );
}
